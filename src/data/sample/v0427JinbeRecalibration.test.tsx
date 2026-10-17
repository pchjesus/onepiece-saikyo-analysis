// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { sampleEvaluations } from './evaluations'
import { sampleEvidence } from './evidence'
import { sampleBattles } from './battles'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { battleRepository } from '../repositories/battleRepository'
import { matchupRepository } from '../repositories/matchupRepository'
import {
  applyV0427JinbeRecalibration,
  applyV0427JinbeEvidenceCorrection,
  applyV0427JinbeBattleContext,
  v0427JinbeEvidence,
} from './v0427JinbeRecalibration'
import { getRawHakiContributionTotal, getFinalStatScore } from '../../domain/evaluation/score'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { balancedV12 } from './calculationModels'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { versionManifest } from '../integrity/versionManifest'
import { patchHistory } from '../patchHistory'
import { CharacterPage } from '../../ui/pages/CharacterPage'

describe('v0.4.27 Jinbe approved Defense/Stamina and chapter-correct evidence overlays', () => {
  const source = sampleEvaluations.find(e => e.characterId === 'jinbe')!
  const current = evaluationRepository.getEvaluation('jinbe')!

  it('keeps the original evaluation object and corrects current Defense Raw overlap', () => {
    expect(source.evaluationDataVersion).toBe('evaluation-0.1.62-haki-independent-review')
    expect(source.items.map(i => i.score)).toEqual([76,80,80,77,83,80,79])
    const oldDefense = source.items.find(i => i.stat === 'defense')!
    expect(oldDefense.baseScore).toBe(78)
    expect(getRawHakiContributionTotal(oldDefense)).toBe(4)
    expect(current).not.toBe(source)
    expect(current.id).toBe(source.id)
    expect(current.status).toBe(source.status)
    expect(current.evaluationDataVersion).toBe('evaluation-v0.4.27-jinbe-defense82-stamina83-hybrid-review')
    expect(current.items.map(i => i.score)).toEqual([76,82,83,77,83,80,79])
    expect(current.items.find(i=>i.stat==='defense')).toMatchObject({baseScore:82,score:82,readiness:'E1',hakiContributions:[]})
    expect(current.items.find(i=>i.stat==='stamina')).toMatchObject({baseScore:83,score:83,readiness:'E1',hakiContributions:[]})
    for (const old of source.items.filter(i => i.stat!=='defense' && i.stat!=='stamina')) {
      expect(current.items.find(i => i.stat===old.stat)).toBe(old)
    }
    expect(current.items.every(i => i.score===getFinalStatScore(i))).toBe(true)
    expect(applyV0427JinbeRecalibration(sampleEvaluations.find(e=>e.characterId==='marco')!))
      .toBe(sampleEvaluations.find(e=>e.characterId==='marco')!)
    expect(() => applyV0427JinbeRecalibration({...source,evaluationDataVersion:'different'}))
      .toThrow(/identity\/version/)
  })

  it('shows exactly 80.0 overall with original model; other characters and matchups are unchanged', () => {
    expect(source.items.reduce((s,i)=>s+i.score,0)).toBe(555)
    expect(current.items.reduce((s,i)=>s+i.score,0)).toBe(560)
    expect(getCombatPower('jinbe').finalScore).toBe(80)
    expect(getStatRanking('overall').find(i=>i.characterId==='jinbe')?.score).toBe(80)
    expect(getStatRanking('defense').find(i=>i.characterId==='jinbe')?.score).toBe(82)
    expect(getStatRanking('stamina').find(i=>i.characterId==='jinbe')?.score).toBe(83)
    expect(getCombatPower('magellan').finalScore).toBe(86)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(0.5)
    expect(versionManifest).toMatchObject({
      appVersion:'0.4.30',coreDataVersion:'core-v0.4.30',
      evaluationSetVersion:'evaluation-set-v0.4.30',
      calculationModelVersion:'1.2',baselineSnapshotVersion:'v0.3.3',
    })
  })

  it('preserves the original chapter 575 ID and moves block/injury onto distinct chapters', () => {
    const old = sampleEvidence.find(e=>e.id==='evidence-jinbe-akainu-575')!
    const live = evidenceRepository.getEvidenceForCharacter('jinbe')
    const middle = live.find(e=>e.id===old.id)!
    expect(old.fact).toContain('중상')
    expect(old.source.reference).toContain('575')
    expect(middle.source.reference).toBe('One Piece Manga Chapter 575')
    expect(middle.fact).toContain('마르코')
    expect(middle.fact).not.toContain('관통상')
    expect(middle.statContributions.find(s=>s.stat==='stamina')?.role).toBe('context')
    expect(v0427JinbeEvidence).toHaveLength(2)
    expect(new Set(v0427JinbeEvidence.map(e=>e.id)).size).toBe(2)
    const block = live.find(e=>e.id==='evidence-v0427-jinbe-akainu-block-574')!
    const injury = live.find(e=>e.id==='evidence-v0427-jinbe-akainu-injury-578')!
    expect(block.statContributions.find(s=>s.stat==='defense')?.role).toBe('primary')
    expect(injury.statContributions.find(s=>s.stat==='stamina')?.role).toBe('secondary')
    expect(injury.statContributions.find(s=>s.stat==='defense')?.role).toBe('context')
    expect(block.source.reference).toContain('574')
    expect(injury.source.reference).toContain('578')
    expect([block,injury].every(e=>e.source.type==='supplementary' &&
      e.evidenceStrength==='moderate' && e.uncertainty.includes('재열람'))).toBe(true)
    expect(block.battleId).toBe(old.battleId)
    expect(injury.battleId).toBe(old.battleId)
    expect(sampleEvidence.find(e=>e.id===old.id)).toBe(old)
    expect(applyV0427JinbeEvidenceCorrection(sampleEvidence.find(e=>e.id==='evidence-jinbe-ace-five-days-552')!))
      .toBe(sampleEvidence.find(e=>e.id==='evidence-jinbe-ace-five-days-552')!)
    expect(current.items.find(i=>i.stat==='defense')!.evidenceIds).toContain(block.id)
    expect(current.items.find(i=>i.stat==='stamina')!.evidenceIds).toContain(injury.id)
    const battleSource = sampleBattles.find(b=>b.id===old.battleId)!
    const battleLive = battleRepository.getBattle(old.battleId)!
    expect(battleLive.title).toContain('574')
    expect(battleLive.externalFactors).toContain('마르코')
    expect(battleSource.title).not.toContain('574화')
    expect(applyV0427JinbeBattleContext(sampleBattles.find(b=>b.id==='pre-timeskip-jinbe-ace')!))
      .toBe(sampleBattles.find(b=>b.id==='pre-timeskip-jinbe-ace')!)
  })

  it('keeps references valid, live audit coherent, and source/readiness separated', () => {
    const audit=buildV050ReadOnlyAudit()
    expect(audit.integrity.errors).toEqual([])
    expect(audit.counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:88,axes:616,memberships:107,matchups:18})
    const allLinks=v050CurrentDataset.evidence.map(e=>({id:e.id,subjectCharacterId:e.subjectCharacterId}))
    expect(validateEvaluation(current,allLinks).errors).toEqual([])
    const jinbeRows=audit.rows.filter(r=>r.characterId==='jinbe')
    expect(jinbeRows).toHaveLength(7)
    expect(jinbeRows.map(r=>r.final)).toEqual([76,82,83,77,83,80,79])
    const def=jinbeRows.find(r=>r.stat==='defense')!
    expect(def.rawHaki).toBe(0)
    expect(def.base).toBe(82)
    expect(def.readiness).toBe('E1')
    expect(def.evidenceLinks.find(e=>e.evidenceId==='evidence-v0427-jinbe-akainu-block-574'))
      .toMatchObject({sourceType:'supplementary',role:'primary'})
    for(const original of sampleEvaluations.filter(e=>!['jinbe','kaku','kaido','linlin','marco','jozu','vista','king','queen','jack','kinemon','denjiro','ashura-doji','kawamatsu','kikunojo','raizo','inuarashi','nekomamushi','kanjuro'].includes(e.characterId))) {
      expect(evaluationRepository.getEvaluations(original.characterId).find(e=>e.id===original.id)).toEqual(original)
    }
  })

  it('keeps the shared character UI and versioned patch history', () => {
    const markup = renderToStaticMarkup(<CharacterPage characterId="jinbe" groupId="straw-hat-pirates"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
    expect(markup).toContain('징베')
    expect(markup).toContain('80')
    expect(markup).toContain('핵심 전투 스탯')
    expect(markup).not.toContain('전투력 미평가')
    const jinbePatch=patchHistory.find(p=>p.version==='v0.4.27')!
    expect(jinbePatch.version).toBe('v0.4.27')
    const changes=jinbePatch.changes.filter(x=>x.kind==='score')
    expect(changes.map(x=>[x.stat,x.before,x.after])).toEqual([
      ['defense',80,82],['stamina',80,83],
    ])
  })
})
