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

const selectGroup = async (name: string) => {
  const select = container.querySelector<HTMLSelectElement>('#group-picker-select')
  if (!select) throw new Error('Group selector not found')
  const option = [...select.options].find((item) => item.textContent === name)
  if (!option) throw new Error('Unknown group: ' + name)
  await act(async () => {
    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set
    setter?.call(select, option.value)
    select.dispatchEvent(new Event('change', { bubbles: true }))
  })
}
const selectedGroupName = () => container.querySelector<HTMLSelectElement>('#group-picker-select')?.selectedOptions[0]?.textContent
const openPicker = async () => click(container.querySelector('.open-character-picker'))

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
  it('shows exactly 59 unique results and filters historical Tobi Roppo membership without duplication', async () => {
    await openPicker()
    expect(container.querySelectorAll('.character-picker-option')).toHaveLength(59)
    const filter = container.querySelector<HTMLSelectElement>('#character-picker-group')!
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set
      setter?.call(filter, 'tobiroppo')
      filter.dispatchEvent(new Event('change', { bubbles: true }))
    })
    expect(container.querySelectorAll('.character-picker-option')).toHaveLength(6)
    const drake = [...container.querySelectorAll('.character-picker-option')].find(x => x.textContent?.includes('X 드레이크'))
    expect(drake?.textContent).toContain('과거 소속')
    await click(drake ?? null)
    expect(container.querySelector('main.detail h1')?.textContent).toBe('X 드레이크')
    expect(selectedGroupName()).toBe('토비롯포')
    expect(container.querySelector('[role="dialog"][aria-modal="true"]')).toBeNull()
    await openPicker()
    expect(container.querySelectorAll('.character-picker-option')).toHaveLength(59)
  })

  it('restores trigger focus when closing with Escape and keeps unrelated evaluation data intact', async () => {
    await openPicker()
    expect(container.querySelector('#character-picker-search')).toBe(document.activeElement)
    await act(async () => {
      document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    })
    expect(container.querySelector('[role="dialog"][aria-modal="true"]')).toBeNull()
    expect(container.querySelector('.open-character-picker')).toBe(document.activeElement)
    expect(container.querySelectorAll('.evaluation-formula')).toHaveLength(7)
  })

  it('renders both newly populated groups and their E3 uncertainty without extra manual navigation', async () => {
    await selectGroup('혁명군')
    expect(container.querySelector('main.detail h1')?.textContent).toBe('사보')
    expect([...container.querySelectorAll('.character-chip')].map(el => el.textContent))
      .toEqual(['사보', '몰리', '카라스'])
    await click([...container.querySelectorAll('.character-chip')].find(el=>el.textContent==='몰리') ?? null)
    expect(container.querySelector('main.detail h1')?.textContent).toBe('몰리')
    expect(container.querySelectorAll('.readiness-badge.e3')).toHaveLength(4)
    await selectGroup('CP0')
    expect(container.querySelector('main.detail h1')?.textContent).toBe('로브 루치')
    expect([...container.querySelectorAll('.character-chip')].map(el => el.textContent))
      .toEqual(['로브 루치', '스튜시과거 소속', '카쿠'])
    await click([...container.querySelectorAll('.character-chip')].find(el=>el.textContent?.includes('스튜시')) ?? null)
    expect(container.querySelector('main.detail h1')?.textContent).toBe('스튜시')
    expect(container.querySelectorAll('.readiness-badge.e3')).toHaveLength(3)
  })

  it('opens newly added groups without the legacy crew lookup crash', async () => {
    for (const [group, character] of [
      ['밀짚모자 일당', '롤로노아 조로'],
      ['빨간 머리 해적단', '샹크스'],
      ['해군', '사카즈키'],
      ['검은 수염 해적단', '마샬 D. 티치'],
      ['왕의 부하 칠무해', '돈키호테 도플라밍고'],
      ['크로스 길드', '쥬라큘 미호크'],
      ['로저 해적단', '골 D. 로저'],
      ['록스 해적단', '록스 D. 지벡'],
    ]) {
      await selectGroup(group)
      expect(container.querySelector('main.detail h1')?.textContent).toBe(character)
      expect(container.querySelector('.prototype-note')?.textContent).toContain('evaluation-')
      expect(container.querySelector('.power-card')?.textContent).toContain('균형형')
    }
  })

  it('shows multi-membership Characters in multiple Group tabs without duplicating ranking/search identity', async () => {
    await selectGroup('왕의 부하 칠무해')
    const warlordNames = [...container.querySelectorAll('.character-chip')].map((button) => button.textContent ?? '')
    expect(warlordNames.some((name) => name.includes('쥬라큘 미호크'))).toBe(true)
    expect(warlordNames.some((name) => name.includes('크로커다일'))).toBe(true)
    expect(warlordNames.find((name) => name.includes('쥬라큘 미호크'))).toContain('과거 소속')
    await selectGroup('크로스 길드')
    expect([...container.querySelectorAll('.character-chip')].map((button) => button.textContent))
      .toEqual(['쥬라큘 미호크', '크로커다일'])

    await openPicker()
    const input = container.querySelector('#character-picker-search') as HTMLInputElement
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
      setter?.call(input, '미호크')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(container.querySelectorAll('.character-picker-option')).toHaveLength(1)
    expect(container.querySelector('.character-picker-option')?.textContent).toContain('크로스 길드')
    await click(container.querySelector('button[aria-label="캐릭터 선택창 닫기"]'))

    await click(container.querySelector('button[aria-label="공격력 전체 캐릭터 순위 보기"]'))
    const mihawkRows = [...document.querySelectorAll('.rank-row')]
      .filter((row) => row.textContent?.includes('쥬라큘 미호크'))
    expect(mihawkRows).toHaveLength(1)
    expect(mihawkRows[0].textContent).toContain('크로스 길드')
  })

  it('opens sorted 42-person stat ranking and navigates to a chosen group', async () => {
    const stat = container.querySelector('button[aria-label="공격력 전체 캐릭터 순위 보기"]')
    await click(stat)
    const rows = [...document.querySelectorAll('.rank-row')]
    expect(rows).toHaveLength(59)
    expect(rows.slice(0, 3).every((row) => row.textContent?.includes('100'))).toBe(true)
    expect(rows.slice(0, 3).map((row) => row.textContent).join(' ')).toContain('골 D. 로저')
    expect(rows.slice(0, 3).map((row) => row.textContent).join(' ')).toContain('에드워드 뉴게이트')
    expect(rows.slice(0, 3).map((row) => row.textContent).join(' ')).toContain('록스 D. 지벡')
    const shanks = rows.find((row) => row.textContent?.includes('샹크스'))
    await click(shanks ?? null)
    expect(document.querySelector('.stat-rank-dialog')).toBeNull()
    expect(container.querySelector('main.detail h1')?.textContent).toBe('샹크스')
    expect(selectedGroupName()).toBe('빨간 머리 해적단')
  })

  it('shows formulas for all seven stats and switches between compact detail tabs', async () => {
    const formula = container.querySelectorAll('.evaluation-formula')
    expect(formula).toHaveLength(7)
    expect(formula[0].textContent).toMatch(/기본점수 \d+ \+ 패기 \(\d+ × 0.5 = \d+\) = 최종점수 \d+\/100/)
    await click(container.querySelector('#battle-tab'))
    expect(container.querySelector('.battle-timeline')).not.toBeNull()
    expect(container.querySelector('.evaluation-trace-list')).toBeNull()
    await click(container.querySelector('#evaluation-tab'))
    expect(container.querySelectorAll('.evaluation-formula')).toHaveLength(7)
  })
  it('opens Overall rankings in full-precision order and reverses the list without changing canonical ranks', async () => {
    await click(container.querySelector('button[aria-label="종합 전투력 전체 캐릭터 순위 보기"]'))
    const rows = () => [...document.querySelectorAll('.rank-row')]
    expect(rows()).toHaveLength(59)
    expect(document.querySelector('#stat-rank-title')?.textContent).toContain('종합 전투력')
    expect(rows().slice(0, 2).map((row) => row.textContent).join(' ')).toContain('골 D. 로저')
    expect(rows().slice(0, 2).map((row) => row.textContent).join(' ')).toContain('에드워드 뉴게이트')
    expect(rows()[0].textContent).toContain('97.571')
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    expect(rows()[0].textContent).toContain('페이지 원')
    expect(rows()[0].textContent).toContain('59위')
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    expect(rows().slice(0, 2).map((row) => row.textContent).join(' ')).toContain('골 D. 로저')
  })

  it('can change existing core-stat rankings to ascending', async () => {
    await click(container.querySelector('button[aria-label="공격력 전체 캐릭터 순위 보기"]'))
    await click(document.querySelector('.rank-sort-controls button[aria-pressed="false"]'))
    const rows = [...document.querySelectorAll('.rank-row')]
    expect(rows).toHaveLength(59)
    expect(rows[0].textContent).not.toContain('골 D. 로저')
  })

  it('searches across groups with a live suggestion list and navigates by result', async () => {
    await openPicker()
    const input = container.querySelector('#character-picker-search') as HTMLInputElement
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
      setter?.call(input, '샹')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(container.querySelectorAll('.character-picker-option')).toHaveLength(1)
    expect(container.querySelector('.character-picker-option')?.textContent).toContain('샹크스')
    await click(container.querySelector('.character-picker-option'))
    expect(container.querySelector('main.detail h1')?.textContent).toBe('샹크스')
    expect(selectedGroupName()).toBe('빨간 머리 해적단')
  })

  it('searches official aliases while displaying the primary name', async () => {
    const search = async (value: string) => {
      await openPicker()
      const input = container.querySelector('#character-picker-search') as HTMLInputElement
      await act(async () => {
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
        setter?.call(input, value)
        input.dispatchEvent(new Event('input', { bubbles: true }))
      })
    }

    await search('키자루')
    expect(container.querySelector('.character-picker-option')?.textContent).toContain('보르살리노')
    expect(container.querySelector('.character-picker-option')?.textContent).toContain('키자루')
    await click(container.querySelector('.character-picker-option'))
    expect(container.querySelector('main.detail h1')?.textContent).toBe('보르살리노')

    await search('아카이누')
    expect(container.querySelector('.character-picker-option')?.textContent).toContain('사카즈키')
    await click(container.querySelector('.character-picker-option'))
    expect(container.querySelector('main.detail h1')?.textContent).toBe('사카즈키')

    await search('천야차')
    expect(container.querySelector('.character-picker-option')?.textContent).toContain('돈키호테 도플라밍고')
    await click(container.querySelector('.character-picker-option'))
    const knownAs = [...container.querySelectorAll('.character-known-as span')].map((entry) => entry.textContent)
    expect(knownAs[0]).toContain('천야차')
    expect(knownAs[1]).toContain('조커')
  })

  it('shows official identity metadata and the selected evaluation era in the intro', async () => {
    await selectGroup('해군')
    await click([...container.querySelectorAll('.character-chip')].find(x => x.textContent?.includes('몽키 D. 가프')) ?? null)
    expect(container.querySelector('main.detail h1')?.textContent).toBe('몽키 D. 가프')
    expect(container.querySelector('.character-known-as')?.textContent).toContain('해군의 영웅')
    expect(container.querySelector('.evaluation-subject-state')?.textContent).toContain('평가 시점 · 전성기')
  })

  it('switches Garp between Prime and current evaluations without duplicating the character', async () => {
    await selectGroup('해군')

    await click([...container.querySelectorAll('.character-chip')].find(x => x.textContent?.includes('몽키 D. 가프')) ?? null)
    const stateButtons = () => [...container.querySelectorAll('.evaluation-state-switcher button')]
    expect(stateButtons().map((button) => button.textContent)).toEqual(['전성기', '현재'])
    expect(container.querySelector('.power-card strong')?.textContent).toContain('97.4')

    await click(stateButtons().find((button) => button.textContent === '현재') ?? null)
    expect(container.querySelector('main.detail h1')?.textContent).toBe('몽키 D. 가프')
    expect(container.querySelector('.evaluation-subject-state')?.textContent).toContain('평가 시점 · 현재')
    expect(container.querySelector('.power-card strong')?.textContent).toContain('94.4')
    expect(container.querySelector('.evaluation-trace-card')?.textContent).toContain('최종점수 96/100')

    await click(stateButtons().find((button) => button.textContent === '전성기') ?? null)
    expect(container.querySelector('.power-card strong')?.textContent).toContain('97.4')
  })

  it('normalizes character names to Korean canonical display names in analysis prose', async () => {
    await click([...container.querySelectorAll('.character-chip')].find(x => x.textContent?.includes('마르코')) ?? null)
    expect(container.querySelector('.evaluation-trace-list')?.textContent).toContain('샬롯 카타쿠리')
    expect(container.querySelector('.evaluation-trace-list')?.textContent).not.toContain('Katakuri')
    await selectGroup('해군')
    await click([...container.querySelectorAll('.character-chip')].find(x => x.textContent?.includes('몽키 D. 가프')) ?? null)
    await click(container.querySelector('#battle-tab'))
    const battleText = container.querySelector('.detail-tab-content')?.textContent ?? ''
    expect(battleText).toContain('몽키 D. 가프')
    expect(battleText).toContain('코비')
    expect(battleText).not.toMatch(/\bGarp\b|\bKoby\b/)
  })

  it('keeps Stats as default and builds a two-character sports-style Matchup Arena', async () => {
    expect(container.querySelector('.character-selector')).not.toBeNull()
    expect(container.querySelector('.matchup-home')).toBeNull()
    await click(container.querySelector('button[aria-label="매치업 아레나 화면"]'))

    expect(container.querySelector('.matchup-home')).not.toBeNull()
    expect(container.querySelectorAll('.arena-selector select').length).toBeGreaterThanOrEqual(2)
    expect(container.querySelector('.matchup-corner-grid')?.textContent).toContain('왼쪽 선수')
    expect(container.querySelector('.matchup-corner-grid')?.textContent).toContain('오른쪽 선수')
    expect(container.querySelector('.combined-matchup-panel')).not.toBeNull()
    expect(container.querySelector('.matchup-radar')).not.toBeNull()
    expect(container.querySelector('button[aria-label="좌우 캐릭터 교체"]')).not.toBeNull()
    expect(container.querySelector('button[aria-label="랜덤 매치업"]')).not.toBeNull()
    expect(container.querySelector('.featured-matchups')?.textContent).toContain('추천 대진')
    expect(container.querySelector('.arena-caution')?.textContent).toContain('승률이 아닙니다')

    await click(container.querySelector('button[aria-label="좌우 캐릭터 교체"]'))
    expect(container.querySelector('.corner-panel-left h3')?.textContent).toBe('샹크스')
    expect(container.querySelector('.corner-panel-right h3')?.textContent).toBe('쥬라큘 미호크')

    await click(container.querySelector('button[aria-label="스탯 분석 화면"]'))
    expect(container.querySelector('.character-selector')).not.toBeNull()
    expect(container.querySelector('.matchup-home')).toBeNull()
  })


  it('shows per-stat Evidence readiness for the new legendary drafts and historical affiliation context', async () => {
    await selectGroup('로저 해적단')
    expect(container.querySelector('main.detail h1')?.textContent).toBe('골 D. 로저')
    expect(container.querySelector('.membership-context')?.textContent).toContain('과거 소속')
    expect(container.querySelectorAll('.readiness-badge')).toHaveLength(7)
    expect(container.querySelector('.readiness-badge')?.textContent).toMatch(/근거 E[12]/)
    await selectGroup('록스 해적단')
    const labels = [...container.querySelectorAll('.character-chip')].map((button) => button.textContent ?? '')
    expect(labels.some((name) => name.includes('에드워드 뉴게이트') && name.includes('과거 소속'))).toBe(true)
    expect(labels.some((name) => name.includes('카이도') && name.includes('과거 소속'))).toBe(true)
    expect(labels.some((name) => name.includes('샬롯 링링') && name.includes('과거 소속'))).toBe(true)
  })

  it('shows Whitebeard as final crew without past-affiliation label, but his Rocks history stays past', async () => {
    await selectGroup('흰수염 해적단')
    expect(container.querySelector('main.detail h1')?.textContent).toBe('에드워드 뉴게이트')
    expect(container.querySelector('main.detail .membership-context')).toBeNull()
    expect(container.querySelector('main.detail .identity-mark svg')).not.toBeNull()
    await selectGroup('록스 해적단')
    await click([...container.querySelectorAll('.character-chip')].find(x => x.textContent?.includes('에드워드 뉴게이트')) ?? null)
    expect(container.querySelector('main.detail .membership-context')?.textContent).toContain('과거 소속')
  })

  it('shows Jinbe as former Warlord and Kuzan as current Blackbeard captain with Marine history retained', async () => {
    await selectGroup('왕의 부하 칠무해')
    const jinbe = [...container.querySelectorAll('.character-chip')].find(x => x.textContent?.includes('징베'))
    expect(jinbe?.textContent).toContain('과거 소속')
    await click(jinbe ?? null)
    expect(container.querySelector('main.detail h1')?.textContent).toBe('징베')
    await selectGroup('검은 수염 해적단')
    const kuzan = [...container.querySelectorAll('.character-chip')].find(x => x.textContent?.includes('쿠잔'))
    expect(kuzan).toBeDefined()
    expect(kuzan?.textContent).not.toContain('과거 소속')
    await click(kuzan ?? null)
    expect(container.querySelector('main.detail .identity-mark')).not.toBeNull()
    expect(container.querySelector('main.detail h1')?.textContent).toBe('쿠잔')
    await selectGroup('해군')
    const former = [...container.querySelectorAll('.character-chip')].find(x => x.textContent?.includes('쿠잔'))
    expect(former?.textContent).toContain('과거 소속')
  })

  it('opens small Special combat help and keeps individual evidence counts out of trait cards', async () => {
    await selectGroup('검은 수염 해적단')
    const summary = container.querySelector('summary[aria-label="특수 전투요소 근거 및 점수 반영 설명"]')
    expect(summary).not.toBeNull()
    await click(summary)
    const bubble = container.querySelector('.special-help-bubble')
    expect(bubble?.textContent).toContain('연결 근거 1건')
    expect(bubble?.textContent).toContain('종합 전투력에 직접 가산하지 않아')
    expect(container.querySelector('.special-trait')?.textContent).not.toContain('종합 전투력 직접 가산 없음')
  })

  it('dismisses Special help on outside pointer without closing on inside clicks, and supports Escape', async () => {
    const summary = container.querySelector('summary[aria-label="특수 전투요소 근거 및 점수 반영 설명"]')
    await click(summary)
    const help = container.querySelector<HTMLDetailsElement>('.special-help')
    const bubble = container.querySelector('.special-help-bubble')
    expect(help?.open).toBe(true)

    await act(async () => {
      bubble?.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    })
    expect(help?.open).toBe(true)

    await act(async () => {
      container.querySelector('.stat-heading')?.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
    })
    expect(help?.open).toBe(false)

    await click(summary)
    expect(help?.open).toBe(true)
    await act(async () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    })
    expect(help?.open).toBe(false)
    expect(document.activeElement).toBe(summary)
  })

})
