// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, it, expect, vi } from 'vitest'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { getCharacterAccent } from './CharacterIdentity'
import { StatList, radarPoint } from './StatList'
import { evaluationRepository } from '../../data/repositories/evaluationRepository'
import { CharacterPage } from '../pages/CharacterPage'
import { renderToStaticMarkup } from 'react-dom/server'

describe('v0.4.23 group-accent 7-axis radar redesign', () => {
  it('draws a bounded seven-axis data polygon without changing source scores', () => {
    expect(radarPoint(0, 0)).toEqual([160, 160])
    const [topX, topY] = radarPoint(0, 100)
    expect(topX).toBeCloseTo(160)
    expect(topY).toBeCloseTo(53)
    expect(radarPoint(0, -10)).toEqual([160, 160])
    expect(radarPoint(0, 200)[1]).toBeCloseTo(53)
    for (let axis = 0; axis < 7; axis++) {
      const [x, y] = radarPoint(axis, 100)
      expect(x).toBeGreaterThanOrEqual(53)
      expect(x).toBeLessThanOrEqual(267)
      expect(y).toBeGreaterThanOrEqual(53)
      expect(y).toBeLessThanOrEqual(267)
    }
    const source = evaluationRepository.getEvaluation('kaido')!
    const savedScores = source.items.map(item => item.score)
    const markup = renderToStaticMarkup(<StatList items={source.items} hakiWeight={0.5} accent={getCharacterAccent('beasts-pirates','kaido')}
      onSelectStat={()=>{}} onCompareStat={()=>{}} />)
    expect(markup).toContain('--stat-chart-accent:#65547c')
    expect(markup).toContain('aria-label="7축 전투 스탯 그래프:')
    expect((markup.match(/class="radar-value-dot"/g) || [])).toHaveLength(7)
    expect((markup.match(/class="radar-axis-index"/g) || [])).toHaveLength(7)
    expect((markup.match(/class="radar-ring/g) || [])).toHaveLength(5)
    expect((markup.match(/class="stat-rank-trigger"/g) || [])).toHaveLength(7)
    expect((markup.match(/class="stat-compare-trigger"/g) || [])).toHaveLength(7)
    expect((markup.match(/class="stat-info-button"/g) || [])).toHaveLength(7)
    expect(evaluationRepository.getEvaluation('kaido')!.items.map(item => item.score)).toEqual(savedScores)
  })

  it('keeps ranking, comparison and ? explanation as distinct working actions', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    const onSelectStat = vi.fn()
    const onCompareStat = vi.fn()
    const source = evaluationRepository.getEvaluation('magellan')!
    try {
      await act(async () => root.render(<StatList items={source.items} hakiWeight={0.5}
        accent="#446f92" onSelectStat={onSelectStat} onCompareStat={onCompareStat} />))
      const rank = container.querySelectorAll<HTMLButtonElement>('.stat-rank-trigger')
      const compare = container.querySelectorAll<HTMLButtonElement>('.stat-compare-trigger')
      expect(rank).toHaveLength(7)
      expect(compare).toHaveLength(7)
      await act(async () => rank[0].click())
      await act(async () => compare[4].click())
      expect(onSelectStat).toHaveBeenCalledWith('attack')
      expect(onCompareStat).toHaveBeenCalledWith('techniqueMastery')
      expect(container.querySelector('svg')?.getAttribute('aria-label')).toContain('공격력 92점')
      await act(async () => container.querySelector<HTMLButtonElement>('.stat-info-button')?.click())
      expect(document.querySelector('[role="dialog"]')?.textContent).toContain('공격력')
      await act(async () => container.querySelector<HTMLButtonElement>('.stat-info-close')?.click())
      expect(document.querySelector('[role="dialog"]')).toBeNull()
    } finally {
      await act(async () => root.unmount())
      container.remove()
    }
  })

  it('uses existing navy and admiral accents, and keeps the Charlos joke screen separate', () => {
    expect(getCharacterAccent('marines','koby')).toBe('#446f92')
    expect(getCharacterAccent('marines','akainu')).toBe('#ac4c43')
    expect(getCharacterAccent('big-mom-pirates','linlin')).toBe('#995c7c')
    const kaido = renderToStaticMarkup(<CharacterPage characterId="kaido" groupId="beasts-pirates"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
    expect(kaido).toContain('stat-radar-layout')
    expect(kaido).toContain('--stat-chart-accent:#65547c')
    expect(kaido).toContain('7축 전투 스탯 그래프')
    expect(COMBAT_STATS).toHaveLength(7)
  })
})
