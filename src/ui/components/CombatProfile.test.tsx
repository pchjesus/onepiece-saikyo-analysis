// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it } from 'vitest'
import { sampleCharacters } from '../../data/sample/characters'
import { CombatProfile } from './CombatProfile'

describe('qualitative Haki evidence UI', () => {
  it('shows direct and inferred exceptional applications with caveats and no automatic score', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    try {
      for (const [id, badge] of [
        ['mihawk', '고숙련 가능성 · 강한 추론'],
        ['shanks', '특출난 실전 응용 확인'],
        ['katakuri', '특출난 실전 응용 확인'],
        ['garp', '고숙련 가능성 · 강한 추론'],
      ]) {
        const character = sampleCharacters.find((item) => item.id === id)!
        await act(async () => { root.render(<CombatProfile profile={character.combatProfile} />) })
        expect(container.querySelector('.haki-excellence')?.textContent, id).toContain(badge)
        expect(container.querySelector('.haki-excellence-caveat')?.textContent).toContain('불확실성')
        expect(container.textContent).toContain('자동 점수 가산 없음')
      }
      const queen = sampleCharacters.find(({ id }) => id === 'queen')!
      await act(async () => { root.render(<CombatProfile profile={queen.combatProfile} />) })
      expect(container.querySelector('.haki-excellence')).toBeNull()
      expect(container.querySelector('.haki-card')).not.toBeNull()
    } finally {
      await act(async () => { root.unmount() })
      container.remove()
    }
  })
  it('keeps only Haki statuses and question icons visible until opened, closes outside and on Escape', async () => {
    const mount = document.createElement('div')
    document.body.appendChild(mount)
    const root = createRoot(mount)
    try {
      const katakuri = sampleCharacters.find((item) => item.id === 'katakuri')!
      await act(async () => { root.render(<CombatProfile profile={katakuri.combatProfile}/>) })
      const rows = [...mount.querySelectorAll('.haki-card dl > div')]
      expect(rows).toHaveLength(3)
      expect(rows.every(row => row.querySelector<HTMLDetailsElement>('.haki-help')?.open === false)).toBe(true)
      expect(rows[1].querySelector('dd > strong')?.textContent).toBe('확인')
      const help = rows[1].querySelector<HTMLDetailsElement>('.haki-help')!
      expect(help.querySelector('summary')?.getAttribute('aria-label')).toBe('견문색 근거 확인')
      await act(async () => { (help.querySelector('summary') as HTMLElement).click() })
      expect(help.open).toBe(true)
      expect(help.querySelector('.haki-excellence')?.textContent).toContain('특출난 실전 응용 확인')
      expect(help.querySelector('.haki-excellence-caveat')?.textContent).toContain('침착함')
      await act(async () => { document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })) })
      expect(help.open).toBe(false)
      await act(async () => { (help.querySelector('summary') as HTMLElement).click() })
      expect(help.open).toBe(true)
      await act(async () => { document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' })) })
      expect(help.open).toBe(false)
      expect(document.activeElement).toBe(help.querySelector('summary'))
    } finally {
      await act(async () => { root.unmount() })
      mount.remove()
    }
  })

  it('shows fruit-awakening badge only for explicitly confirmed Devil Fruit awakenings', async () => {
    const mount = document.createElement('div')
    document.body.appendChild(mount)
    const root = createRoot(mount)
    try {
      for (const id of ['law','doflamingo','katakuri','lucci','kaku']) {
        const character = sampleCharacters.find((item) => item.id === id)!
        await act(async () => { root.render(<CombatProfile profile={character.combatProfile}/>) })
        expect(mount.querySelector('.fruit-awakening-badge')?.textContent, id).toBe('열매 각성자')
        expect([...mount.querySelectorAll('.profile-tags span')].some(span => span.textContent?.startsWith('각성')), id)
          .toBe(false)
      }
      const sanji = sampleCharacters.find((item) => item.id === 'sanji')!
      await act(async () => { root.render(<CombatProfile profile={sanji.combatProfile}/>) })
      expect(mount.querySelector('.fruit-awakening-badge')).toBeNull()
      const styles = [...mount.querySelectorAll('.profile-tags span')].map(x => x.textContent)
      expect(styles).toContain('스카이워크')
      expect(styles).not.toContain('공중전')
    } finally {
      await act(async () => { root.unmount() })
      mount.remove()
    }
  })

})
