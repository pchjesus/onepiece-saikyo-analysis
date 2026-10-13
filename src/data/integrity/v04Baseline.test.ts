import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { auditCombatDataset } from './auditDataset'
import { createV033Snapshot, liveDataset } from './v033Snapshot'
import { versionManifest } from './versionManifest'
import { sampleCharacters } from '../sample/characters'
import { sampleEvaluations } from '../sample/evaluations'
import { sampleMatchups } from '../sample/matchups'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { COMBAT_STATS } from '../../domain/evaluation/types'

const baselinePath = resolve(process.cwd(), 'src/data/baselines/v0.3.3.json')
const captured = createV033Snapshot()

// One-time capture only. Never silently update the historical JSON during normal tests.
if (process.env.BASELINE_CAPTURE === '1') {
  if (existsSync(baselinePath)) throw new Error('Baseline exists: refusing silent overwrite')
  mkdirSync(dirname(baselinePath), { recursive: true })
  writeFileSync(baselinePath, JSON.stringify(captured, null, 2) + '\n', 'utf8')
}

describe('v0.4 frozen v0.3.3 source-of-truth audit', () => {
  it('holds v0.3.3 historical JSON independently of current arrays', () => {
    expect(existsSync(baselinePath)).toBe(true)
    const frozen = JSON.parse(readFileSync(baselinePath, 'utf8'))
    expect(frozen.schema).toBe('onepiece-v04-snapshot/1')
    expect(frozen.snapshotVersion).toBe('v0.3.3')
    expect(frozen.sourceCommit).toBe(versionManifest.baselineSourceCommit)
    expect(frozen.data.characters).toHaveLength(71)
    expect(frozen.data.memberships).toHaveLength(96)
    expect(frozen.data.evaluations).toHaveLength(74)
    expect(frozen.data.evaluations.flatMap((e: {items: unknown[]})=>e.items)).toHaveLength(518)
    expect(frozen.data.matchups).toHaveLength(15)
    expect(frozen.model).toEqual(liveDataset.model)
    // While source data is still marked v0.3.3, every recorded fact and result must agree.
    // On future approved data-version updates, compare historical results explicitly.
    if (versionManifest.coreDataVersion === 'core-v0.3.3'
      && versionManifest.evaluationSetVersion === 'evaluation-set-v0.3.3')
      expect(captured).toEqual(frozen)
  })

  it('detects no broken references across all domain arrays, including invisible UI records', () => {
    const report = auditCombatDataset(liveDataset)
    expect(report.errors).toEqual([])
    expect(sampleCharacters).toHaveLength(71)
    expect(sampleEvaluations).toHaveLength(74)
    expect(sampleMatchups).toHaveLength(15)
  })

  it('repeats all seven-stat and overall computations independent of timestamps', () => {
    const before = createV033Snapshot()
    const after = createV033Snapshot()
    expect(before).toEqual(after)
    for (const e of sampleEvaluations) {
      const one = calculateBalancedCombatPower(e, liveDataset.model, '2020-01-01T00:00:00Z')
      const two = calculateBalancedCombatPower(e, liveDataset.model, '2025-01-01T00:00:00Z')
      expect(one.finalScore).toBe(two.finalScore)
    }
    for (const stat of ['overall', ...COMBAT_STATS] as const) {
      const ranks = getStatRanking(stat)
      expect(ranks).toHaveLength(71)
      for (let i=0; i<ranks.length; i++) {
        expect(ranks[i].rank).toBe(ranks.findIndex(x=>x.score===ranks[i].score)+1)
        if (i>0) expect(ranks[i].score).toBeLessThanOrEqual(ranks[i-1].score)
        if (stat==='overall') expect(getCombatPower(ranks[i].characterId).finalScore).toBe(ranks[i].score)
      }
    }
  })

  it('preserves original Evaluation revisions and draft uncertainty', () => {
    for (const e of sampleEvaluations) expect(e.evaluationDataVersion.trim()).not.toBe('')
    for (const id of ['buggy','izo']) {
      const e = sampleEvaluations.find(x=>x.characterId===id)
      expect(e?.status).toBe('draft')
      expect(e?.items).toHaveLength(7)
    }
    expect(getCombatPower('buggy').finalScore).toBe(38)
    expect(getCombatPower('izo').finalScore).toBeCloseTo(76.14285714285714, 9)
    expect(versionManifest.calculationModelVersion).toBe(liveDataset.model.version)
    expect(versionManifest.calculationModelId).toBe(liveDataset.model.id)
  })

  it('exposes explicit historical input changes without touching captured baseline', () => {
    const baseline = JSON.parse(readFileSync(baselinePath,'utf8'))
    const changed = structuredClone(liveDataset)
    changed.characters.push({ ...changed.characters[0], id:'phantom-duplicate' })
    changed.evaluations[0].items[0].evidenceIds.push('missing-evidence-id')
    const report = auditCombatDataset(changed)
    expect(report.errors.some(x => x.detail.includes('missing-evidence-id'))).toBe(true)
    expect(JSON.parse(readFileSync(baselinePath,'utf8'))).toEqual(baseline)
  })
})
