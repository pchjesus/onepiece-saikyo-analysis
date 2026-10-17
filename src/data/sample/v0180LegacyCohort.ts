import { v0180Characters } from './v0180CharacterExpansion'
import { v0411Characters } from './v0411UnratedCharacterRegistration'
import { sampleCharacters } from './characters'
import { evaluationsBeforeV044 } from './evaluations'
import { balancedV12 } from './calculationModels'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { calculateBalancedCombatPower } from '../../domain/calculation/calculateCombatPower'
import { sampleMemberships } from './memberships'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { getStatRanking } from '../../application/getStatRanking'
import { getCharacterList, getUniqueCharacterList } from '../../application/getCharacterList'
import type { RankingStat } from '../../application/getStatRanking'

/** Frozen v0.1.79 legacy cohort; does not rewrite or alter live v0.1.80 data. */
// Keep v0.1.79 historical regression cohorts isolated from later v0.4.1 Luffy addition.
// The independent canonical v0.3.3 archive remains src/data/baselines/v0.3.3.json.
const added = new Set([...v0180Characters.map(x=>x.id), ...v0411Characters.map(x=>x.id), 'izo', 'luffy', 'enel', 'charlos', 'magellan'])
const newEvaluationCharacters = new Set(['buggy', 'izo'])
const newRogerMembership = (x: { characterId: string; groupId: string }) =>
  x.groupId === 'roger-pirates' && ['shanks','inuarashi','nekomamushi'].includes(x.characterId)
export const legacyCharacters=sampleCharacters.filter(x=>!added.has(x.id))
export const legacyEvaluations=evaluationsBeforeV044.filter(x=>!added.has(x.characterId) && !newEvaluationCharacters.has(x.characterId))
export const legacyMemberships=sampleMemberships.filter(x=>!added.has(x.characterId)&&!newRogerMembership(x)&&x.characterId!=='buggy')
export const legacyEvidence=sampleEvidence.filter(x=>!added.has(x.subjectCharacterId)&&!['buggy','izo'].includes(x.subjectCharacterId))
export const legacyBattles=sampleBattles.filter(x=>!x.id.startsWith('battle-v0180-')&&!x.id.startsWith('buggy-')&&!x.id.startsWith('izo-')&&!x.id.startsWith('luffy-'))
export const getLegacyCharacterList=()=>getCharacterList().filter(x=>!added.has(x.character.id)&&!newRogerMembership({characterId:x.character.id,groupId:x.group.id}))
export const getLegacyUniqueCharacterList=()=>getUniqueCharacterList().filter(x=>!added.has(x.character.id)&&x.character.id!=='buggy')
export const getLegacyStatRanking=(stat:RankingStat)=>{
  // Historical score/rank must not silently drift when later live revisions change Teach/Mihawk.
  const sorted=getStatRanking(stat).filter(x=>!added.has(x.characterId)&&x.characterId!=='buggy').map(row=>{
    const prior=legacyEvaluations.find(e=>e.characterId===row.characterId && e.isDefault!==false)
    if(!prior)return row
    const item=stat==='overall'?undefined:prior.items.find(i=>i.stat===stat)
    const score=stat==='overall'
      ? calculateBalancedCombatPower(prior,balancedV12).finalScore
      : item?getFinalStatScore(item,balancedV12.configuration.hakiWeight):row.score
    return {...row,score}
  }).sort((a,b)=>b.score-a.score||a.characterName.localeCompare(b.characterName,'ko'))
  return sorted.map((x,i)=>({...x,rank:sorted.findIndex(y=>y.score===x.score)+1}))
}
