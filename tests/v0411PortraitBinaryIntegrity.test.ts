import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { getCharacterPortraitAsset } from '../src/data/media/characterPortraits'

/** Git object SHA and source byte sizes checked after binary upload; guard missing/incorrect assets. */
const expected = {
  guernica: { bytes: 71930, gitSha: '7834e59df71e5b41cda5d09c75cf9d6925315336' },
  maha: { bytes: 116138, gitSha: 'deca1e39ec487ea55b5fda7c322dd2e23181a9ea' },
  usopp: { bytes: 89818, gitSha: '3bbadf48ec55f5548de38a1136aff08d701d8332' },
  nami: { bytes: 183806, gitSha: '1db223dbf862b14fd7c13f46bc3431c90914a271' },
  chopper: { bytes: 116036, gitSha: '97d293c15f1548af72130b45bd49997f7924f059' },
  robin: { bytes: 94278, gitSha: '4b87879146d21301fc9c44845fcfb1a703cddf69' },
  franky: { bytes: 171896, gitSha: '3089b92b441cf57f974c9cd0988f8f16908018dd' },
  brook: { bytes: 169638, gitSha: 'e8e8a9abc37b2954cd630bdd34c31e259c09d016' },
} as const

describe('v0.4.11 uploaded 8 original-resolution portraits', () => {
  it('maps every newly registered ID to a real matching WebP binary without changing original source bytes', () => {
    for (const [id, source] of Object.entries(expected)) {
      const asset = getCharacterPortraitAsset(id)
      expect(asset?.fileName).toBe(id + '.webp')
      expect(asset?.permission).toBe('user-provided-unverified')
      const file = readFileSync(resolve(process.cwd(), 'public/images/characters', asset!.fileName))
      expect(file.length, id).toBe(source.bytes)
      expect(file.toString('ascii', 0, 4), id).toBe('RIFF')
      expect(file.toString('ascii', 8, 12), id).toBe('WEBP')
      const hash = createHash('sha1')
        .update('blob ' + file.length + '\0')
        .update(file)
        .digest('hex')
      expect(hash, id).toBe(source.gitSha)
    }
  })
})
