// @vitest-environment jsdom
import {describe,it,expect} from 'vitest'
import {renderToStaticMarkup} from 'react-dom/server'
import {v0420MagellanCharacter,v0420MagellanMembership,v0420MagellanBattles,v0420MagellanEvidence,v0420MagellanEvaluation} from './v0420MagellanRegistration'
import {v050CurrentDataset,buildV050ReadOnlyAudit} from '../integrity/v050ReadOnlyAudit'
import {versionManifest} from '../integrity/versionManifest'
import {characterRepository} from '../repositories/characterRepository'
import {groupRepository} from '../repositories/groupRepository'
import {evaluationRepository} from '../repositories/evaluationRepository'
import {battleRepository} from '../repositories/battleRepository'
import {evidenceRepository} from '../repositories/evidenceRepository'
import {getCombatPower} from '../../application/getCombatPower'
import {getCharacterList} from '../../application/getCharacterList'
import {getStatRanking} from '../../application/getStatRanking'
import {CharacterPage} from '../../ui/pages/CharacterPage'
import {validateEvaluation} from '../../domain/evaluation/validation'
import {getFinalStatScore} from '../../domain/evaluation/score'
import {getCharacterPortraitAsset} from '../media/characterPortraits'
import {getCharacterQuoteReview} from '../quotes/characterQuotes'

describe('v0.4.20 Magellan approved registration',()=>{
 it('preserves 85 previous evaluations and 81 regular characters, models and matchups',()=>{
   const current=v050CurrentDataset
   expect(current.characters).toHaveLength(82)
   expect(current.evaluations).toHaveLength(86)
   expect(current.evaluations.flatMap(e=>e.items)).toHaveLength(602)
   expect(current.memberships).toHaveLength(107)
   expect(current.matchups).toHaveLength(18)
   expect(new Set(current.characters.map(c=>c.id)).size).toBe(82)
   expect(new Set(current.evaluations.map(e=>e.id)).size).toBe(86)
   expect(current.evaluations.filter(e=>e.characterId!=='magellan')).toHaveLength(85)
   expect(current.characters.filter(c=>c.id!=='magellan')).toHaveLength(81)
   expect(current.evaluations.find(e=>e.characterId==='magellan')).toEqual(v0420MagellanEvaluation)
   expect(versionManifest.calculationModelVersion).toBe('1.2')
   expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
   expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.21')
 })
 it('uses existing Impel Down group and exact Haki-neutral 86.00 in rank and profile',()=>{
   expect(characterRepository.getCharacter('magellan')).toEqual(v0420MagellanCharacter)
   expect(groupRepository.getMembershipsForGroup('impel-down')).toContainEqual(v0420MagellanMembership)
   expect(getCharacterList().some(x=>x.character.id==='magellan'&&x.group.id==='impel-down')).toBe(true)
   expect(evaluationRepository.getEvaluations('magellan')).toHaveLength(1)
   expect(v0420MagellanEvaluation.items.map(i=>i.score)).toEqual([92,83,82,80,91,83,91])
   expect(v0420MagellanEvaluation.items.every(i=>i.hakiContributions.length===0&&i.score===getFinalStatScore(i))).toBe(true)
   expect(getCombatPower('magellan').finalScore).toBe(86)
   expect(getStatRanking('overall').some(row=>row.characterId==='magellan'&&row.score===86)).toBe(true)
   expect(getStatRanking('overall')).toHaveLength(83)
   expect(getStatRanking('attack')).toHaveLength(82)
   expect(getCharacterPortraitAsset('magellan')).toBeUndefined()
   expect(getCharacterQuoteReview('magellan')).toBeUndefined()
 })
 it('links all four battle contexts and six supplementary official references',()=>{
   expect(v0420MagellanBattles).toHaveLength(4)
   expect(v0420MagellanEvidence).toHaveLength(6)
   const links=v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
   expect(validateEvaluation(v0420MagellanEvaluation,links).errors).toEqual([])
   for(const ev of v0420MagellanEvidence){
     expect(ev.source.type).toBe('supplementary')
     expect(ev.source.description).toContain('one-piece.com/anime/')
     expect(battleRepository.getBattle(ev.battleId)?.id).toBe(ev.battleId)
     expect(evidenceRepository.getEvidenceForBattle(ev.battleId)).toContainEqual(ev)
   }
   const report=buildV050ReadOnlyAudit()
   expect(report.integrity.errors).toEqual([])
   expect(report.counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:86,axes:602,memberships:107,matchups:18})
   expect(report.rows.filter(row=>row.characterId==='magellan').map(row=>row.final)).toEqual([92,83,82,80,91,83,91])
   expect(report.rows.filter(row=>row.characterId==='magellan').every(row=>row.rawHaki===0)).toBe(true)
 })
 it('renders the ordinary CharacterPage instead of Charlos special',()=>{
   const html=renderToStaticMarkup(<CharacterPage characterId="magellan" groupId="impel-down" onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
   expect(html).toContain('마젤란')
   expect(html).toContain('핵심 전투 스탯')
   expect(html).toContain('86')
   expect(html).not.toContain('천룡인식')
 })
})
