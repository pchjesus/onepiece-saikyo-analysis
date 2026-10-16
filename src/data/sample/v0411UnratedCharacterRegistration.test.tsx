// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { sampleCharacters } from './characters'
import { characterRepository } from '../repositories/characterRepository'
import { groupRepository } from '../repositories/groupRepository'
import { sampleMemberships } from './memberships'
import { sampleEvaluations } from './evaluations'
import { v0411Characters, v0411Memberships } from './v0411UnratedCharacterRegistration'
import { getCharacterQuoteReview, characterQuoteReviews } from '../quotes/characterQuotes'
import { getCharacterPortraitAsset } from '../media/characterPortraits'
import { CharacterPage } from '../../ui/pages/CharacterPage'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { getCharacterList, getUniqueCharacterList } from '../../application/getCharacterList'
import { getStatRanking } from '../../application/getStatRanking'
import { sampleMatchups } from './matchups'

const ids=['guernica','maha','usopp','nami','chopper','robin','franky','brook']

describe('v0.4.11 eight character-only registrations', () => {
  it('preserves eight existing profile records and original 76 source evaluations', () => {
    expect(v0411Characters.map(c=>c.id)).toEqual(ids)
    expect(v0411Memberships.map(m=>m.characterId)).toEqual(ids)
    expect(sampleCharacters).toHaveLength(72)
    expect(characterRepository.getCharacters()).toHaveLength(81)
    expect(new Set(characterRepository.getCharacters().map(c=>c.id)).size).toBe(81)
    expect(sampleMemberships).toHaveLength(97)
    expect(groupRepository.getMemberships()).toHaveLength(106)
    expect(getUniqueCharacterList()).toHaveLength(81)
    expect(sampleEvaluations).toHaveLength(76)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(532)
    expect(sampleMatchups).toHaveLength(15)
    for (const id of ids) expect(sampleEvaluations.some(e=>e.characterId===id)).toBe(false)
    expect(getStatRanking('overall')).toHaveLength(81)
    for(const id of ids) expect(evaluationRepository.getEvaluations(id)).toHaveLength(1)
  })

  it('exposes eight users in the existing group chooser/organization instead of adding a group', () => {
    const listed = getCharacterList()
    const expected={ guernica:'cp0',maha:'cp0',usopp:'straw-hat-pirates',nami:'straw-hat-pirates',
      chopper:'straw-hat-pirates',robin:'straw-hat-pirates',franky:'straw-hat-pirates',brook:'straw-hat-pirates' }
    for(const [id,groupId] of Object.entries(expected)){
      expect(listed.some(({character,group})=>character.id===id&&group.id===groupId)).toBe(true)
      const page=renderToStaticMarkup(<CharacterPage characterId={id} groupId={groupId} onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
      expect(page).not.toContain('전투력 미평가')
      expect(page).toContain('핵심 전투 스탯')
      expect(page).toContain('character-portrait')
    }
  })

  it('keeps one quote slot per 80 characters; activates only sourced Straw Hat quotes', () => {
    expect(Object.keys(characterQuoteReviews)).toHaveLength(81)
    expect(Object.values(characterQuoteReviews).filter(q=>q.verificationStatus==='official-excerpt')).toHaveLength(14)
    expect(Object.values(characterQuoteReviews).filter(q=>q.verificationStatus==='pending')).toHaveLength(1)
    for(const id of ['nami','chopper','robin','franky','brook']){
      const review=getCharacterQuoteReview(id)!
      expect(review.verificationStatus).toBe('official-excerpt')
      expect(review.translationStatus).toBe('editorial')
      expect(review.source?.url).toBe('https://one-piece.com/news/o20220411_13783/index.html')
      const page=renderToStaticMarkup(<CharacterPage characterId={id} groupId='straw-hat-pirates' onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
      expect(page).toContain('대표 명대사')
    }
    for(const id of ['maha']){
      expect(getCharacterQuoteReview(id)?.verificationStatus).toBe('secondary-excerpt')
      expect(renderToStaticMarkup(<CharacterPage characterId={id} groupId='cp0' onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)).toContain('대표 명대사')
    }
  })
  it('shows Guernica sourced 1042 exclamation in the CP0 detail card', () => {
    expect(getCharacterQuoteReview('guernica')?.verificationStatus).toBe('secondary-excerpt')
    expect(renderToStaticMarkup(<CharacterPage characterId='guernica' groupId='cp0' onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)).toContain('부럽군')
  })
  it('resolves the user-uploaded eight image identifiers with explicit unverified rights',()=>{
    for(const id of ids){
      const p=getCharacterPortraitAsset(id)
      expect(p?.fileName).toBe(id+'.webp')
      expect(p?.permission).toBe('user-provided-unverified')
    }
  })
})
