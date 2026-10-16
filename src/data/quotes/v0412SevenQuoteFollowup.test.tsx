import {describe,expect,it} from 'vitest'
import {renderToStaticMarkup} from 'react-dom/server'
import {CharacterQuote} from '../../ui/components/CharacterQuote'
import {characterQuoteReviews,getCharacterQuoteReview} from './characterQuotes'
import {sampleCharacters} from '../sample/characters'
import {v0411Characters} from '../sample/v0411UnratedCharacterRegistration'
import {v0413EnelCharacter} from '../sample/v0413RemainingDraftPublication'
import {sampleEvaluations} from '../sample/evaluations'
import {v0412Evaluations} from '../sample/v0412EightEvaluations'
import {getStatRanking} from '../../application/getStatRanking'

const present=['jozu','gaban','morley','karasu','stussy','prince-grus','inazuma'] as const

describe('Quote-only follow-up: seven shortlisted voices',()=>{
  it('preserves the historic seven selected candidates and newly covers all 80 character IDs without changing combat evaluations',()=>{
    const ids=[...sampleCharacters,...v0411Characters,v0413EnelCharacter].map(x=>x.id)
    expect(ids).toHaveLength(81)
    expect(Object.keys(characterQuoteReviews).sort()).toEqual([...ids].sort())
    expect(Object.values(characterQuoteReviews).filter(q=>q.verificationStatus==='official-excerpt')).toHaveLength(15)
    expect(Object.values(characterQuoteReviews).filter(q=>q.verificationStatus==='secondary-excerpt')).toHaveLength(66)
    expect(Object.values(characterQuoteReviews).filter(q=>q.verificationStatus==='pending').map(q=>q.characterId).sort())
      .toEqual([])
    expect(sampleEvaluations).toHaveLength(76)
    expect(v0412Evaluations).toHaveLength(8)
    expect(getStatRanking('overall')).toHaveLength(82)
  })
  it('traces Jozu to chapter 567 Aokiji interception, not unrelated scenes',()=>{
    const j=getCharacterQuoteReview('jozu')!
    expect(j.displayKorean).toBe('아버지, 먼저 가세요!')
    expect(j.originalJapanese).toBe('オヤジ先へ!!')
    expect(j.mangaChapter).toBe(567)
    expect(j.context).toContain('아오키지')
    expect(j.context).toContain('흰수염')
    expect(j.verificationStatus).toBe('secondary-excerpt')
    expect(renderToStaticMarkup(<CharacterQuote characterId="jozu" />)).toContain('원작 제567화 (2차 자료 기재)')
  })
  it('shows chosen Gaban Morley Stussy Grus and Inazuma excerpts as editorial source claims',()=>{
    for(const id of ['gaban','morley','stussy','prince-grus','inazuma']){
      const q=getCharacterQuoteReview(id)!
      expect(q.displayKorean?.length).toBeGreaterThan(7)
      expect(q.verificationStatus).toBe('secondary-excerpt')
      expect(q.translationStatus).toBe('editorial')
      expect(q.source?.url).toMatch(/^https:\/\//)
      const html=renderToStaticMarkup(<CharacterQuote characterId={id} />)
      expect(html).toContain('대표 명대사')
      expect(html).toContain('2차 자료 인용')
      expect(html).toContain('한국어 자체 번역')
    }
    expect(getCharacterQuoteReview('gaban')?.mangaChapter).toBeUndefined()
    expect(getCharacterQuoteReview('gaban')?.context).toContain('0화')
  })
  it('labels Karasu explicitly as anime 888 without claiming a manga chapter',()=>{
    const q=getCharacterQuoteReview('karasu')!
    expect(q.animeEpisode).toBe(888)
    expect(q.mangaChapter).toBeUndefined()
    expect(q.context).toContain('원작 만화 같은 문구는 미확인')
    const html=renderToStaticMarkup(<CharacterQuote characterId="karasu" />)
    expect(html).toContain('애니메이션 제888화')
    expect(html).toContain('만화 대응 대사 미확인')
    expect(html).not.toContain('원작 제888화')
  })
  it('renders sourced Smoothie and Maha quotes without promoting to manga-checked',()=>{
    expect(present.every(id=>getCharacterQuoteReview(id)?.verificationStatus==='secondary-excerpt')).toBe(true)
    for(const id of ['smoothie','maha']){
      expect(getCharacterQuoteReview(id)?.verificationStatus).toBe('secondary-excerpt')
      expect(renderToStaticMarkup(<CharacterQuote characterId={id} />)).toContain('대표 명대사')
    }
  })
})
