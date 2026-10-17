// @vitest-environment jsdom
import { describe,it,expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CharacterPage } from './CharacterPage'
import { getCombatPower } from '../../application/getCombatPower'

function renderHeader(characterId:string,groupId:string,selectedStateId?:string) {
  const html=renderToStaticMarkup(<CharacterPage characterId={characterId} groupId={groupId}
    selectedStateId={selectedStateId} onSelectStat={()=>{}} onCompareStat={()=>{}}
    onSelectOverall={()=>{}} />)
  const page=document.createElement('div')
  page.innerHTML=html
  return page
}
describe('v0.4.25 transparent Overall typography in regular character header',()=>{
  it('moves a single clickable Overall score from the old panel next to the name and keeps the disclosure',()=>{
    const page=renderHeader('newgate','whitebeard-pirates')
    const heading=page.querySelector('.detail-heading')!
    const tile=heading.querySelector('.overall-heading-block')!
    const button=tile.querySelector<HTMLButtonElement>('.power-card-heading')!
    const score=getCombatPower('newgate').finalScore.toFixed(1)
    expect(heading.querySelector('h1')?.textContent).toContain('에드워드 뉴게이트')
    expect(button.textContent).toContain(score)
    expect(button.textContent).toContain('균형형 · 7축 평균')
    expect(button.getAttribute('aria-label')).toBe('종합 전투력 전체 캐릭터 순위 보기')
    expect(tile.querySelector('[data-testid="overall-interpretation-note"]')?.textContent)
      .toContain('패기 가중치')
    expect(heading.querySelector('.character-quote')).not.toBeNull()
    expect(page.querySelector('.score-overview .power-card')).toBeNull()
    expect(page.querySelectorAll('.power-card-heading')).toHaveLength(1)
    expect(page.querySelectorAll('.stat-bar-row')).toHaveLength(7)
    expect(page.querySelectorAll('.stat-compare-trigger')).toHaveLength(7)
  })
  it('keeps selected evaluation-state calculations linked to the relocated score without duplicating the tile',()=>{
    for(const state of ['prime','current']){
      const page=renderHeader('garp','marines',state)
      const button=page.querySelector<HTMLButtonElement>('.detail-heading .power-card-heading')!
      const value=getCombatPower('garp','balanced',state).finalScore.toFixed(1)
      expect(button.textContent).toContain(value)
      expect(page.querySelectorAll('.power-card')).toHaveLength(1)
    }
  })
  it('keeps the Magellan image and confirmed 86.0 Overall visible in the common header',()=>{
    const page=renderHeader('magellan','impel-down')
    expect(page.querySelector<HTMLImageElement>('.detail-heading img')?.getAttribute('src'))
      .toContain('magellan-v0422.png')
    expect(page.querySelector('.detail-heading .power-card-heading')?.textContent).toContain('86.0')
    expect(page.querySelectorAll('.stat-bar-row')).toHaveLength(7)
  })
  it('leaves Charlos one-character special route and data out of the common header',()=>{
    const page=renderHeader('kaido','beasts-pirates')
    expect(page.querySelector('.detail-heading')?.getAttribute('style')).toContain('--identity-accent:#65547c')
    expect(page.querySelector('.detail-heading .power-card-heading')).not.toBeNull()
  })
})
