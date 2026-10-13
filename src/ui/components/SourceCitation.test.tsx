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
      text: '', urls: ['https://one-piece.com/character/ace/index.html'],
    })
    expect(splitSourceReference('루치 공식 프로필 · https://one-piece.com/character/Rob_Lucci/index.html')).toEqual({
      text: '루치 공식 프로필', urls: ['https://one-piece.com/character/Rob_Lucci/index.html'],
    })
    expect(splitSourceReference('ONE PIECE 원작 587화 (팬 해설) · https://onepiece.fandom.com/wiki/Chapter_587')).toEqual({
      text: 'ONE PIECE 원작 587화 (팬 해설)', urls: ['https://onepiece.fandom.com/wiki/Chapter_587'],
    })
    expect(splitSourceReference('https://one-piece.com/anime/o6243/index.html · https://one-piece.com/anime/o6323/index.html')).toEqual({
      text:'',urls:['https://one-piece.com/anime/o6243/index.html','https://one-piece.com/anime/o6323/index.html'],
    })
    expect(splitSourceReference('원작 Ch. 966 / 1165')).toEqual({text:'원작 Ch. 966 / 1165',urls:[]})
    expect(splitSourceReference('javascript:alert(1)')).toEqual({text:'javascript:alert(1)',urls:[]})
    expect(splitSourceReference('http://insecure.test/unsafe')).toEqual({text:'http://insecure.test/unsafe',urls:[]})
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

  it('checks the entire 72-character profile roster for raw displayed HTTPS addresses',async()=>{
    const el=document.createElement('div'), root=createRoot(el)
    try {
      expect(sampleCharacters).toHaveLength(72)
      for(const character of sampleCharacters){
        await act(async()=>root.render(<CombatProfile profile={character.combatProfile}/>))
        const section=el.querySelector('.profile-sources')
        const visible=section?.textContent??''
        expect(visible,character.id).not.toContain('https://')
        const originalCount=character.combatProfile.sources
          .reduce((count,source)=>count+(source.reference.match(/https:\/\//g)?.length??0),0)
        expect(section?.querySelectorAll('.source-citation-link').length,character.id).toBe(originalCount)
        expect(section?.querySelectorAll('li').length).toBe(character.combatProfile.sources.length)
        expect(section?.querySelector<HTMLAnchorElement>('.official-art-reference a')?.href).toBe('https://one-piece.com/vivre/list2/index.html')
      }
    }finally{await act(async()=>root.unmount())}
  })

  it('renders two distinct official episode links when Ulti or X Drake record stores both in one field',async()=>{
    const el=document.createElement('div'),root=createRoot(el)
    try {
      for(const id of ['ulti','x-drake']){
        const character=sampleCharacters.find(x=>x.id===id)!
        await act(async()=>root.render(<CombatProfile profile={character.combatProfile}/>))
        const urlLi=[...el.querySelectorAll('.profile-sources li')].find(x=>x.querySelectorAll('a').length===2)
        expect(urlLi,id).toBeTruthy()
        expect(urlLi?.textContent).not.toContain('https://')
        const links=[...urlLi!.querySelectorAll<HTMLAnchorElement>('a')]
        expect(links[0].href).not.toBe(links[1].href)
        expect(links[1].textContent).toContain('관련 자료 2')
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
      expect(el.querySelector('.evidence-card')?.textContent).toContain('자료에 기재된 내용')
    }finally{await act(async()=>root.unmount())}
  })
  it('labels official supplementary episodes and fan summaries without inventing manga verification',async()=>{
    const el=document.createElement('div'),root=createRoot(el)
    try{
      await act(async()=>root.render(<div>
        <SourceCitation sourceType="supplementary" reference="TV 325" description="https://one-piece.com/anime/325/index.html"/>
        <SourceCitation label="원작 587화 (팬 해설 · 1차 원문 전체 미열람)" reference="https://onepiece.fandom.com/wiki/Chapter_587"/>
        <SourceCitation sourceType="canon" reference="One Piece Manga Chapter 574"/>
        <SourceCitation reference="알 수 없는 내부 기록"/>
      </div>))
      const sources=[...el.querySelectorAll('.source-citation')]
      expect(sources[0].textContent).toContain('공식 애니메이션 보조 자료')
      expect(sources[0].querySelector('a')?.textContent).toBe('공식 회차 자료 보기 ↗')
      expect(sources[1].textContent).toContain('비공식 해설')
      expect(sources[1].textContent).toContain('1차 원문 전체 미열람')
      expect(sources[1].querySelector('a')?.textContent).toBe('팬 해설 보기 ↗')
      expect(sources[2].textContent).toContain('원작 회차 참조')
      expect(sources[2].querySelector('a')).toBeNull()
      expect(sources[3].textContent).toContain('자료 유형 미확인')
      expect(sources[3].querySelector('a')).toBeNull()
    }finally{await act(async()=>root.unmount())}
  })

})
