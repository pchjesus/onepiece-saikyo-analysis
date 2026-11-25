// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it } from 'vitest'
import { MatchupHome } from './MatchupHome'

describe('v0.6 matchup fact and conditions trace', () => {
  it('shows scenario assumptions immediately and factual sources on demand', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    try {
      await act(async () => { root.render(<MatchupHome />) })
      const cards = host.querySelectorAll('.arena-factor-card')
      expect(cards.length).toBeGreaterThan(0)
      const assumptions = host.querySelector('[aria-label="등록된 매치업 분석 가정"]')
      expect(assumptions?.textContent).toContain('중립 전장')
      expect(assumptions?.textContent).toContain('외부 개입')
      expect(assumptions?.textContent).toContain('원작 전투의 실제 조건과는 별개')
      const details = host.querySelectorAll<HTMLDetailsElement>('.arena-evidence-details')
      expect(details.length).toBe(cards.length)
      const first = details[0]
      expect(first.open).toBe(false)
      expect(first.textContent).toContain('기록된 사실')
      expect(first.textContent).toContain('전투')
      await act(async () => { first.querySelector('summary')!.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
      expect(first.open).toBe(true)
      expect(host.querySelector('.arena-evidence-disclaimer')?.textContent).toContain('독립적으로 재확인했다는 뜻은 아닙니다')
      expect(host.querySelectorAll('.arena-evidence-error')).toHaveLength(0)
    } finally {
      await act(async () => { root.unmount() })
      host.remove()
    }
  })

  it('switches source trace with featured matchup and hides it for unregistered pair', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    try {
      await act(async () => { root.render(<MatchupHome />) })
      const featured = [...host.querySelectorAll<HTMLButtonElement>('.matchup-picker button')]
        .find(button => button.textContent?.includes('마르코') && button.textContent?.includes('알베르'))
      expect(featured).toBeDefined()
      await act(async () => { featured!.click() })
      expect(host.querySelector('.combined-heading')?.textContent).toContain('마르코')
      expect(host.querySelector('.arena-evidence-count')?.textContent).toContain('연결 근거')
      expect(host.querySelectorAll('.arena-evidence-details').length).toBeGreaterThan(0)

      const left = host.querySelector<HTMLSelectElement>('[aria-label="왼쪽 캐릭터 선택"]')!
      const right = host.querySelector<HTMLSelectElement>('[aria-label="오른쪽 캐릭터 선택"]')!
      await act(async () => {
        left.value = 'mihawk'
        left.dispatchEvent(new Event('change', { bubbles: true }))
        right.value = 'marco'
        right.dispatchEvent(new Event('change', { bubbles: true }))
      })
      expect(host.querySelector('.matchup-empty-analysis')).not.toBeNull()
      expect(host.querySelector('.arena-evidence-details')).toBeNull()
      expect(host.querySelector('.arena-assumption-summary')).toBeNull()
    } finally {
      await act(async () => { root.unmount() })
      host.remove()
    }
  })
})
