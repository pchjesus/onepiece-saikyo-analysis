import {describe,it,expect} from 'vitest'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {resolve} from 'node:path'
import {getCharacterPortraitAsset} from '../src/data/media/characterPortraits'
const expectedSha256='9b7e0c14f0b1407e4e88e2ee7e17cb34875dd53203c717d56e4eed22d687f76a'
const filePath=resolve(process.cwd(),'public/images/characters/magellan-v0421.png')
describe('v0.4.21 native full-quality Magellan PNG integrity',()=>{
 it('uses original RGBA pixels and is byte-identical to the user image',()=>{
  const bytes=readFileSync(filePath)
  expect(bytes.length).toBe(714791)
  expect(createHash('sha256').update(bytes).digest('hex')).toBe(expectedSha256)
  expect(bytes.subarray(0,8)).toEqual(Buffer.from([137,80,78,71,13,10,26,10]))
  expect(bytes.subarray(12,16).toString('ascii')).toBe('IHDR')
  expect(bytes.readUInt32BE(16)).toBe(640)
  expect(bytes.readUInt32BE(20)).toBe(512)
  expect(bytes[25]).toBe(6) // 8-bit RGBA PNG
  expect(getCharacterPortraitAsset('magellan')?.fileName).toBe('magellan-v0421.png')
 })
})
