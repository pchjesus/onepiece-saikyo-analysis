// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { characterQuoteReviews, getCharacterQuoteReview } from './characterQuotes'
import { CharacterQuote } from '../../ui/components/CharacterQuote'
import { CharacterPage } from '../../ui/pages/CharacterPage'
import { getCharacterList } from '../../application/getCharacterList'
import { sampleEvaluations } from '../sample/evaluations'
import { v0412Evaluations } from '../sample/v0412EightEvaluations'
import { balancedV12 } from '../sample/calculationModels'
import { getStatRanking } from '../../application/getStatRanking'
import { sampleMatchups } from '../sample/matchups'

describe('v0.4.12 last two selected quotes: Smoothie A and Maha A', () => {
  it('keeps exactly one displayed, sourced quote per each of 80 registered characters', () => {
    const quotes = Object.values(characterQuoteReviews)
    expect(quotes).toHaveLength(81)
    expect(quotes.filter(q => q.verificationStatus === 'official-excerpt')).toHaveLength(15)
    expect(quotes.filter(q => q.verificationStatus === 'secondary-excerpt')).toHaveLength(66)
    expect(quotes.filter(q => q.verificationStatus === 'pending')).toHaveLength(0)
    expect(getCharacterQuoteReview('enel')?.verificationStatus).toBe('official-excerpt')
    expect(quotes.filter(q=>q.characterId!=='enel').every(q => q.displayKorean?.trim() && q.source?.url && q.translationStatus === 'editorial')).toBe(true)
  })
  it('attributes the Whole Cake general’s Big Mom confidence to Smoothie, chapter 934', () => {
    const q = getCharacterQuoteReview('smoothie')!
    expect(q.mangaChapter).toBe(934)
    expect(q.verificationStatus).toBe('secondary-excerpt')
    expect(q.translationStatus).toBe('editorial')
    expect(q.originalJapanese).toContain('勝手にママを殺すな')
    expect(q.displayKorean).toContain('멋대로 마마를 죽이지 마')
    expect(q.displayKorean).toContain('마마를 상식으로 판단하지 말라고')
    expect(q.context).toContain('페로스페로')
    expect(q.source?.url).toBe('https://kaizokura.com/archives/15932733.html')
    const html = renderToStaticMarkup(<CharacterQuote characterId="smoothie" />)
    expect(html).toContain('원작 제934화 (2차 자료 기재)')
    expect(html).toContain('2차 자료 인용 · 원작 컷 및 한국 정식 번역 미대조')
    expect(html).toContain('마마를 상식으로 판단하지 말라고')
  })
  it('attributes the escaped CP0 agent precedent concern to Maha using TV1040 transcript and chapter1018', () => {
    const q = getCharacterQuoteReview('maha')!
    expect(q.verificationStatus).toBe('secondary-excerpt')
    expect(q.mangaChapter).toBe(1018)
    expect(q.animeEpisode).toBe(1040)
    expect(q.translationStatus).toBe('editorial')
    expect(q.originalJapanese).toContain('組織から逃亡しても生きていけるという前例')
    expect(q.displayKorean).toBe('조직에서 도망쳐도 살아남을 수 있다는 선례를 남겨선 안 된다.')
    expect(q.context).toContain('후즈 후')
    expect(q.context).toContain('발언자')
    expect(q.source?.url).toBe('https://www.hellominju.com/2022/11/ONEPIECE1040.html')
    expect(renderToStaticMarkup(<CharacterQuote characterId="maha" />)).toContain('원작 제1018화 (2차 자료 기재)')
  })
  it('renders both in their existing group details without affecting historic combat, roster or matchups', () => {
    const listed=getCharacterList()
    for (const id of ['smoothie','maha']) {
      const item=listed.find(x=>x.character.id===id)!
      expect(item).toBeDefined()
      const html=renderToStaticMarkup(<CharacterPage characterId={id} groupId={item.group.id}
        onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
      expect(html).toContain('대표 명대사')
      expect(html).toContain(getCharacterQuoteReview(id)!.displayKorean!)
    }
    expect(sampleEvaluations).toHaveLength(76)
    expect(v0412Evaluations).toHaveLength(8)
    expect(getStatRanking('overall')).toHaveLength(81)
    expect(sampleMatchups).toHaveLength(15)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
  })
})
