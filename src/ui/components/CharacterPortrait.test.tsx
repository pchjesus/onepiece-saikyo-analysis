// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, it, expect } from 'vitest'
import { CharacterPortrait } from './CharacterPortrait'

describe('uploaded portraits and fallback behavior', () => {
  it('renders uploaded portraits, labels the rights status, and falls back on image errors', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true
    const host = document.createElement('div')
    const root = createRoot(host)
    try {
      await act(async () => root.render(<div>
        <CharacterPortrait characterId="marco" groupId="whitebeard-pirates" name="마르코" size="large"/>
        <CharacterPortrait characterId="buggy" groupId="cross-guild" name="버기" size="small"/>
      </div>))
      const img = host.querySelector<HTMLImageElement>('img')
      expect(img?.getAttribute('src')).toContain('images/characters/marco.webp')
      expect(img?.alt).toContain('마르코')
      expect(host.querySelector('.portrait-attribution')?.textContent).toContain('권리 미확인')
      expect(host.querySelectorAll('.character-portrait-fallback')).toHaveLength(1)
      await act(async () => { img?.dispatchEvent(new Event('error')) })
      expect(host.querySelector('img')).toBeNull()
      expect(host.querySelectorAll('.character-portrait-fallback')).toHaveLength(2)
    } finally {
      await act(async () => root.unmount())
    }
  })
})
