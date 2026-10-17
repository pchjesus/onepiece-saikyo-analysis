// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { enelLuffyHistoricalMatchup } from '../src/data/sample/enelLuffyHistoricalMatchup'
import { sampleMatchups } from '../src/data/sample/matchups'
import { luffyTeachStateMatchups } from '../src/data/sample/luffyTeachStateMatchups'
import { v0413EnelEvaluation } from '../src/data/sample/v0413RemainingDraftPublication'
import { sampleEvidence } from '../src/data/sample/evidence'
import { v0413EnelEvidence } from '../src/data/sample/v0413RemainingDraftPublication'
import { sampleEvaluations } from '../src/data/sample/evaluations'
import { validateMatchupAnalysis } from '../src/domain/matchup/validation'
import { getMatchupBuilderView, getMatchupHubEntries } from '../src/application/getMatchupHub'
import { matchupRepository } from '../src/data/repositories/matchupRepository'
import { getCharacterPortraitAsset } from '../src/data/media/characterPortraits'
import { buildV050ReadOnlyAudit, v050CurrentDataset } from '../src/data/integrity/v050ReadOnlyAudit'
import { versionManifest } from '../src/data/integrity/versionManifest'
import { MatchupHome } from '../src/ui/pages/MatchupHome'

describe('v0.4.14 Enel image and historically scoped Luffy duel', () => {
  it('commits the exact supplied 640x512 WebP bytes and preserves user-provided rights state', () => {
    const asset=getCharacterPortraitAsset('enel')!
    expect(asset).toMatchObject({fileName:'enel.webp',permission:'user-provided-unverified'})
    expect(asset.permissionNote).toContain('미확인')
    const binary=readFileSync(resolve(process.cwd(),'public/images/characters/enel.webp'))
    expect(binary.length).toBe(114638)
    expect(binary.toString('ascii',0,4)).toBe('RIFF')
    expect(binary.toString('ascii',8,12)).toBe('WEBP')
    expect(createHash('sha256').update(binary).digest('hex'))
      .toBe('7444f51eedfcc370908b9860c653be921690cd55110265c740d5483f4d6126eb')
    expect(createHash('sha1').update('blob '+binary.length+'\0').update(binary).digest('hex'))
      .toBe('abacad73807b12d9de9701d539d2f0eb6364198e')
  })

  it('appends exactly one new pairing without mutating the frozen existing 17 cases', () => {
    const all=matchupRepository.getAllMatchups()
    expect(sampleMatchups).toHaveLength(15)
    expect(luffyTeachStateMatchups).toHaveLength(2)
    expect(all).toHaveLength(18)
    expect(all.slice(0,15)).toEqual(sampleMatchups)
    expect(all.slice(15,17)).toEqual(luffyTeachStateMatchups)
    expect(all[17]).toEqual(enelLuffyHistoricalMatchup)
    expect(new Set(all.map(x=>x.id)).size).toBe(18)
    expect(all.filter(x=>[x.characterAId,x.characterBId].sort().join('::')==='enel::luffy')).toHaveLength(1)
    const evidenceIds=[...sampleEvidence,...v0413EnelEvidence].map(x=>x.id)
    const states=[...sampleEvaluations,v0413EnelEvaluation]
      .filter(x=>x.subjectState).map(x=>x.characterId+':'+x.subjectState!.id)
    expect(validateMatchupAnalysis(enelLuffyHistoricalMatchup,evidenceIds,states))
      .toEqual({valid:true,errors:[]})
  })

  it('distinguishes canon defeat and rubber immunity from hypothetical numeric strength', () => {
    const caseData=enelLuffyHistoricalMatchup
    expect(caseData.characterAStateId).toBe('skypiea')
    expect(caseData.characterBStateId).toBeUndefined()
    expect(caseData.historicalContext?.scoreComparisonNotice).toContain('비교하지 않는다')
    expect(caseData.historicalContext?.characterBEra).toContain('7축 평가 없음')
    expect(caseData.factors.find(x=>x.id==='enel-luffy-rubber')?.advantage).toBe('character-b')
    expect(caseData.factors.find(x=>x.id==='enel-luffy-canon-outcome')?.confidence).toBe('confirmed')
    expect(caseData.factors.find(x=>x.id==='enel-luffy-heat')?.advantage).toBe('character-a')
    for(const f of caseData.factors){
      expect(f.uncertainty.length).toBeGreaterThan(15)
      expect(f.evidenceIds.length).toBeGreaterThan(0)
    }
    expect(caseData).not.toHaveProperty('score')
    expect(caseData).not.toHaveProperty('winProbability')
    expect(getMatchupBuilderView('enel','luffy','skypiea','egghead-gear5')?.matchup?.id).toBe(caseData.id)
    expect(getMatchupBuilderView('luffy','enel','egghead-gear4','skypiea')?.matchup?.id).toBe(caseData.id)
    expect(getMatchupHubEntries()).toHaveLength(18)
  })

  it('preserves full evaluation and audit with one more matchup and unchanged Haki and Enel axes', () => {
    const report=buildV050ReadOnlyAudit()
    expect(report.integrity.errors).toEqual([])
    expect(report.counts).toEqual({
      characters:81,evaluatedCharacters:81,evaluations:85,axes:595,memberships:106,matchups:18,
    })
    expect(v050CurrentDataset.evaluations).toHaveLength(85)
    expect(v0413EnelEvaluation.items.map(x=>x.score)).toEqual([88,72,72,88,84,70,87])
    expect(v0413EnelEvaluation.items.every(x=>x.hakiContributions.length===0)).toBe(true)
    expect(versionManifest.appVersion).toBe('0.4.19')
    expect(versionManifest.evaluationSetVersion).toBe('evaluation-set-v0.4.17')
    expect(versionManifest.calculationModelVersion).toBe('1.2')
    expect(versionManifest.baselineSnapshotVersion).toBe('v0.3.3')
  })

  it('shows historical source/context while suppressing cross-era scores, chart and Gear5 selector', async () => {
    ;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT:boolean }).IS_REACT_ACT_ENVIRONMENT=true
    const host=document.createElement('div')
    document.body.appendChild(host)
    const root=createRoot(host)
    try {
      await act(async()=>{root.render(<MatchupHome />)})
      const featured=[...host.querySelectorAll<HTMLButtonElement>('.matchup-picker button')]
        .find(x=>x.textContent?.includes('에넬') && x.textContent?.includes('루피'))
      expect(featured).toBeDefined()
      expect(featured!.textContent).toContain('하늘섬 편 · 7축 평가 없음')
      await act(async()=>{featured!.click()})
      expect(featured?.getAttribute('aria-pressed')).toBe('true')
      expect(host.querySelector('.matchup-historical-notice')?.textContent).toContain('점수')
      expect(host.querySelector('.matchup-historical-notice')?.textContent).toContain('고무')
      expect(host.querySelectorAll('.matchup-history-sources a')).toHaveLength(5)
      expect(host.querySelector('.matchup-scoreboard')).toBeNull()
      expect(host.querySelector('.matchup-summary-strip')).toBeNull()
      expect(host.querySelector('.matchup-visual-grid')).toBeNull()
      expect(host.querySelector('[aria-label="오른쪽 평가 시점 선택"]')).toBeNull()
      expect(host.querySelector('.arena-factor-grid')?.children).toHaveLength(6)
      const cornerNames=[...host.querySelectorAll('.corner-panel header h3')].map(x=>x.textContent)
      expect(cornerNames).toEqual(['에넬','몽키 D. 루피'])
      const swap=host.querySelector<HTMLButtonElement>('[aria-label="좌우 캐릭터 교체"]')!
      await act(async()=>{swap.click()})
      expect(host.querySelector('.matchup-historical-notice')).not.toBeNull()
      expect(host.querySelector('.matchup-scoreboard')).toBeNull()
      const previous=[...host.querySelectorAll<HTMLButtonElement>('.matchup-picker button')]
        .find(x=>x.textContent?.includes('사카즈키')&&x.textContent?.includes('쿠잔'))!
      await act(async()=>{previous.click()})
      expect(host.querySelector('.matchup-historical-notice')).toBeNull()
      expect(host.querySelector('.matchup-scoreboard')).not.toBeNull()
      expect(host.querySelector('.matchup-visual-grid')).not.toBeNull()
    } finally {
      await act(async()=>{root.unmount()})
      host.remove()
    }
  })
})
