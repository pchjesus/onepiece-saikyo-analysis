import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/** Guard the full-resolution user-supplied images against reintroducing the old 300px assets. */
describe('Charlos full-resolution public assets', () => {
  const assets = [
    {
      name:'charlos-v0418.webp', width:1536, height:1230, bytes:89522,
      sha256:'bad5d4e4e3fd74997a272c0205bfcc220d8ccdb5a77f1fb2a16bc5efb511e065',
    },
    {
      name:'charlos-truth-v0418.webp', width:1536, height:1536, bytes:107410,
      sha256:'04695f2434333ff46b8a40d7a3cbde21b2c8e6f766cacba57d74da7c086109cf',
    },
  ] as const

  for (const asset of assets) it(`${asset.name} is the approved 1536px WebP and byte-for-byte unchanged`, () => {
    const data=readFileSync(new URL('../public/images/characters/'+asset.name, import.meta.url))
    expect(data.length).toBe(asset.bytes)
    expect(data.subarray(0,4).toString('ascii')).toBe('RIFF')
    expect(data.subarray(8,16).toString('ascii')).toBe('WEBPVP8 ')
    expect(data.subarray(23,26).toString('hex')).toBe('9d012a')
    expect(data.readUInt16LE(26)&0x3fff).toBe(asset.width)
    expect(data.readUInt16LE(28)&0x3fff).toBe(asset.height)
    expect(createHash('sha256').update(data).digest('hex')).toBe(asset.sha256)
  })
})
