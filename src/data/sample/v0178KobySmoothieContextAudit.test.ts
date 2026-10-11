import { describe, expect, it } from 'vitest'
import { historicalEvaluationsBeforeV0174 } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { sampleCharacters } from './characters'
import { sampleMemberships } from './memberships'
import { sampleMatchups } from './matchups'
import { balancedV12 } from './calculationModels'
import { calibrationAnchorsV0172 } from './v0172AnchorBaseline'
import { applyV0174EvaluationCorrection } from './v0174TargetedCalibration'
import { applyV0175GrusEvidenceReview } from './v0175FocusedReview'
import { applyV0176KobyAttackCorrection } from './v0176KobyAttackRecalibration'
import { applyV0177KobyGrusRecalibration } from './v0177KobyGrusRecalibration'
import { applyV0178FocusedEvidenceReview, v0178KobyCaptivesEvidence, v0178HachinosuCaptivesBattle, v0178SmoothieEvasionEvidence, v0178FocusedReview } from './v0178KobySmoothieContextAudit'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { validateEvaluation } from '../../domain/evaluation/validation'

// Frozen pre-v0.1.79 replay for the v0.1.78 historical regression suite.
const sampleEvaluations=historicalEvaluationsBeforeV0174.map(applyV0174EvaluationCorrection)
  .map(applyV0175GrusEvidenceReview).map(applyV0176KobyAttackCorrection)
  .map(applyV0177KobyGrusRecalibration).map(applyV0178FocusedEvidenceReview)
const v0177Snapshot=()=>historicalEvaluationsBeforeV0174
  .map(applyV0174EvaluationCorrection).map(applyV0175GrusEvidenceReview)
  .map(applyV0176KobyAttackCorrection).map(applyV0177KobyGrusRecalibration)
const find=(id:string)=> {
  const e=sampleEvaluations.find(x=>x.characterId===id && x.isDefault!==false)
  if(!e)throw Error('missing '+id)
  return e
}
const finals=(e:typeof sampleEvaluations[number])=>e.items.map(i=>getFinalStatScore(i))
const raw=(e:typeof sampleEvaluations[number])=>e.items.map(i=>getRawHakiContributionTotal(i))
const overall=(e:typeof sampleEvaluations[number])=>calculateBalancedCombatPower(e,balancedV12).finalScore

