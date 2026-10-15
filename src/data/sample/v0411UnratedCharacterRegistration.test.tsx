// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { sampleCharacters } from './characters'
import { sampleMemberships } from './memberships'
import { sampleEvaluations } from './evaluations'
import { v0411Characters, v0411Memberships } from './v0411UnratedCharacterRegistration'
import { getCharacterQuoteReview, characterQuoteReviews } from '../quotes/characterQuotes'
import { getCharacterPortraitAsset } from '../media/characterPortraits'
import { UnratedCharacterPage } from '../../ui/pages/UnratedCharacterPage'
import { getCharacterList, getUniqueCharacterList } from '../../application/getCharacterList'
import { getStatRanking } from '../../application/getStatRanking'
import { sampleMatchups } from './matchups'

const ids=['guernica','maha','usopp','nami','chopper','robin','franky','brook']

describe('v0.4.11 eight character-only registrations', () => {
  it('adds eight new identities, no evaluations, and no extra matchups', () => {
    expect(v0411Characters.map(c=>c.id)).toEqual(ids)
    expect(v0411Memberships.map(m=>m.characterId)).toEqual(ids)
    expect(sampleCharacters).toHaveLength(80)
    expect(new Set(sampleCharacters.map(c=>c.id)).size).toBe(80)
    expect(sampleMemberships).toHaveLength(105)
    expect(getUniqueCharacterList()).toHaveLength(80)
    expect(sampleEvaluations).toHaveLength(76)
    expect(sampleEvaluations.flatMap(e=>e.items)).toHaveLength(532)
    expect(sampleMatchups).toHaveLength(17)
    for (const id of ids) expect(sampleEvaluations.some(e=>e.characterId===id)).toBe(false)
    expect(getStatRanking('overall')).toHaveLength(72)
  })

  it('exposes eight users in the existing group chooser/organization instead of adding a group', () => {
    const listed = getCharacterList()
    const expected={ guernica:'cp0',maha:'cp0',usopp:'straw-hat-pirates',nami:'straw-hat-pirates',
      chopper:'straw-hat-pirates',robin:'straw-hat-pirates',franky:'straw-hat-pirates',brook:'straw-hat-pirates' }
    for(const [id,groupId] of Object.entries(expected)){
      expect(listed.some(({character,group})=>character.id===id&&group.id===groupId)).toBe(true)
      const page=renderToStaticMarkup(<UnratedCharacterPage characterId={id} groupId={groupId}/>)
      expect(page).toContain('전투력 미평가')
      expect(page).not.toContain('종합 전투력 · 현재 계산값')
      expect(page).toContain('character-portrait')
    }
  })

  it('keeps one quote slot per 80 characters; activates only sourced Straw Hat quotes', () => {
    expect(Object.keys(characterQuoteReviews)).toHaveLength(80)
    expect(Object.values(characterQuoteReviews).filter(q=>q.verificationStatus==='official-excerpt')).toHaveLength(19)
    expect(Object.values(characterQuoteReviews).filter(q=>q.verificationStatus==='pending')).toHaveLength(61)
    for(const id of ['usopp','nami','chopper','robin','franky','brook']){
      const review=getCharacterQuoteReview(id)!
      expect(review.verificationStatus).toBe('official-excerpt')
      expect(review.translationStatus).toBe('editorial')
      expect(review.source?.url).toBe('https://one-piece.com/news/o20220411_13783/index.html')
      const page=renderToStaticMarkup(<UnratedCharacterPage characterId={id} groupId='straw-hat-pirates' />)
      expect(page).toContain('대표 명대사')
    }
    for(const id of ['guernica','maha']){
      expect(getCharacterQuoteReview(id)?.verificationStatus).toBe('pending')
      expect(renderToStaticMarkup(<UnratedCharacterPage characterId={id} groupId='cp0' />)).not.toContain('대표 명대사')
    }
  })
  it('resolves the user-uploaded eight image identifiers with explicit unverified rights',()=>{
    for(const id of ids){
      const p=getCharacterPortraitAsset(id)
      expect(p?.fileName).toBe(id+'.webp')
      expect(p?.permission).toBe('user-provided-unverified')
    }
  })
})
