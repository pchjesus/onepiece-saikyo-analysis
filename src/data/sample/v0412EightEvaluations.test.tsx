// @vitest-environment jsdom
import {describe,expect,it} from 'vitest'
import {renderToStaticMarkup} from 'react-dom/server'
import {v0412Evaluations,v0412Evidence,v0412Battles,v0412Seeds} from './v0412EightEvaluations'
import {sampleEvaluations} from './evaluations'
import {sampleCharacters} from './characters'
import {sampleGroups} from './groups'
import {sampleMemberships} from './memberships'
import {sampleBattles,sampleBattleParticipants} from './battles'
import {sampleEvidence} from './evidence'
import {v0411Characters,v0411Memberships} from './v0411UnratedCharacterRegistration'
import {evaluationRepository} from '../repositories/evaluationRepository'
import {matchupRepository} from '../repositories/matchupRepository'
import {sampleMatchups} from './matchups'
import {luffyTeachStateMatchups} from './luffyTeachStateMatchups'
import {balancedV12} from './calculationModels'
import {auditCombatDataset} from '../integrity/auditDataset'
import {getCharacterDetail} from '../../application/getCharacterDetail'
import {getStatRanking} from '../../application/getStatRanking'
import {getCombatPower} from '../../application/getCombatPower'
import {validateEvaluation} from '../../domain/evaluation/validation'
import {CharacterPage} from '../../ui/pages/CharacterPage'
import {versionManifest} from '../integrity/versionManifest'

const expected:Record<string,number[]> = {
  guernica:[78,76,76,81,84,80,75],maha:[75,70,73,77,80,72,70],
  usopp:[63,61,70,62,88,76,79],brook:[76,69,75,86,85,77,82],
  franky:[82,83,83,68,83,79,82],chopper:[76,75,70,67,82,73,84],
  robin:[79,68,73,69,86,81,84],nami:[77,59,61,63,84,83,87],
}
const lookup=Object.keys(expected)
describe('v0.4.12 eight new provisional combat evaluations',()=>{
 it('keeps frozen 72 evaluated identities and adds eight distinct source-scoped drafts',()=>{
   expect(sampleCharacters).toHaveLength(72)
   expect(sampleEvaluations).toHaveLength(76)
   expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(532)
   expect(v0411Characters).toHaveLength(8)
   expect(v0412Seeds.map(x=>x.id)).toEqual(lookup)
   expect(v0412Evaluations).toHaveLength(8)
   expect(v0412Evaluations.flatMap(e=>e.items)).toHaveLength(56)
   expect(new Set([...sampleEvaluations,...v0412Evaluations].map(e=>e.id)).size).toBe(84)
   for(const evaluation of v0412Evaluations){
     expect(evaluation.status).toBe('draft')
     expect(evaluation.isDefault).toBe(true)
     expect(evaluation.items.map(x=>x.score)).toEqual(expected[evaluation.characterId])
     expect(evaluation.items.every(x=>x.hakiContributions.length===0)).toBe(true)
     expect(evaluation.items.every(x=>['E2','E3'].includes(x.readiness!))).toBe(true)
     expect(evaluation.items.every(x=>x.rationale.length>50)).toBe(true)
     expect(evaluation.items.some(x=>x.evidenceIds.length>0)).toBe(true)
     expect(evaluation.items.filter(x=>x.evidenceIds.length===0).every(x=>x.readiness==='E3')).toBe(true)
     const allEvidence=[...sampleEvidence,...v0412Evidence].map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
     expect(validateEvaluation(evaluation,allEvidence).errors).toEqual([])
   }
   expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.20')
   expect(balancedV12.configuration.hakiWeight).toBe(.5)
 })
 it('preserves ID ownership, battle context and immutable historical source data',()=>{
   expect(v0412Battles.length).toBe(v0412Evidence.length)
   expect(v0412Evidence.every(e=>e.source.type==='supplementary')).toBe(true)
   const context=new Set(v0412Battles.map(b=>b.id))
   expect(v0412Evidence.every(e=>context.has(e.battleId))).toBe(true)
   expect(v0412Evidence.every(e=>e.uncertainty.length>35)).toBe(true)
   expect(sampleEvaluations.some(e=>lookup.includes(e.characterId))).toBe(false)
   const report=auditCombatDataset({
     characters:[...sampleCharacters,...v0411Characters],
     groups:sampleGroups,
     memberships:[...sampleMemberships,...v0411Memberships],
     battles:[...sampleBattles,...v0412Battles],
     participants:sampleBattleParticipants,
     evidence:[...sampleEvidence,...v0412Evidence],
     evaluations:[...sampleEvaluations,...v0412Evaluations],
     model:balancedV12,
     // Original 80-person cohort excludes Enel; protect the former 17 source pairings.
     matchups:[...sampleMatchups,...luffyTeachStateMatchups],
   })
   expect(report.errors).toEqual([])
 })
 it('makes each new person selectable in rankings and normal evaluated detail UI',()=>{
   expect(getStatRanking('overall')).toHaveLength(83)
   expect(getStatRanking('attack')).toHaveLength(82)
   expect(evaluationRepository.getEvaluations('kaku')).toHaveLength(1)
   expect(evaluationRepository.getEvaluations('enel')).toHaveLength(1)
   expect(matchupRepository.getAllMatchups()).toHaveLength(18)
   for(const id of lookup){
     const e=v0412Evaluations.find(e=>e.characterId===id)!
     const g=v0411Memberships.find(m=>m.characterId===id)!.groupId
     expect(getCharacterDetail(id,g)?.evaluation.id).toBe(e.id)
     expect(getCombatPower(id).finalScore).toBeCloseTo(expected[id].reduce((a,b)=>a+b,0)/7,10)
     const html=renderToStaticMarkup(<CharacterPage characterId={id} groupId={g}
       onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
     expect(html).toContain('핵심 전투 스탯')
     expect(html).not.toContain('전투력 미평가')
   }
 })
})
