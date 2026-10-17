import {describe,it,expect} from 'vitest'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {createHash} from 'node:crypto'
import {getCharacterPortraitAsset} from '../src/data/media/characterPortraits'
import {getCombatPower} from '../src/application/getCombatPower'
import {versionManifest} from '../src/data/integrity/versionManifest'
describe('v0.4.22 Magellan portrait integrity',()=>{
 it('registers local full-resolution PNG',()=>{
  const bytes=readFileSync(resolve(process.cwd(),'public/images/characters/magellan-v0422.png'))
  expect(bytes.length).toBe(363070)
  expect(createHash('sha256').update(bytes).digest('hex')).toBe('f02c5d793875b4279c54bb0b494e230f25b4a3ea3ab3f36d416cd314b6edd142')
  expect(bytes.subarray(0,8)).toEqual(Buffer.from([137,80,78,71,13,10,26,10]))
  expect(bytes.subarray(12,16).toString('ascii')).toBe('IHDR')
  expect(bytes.readUInt32BE(16)).toBe(499)
  expect(bytes.readUInt32BE(20)).toBe(400)
  expect(bytes[25]).toBe(2)
  expect(getCharacterPortraitAsset('magellan')).toMatchObject({fileName:'magellan-v0422.png',permission:'user-provided-unverified'})
 })
 it('leaves existing combat scores untouched',()=>{
  expect(getCombatPower('magellan').finalScore).toBe(86)
  expect(versionManifest.appVersion).toBe('0.4.29')
  expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.29')
  expect(versionManifest.calculationModelVersion).toBe('1.2')
  expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
 })
})
