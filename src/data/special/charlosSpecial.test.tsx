// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { charlosMemeStats, charlosSpecialOverall, charlosTruthLines, charlosTruthMonologue, CHARLOS_ID,
  charlosCharacter, charlosMembership, celestialDragonGroup } from './charlosSpecial'
import { characterRepository } from '../repositories/characterRepository'
import { groupRepository } from '../repositories/groupRepository'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { matchupRepository } from '../repositories/matchupRepository'
import { getUniqueCharacterList } from '../../application/getCharacterList'
import { getStatRanking } from '../../application/getStatRanking'
import { getOrganizationChart } from '../../application/getOrganizationChart'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getCharacterPortraitAsset } from '../media/characterPortraits'
import { CharlosSpecialPage } from '../../ui/pages/CharlosSpecialPage'
import { versionManifest } from '../integrity/versionManifest'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { balancedV12 } from '../sample/calculationModels'

describe('v0.4.17 Charlos deliberately separate parody cohort', () => {
  it('contains exactly seven distinct, 0..100 meme axes and calculates 611/7', () => {
    expect(charlosMemeStats.map(s=>[s.label,s.score])).toEqual([
      ['총질력',23],['맷집력',97],['배포력',100],['지배력',99],
      ['기동력',92],['인정력',100],['어그로력',100],
    ])
    expect(new Set(charlosMemeStats.map(s=>s.id)).size).toBe(7)
    expect(charlosMemeStats.every(s=>s.score>=0 && s.score<=100 &&
      s.line.endsWith('다이.') && s.fact.endsWith('다이.') &&
      s.satire.endsWith('다이.') && s.sourceUrl.startsWith('https://one-piece.com/'))).toBe(true)
    expect(charlosSpecialOverall).toBeCloseTo(611/7,12)
  })

  it('keeps the approved Charlos quips consistent without repeating the finger punchline', () => {
    const gun = charlosMemeStats.find(stat => stat.id === 'gun')
    const toughness = charlosMemeStats.find(stat => stat.id === 'toughness')
    const mobility = charlosMemeStats.find(stat => stat.id === 'mobility')
    expect(gun?.fact).toBe('샤본디에서 하찌에게 내가 직접 총을 쐈다이.')
    expect(gun?.satire).toBe('맨주먹으로 시비를 거는 건 품위가 없는 거다이. 고귀한 손가락 하나면 충분하다이.')
    expect(((gun?.fact ?? '') + (gun?.satire ?? '')).split('고귀한 손가락').length - 1).toBe(1)
    expect(toughness?.satire).toBe('무수한 구타 후에도 다시 등장했다이. 위대한 귀족의 생명력은 쉽게 꺼지지 않는 거다이.')
    expect(mobility?.satire).toBe('발을 쓰면 신발이 닳는다이. 내 신발은 귀하니 인간들이 대신 걷는 거다이.')
  })

  it('registers 82 people, new subordinate noble group, no fake Balanced assessment', () => {
    expect(charlosCharacter.id).toBe(CHARLOS_ID)
    // Presentation name is page-local; stable master data/search keys must not change.
    expect(charlosCharacter.name).toBe('차를로스 성')
    expect(charlosMembership.groupId).toBe('celestial-dragons')
    expect(celestialDragonGroup.parentGroupId).toBe('world-government')
    expect(characterRepository.getCharacters()).toHaveLength(83)
    expect(getUniqueCharacterList()).toHaveLength(83)
    expect(groupRepository.getGroup('celestial-dragons')?.name).toBe('천룡인')
    expect(getOrganizationChart('celestial-dragons','all')?.count).toBe(1)
    expect(getOrganizationChart('world-government','all')?.sections.some(s=>s.group.id==='celestial-dragons')).toBe(true)
    expect(evaluationRepository.getEvaluations(CHARLOS_ID)).toHaveLength(0)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(matchupRepository.getAllMatchups().every(m=>!JSON.stringify(m).includes(CHARLOS_ID))).toBe(true)
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
    expect(versionManifest.appVersion).toBe('0.4.26')
  })

  it('inserts ONE meme overall result without changing original 81 numeric results', () => {
    const ranks=getStatRanking('overall')
    const special=ranks.filter(e=>e.characterId===CHARLOS_ID)
    expect(ranks).toHaveLength(83)
    expect(special).toHaveLength(1)
    expect(special[0].specialEvaluation).toBe(true)
    expect(special[0].score).toBe(charlosSpecialOverall)
    expect(special[0].groupId).toBe('celestial-dragons')
    for(const stat of COMBAT_STATS){
      const rows=getStatRanking(stat)
      expect(rows).toHaveLength(82)
      expect(rows.find(e=>e.characterId===CHARLOS_ID)).toBeUndefined()
    }
    const withoutParody=ranks.filter(e=>e.characterId!==CHARLOS_ID)
    expect(withoutParody).toHaveLength(82)
    expect(withoutParody.every(e=>!e.specialEvaluation)).toBe(true)
    const audit=buildV050ReadOnlyAudit()
    expect(audit.integrity.errors).toEqual([])
    expect(audit.counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:86,axes:602,memberships:107,matchups:18})
    expect(v050CurrentDataset.evaluations.map(e=>e.items.map(i=>i.score))).toHaveLength(86)
  })

  it('retains exact user-image assets and delivers an in-universe special UI without explaining its jokes', () => {
    expect(getCharacterPortraitAsset(CHARLOS_ID)?.fileName).toBe('charlos-v0418.webp')
    const html=renderToStaticMarkup(<CharlosSpecialPage onSelectOverall={()=>{}}/>)
    expect(html).toContain('호를로스 성')
    const headingMarkup = document.createElement('div')
    headingMarkup.innerHTML = html
    const heading = headingMarkup.querySelector('.detail-heading.charlos-heading')
    expect(heading).not.toBeNull()
    expect(heading?.querySelector('.detail-heading-profile .character-portrait-large')).not.toBeNull()
    expect(heading?.querySelector('.detail-heading-profile .character-identity')).not.toBeNull()
    expect(heading?.querySelector('.detail-heading-profile h1')?.textContent).toBe('로즈워드 차를로스 성')
    expect(heading?.querySelector('.portrait-zoom-trigger')?.getAttribute('aria-label')).toBe('로즈워드 차를로스 성 이미지 확대 보기')
    expect(heading?.querySelector('.charlos-heading-copy .charlos-known-as .charlos-alias-badge')).not.toBeNull()
    const standardQuote = heading?.querySelector('.character-quote.charlos-meme-quote')
    expect(standardQuote?.parentElement).toBe(heading)
    expect(standardQuote?.querySelector('.character-quote-eyebrow')?.textContent).toBe('대표 명대사')
    expect(standardQuote?.querySelector('blockquote')?.textContent).toContain('5억 베리이~~~~!!!')
    expect(standardQuote?.querySelector('figcaption')?.textContent).toBe('원피스 51권')
    expect(heading?.querySelector('.charlos-eyebrow')).toBeNull()
    const nobleIcon=heading?.querySelector('.character-identity .identity-mark svg')
    expect(nobleIcon?.getAttribute('aria-label')).toContain('천룡의 발굽')
    expect(heading?.querySelector('.character-identity .identity-mark')?.textContent).not.toContain('◆')
    expect(html).toContain('class="charlos-alias-badge"')
    expect(html).toContain('class="charlos-alias-star"')
    expect(html).toContain('class="charlos-intro-description"')
    expect(html).toContain('세계귀족의 위상은 평범한 전투력으로 설명할 수 없다이.')
    expect(html).toContain('내 평가는 내가 정하는 거다이.')
    expect(charlosMemeStats.find(s=>s.id==='mobility')?.fact)
      .toBe('샤본디에서 내가 직접 걸을 이유가 없다이. 인간들이 알아서 나를 태우고 움직여주면 되는 거다이.')
    expect(charlosMemeStats.find(s=>s.id==='humanity')?.fact)
      .toBe('케이미도 시라호시도 내 곁에 두고 싶었던 거다이. 소중한 인간들을 남에게 맡길 수는 없는 거다이.')
    expect(html).toContain('5억 베리이~~~~!!! 5억에 사겠다이~~!!!')
    expect(html).toContain('원피스 51권')
    expect(html).toContain('부산의 또 다른 자아')
    expect(html).not.toContain('부산 고신대 의대의 또 다른 차를로스 성')
    const element = document.createElement('div')
    element.innerHTML = html
    const badge = element.querySelector('.charlos-alias-badge')
    expect(badge?.querySelector('.charlos-alias-title')?.textContent).toBe('*호를로스 성')
    expect(badge?.querySelector('.charlos-alias-subtitle')?.textContent).toBe('부산의 또 다른 자아')
    expect(element.querySelector('.charlos-alias-lore')).toBeNull()
    expect(element.querySelectorAll('.charlos-alias-badge')).toHaveLength(1)
    expect(html).toContain('87.3')
    expect(html).toContain('진실')
    expect(html).toContain('총질력')
    expect(html).toContain('세계귀족 특별 전형')
    expect(html).toContain('images/characters/charlos-v0418.webp')
    expect(html).toContain('주요 업적')
    expect(html).toContain('위대한 업적이 펼쳐진다이.')
    expect(html).not.toContain('프로젝트 특별 별칭')
    expect(html).not.toContain('프로젝트 창작 패러디 · 공식 원작 대사 아님')
    expect(html).not.toContain('천룡인 전용 밈 7축 평균 · 오버롤 포함')
    expect(html).not.toContain('풍자 점수다이')
    expect(html).not.toContain('인정력’은 실제 인간성과 정반대인 반어다이')
    expect(html).not.toContain('완전한 반어다이')
    expect(charlosMemeStats.find(s=>s.id==='humanity')?.satire)
      .toBe('인간 하나하나가 너무 소중하다이. 그러니 단 한 명도 내 곁을 떠나게 할 수 없는 거다이.')
  })

  it('opens the secret modal without a punchline explanation and closes via Escape', async () => {
    (globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT:boolean}).IS_REACT_ACT_ENVIRONMENT=true
    const host=document.createElement('div')
    document.body.appendChild(host)
    const root=createRoot(host)
    try{
      await act(async()=>{root.render(<CharlosSpecialPage onSelectOverall={()=>{}}/>)})
      const btn=host.querySelector<HTMLButtonElement>('.charlos-truth-trigger')
      expect(btn).not.toBeNull()
      await act(async()=>{btn!.click()})
      const modal=document.querySelector('[role="dialog"][aria-labelledby="charlos-truth-title"]')
      const expected = [
        '서.. 설득할 시간 없다이!!',
        '한명이라도 더 많이 노예로 만들어야한다이!!',
        '이런.. 이런곳에서 사냥당해 죽지말라이..!!',
      ]
      expect(charlosTruthMonologue).toEqual(expected)
      const lines = Array.from(modal?.querySelectorAll<HTMLElement>('.charlos-truth-line') ?? [])
        .map(line => line.textContent)
      expect(lines).toEqual(expected)
      // Restore the complete last-approved pre-truncation narrative, then
      // insert the three new lines together rather than replacing any prose.
      expect(charlosTruthLines).toEqual([
        '그는 알고 있었다이. 끝까지 고개를 들고 저항하는 이들이 얼마나 쉽게 쓰러지는지 말이다이.',
        '그래서 결심했다이. 모든 미움을 자신에게 모으고 악인을 연기하기로 말이다이.',
        '세상은 그가 인간을 사고팔았다고 비난했다이. 하지만 그의 가슴에 품어진 인간애는 5억 베리보다 뜨거웠다이.',
        '5억 베리는 거래가 아니었다이. 말로는 다 표현할 수 없는 사랑의 무게였다이.',
        '그가 맞을 때마다 세상은 조금씩 움직였다이. 그것이 자신이 선택한 성자의 길이었다이.',
      ])
      const expanded=modal?.querySelector('.charlos-truth-reveal')?.textContent ?? ''
      for(const line of charlosTruthLines) expect(expanded).toContain(line)
      expect(expanded).toContain('인류의 구원자')
      expect(expanded).toContain('일어나 죽지 말고,엎드려 사는 거다이.')
      expect(expanded).toContain('악마다이…!!')
      expect(expanded).toContain('갈링 성을 본 그는 마지막으로 중얼거렸다이. “악마다이…!!”')
      expect(expanded).toContain('인류가 이해하지 못한 마지막 성자다이.')
      expect(modal?.querySelectorAll('.charlos-truth-quote')).toHaveLength(1)
      expect(modal?.querySelectorAll('.charlos-truth-rescue')).toHaveLength(1)
      expect(modal?.querySelectorAll('.charlos-truth-figure img')).toHaveLength(1)
      expect(modal?.querySelector('.charlos-truth-rescue')?.textContent).toBe(expected.join(''))
      const firstRescue=expanded.indexOf(expected[0])
      expect(firstRescue).toBeGreaterThan(expanded.indexOf(charlosTruthLines[4]))
      expect(firstRescue).toBeLessThan(expanded.indexOf('악마다이…!!'))
      expect(expanded).not.toContain('전부 프로젝트가 창작한 반어적 풍자')
      expect(modal?.querySelector('img')?.getAttribute('src')).toContain('charlos-truth-v0418.webp')
      expect(document.body.style.overflow).toBe('hidden')
      await act(async()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))})
      expect(document.querySelector('#charlos-truth-title')).toBeNull()
      expect(document.body.style.overflow).not.toBe('hidden')
    } finally {
      await act(async()=>{root.unmount()})
      host.remove()
    }
  })
})
