// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it } from 'vitest'
import { EVIDENCE_READINESS_DEFINITIONS, EVIDENCE_READINESS_LEVELS } from '../../domain/evaluation/types'
import { EvidenceReadinessHelp } from './EvidenceReadinessHelp'

describe('evidence readiness explanation popup', () => {
  it('explains exactly the approved E1-E3 levels and marks E4 undefined', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const mount = document.createElement('div')
    document.body.appendChild(mount)
    const root = createRoot(mount)
    try {
      await act(async () => { root.render(<EvidenceReadinessHelp />) })
      const trigger = mount.querySelector<HTMLButtonElement>('.readiness-help-trigger')!
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
      await act(async () => { trigger.click() })
      const dialog = mount.querySelector('.readiness-help-dialog')
      expect(dialog).not.toBeNull()
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
      const rows = [...mount.querySelectorAll('.readiness-levels > div')]
      expect(rows).toHaveLength(4)
      EVIDENCE_READINESS_LEVELS.forEach((level, index) => {
        expect(rows[index].querySelector('dt')?.textContent).toBe(level)
        expect(rows[index].querySelector('dd')?.textContent).toBe(EVIDENCE_READINESS_DEFINITIONS[level])
      })
      expect(rows[3].textContent).toContain('현재 프로젝트에서 정의되지 않은 등급')
      expect(dialog?.textContent).toContain('낮은 전투력의 증거가 아닙니다')
      // Clicking inside must not close the dialog.
      await act(async () => { dialog?.dispatchEvent(new Event('pointerdown', { bubbles: true })) })
      expect(mount.querySelector('.readiness-help-dialog')).not.toBeNull()
      // Touch/pointer dismissal works outside the popup.
      await act(async () => {
        mount.querySelector('.readiness-help-backdrop')?.dispatchEvent(
          new Event('pointerdown', { bubbles: true }))
      })
      expect(mount.querySelector('.readiness-help-dialog')).toBeNull()
      expect(document.activeElement).toBe(trigger)
      await act(async () => { trigger.click() })
      expect(mount.querySelector('.readiness-help-dialog')).not.toBeNull()
      await act(async () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      })
      expect(mount.querySelector('.readiness-help-dialog')).toBeNull()
      expect(document.activeElement).toBe(trigger)
    } finally {
      await act(async () => { root.unmount() })
      mount.remove()
    }
  })
})
