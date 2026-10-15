import { describe, expect, it } from 'vitest'
import { sampleCharacters } from '../sample/characters'
import { characterQuoteReviews, getCharacterQuoteReview } from './characterQuotes'

describe('v0.4.10 character quote source integrity', () => {
  it('tracks precisely one quote-review slot per registered unique character', () => {
    const ids = sampleCharacters.map(({ id }) => id)
    expect(ids).toHaveLength(72)
    expect(new Set(ids).size).toBe(ids.length)
    expect(Object.keys(characterQuoteReviews).sort()).toEqual([...ids].sort())
    expect(Object.entries(characterQuoteReviews).every(([id, review]) => id === review.characterId)).toBe(true)
    expect(getCharacterQuoteReview('missing-character')).toBeUndefined()
  })
  it('requires traceable official Japanese text for every displayed quote and leaves unverified slots empty', () => {
    const reviews = Object.values(characterQuoteReviews)
    const selected = reviews.filter(item => item.verificationStatus !== 'pending')
    const pending = reviews.filter(item => item.verificationStatus === 'pending')
    expect(selected).toHaveLength(13)
    expect(pending).toHaveLength(59)
    expect(pending.every(item => !item.originalJapanese && !item.displayKorean && !item.source)).toBe(true)
    for (const quote of selected) {
      expect(quote.originalJapanese?.trim().length).toBeGreaterThan(5)
      expect(quote.displayKorean?.trim().length).toBeGreaterThan(5)
      expect(quote.context?.trim().length).toBeGreaterThan(5)
      expect(quote.source?.url).toMatch(/^https:\/\/one-piece\.com\//)
      expect(quote.translationStatus).toBe('editorial')
      expect(quote.verificationStatus).toBe('official-excerpt')
      expect(quote.mangaChapter).toBeUndefined() // Never invent manga chapters.
    }
  })
  it('does not bind the quote to a character Evaluation/state and does not backfill the Kaku draft', () => {
    expect(getCharacterQuoteReview('luffy')?.characterId).toBe('luffy')
    expect(getCharacterQuoteReview('newgate')?.characterId).toBe('newgate')
    expect(getCharacterQuoteReview('kaku')?.verificationStatus).toBe('pending')
    expect(sampleCharacters.find(c => c.id === 'kaku')).toBeDefined()
    expect(sampleCharacters.find(c => c.id === 'enel')).toBeUndefined()
  })
})