describe('v0.1.78 — Hachinosu hostage probability and Smoothie opponent-evasion review',()=>{
  it('records real Hachinosu captives as distinct counterevidence to categorical no-civilians assumption',()=>{
    expect(sampleBattles.filter(b=>b.id===v0178HachinosuCaptivesBattle.id)).toHaveLength(1)
    const ev=sampleEvidence.filter(x=>x.id===v0178KobyCaptivesEvidence.id)
    expect(ev).toHaveLength(1)
    expect(ev[0].source.type).toBe('supplementary')
    expect(ev[0].source.description).toBe('https://one-piece.com/anime/67844/index.html')
    expect(ev[0].battleId).toBe(v0178HachinosuCaptivesBattle.id)
    expect(ev[0].subjectCharacterId).toBe('koby')
    expect(ev[0].fact).toContain('노예')
    expect(ev[0].interpretation).toContain('가능성')
    expect(ev[0].uncertainty).toContain('탑승 완료')
    const i=find('koby').items.find(x=>x.stat==='combatIQ')!
    expect(i.evidenceIds).toContain(v0178KobyCaptivesEvidence.id)
    expect(i.evidenceIds).toContain('evidence-v0170-koby-hurry')
    expect(i.rationale).toContain('적의 위장')
    expect(i.rationale).toContain('위험 식별')
    expect(i.rationale).toContain('이중 감점')
    expect(getFinalStatScore(i)).toBe(72)
    expect(find('koby').evaluationDataVersion).toBe('evaluation-0.1.78-koby-hachinosu-risk-context-evidence-only')
  })

  it('separates Smoothie giant slash damage potential from Nami and Jinbe avoiding shots; does not double count same chase',()=>{
    expect(sampleEvidence.filter(x=>x.id===v0178SmoothieEvasionEvidence.id)).toHaveLength(1)
    const ev=v0178SmoothieEvasionEvidence
    expect(ev.source.type).toBe('supplementary')
    expect(ev.source.description).toBe('https://one-piece.com/anime/o4939/index.html')
    expect(ev.battleId).toBe('whole-cake-smoothie-pursuit')
    expect(sampleBattles.some(b=>b.id===ev.battleId)).toBe(true)
    expect(ev.fact).toContain('나미')
    expect(ev.fact).toContain('징베')
    expect(ev.statContributions.find(x=>x.stat==='speed')?.role).toBe('context')
    const attack=find('smoothie').items.find(x=>x.stat==='attack')!
    expect(attack.evidenceIds).toContain('evidence-smoothie-pursuit-894')
    expect(attack.evidenceIds).toContain(ev.id)
    expect(attack.rationale).toContain('조타')
    expect(getFinalStatScore(attack)).toBe(76)
    expect(find('smoothie').items.find(x=>x.stat==='speed')?.readiness).toBe('E3')
    expect(find('smoothie').evaluationDataVersion).toBe('evaluation-0.1.78-smoothie-jinbe-steering-evidence-only')
  })

  it('preserves exact 65×7 Final, all Haki Raw, 63 other evaluation object identities and historic score replay',()=>{
    const snapshot=v0177Snapshot()
    const prior=new Map(snapshot.map(e=>[e.id,e]))
    expect(sampleEvaluations).toHaveLength(72)
    expect(sampleEvaluations.filter(e=>e.isDefault!==false)).toHaveLength(69)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(504)
    let changedMeta=0
    for(const now of sampleEvaluations){
      const old=prior.get(now.id)!
      expect(old).toBeDefined()
      expect(finals(now)).toEqual(finals(old))
      expect(raw(now)).toEqual(raw(old))
      expect(overall(now)).toBeCloseTo(overall(old),10)
      if(['koby','smoothie'].includes(now.characterId)){
        changedMeta++
        const axis=now.characterId==='koby'?'combatIQ':'attack'
        expect(now.evaluationDataVersion).not.toBe(old.evaluationDataVersion)
        for(const item of now.items){
          const earlier=old.items.find(x=>x.stat===item.stat)!
          if(item.stat===axis){
            expect(item.evidenceIds.length).toBe(earlier.evidenceIds.length+1)
            expect(item.baseScore).toBe(earlier.baseScore)
            expect(item.score).toBe(earlier.score)
            expect(item.hakiContributions).toEqual(earlier.hakiContributions)
            expect(item.readiness).toBe(earlier.readiness)
          }else expect(item).toEqual(earlier)
        }
      }else expect(now).toEqual(old)
    }
    expect(changedMeta).toBe(2)
    const k=snapshot.find(e=>e.characterId==='koby')!
    expect(k.evaluationDataVersion).toBe('evaluation-0.1.77-koby-combat-iq-context-calibrated')
    expect(k.items.find(i=>i.stat==='combatIQ')?.evidenceIds).not.toContain(v0178KobyCaptivesEvidence.id)
    const s=snapshot.find(e=>e.characterId==='smoothie')!
    expect(s.evaluationDataVersion).toBe('evaluation-0.1.26-draft')
    expect(s.items.find(i=>i.stat==='attack')?.evidenceIds).not.toContain(v0178SmoothieEvasionEvidence.id)
    expect(sampleCharacters).toHaveLength(70)
    expect(sampleMemberships).toHaveLength(92)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(.5)
    expect(sampleEvaluations.filter(x=>x.isDefault!==false).flatMap(e=>e.items)
      .reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(212)
    expect(sampleEvaluations.flatMap(e=>e.items)
      .reduce((sum,i)=>sum+getRawHakiContributionTotal(i),0)).toBe(230)
  })

  it('keeps referential consistency, five frozen overall anchors and all matchups stable',()=>{
    const ids=new Set(sampleEvidence.map(e=>e.id))
    expect(ids.size).toBe(sampleEvidence.length)
    expect(new Set(sampleBattles.map(b=>b.id)).size).toBe(sampleBattles.length)
    const battleIds=new Set(sampleBattles.map(b=>b.id))
    const owners=sampleEvidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    for(const x of [v0178KobyCaptivesEvidence,v0178SmoothieEvasionEvidence]){
      expect(battleIds.has(x.battleId)).toBe(true)
      expect(validateEvaluation(find(x.subjectCharacterId),owners)).toEqual({valid:true,errors:[]})
    }
    for(const a of calibrationAnchorsV0172.filter(a=>a.decision==='locked-overall')){
      expect(overall(find(a.characterId))).toBeCloseTo(a.finalScores.reduce((sum,v)=>sum+v,0)/7,10)
    }
    expect(getStatRanking('overall')).toHaveLength(69)
    expect(overall(find('koby'))).toBeCloseTo(521/7,10)
    expect(overall(find('prince-grus'))).toBeCloseTo(533/7,10)
    expect(overall(find('smoothie'))).toBeCloseTo(536/7,10)
    expect(()=>applyV0178FocusedEvidenceReview(find('koby'))).toThrow(/source version mismatch/)
    expect(()=>applyV0178FocusedEvidenceReview(find('smoothie'))).toThrow(/source version mismatch/)
  })

  it('documents nine cross-character axes against existing Wano combat evidence, not new scores',()=>{
    expect(v0178FocusedReview).toHaveLength(9)
    const expected=[
      ['koby','combatIQ',72,'E2'],
      ['smoothie','attack',76,'E2'],
      ['smoothie','speed',74,'E3'],
      ['sasaki','combatIQ',68,'E2'],
      ['sasaki','defense',79,'E2'],
      ['black-maria','versatility',84,'E2'],
      ['black-maria','combatIQ',74,'E2'],
      ['ulti','stamina',84,'E2'],
      ['page-one','defense',76,'E2'],
    ] as const
    for(const [id,stat,n,read] of expected){
      const review=v0178FocusedReview.find(x=>x.characterId===id&&x.stat===stat)
      expect(review?.final).toBe(n)
      expect(review?.readiness).toBe(read)
      const item=find(id).items.find(i=>i.stat===stat)
      expect(getFinalStatScore(item!),id+'/'+stat).toBe(n)
      expect(item?.readiness).toBe(read)
    }
    for(const evId of [
      'evidence-wano-detailed-sasaki-franky-1042-sasaki',
      'evidence-wano-detailed-blackmaria-robin-1044-black-maria',
      'evidence-wano-detailed-pageone-bigmom-1031-page-one'
    ])expect(sampleEvidence.some(e=>e.id===evId)).toBe(true)
  })
})
