import { describe, expect, it } from 'vitest'
import { sampleBattles } from './battles'
import { sampleEvidence } from './evidence'
import { sampleEvaluations } from './evaluations'
import { getCombatPower } from '../../application/getCombatPower'
import { getCharacterEvaluationTrace } from '../../application/getCharacterEvaluationTrace'
import { getCharacterBattleTimeline } from '../../application/getCharacterBattleTimeline'
import { validateEvaluation } from '../../domain/evaluation/validation'

const reviewedIds = ['shanks', 'akainu', 'kuzan', 'kizaru', 'teach', 'ryokugyu'] as const
const expectedOverall = {
  shanks: 92.57142857142857,
  akainu: 92.42857142857143,
  kuzan: 91.85714285714286,
  kizaru: 92.14285714285714,
  teach: 90.57142857142857,
  ryokugyu: 87.57142857142857,
}
const newEvidenceIds = [
  'evidence-shanks-whitebeard-haki-434',
  'evidence-shanks-sakazuki-block-579',
  'evidence-shanks-aramaki-haki-1055',
  'evidence-shanks-kid-divine-departure-1079',
  'evidence-sakazuki-shanks-block-579',
  'evidence-sakazuki-kuzan-duel-650',
  'evidence-kuzan-sakazuki-duel-650',
  'evidence-kuzan-garp-iceball-1081',
  'evidence-kuzan-garp-haki-clash-1087',
  'evidence-kizaru-luffy-clones-1093',
  'evidence-kizaru-star-gun-1094',
  'evidence-kizaru-vegapunk-1108',
  'evidence-teach-hancock-nullification-1059',
  'evidence-teach-kurouzu-441',
  'evidence-aramaki-shanks-haki-1055',
  'evidence-garp-galaxy-impact-1080',
  'evidence-garp-kuzan-haki-1087',
  'evidence-fujitora-meteor-713',
  'evidence-fujitora-luffy-observation-799',
  'evidence-akainu-admiral-barrier-564',
  'evidence-kuzan-admiral-barrier-564',
  'evidence-kizaru-admiral-barrier-564',
]

describe('evidence-only review before approved calibration', () => {
  it('adds unique, correctly owned evidence and complete battle context', () => {
    expect(new Set(sampleEvidence.map(({ id }) => id)).size).toBe(sampleEvidence.length)
    for (const id of newEvidenceIds) {
      const record = sampleEvidence.find((entry) => entry.id === id)
      expect(record, id).toBeDefined()
      expect(sampleBattles.some((battle) => battle.id === record?.battleId)).toBe(true)
      expect(record?.source.type).toBe('canon')
      expect(record?.source.reference).toMatch(/One Piece Manga Chapter/)
      expect(record?.statContributions.length).toBeGreaterThan(0)
      expect(record?.uncertainty.length).toBeGreaterThan(0)
    }
  })

  it('keeps all 27 evaluated score records valid after the recalibration draft', () => {
    const references = sampleEvidence.map(({ id, subjectCharacterId }) => ({ id, subjectCharacterId }))
    expect(sampleEvaluations).toHaveLength(27)
    for (const evaluation of sampleEvaluations) {
      expect(validateEvaluation(evaluation, references)).toEqual({ valid: true, errors: [] })
    }
    for (const characterId of reviewedIds) {
      expect(getCombatPower(characterId).finalScore).toBeCloseTo(expectedOverall[characterId], 10)
    }
  })

  it('links the newly reviewed panels into the correct traces and timelines', () => {
    const shanksTrace = getCharacterEvaluationTrace('shanks')
    expect(shanksTrace?.find(({ item }) => item.stat === 'techniqueMastery')?.evidence
      .map(({ evidence }) => evidence.id)).toContain('evidence-shanks-kid-divine-departure-1079')
    const teachTrace = getCharacterEvaluationTrace('teach')
    expect(teachTrace?.find(({ item }) => item.stat === 'combatIQ')?.evidence
      .map(({ evidence }) => evidence.id)).toContain('evidence-teach-hancock-nullification-1059')
    expect(teachTrace?.find(({ item }) => item.stat === 'techniqueMastery')?.evidence
      .map(({ evidence }) => evidence.id)).toContain('evidence-teach-kurouzu-441')
    expect(getCharacterBattleTimeline('shanks').map(({ battle }) => battle.id)).toEqual([
      'redhair-shanks-whitebeard-434', 'marineford-shanks-sakazuki-579',
      'wano-shanks-aramaki-1055', 'elbaf-shanks-kid-1079',
    ])
    expect(getCharacterBattleTimeline('teach').map(({ battle }) => battle.id))
      .toContain('amazon-lily-teach-hancock-1059')
  })
})
