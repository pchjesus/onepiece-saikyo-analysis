import { describe, expect, it } from 'vitest'
import { luffyEvaluation } from './luffyDraft'
import { luffyGear4Evaluation, luffyGear5Evaluation } from './luffyCombatStates'
import { sampleCharacters } from './characters'
import { sampleEvaluations, evaluationsBeforeV044 } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { getMatchupBuilderView, getMatchupHubEntries, getMatchupRoster } from '../../application/getMatchupHub'
import { auditCombatDataset } from '../integrity/auditDataset'
import { liveDataset } from '../integrity/v033Snapshot'
import { versionManifest } from '../integrity/versionManifest'

describe('v0.4.3 Luffy dual states and hypothetical Teach matchup scenarios', () => {
  it('preserves original v0.4.1 Luffy data and unrelated Teach stats verbatim', () => {
    expect(luffyEvaluation.id).toBe('evaluation-luffy-current-provisional')
    expect(luffyEvaluation.items.map(i=>i.score)).toEqual([97,94,90,95,95,89,99])
    expect(sampleEvaluations.some(e=>e.id===luffyEvaluation.id)).toBe(false)
    const teach=evaluationsBeforeV044.find(e=>e.characterId==='teach')!
    expect(teach.items.map(i=>i.score)).toEqual([95,89,95,82,93,87,93])
    expect(getCombatPower('teach').finalScore).toBeCloseTo(650/7,12)
    expect(sampleCharacters).toHaveLength(72)
  })

  it('selects exactly one default Nika and resolves both configurations separately', () => {
    const rows=evaluationRepository.getEvaluations('luffy')
    expect(rows).toHaveLength(2)
    expect(rows.filter(e=>e.isDefault)).toHaveLength(1)
    expect(evaluationRepository.getEvaluation('luffy')?.id).toBe(luffyGear5Evaluation.id)
    expect(evaluationRepository.getEvaluation('luffy','egghead-gear4')?.id).toBe(luffyGear4Evaluation.id)
    expect(evaluationRepository.getEvaluation('luffy','egghead-gear5')?.id).toBe(luffyGear5Evaluation.id)
    expect(luffyGear4Evaluation.items.map(x=>x.score)).toEqual([91,90,90,94,92,90,88])
    expect(luffyGear5Evaluation.items.map(x=>x.score)).toEqual([97,94,90,95,95,87,99])
    expect(getCombatPower('luffy','balanced','egghead-gear4').finalScore).toBeCloseTo(635/7,10)
    expect(getCombatPower('luffy','balanced','egghead-gear5').finalScore).toBeCloseTo(657/7,10)
    expect(getCombatPower('luffy').finalScore).toBeCloseTo(657/7,10)
    expect(getStatRanking('overall').filter(x=>x.characterId==='luffy')).toHaveLength(1)
    expect(getStatRanking('overall').find(x=>x.characterId==='luffy')?.score).toBeCloseTo(657/7,10)
  })

  it('does not leak Nika-derived Evidence into Gear 4, and has no invented Haki scores', () => {
    expect(luffyGear4Evaluation.items.flatMap(i=>i.evidenceIds).every(id=>!id.includes('gear5'))).toBe(true)
    for(const state of [luffyGear4Evaluation,luffyGear5Evaluation]){
      expect(state.items).toHaveLength(7)
      expect(state.items.every(i=>i.hakiContributions.length===0)).toBe(true)
      expect(state.items.every(i=>['E1','E2','E3'].includes(i.readiness!))).toBe(true)
    }
    expect(sampleEvidence.filter(x=>x.subjectCharacterId==='luffy')).toHaveLength(11)
    expect(sampleEvaluations).toHaveLength(76)
    expect(sampleEvaluations.flatMap(x=>x.items)).toHaveLength(532)
    expect(auditCombatDataset(liveDataset).errors).toEqual([])
    expect(versionManifest.appVersion).toBe('0.4.15')
    expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.15')
    expect(balancedV12.version).toBe('1.2')
  })

  it('creates two distinguishable neutral-field scenarios with no fabricated outcomes', () => {
    const originals=sampleMatchups
    expect(originals).toHaveLength(15)
    expect(liveDataset.matchups).toHaveLength(17)
    expect(sampleMatchups).toHaveLength(15)
    expect(getMatchupHubEntries()).toHaveLength(18)
    const roster=getMatchupRoster().find(x=>x.characterId==='luffy')!
    expect(roster.states.map(x=>x.id)).toEqual(['egghead-gear4','egghead-gear5'])
    expect(roster.defaultStateId).toBe('egghead-gear5')
    const g4=getMatchupBuilderView('luffy','teach','egghead-gear4')
    const g5=getMatchupBuilderView('luffy','teach','egghead-gear5')
    expect(g4?.matchup?.id).toBe('matchup-luffy-gear4-teach')
    expect(g5?.matchup?.id).toBe('matchup-luffy-gear5-teach')
    expect(getMatchupBuilderView('teach','luffy',undefined,'egghead-gear4')?.matchup?.id).toBe('matchup-luffy-gear4-teach')
    expect(getMatchupBuilderView('teach','luffy',undefined,'egghead-gear5')?.matchup?.id).toBe('matchup-luffy-gear5-teach')
    expect(getMatchupBuilderView('luffy','teach')?.matchup).toBeUndefined()
    for(const scenario of [g4!.matchup!,g5!.matchup!]){
      expect(scenario.assumptions.preparation).toBe('none')
      expect(scenario.assumptions.externalIntervention).toBe('none')
      expect(scenario.factors.length).toBeGreaterThanOrEqual(4)
      expect(scenario).not.toHaveProperty('winProbability')
      expect(scenario).not.toHaveProperty('winner')
      expect(scenario.factors.every(f=>['supported','unclear'].includes(f.confidence))).toBe(true)
      expect(scenario.factors.every(f=>f.uncertainty.trim().length>15)).toBe(true)
    }
  })
})
