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
})
