// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { StatList } from './StatList'
import { evaluationRepository } from '../../data/repositories/evaluationRepository'
import { getCharacterAccent } from './CharacterIdentity'

let host: HTMLDivElement
let root: Root
beforeEach(()=>{
  ;(globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT:boolean}).IS_REACT_ACT_ENVIRONMENT=true
  host=document.createElement('div')
  document.body.appendChild(host)
  root=createRoot(host)
})
afterEach(async()=>{
  await act(async()=>{root.unmount()})
  host.remove()
})
async function press(selector:string){
  const button=host.querySelector<HTMLButtonElement>(selector)
  expect(button,selector).not.toBeNull()
  await act(async()=>{button!.click()})
}
describe('v0.4.23 group-color horizontal seven-stat chart',()=>{
  it('renders seven numbered horizontal bars with the actual final score and no radar canvas',async()=>{
    const evaluation=evaluationRepository.getEvaluation('kaido')!
    const accent=getCharacterAccent('beasts-pirates','kaido')
    await act(async()=>{root.render(<StatList items={evaluation.items} hakiWeight={.5} accent={accent}
      onSelectStat={()=>{}} onCompareStat={()=>{}} />)})
    const chart=host.querySelector<HTMLElement>('.stat-bar-list')!
    expect(chart).not.toBeNull()
    expect(chart.style.getPropertyValue('--stat-chart-accent')).toBe('#65547c')
    expect(host.querySelectorAll('.stat-bar-row')).toHaveLength(7)
    expect(host.querySelectorAll('.stat-bar-meter')).toHaveLength(7)
    expect(host.querySelectorAll('.stat-bar-fill')).toHaveLength(7)
    expect(host.querySelectorAll('.stat-rank-trigger')).toHaveLength(7)
    expect(host.querySelectorAll('.stat-compare-trigger')).toHaveLength(7)
    expect(host.querySelectorAll('.stat-info-button')).toHaveLength(7)
    expect(host.querySelector('svg')).toBeNull()
    for(const [i,item] of evaluation.items.entries()){
      const row=host.querySelectorAll<HTMLElement>('.stat-bar-row')[i]
      expect(row.querySelector('.stat-axis-number')?.textContent).toBe(String(i+1).padStart(2,'0'))
      expect(row.querySelector('.stat-score strong')?.textContent).toBe(String(item.score))
      expect(row.querySelector<HTMLElement>('.stat-bar-fill')?.style.width).toBe(item.score+'%')
      expect(row.querySelector('.stat-bar-meter')?.getAttribute('aria-valuenow')).toBe(String(item.score))
      expect(row.querySelector<HTMLButtonElement>('.stat-compare-trigger')?.type).toBe('button')
    }
    expect(host.textContent).toContain('기본점수 95 + 패기 3')
  })
  it('retains rank, same-stat comparison and ? dialogs without altering the evaluation',async()=>{
    const rank=vi.fn(),compare=vi.fn()
    const evaluation=evaluationRepository.getEvaluation('kizaru')!
    const original=evaluation.items.map(({stat,score})=>({stat,score}))
    await act(async()=>{root.render(<StatList items={evaluation.items} hakiWeight={.5}
      accent={getCharacterAccent('marines','kizaru')} onSelectStat={rank} onCompareStat={compare}/>)})
    expect(host.querySelector<HTMLElement>('.stat-bar-list')?.style.getPropertyValue('--stat-chart-accent')).toBe('#ab883b')
    await press('.stat-rank-trigger')
    expect(rank).toHaveBeenCalledWith(evaluation.items[0].stat)
    await press('.stat-compare-trigger')
    expect(compare).toHaveBeenCalledWith(evaluation.items[0].stat)
    await press('.stat-info-button')
    expect(host.textContent).toContain('공격력')
    expect(host.querySelector('[role="dialog"]')).not.toBeNull()
    expect(evaluation.items.map(({stat,score})=>({stat,score}))).toEqual(original)
  })
  it('uses marine blue for ordinary marines and no score-dependent color',()=>{
    expect(getCharacterAccent('marines','smoker')).toBe('#446f92')
    expect(getCharacterAccent('beasts-pirates','king')).toBe('#65547c')
    expect(getCharacterAccent('celestial-dragons','charlos')).toBe('#b18a42')
  })
})
