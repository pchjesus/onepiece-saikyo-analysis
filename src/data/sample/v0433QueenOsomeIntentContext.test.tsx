// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { sampleBattles } from './battles'
import { sampleEvaluations } from './evaluations'
import { applyV0430AllStarCalibration } from './v0430BeastsAllStars'
import { applyV0433QueenOsomeBattleContext, applyV0433QueenOsomeEvaluationContext } from './v0433QueenOsomeIntentContext'
import { battleRepository } from '../repositories/battleRepository'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { matchupRepository } from '../repositories/matchupRepository'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { versionManifest } from '../integrity/versionManifest'
import { patchHistory } from '../patchHistory'
import { CharacterPage } from '../../ui/pages/CharacterPage'

const battleId = 'onigashima-queen-sanji'
const stats = [82, 82, 83, 75, 80, 74, 84]

describe('v0.4.33 Queen Osome intentional attack context-only patch', () => {
  it('preserves historical battle while changing only the current Battle externalFactors', () => {
    const legacy = sampleBattles.find(b => b.id === battleId)!
    expect(legacy.externalFactors).toContain('주의가 분산')
    const live = battleRepository.getBattle(battleId)!
    expect(live.externalFactors).toContain('의도적으로 폭행')
    expect(live.externalFactors).toContain('투명화')
    expect(live.externalFactors).toContain('전투 목표에서 이탈')
    expect(live.externalFactors).not.toContain('주의가 분산')
    const { externalFactors: _old, ...sameLegacy } = legacy
    const { externalFactors: _new, ...sameLive } = live
    expect(sameLive).toEqual(sameLegacy)
    expect(applyV0433QueenOsomeBattleContext(legacy)).toEqual(live)
    expect(v050CurrentDataset.battles.find(b => b.id === battleId)).toEqual(live)
    expect(battleRepository.getBattle('zou-jack-minks')).toBeDefined()
    expect(battleRepository.getBattle('wano-jack-shutenmaru-921')).toBeDefined()
    expect(applyV0433QueenOsomeBattleContext(sampleBattles.find(b => b.id === 'zou-jack-minks')!))
      .toBe(sampleBattles.find(b => b.id === 'zou-jack-minks')!)
    expect(() => applyV0433QueenOsomeBattleContext({ ...legacy, externalFactors:'unexpected' }))
      .toThrow('historical battle context changed')
  })

  it('keeps historical Queen calibration and changes current rationale only in two named axes', () => {
    const historicalRaw = sampleEvaluations.find(e => e.characterId === 'queen')!
    const historical = applyV0430AllStarCalibration(historicalRaw)
    expect(historical.evaluationDataVersion).toBe('evaluation-v0.4.30-beasts-bidirectional')
    expect(historical.items.find(i => i.stat === 'techniqueMastery')!.rationale).toContain('후반 주의 분산')
    const current = evaluationRepository.getEvaluation('queen')!
    expect(current.evaluationDataVersion).toBe('evaluation-v0.4.33-queen-osome-context-clarified')
    expect(current.items.map(i=>i.score)).toEqual(stats)
    expect(current.items.map(i=>i.baseScore)).toEqual(historical.items.map(i=>i.baseScore))
    expect(current.items.map(i=>i.readiness)).toEqual(historical.items.map(i=>i.readiness))
    expect(current.items.map(getRawHakiContributionTotal)).toEqual([0,0,0,0,0,0,0])
    expect(current.items.map(i=>i.evidenceIds)).toEqual(historical.items.map(i=>i.evidenceIds))
    expect(current.items.map(i=>i.hakiContributions)).toEqual(historical.items.map(i=>i.hakiContributions))
    expect(current.items.map(i=>i.stat)).toEqual(historical.items.map(i=>i.stat))
    expect(current.items.filter(i=>!['techniqueMastery','combatIQ'].includes(i.stat)))
      .toEqual(historical.items.filter(i=>!['techniqueMastery','combatIQ'].includes(i.stat)))
    expect(current.items.find(i=>i.stat==='techniqueMastery')?.rationale).toContain('오소메에 대한 의도적인 공격')
    expect(current.items.find(i=>i.stat==='techniqueMastery')?.rationale).toContain('투명화 기술 자체의 오작동이 아니라')
    expect(current.items.find(i=>i.stat==='combatIQ')?.rationale).toContain('의도적으로 폭행')
    expect(current.items.find(i=>i.stat==='combatIQ')?.rationale).toContain('사적 표적 선택')
    expect(current.items.find(i=>i.stat==='combatIQ')?.rationale).not.toContain('오소메에게 주의가 분산')
    expect(v050CurrentDataset.evaluations.find(e=>e.characterId==='queen')).toEqual(current)
    expect(applyV0433QueenOsomeEvaluationContext(historical)).toEqual(current)
    expect(applyV0433QueenOsomeEvaluationContext(evaluationRepository.getEvaluation('jack')!))
      .toBe(evaluationRepository.getEvaluation('jack')!)
    expect(() => applyV0433QueenOsomeEvaluationContext({ ...historical, evaluationDataVersion:'drift' }))
      .toThrow('historical evaluation revision changed')
  })

  it('preserves combat results, matchups, links, readiness and live dataset integrity', () => {
    expect(getCombatPower('queen').finalScore).toBeCloseTo(560/7, 12)
    expect(getStatRanking('overall').find(x=>x.characterId==='queen')?.score).toBeCloseTo(80, 12)
    expect(v050CurrentDataset.evaluations).toHaveLength(88)
    expect(v050CurrentDataset.evaluations.flatMap(x=>x.items)).toHaveLength(616)
    expect(v050CurrentDataset.characters).toHaveLength(82)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(buildV050ReadOnlyAudit().integrity.errors).toEqual([])
    expect(evidenceRepository.getEvidenceForCharacter('queen').map(x=>x.id))
      .toContain('evidence-queen-ancient-zoan-1028')
    expect(evidenceRepository.getEvidenceForBattle(battleId).map(x=>x.id))
      .toContain('evidence-queen-cybernetics-1028-1034')
    expect(versionManifest).toMatchObject({
      appVersion:'0.4.33',coreDataVersion:'core-v0.4.33',
      evaluationSetVersion:'evaluation-set-v0.4.33',
      calculationModelVersion:'1.2',baselineSnapshotVersion:'v0.3.3',
    })
    expect(patchHistory[0].version).toBe('v0.4.33')
    expect(patchHistory[0].changes).toHaveLength(1)
    expect(patchHistory[0].changes[0].kind).toBe('evidence')
    expect(patchHistory.find(x=>x.version==='v0.4.32')).toBeDefined()
  })

  it('renders the current Queen evaluation through the unchanged shared CharacterPage', () => {
    const html=renderToStaticMarkup(<CharacterPage characterId="queen" groupId="beasts-pirates"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
    expect(html).toContain('퀸')
    expect(html).toContain('evaluation-v0.4.33-queen-osome-context-clarified')
    expect(html).toContain('80.0')
  })
})
