import { describe, expect, it } from 'vitest'
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { COMBAT_STATS } from '../src/domain/evaluation/types'
import { versionManifest } from '../src/data/integrity/versionManifest'
import { getCombatPower } from '../src/application/getCombatPower'
import { getStatRanking } from '../src/application/getStatRanking'
import { calculateBalancedCombatPower } from '../src/domain/calculation/calculateCombatPower'
import { v0412Evaluations } from '../src/data/sample/v0412EightEvaluations'
import { sampleEvaluations } from '../src/data/sample/evaluations'
import {
  buildV050ReadOnlyAudit, v050CurrentDataset, v050AuditRowsToCsv,
  V050_HIGH_E3_REVIEW_CUTOFF,
} from '../src/data/integrity/v050ReadOnlyAudit'

const baselinePath = resolve(process.cwd(), 'src/data/baselines/v0.3.3.json')
const newIds = ['guernica','maha','usopp','brook','franky','chopper','robin','nami']

describe('v0.5.0 stage 1: read-only 80-person, 84-evaluation, 588-stat audit', () => {
  it('audits all actual UI-era data, rather than the legacy 72-person integrity fixture', () => {
    const report = buildV050ReadOnlyAudit()
    expect(report.integrity.errors).toEqual([])
    expect(report.counts).toEqual({
      characters:80, evaluatedCharacters:80, evaluations:84, axes:588,
      memberships:105, matchups:17,
    })
    expect(report.rows).toHaveLength(588)
    expect(new Set(report.rows.map(row=>row.evaluationId))).toHaveProperty('size',84)
    expect(new Set(report.rows.map(row=>row.characterId))).toHaveProperty('size',80)
    for(const evaluation of v050CurrentDataset.evaluations){
      const rows=report.rows.filter(row=>row.evaluationId===evaluation.id)
      expect(rows.map(row=>row.stat)).toEqual(COMBAT_STATS)
      expect(rows.every(row=>row.evaluationDataVersion===evaluation.evaluationDataVersion)).toBe(true)
    }
    expect(report.readiness.E1+report.readiness.E2+report.readiness.E3+report.readiness.unclassified).toBe(588)
    for(const stat of COMBAT_STATS){
      const count=report.readinessByStat[stat]
      expect(count.E1+count.E2+count.E3+count.unclassified).toBe(84)
    }
    console.log('[v050 AUDIT SUMMARY]',JSON.stringify({readiness:report.readiness,byStat:report.readinessByStat,
      flags:report.flagCounts,sharedHakiEvidence:report.sharedHakiEvidence.length}))
  })

  it('keeps historic 76 evaluations intact, adds eight E2/E3-only drafts, never awards unproven Haki', () => {
    const report=buildV050ReadOnlyAudit()
    expect(sampleEvaluations).toHaveLength(76)
    expect(v0412Evaluations).toHaveLength(8)
    const newcomers=report.rows.filter(row=>newIds.includes(row.characterId))
    expect(newcomers).toHaveLength(56)
    expect(newcomers.filter(row=>row.readiness==='E2')).toHaveLength(40)
    expect(newcomers.filter(row=>row.readiness==='E3')).toHaveLength(16)
    expect(newcomers.every(row=>row.status==='draft' && row.rawHaki===0)).toBe(true)
    expect(newcomers.filter(row=>['defense','stamina'].includes(row.stat))
      .every(row=>row.readiness==='E3')).toBe(true)
    expect(newcomers.every(row=>row.evidenceLinks.every(
      link=>link.sourceType==='supplementary' && link.role==='secondary'))).toBe(true)
    expect(newcomers.every(row=>row.final===row.base)).toBe(true)
    expect(new Set(newcomers.map(row=>row.characterId)).size).toBe(8)
  })

  it('separates risk flags from verdicts; does not treat E3 or shared Haki events as proven errors', () => {
    const report=buildV050ReadOnlyAudit()
    const selected=report.rows.filter(row=>row.flags.includes('high-e3-provisional'))
    expect(selected.every(row=>row.readiness==='E3' && row.final>=V050_HIGH_E3_REVIEW_CUTOFF)).toBe(true)
    expect(report.rows.some(row=>row.flags.includes('no-linked-evidence'))).toBe(true)
    expect(report.rows.some(row=>row.flags.includes('haki-evidence-reused-across-stats'))).toBe(true)
    expect(report.sharedHakiEvidence.length).toBeGreaterThan(0)
    for(const event of report.sharedHakiEvidence) {
      expect(event.stats.length).toBeGreaterThan(1)
      expect(report.rows.some(row=>row.evaluationId===event.evaluationId
        && event.stats.includes(row.stat)
        && row.hakiEvidenceIds.includes(event.evidenceId))).toBe(true)
    }
    expect(report.integrity.errors).toEqual([])
  })

  it('reproduces Base/Raw/Final/Overall, all rank entries and all evaluation eras', () => {
    const report=buildV050ReadOnlyAudit()
    for(const evaluation of v050CurrentDataset.evaluations){
      const expected=calculateBalancedCombatPower(evaluation,v050CurrentDataset.model,'2000-01-01T00:00:00Z').finalScore
      const rows=report.rows.filter(row=>row.evaluationId===evaluation.id)
      expect(rows.every(row=>row.overall===expected)).toBe(true)
      for(const row of rows){
        expect(row.final).toBeCloseTo(Math.min(100,row.base+row.rawHaki*0.5),10)
      }
    }
    for(const stat of ['overall',...COMBAT_STATS] as const) {
      const ranking=getStatRanking(stat)
      expect(ranking).toHaveLength(80)
      if(stat==='overall') for(const person of ranking) {
        expect(getCombatPower(person.characterId).finalScore).toBe(person.score)
      }
    }
  })

  it('provides a deterministic 588-row quoted CSV worksheet with all source-role and rationale fields', () => {
    const a=v050AuditRowsToCsv(buildV050ReadOnlyAudit().rows)
    const b=v050AuditRowsToCsv(buildV050ReadOnlyAudit().rows)
    expect(a).toBe(b)
    expect(a.split('\n')).toHaveLength(590) // header + 588 rows + final empty line
    expect(a.startsWith('"evaluationId","evaluationDataVersion"')).toBe(true)
    expect(a).toContain('"evaluation-v0412-nami"')
    expect(a).toContain('"supplementary"')
    expect(a).toContain('"secondary"')
    expect(a).toContain('"rationale"')
    // Hosted PR validation publishes a versioned CSV artifact; local tests remain
    // side-effect-free unless V050_AUDIT_EXPORT=1 is explicitly set.
    if(process.env.GITHUB_ACTIONS==='true' || process.env.V050_AUDIT_EXPORT==='1'){
      const output=resolve(process.cwd(),'audit-output')
      mkdirSync(output,{recursive:true})
      writeFileSync(resolve(output,'v0.5.0-588-axis-audit.csv'),a,'utf8')
      const report=buildV050ReadOnlyAudit()
      writeFileSync(resolve(output,'v0.5.0-audit-summary.json'),JSON.stringify({
        schema:'onepiece-v050-readonly-audit/1',versions:versionManifest,
        counts:report.counts,readiness:report.readiness,readinessByStat:report.readinessByStat,
        flagCounts:report.flagCounts,sharedHakiEvidence:report.sharedHakiEvidence,
        integrity:report.integrity,
      },null,2)+'\n','utf8')
    }
  })

  it('never mutates current inputs or frozen v0.3.3 historical JSON', () => {
    const before=JSON.stringify(v050CurrentDataset)
    const historical=readFileSync(baselinePath)
    buildV050ReadOnlyAudit()
    buildV050ReadOnlyAudit()
    expect(JSON.stringify(v050CurrentDataset)).toBe(before)
    expect(readFileSync(baselinePath).equals(historical)).toBe(true)
    const frozen=JSON.parse(historical.toString('utf8'))
    expect(frozen.snapshotVersion).toBe('v0.3.3')
    expect(frozen.data.evaluations).toHaveLength(74)
    expect(frozen.data.matchups).toHaveLength(15)
  })
})
