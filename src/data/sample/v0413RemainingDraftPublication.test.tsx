// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { sampleEvaluations } from './evaluations'
import { v0412Evaluations } from './v0412EightEvaluations'
import {
  v0413EnelCharacter, v0413EnelMembership, v0413EnelEvaluation,
  v0413EnelEvidence, v0413EnelBattles, applyV0413KakuDraft,
} from './v0413RemainingDraftPublication'
import { getCharacterDetail } from '../../application/getCharacterDetail'
import { getUniqueCharacterList, getCharacterList } from '../../application/getCharacterList'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { characterRepository } from '../repositories/characterRepository'
import { groupRepository } from '../repositories/groupRepository'
import { getCharacterPortraitAsset } from '../media/characterPortraits'
import { CharacterPage } from '../../ui/pages/CharacterPage'
import { getCharacterQuoteReview } from '../quotes/characterQuotes'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { versionManifest } from '../integrity/versionManifest'
import { matchupRepository } from '../repositories/matchupRepository'

const originalKaku = sampleEvaluations.find(e => e.characterId === 'kaku')!
const originalScores = [73,72,75,75,79,72,74]
const approvedDraftScores = [77,75,75,78,84,75,78]
const enelScores = [88,72,72,88,84,70,87]

describe('v0.4.13: the two previously unshown v0.4.9 draft decisions', () => {
 it('adds exactly one new assessed person; Kaku remains same ID and one current Evaluation',()=>{
   expect(sampleEvaluations).toHaveLength(76)
   expect(v0412Evaluations).toHaveLength(8)
   expect(v050CurrentDataset.characters).toHaveLength(82)
   expect(v050CurrentDataset.evaluations).toHaveLength(86)
   expect(v050CurrentDataset.evaluations.flatMap(e=>e.items)).toHaveLength(602)
   expect(v050CurrentDataset.memberships).toHaveLength(107)
   expect(new Set(v050CurrentDataset.characters.map(c=>c.id)).size).toBe(82)
   expect(new Set(v050CurrentDataset.evaluations.map(e=>e.id)).size).toBe(86)
   expect(getUniqueCharacterList()).toHaveLength(83)
   expect(getCharacterList().some(x=>x.character.id==='enel' && x.group.id==='skypiea')).toBe(true)
   expect(groupRepository.getMembershipsForGroup('skypiea')).toContainEqual(v0413EnelMembership)
   expect(characterRepository.getCharacter('enel')).toEqual(v0413EnelCharacter)
   expect(groupRepository.getGroup('skypiea')?.name).toBe('하늘섬')
   expect(evaluationRepository.getEvaluations('kaku')).toHaveLength(1)
   expect(evaluationRepository.getEvaluations('enel')).toHaveLength(1)
   expect(matchupRepository.getAllMatchups()).toHaveLength(18)
   expect(versionManifest.calculationModelVersion).toBe('1.2')
   expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.21')
 })
 it('publishes exact draft score slate, without adding exceptional Haki Raw or unsupported canon status',()=>{
   expect(v0413EnelEvaluation.items.map(x=>x.score)).toEqual(enelScores)
   expect(v0413EnelEvaluation.items.map(x=>x.baseScore)).toEqual(enelScores)
   expect(v0413EnelEvaluation.items.every(x=>x.hakiContributions.length===0 && x.readiness!=='E1')).toBe(true)
   expect(v0413EnelEvaluation.status).toBe('draft')
   expect(v0413EnelEvaluation.subjectState?.id).toBe('skypiea')
   expect(v0413EnelEvidence).toHaveLength(2)
   expect(v0413EnelBattles).toHaveLength(2)
   expect(v0413EnelEvidence.every(e=>e.source.type==='supplementary' && e.subjectCharacterId==='enel')).toBe(true)
   const links=v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
   expect(validateEvaluation(v0413EnelEvaluation,links).errors).toEqual([])
   expect(getCombatPower('enel').finalScore).toBeCloseTo(566/7,10)
   expect(getStatRanking('overall')).toHaveLength(83)
   expect(getStatRanking('attack')).toHaveLength(82)
   expect(getCharacterDetail('enel','skypiea')?.evaluation.id).toBe('evaluation-v0413-enel')
 })
 it('versions Kaku revision without mutating older data, every other existing Evaluation unchanged',()=>{
   const current=evaluationRepository.getEvaluation('kaku')!
   expect(originalKaku.items.map(x=>x.score)).toEqual(originalScores)
   expect(current.items.map(x=>x.score)).toEqual(approvedDraftScores)
   expect(current.status).toBe('draft')
   expect(current.id).toBe(originalKaku.id)
   expect(current.items.map(x=>x.readiness)).toEqual(originalKaku.items.map(x=>x.readiness))
   expect(current.items.map(x=>x.hakiContributions)).toEqual(originalKaku.items.map(x=>x.hakiContributions))
   expect(current.items.map(x=>x.evidenceIds)).toEqual(originalKaku.items.map(x=>x.evidenceIds))
   expect(current.items.every(x=>x.score===getFinalStatScore(x))).toBe(true)
   expect(getCombatPower('kaku').finalScore).toBeCloseTo(542/7,10)
   for(const original of sampleEvaluations.filter(e=>!['kaku','kaido','linlin'].includes(e.characterId))){
     expect(evaluationRepository.getEvaluation(original.characterId,original.subjectState?.id)
       ?? evaluationRepository.getEvaluation(original.characterId)).toEqual(original)
     expect(applyV0413KakuDraft(original)).toBe(original)
   }
   const links=v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
   expect(validateEvaluation(current,links).errors).toEqual([])
 })
 it('shows Enel with the v0.4.14 user-provided portrait and sourced v0.4.15 quote',()=>{
   expect(getCharacterPortraitAsset('enel')).toMatchObject({fileName:'enel.webp',permission:'user-provided-unverified'})
   expect(getCharacterQuoteReview('enel')).toMatchObject({ characterId: 'enel', verificationStatus: 'official-excerpt', displayKorean: '나는 신이다…!!', translationStatus: 'editorial' })
   const html=renderToStaticMarkup(<CharacterPage characterId="enel" groupId="skypiea"
     onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
   expect(html).toContain('에넬')
   expect(html).toContain('핵심 전투 스탯')
   expect(html).toContain('나는 신이다…!!')
   expect(html).not.toContain('전투력 미평가')
 })
 it('includes both drafts in the current read-only audit without changing Frozen v0.3.3 baseline',()=>{
   const report=buildV050ReadOnlyAudit()
   expect(report.integrity.errors).toEqual([])
   expect(report.counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:86,axes:602,memberships:107,matchups:18})
   expect(report.rows.filter(r=>r.characterId==='enel')).toHaveLength(7)
   expect(report.rows.filter(r=>r.characterId==='kaku').map(r=>r.final)).toEqual(approvedDraftScores)
   expect(report.rows.filter(r=>r.characterId==='enel').every(r=>r.rawHaki===0)).toBe(true)
 })
})
