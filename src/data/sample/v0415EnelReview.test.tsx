// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { v0413EnelEvaluation } from './v0413RemainingDraftPublication'
import { applyV0415EnelReview, v0415EnelApprovedScores } from './v0415EnelReview'
import { sampleEvaluations } from './evaluations'
import { v0412Evaluations } from './v0412EightEvaluations'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { getCombatPower } from '../../application/getCombatPower'
import { getCharacterDetail } from '../../application/getCharacterDetail'
import { getStatRanking } from '../../application/getStatRanking'
import { matchupRepository } from '../repositories/matchupRepository'
import { characterQuoteReviews, getCharacterQuoteReview } from '../quotes/characterQuotes'
import { CharacterPage } from '../../ui/pages/CharacterPage'
import { versionManifest } from '../integrity/versionManifest'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { getFinalStatScore } from '../../domain/evaluation/score'
import { balancedV12 } from './calculationModels'

const historical = [88, 72, 72, 88, 84, 70, 87]
const approved = [85, 74, 72, 86, 86, 76, 87]

describe('v0.4.15 approved Enel review and official Japanese quote', () => {
  it('preserves the v0.4.13 source and modifies only the current Enel view', () => {
    expect(v0413EnelEvaluation.items.map(item => item.score)).toEqual(historical)
    expect(v0413EnelEvaluation.evaluationDataVersion).toBe('evaluation-v0.4.13-enel-v049-provisional')
    const current = evaluationRepository.getEvaluation('enel', 'skypiea')!
    expect(current.id).toBe(v0413EnelEvaluation.id)
    expect(current.items.map(item => item.score)).toEqual(approved)
    expect(current.items.map(item => item.baseScore)).toEqual(approved)
    expect(v0415EnelApprovedScores).toEqual(approved)
    expect(current.evaluationDataVersion).toBe('evaluation-v0.4.15-enel-approved-provisional')
    expect(current.status).toBe('draft')
    expect(current.subjectState?.id).toBe('skypiea')
    expect(current.items.map(item => item.readiness)).toEqual(v0413EnelEvaluation.items.map(item => item.readiness))
    expect(current.items.map(item => item.evidenceIds)).toEqual(v0413EnelEvaluation.items.map(item => item.evidenceIds))
    expect(current.items.every(item => item.hakiContributions.length === 0 && item.score === getFinalStatScore(item))).toBe(true)
    expect(applyV0415EnelReview(sampleEvaluations[0])).toBe(sampleEvaluations[0])
    expect(sampleEvaluations).toHaveLength(76)
    expect(v0412Evaluations).toHaveLength(8)
  })
  it('keeps all 85 non-Enel evaluations untouched, model and matchups preserved', () => {
    const current = v050CurrentDataset.evaluations
    expect(current).toHaveLength(88)
    expect(current.flatMap(item => item.items)).toHaveLength(616)
    expect(current.filter(item => item.characterId === 'enel')).toHaveLength(1)
    for (const entry of current.filter(item => item.characterId !== 'enel')) {
      expect(evaluationRepository.getEvaluation(entry.characterId, entry.subjectState?.id)
        ?? evaluationRepository.getEvaluation(entry.characterId)).toEqual(entry)
    }
    expect(getCombatPower('enel').finalScore).toBeCloseTo(566 / 7, 10)
    expect(getCharacterDetail('enel', 'skypiea')?.evaluation.items.map(item => item.score)).toEqual(approved)
    expect(getStatRanking('overall')).toHaveLength(83)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(matchupRepository.getAllMatchups().find(match => match.id === 'matchup-enel-luffy-skypiea')?.historicalContext?.characterBEra)
      .toContain('7축 평가 없음')
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
    expect(versionManifest.appVersion).toBe('0.4.28')
    expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.28')
  })
  it('displays a sourced Japanese quotation with editorial Korean, not manga-checked or official-Korean', () => {
    const quote = getCharacterQuoteReview('enel')!
    expect(quote).toMatchObject({
      characterId: 'enel',
      originalJapanese: '我は神なり…!!',
      displayKorean: '나는 신이다…!!',
      verificationStatus: 'official-excerpt',
      translationStatus: 'editorial',
      source: { url: 'https://one-piece.com/news/o20180903_7815/index.html' },
    })
    expect(quote.mangaChapter).toBeUndefined()
    expect(quote.animeEpisode).toBeUndefined()
    const quotes = Object.values(characterQuoteReviews)
    expect(quotes).toHaveLength(81)
    expect(quotes.filter(q => q.verificationStatus === 'official-excerpt')).toHaveLength(15)
    expect(quotes.filter(q => q.verificationStatus === 'secondary-excerpt')).toHaveLength(66)
    expect(quotes.filter(q => q.verificationStatus === 'pending')).toHaveLength(0)
    const html = renderToStaticMarkup(<CharacterPage characterId="enel" groupId="skypiea"
      onSelectStat={() => {}} onCompareStat={() => {}} onSelectOverall={() => {}} />)
    expect(html).toContain('나는 신이다…!!')
    expect(html).toContain('我は神なり…!!')
    expect(html).toContain('한국어 자체 번역')
    expect(html).toContain('원작 만화 화수 미확인')
    expect(html).toContain('images/characters/enel.webp')
  })
  it('includes precisely the revised score in the live read-only audit without changing its integrity rules', () => {
    const evaluation = evaluationRepository.getEvaluation('enel')!
    const links = v050CurrentDataset.evidence.map(e => ({ id: e.id, subjectCharacterId: e.subjectCharacterId }))
    expect(validateEvaluation(evaluation, links).errors).toEqual([])
    const audit = buildV050ReadOnlyAudit()
    expect(audit.integrity.errors).toEqual([])
    expect(audit.counts).toEqual({
      characters: 82, evaluatedCharacters: 82, evaluations: 86,
      axes: 602, memberships: 107, matchups: 18,
    })
    const enel = audit.rows.filter(row => row.characterId === 'enel')
    expect(enel).toHaveLength(7)
    expect(enel.map(row => row.final)).toEqual(approved)
    expect(enel.every(row => row.rawHaki === 0 && row.effectiveHaki === 0)).toBe(true)
  })
})
