import { v0180Characters } from './v0180CharacterExpansion'
import { sampleCharacters } from './characters'
import { sampleEvaluations } from './evaluations'
import { sampleMemberships } from './memberships'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { getStatRanking } from '../../application/getStatRanking'
import { getCharacterList, getUniqueCharacterList } from '../../application/getCharacterList'
import type { RankingStat } from '../../application/getStatRanking'

/** Frozen v0.1.79 legacy cohort; does not rewrite or alter live v0.1.80 data. */
const added = new Set(v0180Characters.map(x=>x.id))
export const legacyCharacters=sampleCharacters.filter(x=>!added.has(x.id))
export const legacyEvaluations=sampleEvaluations.filter(x=>!added.has(x.characterId))
export const legacyMemberships=sampleMemberships.filter(x=>!added.has(x.characterId))
export const legacyEvidence=sampleEvidence.filter(x=>!added.has(x.subjectCharacterId))
export const legacyBattles=sampleBattles.filter(x=>!x.id.startsWith('battle-v0180-'))
export const getLegacyCharacterList=()=>getCharacterList().filter(x=>!added.has(x.character.id))
export const getLegacyUniqueCharacterList=()=>getUniqueCharacterList().filter(x=>!added.has(x.character.id))
export const getLegacyStatRanking=(stat:RankingStat)=>{
  const sorted=getStatRanking(stat).filter(x=>!added.has(x.characterId))
  return sorted.map((x,i)=>({...x,rank:sorted.findIndex(y=>y.score===x.score)+1}))
}
