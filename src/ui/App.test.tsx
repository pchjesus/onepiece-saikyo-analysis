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
      ['밀짚모자 일당', '롤로노아 조로'],
      ['빨간 머리 해적단', '샹크스'],
      ['해군', '몽키 D. 가프'],
      ['검은 수염 해적단', '마샬 D. 티치'],
      ['왕의 부하 칠무해', '트라팔가 로'],
      ['크로스 길드', '쥬라큘 미호크'],
    ]) {
      const tab = [...container.querySelectorAll('.crew-tab')].find((el) => el.textContent === group)
      await click(tab ?? null)
      expect(container.querySelector('main.detail h1')?.textContent).toBe(character)
      expect(container.querySelector('.prototype-note')?.textContent).toContain('evaluation-')
      expect(container.querySelector('.power-card')?.textContent).toContain('Balanced')
    }
  })

  it('opens sorted 29-person stat ranking and navigates to a chosen group', async () => {
    const stat = container.querySelector('button[aria-label="Attack / 공격력 전체 캐릭터 순위 보기"]')
    await click(stat)
    const rows = [...document.querySelectorAll('.rank-row')]
    expect(rows).toHaveLength(29)
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
    expect(rows()).toHaveLength(29)
    expect(document.querySelector('#stat-rank-title')?.textContent).toContain('Overall Combat Power')
    expect(rows()[0].textContent).toContain('몽키 D. 가프')
    expect(rows()[0].textContent).toContain('96')
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    expect(rows()[0].textContent).toContain('아발로 피사로')
    expect(rows()[0].textContent).toContain('29위')
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    expect(rows()[0].textContent).toContain('몽키 D. 가프')
  })

  it('can change existing core-stat rankings to ascending', async () => {
    await click(container.querySelector('button[aria-label="Attack / 공격력 전체 캐릭터 순위 보기"]'))
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    const rows = [...document.querySelectorAll('.rank-row')]
    expect(rows).toHaveLength(29)
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

  it('searches official aliases while displaying the primary name', async () => {
    const input = container.querySelector('#character-search-input') as HTMLInputElement
    const search = async (value: string) => {
      await act(async () => {
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        setter?.call(input, value)
        input.dispatchEvent(new Event('input', { bubbles: true }))
      })
    }

    await search('키자루')
    expect(container.querySelector('.search-suggestion')?.textContent).toContain('보르살리노')
    expect(container.querySelector('.search-suggestion')?.textContent).toContain('키자루')
    await click(container.querySelector('.search-suggestion'))
    expect(container.querySelector('main.detail h1')?.textContent).toBe('보르살리노')

    await search('아카이누')
    expect(container.querySelector('.search-suggestion')?.textContent).toContain('사카즈키')
    await click(container.querySelector('.search-suggestion'))
    expect(container.querySelector('main.detail h1')?.textContent).toBe('사카즈키')
  })

  it('shows official identity metadata and the selected evaluation era in the intro', async () => {
    const marineTab = [...container.querySelectorAll('.crew-tab')].find((el) => el.textContent === '해군')
    await click(marineTab ?? null)
    expect(container.querySelector('main.detail h1')?.textContent).toBe('몽키 D. 가프')
    expect(container.querySelector('.character-known-as')?.textContent).toContain('해군의 영웅')
    expect(container.querySelector('.evaluation-subject-state')?.textContent).toContain('평가 시점 · 전성기')
  })

  it('switches Garp between Prime and current evaluations without duplicating the character', async () => {
    const marineTab = [...container.querySelectorAll('.crew-tab')].find((el) => el.textContent === '해군')
    await click(marineTab ?? null)

    const stateButtons = () => [...container.querySelectorAll('.evaluation-state-switcher button')]
    expect(stateButtons().map((button) => button.textContent)).toEqual(['전성기', '현재'])
    expect(container.querySelector('.power-card strong')?.textContent).toContain('97.4')

    await click(stateButtons().find((button) => button.textContent === '현재') ?? null)
    expect(container.querySelector('main.detail h1')?.textContent).toBe('몽키 D. 가프')
    expect(container.querySelector('.evaluation-subject-state')?.textContent).toContain('평가 시점 · 현재')
    expect(container.querySelector('.power-card strong')?.textContent).toContain('93.7')
    expect(container.querySelector('.evaluation-trace-card')?.textContent).toContain('Final 94/100')

    await click(stateButtons().find((button) => button.textContent === '전성기') ?? null)
    expect(container.querySelector('.power-card strong')?.textContent).toContain('97.4')
  })

  it('normalizes character names to Korean canonical display names in analysis prose', async () => {
    expect(container.querySelector('.evaluation-trace-list')?.textContent).toContain('샬롯 카타쿠리')
    expect(container.querySelector('.evaluation-trace-list')?.textContent).not.toContain('Katakuri')

    const marineTab = [...container.querySelectorAll('.crew-tab')].find((el) => el.textContent === '해군')
    await click(marineTab ?? null)
    await click(container.querySelector('#battle-tab'))
    const battleText = container.querySelector('.detail-tab-content')?.textContent ?? ''
    expect(battleText).toContain('몽키 D. 가프')
    expect(battleText).toContain('코비')
    expect(battleText).not.toMatch(/\bGarp\b|\bKoby\b/)
  })

  it('shows matchup prototypes in a third detail tab and respects Garp evaluation state', async () => {
    expect(container.querySelector('#matchup-tab')).not.toBeNull()
    await click(container.querySelector('#matchup-tab'))
    expect(container.querySelector('.matchup-section')?.textContent).toContain('알베르')
    expect(container.querySelector('.matchup-section')?.textContent).toContain('승률이나 고정 상성 보너스를 계산하지 않습니다')

    const marineTab = [...container.querySelectorAll('.crew-tab')].find((el) => el.textContent === '해군')
    await click(marineTab ?? null)
    await click(container.querySelector('#matchup-tab'))
    expect(container.querySelector('.matchup-section')?.textContent).toContain('연결된 매치업 분석이 없습니다')

    const current = [...container.querySelectorAll('.evaluation-state-switcher button')].find((button) => button.textContent === '현재')
    await click(current ?? null)
    expect(container.querySelector('.matchup-section')?.textContent).toContain('쿠잔')
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
