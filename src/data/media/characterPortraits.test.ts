import { describe, it, expect } from 'vitest'
import { getCharacterPortraitAsset, characterPortraitAssets } from './characterPortraits'

describe('User-provided portrait registry (unverified publication rights)', () => {
  it('resolves the full-resolution Charlos portrait without changing the 72-image historical registry', () => {
    expect(getCharacterPortraitAsset('charlos')).toMatchObject({
      fileName:'charlos-v0418.webp',
      permission:'user-provided-unverified',
    })
    expect(getCharacterPortraitAsset('charlos')?.permissionNote).toContain('1536')
    expect(Object.keys(characterPortraitAssets)).toHaveLength(72)
  })

  it('preserves the separately registered original Magellan 640 × 512 PNG', () => {
    expect(getCharacterPortraitAsset('magellan')).toMatchObject({ fileName:'magellan-v0421.png',permission:'user-provided-unverified' })
    expect(getCharacterPortraitAsset('magellan')?.permissionNote).toContain('640 × 512')
    expect(Object.keys(characterPortraitAssets)).toHaveLength(72)
  })

  it('contains the 72 locally committed uploaded portraits without inventing licenses', () => {
    expect(Object.keys(characterPortraitAssets)).toHaveLength(72)
    for (const id of ['marco', 'king', 'katakuri', 'smoker', 'ivankov', 'izo', 'teach', 'koby']) {
      expect(getCharacterPortraitAsset(id)).toMatchObject({
        fileName: id + '.webp', permission: 'user-provided-unverified',
      })
    }
    for (const id of ['nonexistent']) {
      expect(getCharacterPortraitAsset(id)).toBeUndefined()
    }
    expect(Object.values(characterPortraitAssets).every(a => a.permissionNote.includes('미확인'))).toBe(true)
  })
})
