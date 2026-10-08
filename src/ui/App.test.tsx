// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'

let container: HTMLDivElement
let root: Root

const click = async (element: Element | null) => {
  if (!(element instanceof HTMLElement)) throw new Error('Expected clickable UI element.')
  await act(async () => { element.click() })
}

beforeEach(async () => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  await act(async () => { root.render(<App />) })
})

afterEach(async () => {
  await act(async () => { root.unmount() })
  container.remove()
})

describe('evaluated roster UI', () => {
  it('opens newly added groups without the legacy crew lookup crash', async () => {
    for (const [group, character] of [
      ['밀짚모자 일당', '조로'],
      ['빨간 머리 해적단', '샹크스'],
      ['해군', '몽키 D. 가프'],
      ['검은 수염 해적단', '마샬 D. 티치'],
      ['왕의 부하 칠무해', '트라팔가 로'],
    ]) {
      const tab = [...container.querySelectorAll('.crew-tab')].find((el) => el.textContent === group)
      await click(tab ?? null)
      expect(container.querySelector('main.detail h1')?.textContent).toBe(character)
      expect(container.querySelector('.prototype-note')?.textContent).toContain('evaluation-')
      expect(container.querySelector('.power-card')?.textContent).toContain('Balanced')
    }
  })

  it('opens sorted 27-person stat ranking and navigates to a chosen group', async () => {
    const stat = container.querySelector('button[aria-label="Attack / 공격력 전체 캐릭터 순위 보기"]')
    await click(stat)
    const rows = [...document.querySelectorAll('.rank-row')]
    expect(rows).toHaveLength(27)
    expect(rows[0].textContent).toContain('몽키 D. 가프')
    expect(rows[0].textContent).toContain('99')
    const shanks = rows.find((row) => row.textContent?.includes('샹크스'))
    await click(shanks ?? null)
    expect(document.querySelector('.stat-rank-dialog')).toBeNull()
    expect(container.querySelector('main.detail h1')?.textContent).toBe('샹크스')
    expect(container.querySelector('.crew-tab.selected')?.textContent).toBe('빨간 머리 해적단')
  })

  it('shows formulas for all seven stats and switches between compact detail tabs', async () => {
    const formula = container.querySelectorAll('.evaluation-formula')
    expect(formula).toHaveLength(7)
    expect(formula[0].textContent).toMatch(/Base \d+ \+ Haki \(\d+ × 0.5 = \d+\) = Final \d+\/100/)
    await click(container.querySelector('#battle-tab'))
    expect(container.querySelector('.battle-timeline')).not.toBeNull()
    expect(container.querySelector('.evaluation-trace-list')).toBeNull()
    await click(container.querySelector('#evaluation-tab'))
    expect(container.querySelectorAll('.evaluation-formula')).toHaveLength(7)
  })
  it('opens Overall rankings in full-precision order and reverses the list without changing canonical ranks', async () => {
    await click(container.querySelector('button[aria-label="Overall Combat Power 전체 캐릭터 순위 보기"]'))
    const rows = () => [...document.querySelectorAll('.rank-row')]
    expect(rows()).toHaveLength(27)
    expect(document.querySelector('#stat-rank-title')?.textContent).toContain('Overall Combat Power')
    expect(rows()[0].textContent).toContain('몽키 D. 가프')
    expect(rows()[0].textContent).toContain('94.429')
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    expect(rows()[0].textContent).toContain('아발로 피사로')
    expect(rows()[0].textContent).toContain('27위')
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    expect(rows()[0].textContent).toContain('몽키 D. 가프')
  })

  it('can change existing core-stat rankings to ascending', async () => {
    await click(container.querySelector('button[aria-label="Attack / 공격력 전체 캐릭터 순위 보기"]'))
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    const rows = [...document.querySelectorAll('.rank-row')]
    expect(rows).toHaveLength(27)
    expect(rows[0].textContent).not.toContain('몽키 D. 가프')
  })

  it('searches across groups with a live suggestion list and navigates by result', async () => {
    const input = container.querySelector('#character-search-input') as HTMLInputElement
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
      setter?.call(input, '샹')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(container.querySelectorAll('.search-suggestion')).toHaveLength(1)
    expect(container.querySelector('.search-suggestion')?.textContent).toContain('샹크스')
    await click(container.querySelector('.search-suggestion'))
    expect(container.querySelector('main.detail h1')?.textContent).toBe('샹크스')
    expect(container.querySelector('.crew-tab.selected')?.textContent).toBe('빨간 머리 해적단')
  })

  it('opens small Special combat help and keeps individual evidence counts out of trait cards', async () => {
    const tab = [...container.querySelectorAll('.crew-tab')].find((el) => el.textContent === '검은 수염 해적단')
    await click(tab ?? null)
    const summary = container.querySelector('summary[aria-label="특수 전투요소 Evidence 및 점수 반영 설명"]')
    expect(summary).not.toBeNull()
    await click(summary)
    const bubble = container.querySelector('.special-help-bubble')
    expect(bubble?.textContent).toContain('연결 Evidence 1건')
    expect(bubble?.textContent).toContain('Overall에 직접 가산하지 않아')
    expect(container.querySelector('.special-trait')?.textContent).not.toContain('Overall 직접 가산 없음')
  })

})
