import { describe, it, expect } from 'vitest'
import { sampleBattles } from './battles'
import { sampleEvidence } from './evidence'
import { applyV0432JackShutenmaruEvidence } from './v0432JackShutenmaruBattleLink'
import { battleRepository } from '../repositories/battleRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { matchupRepository } from '../repositories/matchupRepository'
import { getCombatPower } from '../../application/getCombatPower'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { getStatRanking } from '../../application/getStatRanking'
import { buildV050ReadOnlyAudit, v050CurrentDataset } from '../integrity/v050ReadOnlyAudit'
import { versionManifest } from '../integrity/versionManifest'
import { patchHistory } from '../patchHistory'

const wanoId = 'wano-jack-shutenmaru-921'
const zouId = 'zou-jack-minks'
const evidenceId = 'evidence-jack-ashura-921'

describe('v0.4.32 Jack-Shutenmaru battle link correction', () => {
  it('registers one separate, valid, chronologically located Wano encounter', () => {
    expect(sampleBattles.filter(b => b.id === wanoId)).toHaveLength(0)
    expect(v050CurrentDataset.battles.filter(b => b.id === wanoId)).toHaveLength(1)
    const battle = battleRepository.getBattle(wanoId)!
    expect(battle).toMatchObject({
      id: wanoId,
      title: expect.stringContaining('슈텐마루'),
      chronologyOrder: 3,
      combatStructure: '1v1',
      environment: expect.stringContaining('와노쿠니 구리'),
      result: 'interrupted',
      participantIds: [],
    })
    expect(battle.externalFactors).toContain('카이도')
    expect(battleRepository.getParticipants(wanoId)).toEqual([])
    expect(battleRepository.getBattle(zouId)).toMatchObject({
      chronologyOrder: 1,
      environment: '조우 모코모 공국',
      combatStructure: 'multiple-vs-multiple',
      result: 'victory',
    })
    expect(sampleBattles.find(b => b.id === 'onigashima-jack-minks')?.chronologyOrder).toBe(3)
    expect(battleRepository.getBattle('onigashima-jack-minks')?.chronologyOrder).toBe(4)
  })

  it('relinks only the original Chapter 921 Evidence, preserving its content and per-character presence', () => {
    const original = sampleEvidence.find(e => e.id === evidenceId)!
    expect(original.battleId).toBe(zouId) // frozen v0.3.3 source must remain intact
    const current = evidenceRepository.getEvidenceForCharacter('jack').find(e => e.id === evidenceId)!
    expect(current).toMatchObject({
      id: evidenceId,
      subjectCharacterId: 'jack',
      battleId: wanoId,
      source: { type: 'canon', reference: 'One Piece Manga Chapter 921' },
      evidenceStrength: 'moderate',
    })
    const { battleId: _legacyLink, ...legacyContent } = original
    const { battleId: _currentLink, ...currentContent } = current
    expect(currentContent).toEqual(legacyContent) // the battle link is the only live change
    expect(applyV0432JackShutenmaruEvidence(original)).toEqual(current)
    expect(() => applyV0432JackShutenmaruEvidence({ ...original, battleId: 'drifted' }))
      .toThrow('historical Jack-Ashura Evidence link drift')
    expect(original.fact).toContain('슈텐마루')
    expect(original.statContributions.map(x => [x.stat, x.role])).toEqual([
      ['attack', 'primary'],
      ['defense', 'context'],
    ])
    expect(evidenceRepository.getEvidenceForBattle(wanoId).map(x => x.id)).toEqual([evidenceId])
    expect(evidenceRepository.getEvidenceForBattle(zouId).map(x => x.id))
      .toContain('evidence-jack-zou-809-810')
    expect(evidenceRepository.getEvidenceForBattle(zouId).map(x => x.id))
      .not.toContain(evidenceId)
    expect(evidenceRepository.getEvidenceForCharacter('jack').filter(x => x.id === evidenceId))
      .toHaveLength(1)
    expect(v050CurrentDataset.evidence.find(x => x.id === evidenceId)?.battleId).toBe(wanoId)
    expect(v050CurrentDataset.battles.filter(x => x.id === wanoId)).toHaveLength(1)
  })

  it('keeps all 7 combat stats, Haki Raw, rankings, matchup counts and live integrity intact', () => {
    const jack = evaluationRepository.getEvaluation('jack')!
    expect(jack.status).toBe('draft')
    expect(jack.evaluationDataVersion).toBe('evaluation-v0.4.30-beasts-bidirectional')
    expect(jack.items.map(x => x.score)).toEqual([80, 84, 88, 76, 77, 73, 74])
    expect(jack.items.map(getRawHakiContributionTotal)).toEqual([0, 0, 0, 0, 0, 0, 0])
    expect(jack.items.find(x => x.stat === 'stamina')?.readiness).toBe('E1')
    expect(getCombatPower('jack').finalScore).toBeCloseTo(552 / 7, 12)
    expect(getStatRanking('overall').find(x => x.characterId === 'jack')?.score).toBeCloseTo(552 / 7, 12)
    expect(v050CurrentDataset.characters).toHaveLength(82)
    expect(v050CurrentDataset.evaluations).toHaveLength(88)
    expect(v050CurrentDataset.evaluations.flatMap(x => x.items)).toHaveLength(616)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(buildV050ReadOnlyAudit().integrity.errors).toEqual([])
  })

  it('separates delivery/core-data revision from unchanged historical evaluations and frozen baseline', () => {
    expect(versionManifest).toMatchObject({
      appVersion: '0.4.32',
      coreDataVersion: 'core-v0.4.32',
      evaluationSetVersion: 'evaluation-set-v0.4.31',
      calculationModelId: 'balanced',
      calculationModelVersion: '1.2',
      baselineSnapshotVersion: 'v0.3.3',
    })
    expect(patchHistory[0]).toMatchObject({
      version: 'v0.4.32',
      report: 'docs/V0_4_32_JACK_SHUTENMARU_BATTLE_LINK_FIX_2026-10-18.md',
    })
    expect(patchHistory[0].changes.every(x => x.kind === 'evidence')).toBe(true)
    expect(patchHistory.find(x => x.version === 'v0.4.31')?.changes.filter(x => x.kind === 'score'))
      .toHaveLength(15)
  })
})
