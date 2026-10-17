// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { COMBAT_STATS } from '../../domain/evaluation/types'
import { v0412Evaluations, v0412Evidence } from './v0412EightEvaluations'
import { applyV0416Cp0EvaluationAudit, applyV0416Cp0EvidenceAudit, v0416Cp0AuditChanges } from './v0416Cp0EvidenceReadiness'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { matchupRepository } from '../repositories/matchupRepository'
import { CharacterPage } from '../../ui/pages/CharacterPage'
import { balancedV12 } from './calculationModels'
import { versionManifest } from '../integrity/versionManifest'

const revised: Record<string, readonly string[]> = {
  maha: ['speed','techniqueMastery','combatIQ','versatility'],
  guernica: ['combatIQ'],
}
const originalScores: Record<string, number[]> = {
  maha: [75,70,73,77,80,72,70],
  guernica: [78,76,76,81,84,80,75],
}
const sorted = (items: readonly string[]) => [...items].sort()

describe('v0.4.16 / v0.5.0 Stage 2A CP0 readiness and Evidence provenance', () => {
  it('preserves v0.4.12 frozen Evaluation and Evidence source objects', () => {
    expect(v0412Evaluations).toHaveLength(8)
    expect(v0412Evaluations.find(x => x.characterId === 'maha')!.items.map(x => x.score)).toEqual(originalScores.maha)
    expect(v0412Evaluations.find(x => x.characterId === 'guernica')!.items.map(x => x.score)).toEqual(originalScores.guernica)
    for (const id of Object.keys(revised)) {
      const old = v0412Evaluations.find(x => x.characterId === id)!
      expect(old.evaluationDataVersion).toBe('evaluation-v0.4.12-eight-provisional-source-reviewed')
      expect(old.items.filter(x => revised[id].includes(x.stat)).every(x => x.readiness === 'E2')).toBe(true)
      expect(applyV0416Cp0EvaluationAudit(old)).not.toBe(old)
      expect(v0412Evidence.filter(x => x.subjectCharacterId === id)
        .flatMap(x => x.statContributions)
        .filter(x => revised[id].includes(x.stat))
        .every(x => x.role === 'secondary')).toBe(true)
    }
    const unrelated = v0412Evaluations.find(x => x.characterId === 'nami')!
    expect(applyV0416Cp0EvaluationAudit(unrelated)).toBe(unrelated)
    const unrelatedEvidence = v0412Evidence.find(x => x.subjectCharacterId === 'nami')!
    expect(applyV0416Cp0EvidenceAudit(unrelatedEvidence)).toBe(unrelatedEvidence)
  })

  it('changes only five approved axes E2 to E3 without touching numeric or Haki data', () => {
    for (const [id,axes] of Object.entries(revised)) {
      const source = v0412Evaluations.find(x => x.characterId === id)!
      const current = evaluationRepository.getEvaluation(id)!
      expect(current.id).toBe(source.id)
      expect(current.evaluationDataVersion).toBe('evaluation-v0.4.16-cp0-stage2a-evidence-readiness')
      expect(current.status).toBe('draft')
      expect(current.subjectState?.id).toBe(source.subjectState?.id)
      expect(current.items.map(x=>x.score)).toEqual(originalScores[id])
      expect(current.items.map(x=>x.baseScore)).toEqual(originalScores[id])
      expect(current.items.map(x=>x.evidenceIds)).toEqual(source.items.map(x=>x.evidenceIds))
      expect(current.items.map(x=>x.hakiContributions)).toEqual(source.items.map(x=>x.hakiContributions))
      expect(current.items.every(x=>x.hakiContributions.length===0)).toBe(true)
      expect(current.items.filter(x=>axes.includes(x.stat)).every(x=>x.readiness==='E3' && x.rationale.length>70)).toBe(true)
      expect(current.items.filter(x=>!axes.includes(x.stat))
        .every(x=>x.readiness===source.items.find(y=>y.stat===x.stat)!.readiness
          && x.rationale===source.items.find(y=>y.stat===x.stat)!.rationale)).toBe(true)
      expect(sorted(Object.keys(v0416Cp0AuditChanges[id as 'maha'|'guernica']))).toEqual(sorted(axes))
      expect(current.items.map(x=>x.stat)).toEqual([...COMBAT_STATS])
    }
    expect(getCombatPower('maha').finalScore).toBeCloseTo(517/7, 10)
    expect(getCombatPower('guernica').finalScore).toBeCloseTo(550/7, 10)
  })

  it('retains Evidence IDs and subjects, but prevents five context scenes from masquerading as direct axe proof', () => {
    for (const [id, axes] of Object.entries(revised)) {
      const original = v0412Evidence.filter(x => x.subjectCharacterId===id)
      const live = evidenceRepository.getEvidenceForCharacter(id)
      expect(live).toHaveLength(original.length)
      for (const old of original) {
        const current = live.find(x=>x.id===old.id)!
        expect(current).toBeDefined()
        expect(current.battleId).toBe(old.battleId)
        expect(current.subjectCharacterId).toBe(old.subjectCharacterId)
        expect(current.source).toEqual(old.source)
        expect(current.fact).toBe(old.fact)
        expect(current.statContributions.map(x=>x.stat)).toEqual(old.statContributions.map(x=>x.stat))
        for (const contribution of current.statContributions) {
          const previous = old.statContributions.find(x=>x.stat===contribution.stat)!
          const targeted = axes.includes(contribution.stat) && v0416Cp0AuditChanges[id as 'maha'|'guernica'][contribution.stat]?.evidenceId===old.id
          expect(contribution.role).toBe(targeted ? 'context' : previous.role)
          if (targeted) expect(contribution.note.length).toBeGreaterThan(50)
        }
      }
    }
  })

  it('keeps live read-only audit, Detail UI and rankings aligned with all 85 evaluations', () => {
    const report = buildV050ReadOnlyAudit()
    expect(report.integrity.errors).toEqual([])
    expect(report.counts).toEqual({
      characters:82,evaluatedCharacters:82,evaluations:86,
      axes:602,memberships:107,matchups:18,
    })
    for (const [id, axes] of Object.entries(revised)) {
      const rows = report.rows.filter(x=>x.characterId===id)
      expect(rows).toHaveLength(7)
      expect(rows.map(x=>x.final)).toEqual(originalScores[id])
      for (const row of rows.filter(x=>axes.includes(x.stat))) {
        expect(row.readiness).toBe('E3')
        expect(row.evidenceLinks).toHaveLength(1)
        expect(row.evidenceLinks[0].role).toBe('context')
        expect(row.evidenceLinks[0].sourceType).toBe('supplementary')
        expect(row.rawHaki).toBe(0)
        expect(row.flags).toContain('secondary-or-context-only')
      }
      const evalData = evaluationRepository.getEvaluation(id)!
      const links = v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
      expect(validateEvaluation(evalData,links).errors).toEqual([])
      const html = renderToStaticMarkup(<CharacterPage characterId={id} groupId='cp0'
        onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
      expect(html).toContain('핵심 전투 스탯')
      expect(html).toContain('E3')
    }
    expect(getStatRanking('overall')).toHaveLength(83)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
    expect(versionManifest.appVersion).toBe('0.4.25')
    expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.21')
  })
})
