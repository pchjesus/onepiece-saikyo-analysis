import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { sampleCharacters } from '../src/data/sample/characters'
import { sampleGroups } from '../src/data/sample/groups'
import { sampleMemberships } from '../src/data/sample/memberships'
import { sampleEvaluations } from '../src/data/sample/evaluations'
import { sampleBattles } from '../src/data/sample/battles'
import { sampleEvidence } from '../src/data/sample/evidence'
import { sampleMatchups } from '../src/data/sample/matchups'
import { balancedV12 } from '../src/data/sample/calculationModels'
import { createV033Snapshot, liveDataset } from '../src/data/integrity/v033Snapshot'
import { versionManifest } from '../src/data/integrity/versionManifest'
import { auditCombatDataset } from '../src/data/integrity/auditDataset'
import { getStatRanking } from '../src/application/getStatRanking'
import { getCombatPower } from '../src/application/getCombatPower'
import { getUniqueCharacterList } from '../src/application/getCharacterList'
import { getCharacterPortraitAsset, characterPortraitAssets } from '../src/data/media/characterPortraits'
import { COMBAT_STATS } from '../src/domain/evaluation/types'

const frozen = JSON.parse(readFileSync(resolve(process.cwd(), 'src/data/baselines/v0.3.3.json'), 'utf8'))
const plain = <T>(data:T):T => JSON.parse(JSON.stringify(data)) as T

describe('v0.4.1 additive Luffy and portrait mapping regression', () => {
  it('preserves every v0.3.3 record and original evaluation without edits', () => {
    const check = <T extends {id:string}>(current:T[], old:T[]) => {
      const originalIds = new Set(old.map(x=>x.id))
      expect(plain(current.filter(x=>originalIds.has(x.id)))).toEqual(old)
    }
    check(sampleCharacters, frozen.data.characters)
    check(sampleGroups, frozen.data.groups)
    check(sampleBattles, frozen.data.battles)
    check(sampleEvidence, frozen.data.evidence)
    check(sampleEvaluations, frozen.data.evaluations)
    check(sampleMatchups, frozen.data.matchups)
    expect(plain(sampleMemberships.slice(0, frozen.data.memberships.length))).toEqual(frozen.data.memberships)
    expect(plain(balancedV12)).toEqual(frozen.model)
    expect(frozen.data.characters).toHaveLength(71)
    expect(frozen.data.evaluations).toHaveLength(74)
    expect(frozen.data.matchups).toHaveLength(15)
    for (const row of frozen.results.evaluations as {characterId:string;subjectStateId:string|null;overall:number}[]) {
      expect(getCombatPower(row.characterId,'balanced',row.subjectStateId??undefined).finalScore).toBe(row.overall)
    }
  })
  it('adds exactly one evaluated Luffy, without replacing past data or Matchups',()=>{
    expect(sampleCharacters).toHaveLength(72)
    expect(sampleMemberships).toHaveLength(97)
    expect(sampleEvaluations).toHaveLength(76)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(532)
    expect(getUniqueCharacterList()).toHaveLength(72)
    for(const stat of ['overall', ...COMBAT_STATS] as const) expect(getStatRanking(stat)).toHaveLength(72)
    const luffy=sampleEvaluations.find(e=>e.characterId==='luffy'&&e.isDefault)!
    expect(sampleEvaluations.filter(e=>e.characterId==='luffy')).toHaveLength(2)
    expect(luffy.status).toBe('draft')
    expect(luffy.isDefault).toBe(true)
    expect(luffy.items.map(i=>i.score)).toEqual([97,94,90,95,95,87,99])
    expect(luffy.items.map(i=>i.readiness)).toEqual(['E2','E2','E2','E2','E2','E3','E2'])
    expect(luffy.items.every(i=>i.hakiContributions.length===0)).toBe(true)
    expect(getCombatPower('luffy').finalScore).toBeCloseTo(657/7,12)
    expect(sampleMatchups).toHaveLength(17)
    expect(versionManifest.coreDataVersion).toBe('core-v0.4.3')
    expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.3')
    expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
    expect(versionManifest.calculationModelVersion).toBe('1.2')
    expect(createV033Snapshot().snapshotVersion).toBe('v0.4.3')
    expect(createV033Snapshot().sourceCommit).toBeNull()
    expect(frozen.sourceCommit).toBe(versionManifest.baselineSourceCommit)
  })
  it('keeps complete references and current Luffy group hierarchy',()=>{
    expect(auditCombatDataset(liveDataset).errors).toEqual([])
    expect(getUniqueCharacterList().find(x=>x.character.id==='luffy')?.group.id).toBe('straw-hat-pirates')
    expect(sampleMemberships.filter(x=>x.characterId==='luffy')).toEqual([
      {characterId:'luffy',groupId:'straw-hat-pirates',role:'선장',status:'current'},
    ])
    expect(sampleEvidence.filter(e=>e.subjectCharacterId==='luffy')).toHaveLength(11)
    expect(sampleBattles.filter(b=>b.id.startsWith('luffy-'))).toHaveLength(4)
  })
  it('maps 72 present portraits and proves Kaku/Inazuma binary bytes were swapped',()=>{
    expect(Object.keys(characterPortraitAssets)).toHaveLength(72)
    for (const id of ['buggy','luffy','kaku','inazuma']) {
      expect(getCharacterPortraitAsset(id)?.fileName).toBe(id+'.webp')
      expect(getCharacterPortraitAsset(id)?.permission).toBe('user-provided-unverified')
    }
    const imageDir=resolve(process.cwd(),'public/images/characters')
    const sha = (file:string) => {
      const bytes=readFileSync(resolve(imageDir,file))
      return createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex')
    }
    expect(sha('inazuma.webp')).toBe('244cd714778b3f9f22b3f5f3c03415d13da4bdd7')
    expect(sha('kaku.webp')).toBe('77185b273d77d2197277e9369a30b947cf75ec68')
    for(const filename of ['buggy.webp','luffy.webp']){
      const bytes=readFileSync(resolve(imageDir,filename))
      expect(bytes.length).toBeGreaterThan(12000)
      expect(bytes.subarray(0,4).toString('ascii')).toBe('RIFF')
      expect(bytes.subarray(8,12).toString('ascii')).toBe('WEBP')
    }
  })
})
