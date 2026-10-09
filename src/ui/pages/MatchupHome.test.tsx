// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it, vi } from 'vitest'
import { MatchupHome } from './MatchupHome'

function pressedButtons(container: HTMLElement) {
  return [...container.querySelectorAll<HTMLButtonElement>('.matchup-picker button[aria-pressed="true"]')]
}
function findFeatured(container: HTMLElement, names: string[]) {
  const button = [...container.querySelectorAll<HTMLButtonElement>('.matchup-picker button')]
    .find((item) => names.every((name) => item.textContent?.includes(name)))
  if (!button) throw new Error('Missing featured ' + names.join(' vs '))
  return button
}

describe('Matchup Arena FEATURED selection styling and state synchronization', () => {
  it('highlights exactly the chosen Evidence matchup, follows swap/manual edits, and keeps keyboard button semantics', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    try {
      await act(async () => { root.render(<MatchupHome />) })
      const picker = host.querySelector('.matchup-picker')!
      expect(picker.getAttribute('role')).toBe('group')
      expect(picker.querySelectorAll('button')).toHaveLength(15)

      const initial = findFeatured(host, ['쥬라큘 미호크', '샹크스'])
      expect(pressedButtons(host)).toEqual([initial])
      expect(initial.classList.contains('selected')).toBe(true)

      const akainuKuzan = findFeatured(host, ['사카즈키', '쿠잔'])
      await act(async () => { akainuKuzan.click() })
      expect(pressedButtons(host)).toEqual([akainuKuzan])
      expect(initial.getAttribute('aria-pressed')).toBe('false')
      expect(akainuKuzan.classList.contains('selected')).toBe(true)
      expect(host.querySelector('.combined-heading')?.textContent).toContain('사카즈키')

      const swap = host.querySelector<HTMLButtonElement>('[aria-label="좌우 캐릭터 교체"]')!
      await act(async () => { swap.click() })
      expect(pressedButtons(host)).toEqual([akainuKuzan]) // selection is pair, not left-right order

      const leftSelect = host.querySelector<HTMLSelectElement>('[aria-label="왼쪽 캐릭터 선택"]')!
      await act(async () => {
        leftSelect.value = 'marco'
        leftSelect.dispatchEvent(new Event('change', { bubbles: true }))
      })
      expect(pressedButtons(host)).toHaveLength(0)
      expect(host.querySelector('.combined-heading')?.textContent).toContain('마르코')

      await act(async () => { akainuKuzan.click() })
      expect(pressedButtons(host)).toEqual([akainuKuzan])
    } finally {
      await act(async () => { root.unmount() })
      host.remove()
    }
  })

  it('clears FEATURED selection when a required evaluation state changes, and restores it when switched back', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    try {
      await act(async () => { root.render(<MatchupHome />) })
      const garpKuzan = findFeatured(host, ['가프', '쿠잔'])
      await act(async () => { garpKuzan.click() })
      expect(pressedButtons(host)).toEqual([garpKuzan])
      const state = host.querySelector<HTMLSelectElement>('[aria-label="왼쪽 평가 시점 선택"]')!
      expect(state.value).toBe('current')
      await act(async () => {
        state.value = 'prime'
        state.dispatchEvent(new Event('change', { bubbles: true }))
      })
      expect(pressedButtons(host)).toHaveLength(0)
      await act(async () => {
        state.value = 'current'
        state.dispatchEvent(new Event('change', { bubbles: true }))
      })
      expect(pressedButtons(host)).toEqual([garpKuzan])
    } finally {
      await act(async () => { root.unmount() })
      host.remove()
    }
  })

  it('keeps the selection derived from actual pair even after RANDOM is used', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    try {
      await act(async () => { root.render(<MatchupHome />) })
      const random = host.querySelector<HTMLButtonElement>('[aria-label="랜덤 매치업"]')!
      const mocked = vi.spyOn(Math, 'random').mockReturnValue(0)
      try { await act(async () => { random.click() }) }
      finally { mocked.mockRestore() }
      const state = host.querySelector('.combined-heading')?.textContent ?? ''
      const marked = pressedButtons(host)
      expect(marked.length).toBeLessThanOrEqual(1)
      if (marked.length) {
        const label = marked[0].textContent ?? ''
        const fighterNames = [...host.querySelectorAll('.corner-panel header h3')].map((node) => node.textContent ?? '')
        expect(fighterNames.every((name) => label.includes(name))).toBe(true)
      }
      expect(state).toContain('VS')
    } finally {
      await act(async () => { root.unmount() })
      host.remove()
    }
  })
})
