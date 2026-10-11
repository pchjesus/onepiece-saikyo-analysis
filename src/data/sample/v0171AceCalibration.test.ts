import { describe, expect, it } from 'vitest'
import { v0171AceScoring, v0171AceEvidence, v0171AceBattles, v0171AceEvaluation } from './v0171AceCalibration'
import { v0170Evaluations } from './v0170GroupAceExpansion'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { getStatRanking } from '../../application/getStatRanking'

const ace=()=>sampleEvaluations.find(e=>e.characterId==='ace')!
const oldAce=()=>v0170Evaluations.find(e=>e.characterId==='ace')!

describe('v0.1.71 Ace direct-evidence correction, deterministic rollback and original cohort regression',()=>{
  it('applies exactly the seven sourced Ace replacements and no new exceptional Haki',()=>{
    expect(Object.keys(v0171AceScoring)).toEqual(['attack','defense','stamina','speed','techniqueMastery','combatIQ','versatility'])
    expect(oldAce().items.map(x=>x.score)).toEqual([84,77,82,78,85,78,85])
    expect(ace()).toBe(v0171AceEvaluation)
    expect(ace().items.map(x=>x.score)).toEqual([79,76,82,78,78,67,78])
    expect(ace().items.map(x=>x.baseScore)).toEqual([79,76,82,78,78,67,78])
    expect(ace().items.map(x=>x.readiness)).toEqual(oldAce().items.map(x=>x.readiness))
    expect(ace().evaluationDataVersion).toBe('evaluation-0.1.71-ace-context-recalibrated')
    expect(calculateBalancedCombatPower(ace(),balancedV12).finalScore).toBeCloseTo(538/7,10)
    expect(calculateBalancedCombatPower(oldAce(),balancedV12).finalScore).toBeCloseTo(569/7,10)
    expect(ace().items.flatMap(x=>x.hakiContributions)).toEqual([])
    expect(sampleCharacters.find(c=>c.id==='ace')?.combatProfile.haki.capabilities.find(h=>h.type==='conquerors')?.status).toBe('confirmed')
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(sampleMatchups).toHaveLength(15)
    expect(sampleEvaluations).toHaveLength(72)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(69)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(504)
    expect(sampleEvaluations.flatMap(e=>e.items).reduce((s,e)=>s+getRawHakiContributionTotal(e),0)).toBe(230)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false).flatMap(e=>e.items).reduce((s,e)=>s+getRawHakiContributionTotal(e),0)).toBe(212)
  })

  it('preserves historical v0.1.70 source and all post-Ace values except separately versioned Grus evidence metadata',()=>{
    expect(sampleEvaluations.filter(e=>e.characterId==='ace')).toHaveLength(1)
    expect(v0170Evaluations.filter(e=>e.characterId==='ace')).toHaveLength(1)
    expect(sampleEvaluations.filter(e=>e.characterId!=='ace')).toHaveLength(71)
    const priorMap=new Map(v0170Evaluations.filter(e=>e.characterId!=='ace').map(e=>[e.characterId,e]))
    for(const [id,baseline] of priorMap){
      const current=sampleEvaluations.find(e=>e.characterId===id)!
      if(id==='koby'){
        expect(current.evaluationDataVersion).toBe('evaluation-0.1.78-koby-hachinosu-risk-context-evidence-only')
        expect(current.items.map(i=>i.score)).toEqual([77,73,77,78,77,72,67])
        expect(baseline.items.map(i=>i.score)).toEqual([82,73,77,78,77,76,67])
        expect(current.items.filter(i=>!['attack','combatIQ'].includes(i.stat))).toEqual(baseline.items.filter(i=>!['attack','combatIQ'].includes(i.stat)))
        expect(current.items.map(i=>i.hakiContributions)).toEqual(baseline.items.map(i=>i.hakiContributions))
      } else if(id==='prince-grus'){
        expect(current.evaluationDataVersion).toBe('evaluation-0.1.77-grus-single-clay-system-versatility-calibrated')
        expect(current.items.map(i=>i.score)).toEqual([72,77,74,71,81,78,80])
        expect(baseline.items.map(i=>i.score)).toEqual([72,77,74,71,81,78,85])
        expect(current.items.map(i=>i.hakiContributions)).toEqual(baseline.items.map(i=>i.hakiContributions))
        expect(baseline.evaluationDataVersion).toBe('evaluation-0.1.70-expansion-draft')
      } else expect(current).toEqual(baseline)
    }
    expect(sampleEvaluations.find(e=>e.characterId==='teach')?.items.map(x=>x.score)).toEqual([95,89,95,82,93,87,93])
    expect(sampleEvaluations.find(e=>e.characterId==='vista')?.items.map(x=>x.score)).toEqual([82,79,77,80,87,77,74])
    expect(sampleEvaluations.find(e=>e.characterId==='jozu')?.items.map(x=>x.score)).toEqual([78,84,78,79,74,75,74])
  })

  it('records five new owned Evidence entries, reusing existing Jinbe/Teach Battle identity',()=>{
    expect(v0171AceEvidence).toHaveLength(5)
    expect(v0171AceBattles).toHaveLength(3)
    expect(new Set(sampleBattles.map(b=>b.id)).size).toBe(sampleBattles.length)
    expect(new Set(sampleEvidence.map(e=>e.id)).size).toBe(sampleEvidence.length)
    expect(v0171AceEvidence.find(e=>e.id==='evidence-v0171-ace-jinbe-five-days-552')?.battleId).toBe('pre-timeskip-jinbe-ace')
    expect(v0171AceEvidence.find(e=>e.id==='evidence-v0171-ace-teach-arsenal-441')?.battleId).toBe('banaro-teach-ace')
    expect(v0171AceBattles.some(e=>e.id==='banaro-teach-ace'||e.id==='pre-timeskip-jinbe-ace')).toBe(false)
    const battleSet=new Set(sampleBattles.map(b=>b.id))
    const refs=sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    for(const e of v0171AceEvidence){
      expect(e.subjectCharacterId).toBe('ace')
      expect(e.source.type).toBe('supplementary')
      expect(e.source.description).toContain('https://')
      expect(e.evidenceStrength).not.toBe('unclear')
      expect(e.uncertainty.length).toBeGreaterThan(30)
      expect(battleSet.has(e.battleId),e.id).toBe(true)
      expect(e.statContributions.length).toBeGreaterThanOrEqual(2)
    }
    expect(validateEvaluation(ace(),refs)).toEqual({valid:true,errors:[]})
    for(const axis of ace().items){
      expect(axis.evidenceIds.length,axis.stat).toBeGreaterThanOrEqual(2)
      for(const id of axis.evidenceIds){
        expect(sampleEvidence.find(e=>e.id===id)?.subjectCharacterId,id).toBe('ace')
      }
    }
  })

  it('preserves physical five-day context without extrapolation and makes retreat decision a separate major IQ limit',()=>{
    const iq=ace().items.find(e=>e.stat==='combatIQ')!
    const sta=ace().items.find(e=>e.stat==='stamina')!
    const tech=ace().items.find(e=>e.stat==='techniqueMastery')!
    const versatility=ace().items.find(e=>e.stat==='versatility')!
    expect(iq.score).toBe(67)
    expect(iq.evidenceIds).toContain('evidence-v0171-ace-akainu-turnback-573')
    expect(iq.rationale).toContain('퇴각')
    expect(iq.rationale).toContain('도발')
    expect(sta.score).toBe(82)
    expect(sta.evidenceIds).toContain('evidence-v0171-ace-jinbe-five-days-552')
    expect(tech.score).toBe(78)
    expect(versatility.score).toBe(78)
    expect(versatility.rationale).toContain('비스타74')
    expect(versatility.rationale).toContain('죠즈74')
    expect(getStatRanking('overall').find(e=>e.characterId==='ace')?.score).toBeCloseTo(538/7,10)
    expect(getStatRanking('overall').find(e=>e.characterId==='ace')).toMatchObject({groupId:'whitebeard-pirates'})
  })
})
