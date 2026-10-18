import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { CharacterPage } from '../pages/CharacterPage'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { evaluationRepository } from '../../data/repositories/evaluationRepository'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { buildV050ReadOnlyAudit } from '../../data/integrity/v050ReadOnlyAudit'

const renderCharacter = (characterId: string) => renderToStaticMarkup(
  <CharacterPage characterId={characterId} groupId="beasts-pirates"
    onSelectStat={() => {}} onCompareStat={() => {}} onSelectOverall={() => {}} />,
)

describe('King flame ON/OFF option A: qualitative display only', () => {
  it('shows both opposite modes and warns against simultaneous maximums beside live 7-axis scores', () => {
    const html = renderCharacter('king')
    expect(html).toContain('data-testid="king-flame-mode-note"')
    expect(html).toContain('불꽃 ON / OFF')
    expect(html).toContain('불꽃 ON')
    expect(html).toContain('불꽃 OFF')
    expect(html).toContain('통합 7축 평가')
    expect(html).toContain('한순간에 동시에 발휘한다는 뜻은 아닙니다')
    expect(html).toContain('원작 1032·1035화')
    expect(html).toContain('방어')
    expect(html).toContain('속도')
    expect(html).toContain('88')
    expect(html).toContain('85')
    expect(html).toContain('84.0')
    expect(html).not.toContain('evaluation-state-switcher')
  })

  it('does not create King states or change his evaluation, ranking, model or historical seed', () => {
    const live = evaluationRepository.getEvaluations('king')
    expect(live).toHaveLength(1)
    expect(live[0].subjectState).toBeUndefined()
    expect(live[0].items.map(item => item.score)).toEqual([84, 88, 85, 85, 83, 79, 84])
    expect(live[0].items.every(item => item.hakiContributions.length === 0)).toBe(true)
    expect(getCombatPower('king').finalScore).toBeCloseTo(588 / 7, 12)
    expect(getCombatPower('king').calculationModelVersion).toBe('1.2')
    expect(getStatRanking('overall').find(entry => entry.characterId === 'king')?.score)
      .toBeCloseTo(588 / 7, 12)
    expect(sampleEvaluations.find(e => e.characterId === 'king')?.items.map(item => item.score))
      .toEqual([83, 88, 85, 83, 80, 77, 82])
    const audit = buildV050ReadOnlyAudit()
    expect(audit.integrity.errors).toEqual([])
    expect(audit.counts).toEqual({
      characters: 82, evaluatedCharacters: 82, evaluations: 88,
      axes: 616, memberships: 107, matchups: 18,
    })
  })

  it('leaves unrelated characters and existing state switching untouched', () => {
    expect(renderCharacter('queen')).not.toContain('data-testid="king-flame-mode-note"')
    expect(renderCharacter('jack')).not.toContain('data-testid="king-flame-mode-note"')
    expect(evaluationRepository.getEvaluations('inuarashi')).toHaveLength(2)
    expect(evaluationRepository.getEvaluations('nekomamushi')).toHaveLength(2)
    expect(evaluationRepository.getEvaluations('luffy')).toHaveLength(2)
  })
})
