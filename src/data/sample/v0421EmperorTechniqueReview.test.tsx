// @vitest-environment jsdom
import { describe,it,expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { sampleEvaluations } from './evaluations'
import { applyV0421EmperorTechniqueReview, v0421EmperorTechniqueEvidence } from './v0421EmperorTechniqueReview'
import { evaluationRepository } from '../repositories/evaluationRepository'
import { evidenceRepository } from '../repositories/evidenceRepository'
import { matchupRepository } from '../repositories/matchupRepository'
import { v050CurrentDataset, buildV050ReadOnlyAudit } from '../integrity/v050ReadOnlyAudit'
import { getCombatPower } from '../../application/getCombatPower'
import { getStatRanking } from '../../application/getStatRanking'
import { getFinalStatScore, getRawHakiContributionTotal } from '../../domain/evaluation/score'
import { validateEvaluation } from '../../domain/evaluation/validation'
import { versionManifest } from '../integrity/versionManifest'
import { balancedV12 } from './calculationModels'
import { CharacterPage } from '../../ui/pages/CharacterPage'

describe('v0.4.21 Kaido and Big Mom technique adjustment; concise user-facing profile',()=>{
  it('keeps the original snapshots and original scores unchanged',()=>{
    const expected:Record<string,[number,number]>={kaido:[93,96],linlin:[91,94]}
    for(const [id,[base,final]] of Object.entries(expected)){
      const original=sampleEvaluations.find(e=>e.characterId===id)!
      const item=original.items.find(i=>i.stat==='techniqueMastery')!
      expect(item.baseScore).toBe(base)
      expect(item.score).toBe(final)
      expect(getRawHakiContributionTotal(item)).toBe(6)
      expect(applyV0421EmperorTechniqueReview(sampleEvaluations.find(e=>e.characterId==='marco')!))
        .toBe(sampleEvaluations.find(e=>e.characterId==='marco')!)
    }
  })

  it('changes exactly two Technique bases while preserving raw Haki, other axes and evaluation identities',()=>{
    for(const [id,from,to] of [['kaido',96,98],['linlin',94,96]] as const){
      const original=sampleEvaluations.find(e=>e.characterId===id)!
      const actual=evaluationRepository.getEvaluation(id)!
      expect(actual.id).toBe(original.id)
      expect(actual.evaluationDataVersion).toBe('evaluation-v0.4.21-'+id+'-technique-review')
      for(const item of original.items){
        const next=actual.items.find(row=>row.stat===item.stat)!
        if(item.stat==='techniqueMastery'){
          expect(item.score).toBe(from)
          expect(next.score).toBe(to)
          expect(next.baseScore).toBe(item.baseScore+2)
          expect(next.evidenceIds.length).toBe(item.evidenceIds.length+1)
          expect(next.hakiContributions).toEqual(item.hakiContributions)
          expect(getRawHakiContributionTotal(next)).toBe(6)
        } else expect(next).toEqual(item)
        expect(next.score).toBe(getFinalStatScore(next))
      }
      expect(getStatRanking('techniqueMastery').find(x=>x.characterId===id)?.score).toBe(to)
    }
    expect(getCombatPower('kaido').finalScore)
      .toBeCloseTo( (sampleEvaluations.find(e=>e.characterId==='kaido')!.items.reduce((s,i)=>s+i.score,0)+2)/7,10)
    expect(getCombatPower('linlin').finalScore)
      .toBeCloseTo( (sampleEvaluations.find(e=>e.characterId==='linlin')!.items.reduce((s,i)=>s+i.score,0)+2)/7,10)
    expect(v050CurrentDataset.evaluations).toHaveLength(88)
    expect(v050CurrentDataset.evaluations.flatMap(e=>e.items)).toHaveLength(616)
    for(const original of sampleEvaluations.filter(e=>e.characterId!=='kaido'&&e.characterId!=='linlin')){
      const current=evaluationRepository.getEvaluations(original.characterId).find(e=>e.id===original.id)
      // Kaku was revised in v0.4.13, so that one remains its own existing overlay.
      if(!['kaku','jinbe','kinemon','denjiro','ashura-doji','kawamatsu','kikunojo','raizo','inuarashi','nekomamushi','kanjuro'].includes(original.characterId))expect(current).toEqual(original)
    }
  })

  it('keeps official TV confirmation as supplementary Evidence rather than unverified new canon claims',()=>{
    expect(v0421EmperorTechniqueEvidence.map(e=>e.subjectCharacterId)).toEqual(['kaido','linlin'])
    for(const ev of v0421EmperorTechniqueEvidence){
      expect(ev.source.type).toBe('supplementary')
      expect(ev.source.description).toContain('one-piece.com/anime/')
      expect(evidenceRepository.getEvidenceForCharacter(ev.subjectCharacterId)).toContainEqual(ev)
      const live=evaluationRepository.getEvaluation(ev.subjectCharacterId)!
      expect(live.items.find(i=>i.stat==='techniqueMastery')?.evidenceIds).toContain(ev.id)
      const refs=v050CurrentDataset.evidence.map(x=>({id:x.id,subjectCharacterId:x.subjectCharacterId}))
      expect(validateEvaluation(live,refs).errors).toEqual([])
    }
    const report=buildV050ReadOnlyAudit()
    expect(report.integrity.errors).toEqual([])
    expect(report.counts).toEqual({characters:82,evaluatedCharacters:82,evaluations:88,axes:616,memberships:107,matchups:18})
    for(const [id,score] of [['kaido',98],['linlin',96]] as const){
      const row=report.rows.find(x=>x.characterId===id&&x.stat==='techniqueMastery')!
      expect(row.base).toBe(score-3)
      expect(row.rawHaki).toBe(6)
      expect(row.final).toBe(score)
    }
    expect(balancedV12.version).toBe('1.2')
    expect(balancedV12.configuration.hakiWeight).toBe(.5)
    expect(matchupRepository.getAllMatchups()).toHaveLength(18)
    expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
    expect(versionManifest.appVersion).toBe('0.4.29')
    expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.29')
  })

  it('does not expose developer-style caveat banners and off-topic image reference in the regular page',()=>{
    const html=renderToStaticMarkup(<CharacterPage characterId="kaido" groupId="beasts-pirates"
      onSelectStat={()=>{}} onCompareStat={()=>{}} onSelectOverall={()=>{}} />)
    expect(html).toContain('평가 점수와 분리된 원작 기반 전투 정보입니다.')
    expect(html).not.toContain('비브르 카드 공식 목록')
    expect(html).not.toContain('캐릭터 이미지 관련 공식 자료')
    expect(html).not.toContain('외부 참고 페이지이며')
    expect(html).not.toContain('특수 전투요소는 별도 점수를')
    expect(html).not.toContain('점수는 순위 보기')
    expect(html).not.toContain('※ 종합점수는 승률이 아닙니다.')
    expect(html).not.toContain('근거 충분도는 점수에 가산되지 않습니다')
    expect(html).toContain('핵심 전투 스탯')
    expect(html).toContain('원작 전투 프로필 근거')
    expect(html).toContain('ONE PIECE.com TV1052')
  })
})
