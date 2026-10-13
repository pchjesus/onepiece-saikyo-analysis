import { describe, it, expect } from 'vitest'
import { getCharacterPortraitAsset, characterPortraitAssets } from './characterPortraits'

describe('User-provided portrait registry (unverified publication rights)', () => {
  it('contains the 64 locally committed uploaded portraits without inventing licenses', () => {
    expect(Object.keys(characterPortraitAssets)).toHaveLength(64)
    for (const id of ['marco', 'king', 'katakuri', 'smoker', 'ivankov', 'izo']) {
      expect(getCharacterPortraitAsset(id)).toMatchObject({
        fileName: id + '.webp', permission: 'user-provided-unverified',
      })
    }
    for (const id of ['buggy', 'teach', 'shiryu', 'burgess', 'van-augur', 'pizarro', 'koby', 'nonexistent']) {
      expect(getCharacterPortraitAsset(id)).toBeUndefined()
    }
    expect(Object.values(characterPortraitAssets).every(a => a.permissionNote.includes('미확인'))).toBe(true)
  })
})
