// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it } from 'vitest'
import { splitSourceReference, SourceCitation } from './SourceCitation'
import { CombatProfile } from './CombatProfile'
import { sampleCharacters } from '../../data/sample/characters'
import { getCharacterBattleTimeline } from '../../application/getCharacterBattleTimeline'
import { EvidenceList } from './EvidenceList'

describe('v0.2.1 source citation URL extraction', () => {
  it('splits entire links and mixed description links without changing their original URL', () => {
    expect(splitSourceReference('https://one-piece.com/character/ace/index.html')).toEqual({
      text: '', url: 'https://one-piece.com/character/ace/index.html',
    })
    expect(splitSourceReference('루치 공식 프로필 · https://one-piece.com/character/Rob_Lucci/index.html')).toEqual({
      text: '루치 공식 프로필', url: 'https://one-piece.com/character/Rob_Lucci/index.html',
    })
    expect(splitSourceReference('ONE PIECE 원작 587화 (팬 해설) · https://onepiece.fandom.com/wiki/Chapter_587')).toEqual({
      text: 'ONE PIECE 원작 587화 (팬 해설)', url: 'https://onepiece.fandom.com/wiki/Chapter_587',
    })
    expect(splitSourceReference('원작 Ch. 966 / 1165')).toEqual({text:'원작 Ch. 966 / 1165'})
    expect(splitSourceReference('javascript:alert(1)')).toEqual({text:'javascript:alert(1)'})
    expect(splitSourceReference('http://insecure.test/unsafe')).toEqual({text:'http://insecure.test/unsafe'})
  })

  it('renders all six Ace profile sources with concise links and retains canon/fan qualifiers', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const el=document.createElement('div'), root=createRoot(el)
    try {
      const ace=sampleCharacters.find(c=>c.id==='ace')!
      expect(ace.combatProfile.sources).toHaveLength(6)
      await act(async()=>root.render(<CombatProfile profile={ace.combatProfile}/>))
      const sourceItems=[...el.querySelectorAll('.profile-sources li')]
      expect(sourceItems).toHaveLength(6)
      const links=[...el.querySelectorAll<HTMLAnchorElement>('.profile-sources .source-citation-link')]
      expect(links).toHaveLength(6)
      expect(links.map(x=>x.href)).toContain('https://one-piece.com/character/ace/index.html')
      expect(links.map(x=>x.href)).toContain('https://onepiece.fandom.com/wiki/Chapter_587')
      expect(el.querySelector('.profile-sources')?.textContent).not.toContain('https://')
      expect(el.querySelector('.profile-sources')?.textContent).toContain('1차 원문 전체 미열람')
      expect(links.every(link=>link.target==='_blank'&&link.rel.includes('noopener'))).toBe(true)
      expect(ace.combatProfile.sources[0].reference).toBe('https://one-piece.com/character/ace/index.html')
    } finally {await act(async()=>root.unmount())}
  })

  it('keeps label and human-readable reference when a URL is absent', async()=>{
    const el=document.createElement('div'),root=createRoot(el)
    try {
      await act(async()=>root.render(<SourceCitation label="원작 Evidence" reference="Ch. 434 / 579 / 1055 / 1079"/>))
      expect(el.textContent).toContain('원작 근거')
      expect(el.textContent).toContain('Ch. 434')
      expect(el.querySelector('a')).toBeNull()
    } finally {await act(async()=>root.unmount())}
  })

  it('hides embedded character-profile URLs across other affected roster members',async()=>{
    const el=document.createElement('div'),root=createRoot(el)
    try {
      for(const id of ['sabo','morley','lucci','kaku','stussy','smoker','tashigi','ivankov','inazuma']){
        const character=sampleCharacters.find(c=>c.id===id)!
        await act(async()=>root.render(<CombatProfile profile={character.combatProfile}/>))
        const displayed=el.querySelector('.profile-sources')?.textContent??''
        expect(displayed,id).not.toContain('https://')
        for(const original of character.combatProfile.sources){
          if(original.reference.includes('https://')){
            expect([...el.querySelectorAll<HTMLAnchorElement>('.profile-sources a')].some(a=>original.reference.includes(a.href)),id).toBe(true)
          }
        }
      }
    }finally{await act(async()=>root.unmount())}
  })

  it('checks the entire 70-character profile roster for raw displayed HTTPS addresses',async()=>{
    const el=document.createElement('div'), root=createRoot(el)
    try {
      expect(sampleCharacters).toHaveLength(70)
      for(const character of sampleCharacters){
        await act(async()=>root.render(<CombatProfile profile={character.combatProfile}/>))
        const section=el.querySelector('.profile-sources')
        const visible=section?.textContent??''
        expect(visible,character.id).not.toContain('https://')
        const originalCount=character.combatProfile.sources
          .filter(source=>source.reference.includes('https://')).length
        expect(section?.querySelectorAll('a').length,character.id).toBe(originalCount)
        expect(section?.querySelectorAll('li').length).toBe(character.combatProfile.sources.length)
      }
    }finally{await act(async()=>root.unmount())}
  })

  it('shows evidence description URL as a working link, not raw overflowing text',async()=>{
    const el=document.createElement('div'),root=createRoot(el)
    try {
      const timelines=getCharacterBattleTimeline('ace')
      const item=timelines.find(x=>x.evidence.some(e=>e.source.description?.includes('https://')))!
      const evidence=item.evidence.find(e=>e.source.description?.includes('https://'))!
      await act(async()=>root.render(<EvidenceList records={[{evidence}]} battle={item.battle}/>))
      const link=el.querySelector<HTMLAnchorElement>('.evidence-card .source-citation-link')
      expect(link).not.toBeNull()
      expect(link?.href).toMatch(/^https:\/\/one-piece\.com\//)
      expect(el.querySelector('.evidence-source')?.textContent).not.toContain('https://')
      expect(el.querySelector('.evidence-card')?.textContent).toContain('원작에서 확인되는 사실')
    }finally{await act(async()=>root.unmount())}
  })
})
