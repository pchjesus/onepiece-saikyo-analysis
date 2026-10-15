import { describe, expect, it } from 'vitest'
import { sampleCharacters } from '../sample/characters'
import { v0411Characters } from '../sample/v0411UnratedCharacterRegistration'
import { characterQuoteReviews, getCharacterQuoteReview } from './characterQuotes'

describe('v0.4.10 character quote source integrity', () => {
  it('tracks precisely one quote-review slot per registered unique character', () => {
    const ids = sampleCharacters.map(({ id }) => id)
    expect(ids).toHaveLength(72)
    expect(new Set(ids).size).toBe(ids.length)
    expect(Object.keys(characterQuoteReviews).sort()).toEqual([...ids,...v0411Characters.map(c=>c.id)].sort())
    expect(Object.entries(characterQuoteReviews).every(([id, review]) => id === review.characterId)).toBe(true)
    expect(getCharacterQuoteReview('missing-character')).toBeUndefined()
  })
  it('requires traceable official Japanese text for every displayed quote and leaves unverified slots empty', () => {
    const reviews = Object.values(characterQuoteReviews)
    const official = reviews.filter(item => item.verificationStatus === 'official-excerpt')
    const secondary = reviews.filter(item => item.verificationStatus === 'secondary-excerpt')
    const pending = reviews.filter(item => item.verificationStatus === 'pending')
    expect(official).toHaveLength(15)
    expect(secondary).toHaveLength(54)
    expect(pending).toHaveLength(11)
    expect(pending.every(item => !item.originalJapanese && !item.displayKorean && !item.source)).toBe(true)
    for (const quote of official) {
      expect(quote.originalJapanese?.trim().length).toBeGreaterThan(5)
      expect(quote.displayKorean?.trim().length).toBeGreaterThan(5)
      expect(quote.context?.trim().length).toBeGreaterThan(5)
      expect(quote.source?.url).toMatch(/^https:\/\/one-piece\.com\//)
      expect(quote.translationStatus).toBe('editorial')
      expect(quote.verificationStatus).toBe('official-excerpt')
      expect(quote.mangaChapter).toBeUndefined() // Never invent manga chapters.
    }
  })
  it('distinguishes selected second-party transcriptions from primary-manga verification', () => {
    for(const id of ['newgate','usopp','garp','kaido','kizaru','burgess','doflamingo','roger']){
      const q = getCharacterQuoteReview(id)!
      expect(q.verificationStatus).toBe('secondary-excerpt')
      expect(q.translationStatus).toBe('editorial')
      expect(q.mangaChapter).toBeGreaterThan(0)
      expect(q.source?.url).toMatch(/^https:\/\//)
      expect(q.originalJapanese?.trim().length).toBeGreaterThan(5)
    }
    expect(getCharacterQuoteReview('newgate')?.displayKorean).toContain('사랑하마')
    expect(getCharacterQuoteReview('usopp')?.displayKorean).toContain('동료의 꿈')
    expect(getCharacterQuoteReview('garp')?.displayKorean).toContain('해군의 미래')
    expect(getCharacterQuoteReview('kaido')?.displayKorean).toContain('전쟁만이')
    expect(getCharacterQuoteReview('kizaru')?.displayKorean).toContain('친구를 죽여본')
    expect(getCharacterQuoteReview('burgess')?.displayKorean).toContain('힘힘 열매')
    expect(getCharacterQuoteReview('doflamingo')?.displayKorean).toContain('해적이 악')
    expect(getCharacterQuoteReview('roger')?.displayKorean).toContain('세상의 모든')
    for(const q of secondary){
      expect(q.source?.url).toMatch(/^https:\/\//)
      expect(q.mangaChapter).toBeGreaterThan(0)
      expect(q.translationStatus).toBe('editorial')
    }
  })
  it('does not bind the quote to a character Evaluation/state and does not backfill the Kaku draft', () => {
    expect(getCharacterQuoteReview('luffy')?.characterId).toBe('luffy')
    expect(getCharacterQuoteReview('newgate')?.characterId).toBe('newgate')
    expect(getCharacterQuoteReview('kaku')?.verificationStatus).toBe('secondary-excerpt')
    expect(sampleCharacters.find(c => c.id === 'kaku')).toBeDefined()
    expect(sampleCharacters.find(c => c.id === 'enel')).toBeUndefined()
  })
})
