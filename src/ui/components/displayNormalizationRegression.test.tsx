import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { sampleBattles } from '../../data/sample/battles'
import { sampleCharacters } from '../../data/sample/characters'
import { sampleEvaluations } from '../../data/sample/evaluations'
import { sampleEvidence } from '../../data/sample/evidence'
import { wanoSeeds } from '../../data/sample/wanoSeeds'
import { normalizeCharacterNamesForDisplay } from '../../domain/character/normalizeCharacterNamesForDisplay'
import { BattleTimeline } from './BattleTimeline'
import { EvidenceList } from './EvidenceList'
import { EvaluationTrace } from './EvaluationTrace'
import { CombatProfile } from './CombatProfile'

const evidence = (id: string) => {
  const result = sampleEvidence.find(e => e.id === id)
  if (!result) throw new Error('Missing evidence: ' + id)
  return result
}
const battleFor = (battleId: string) => {
  const result = sampleBattles.find(b => b.id === battleId)
  if (!result) throw new Error('Missing battle: ' + battleId)
  return result
}

describe('v0.1.65 display-only normalization end-to-end regression', () => {
  it('renders actual Whitebeard Supreme King Raw descriptions without the Alber name', () => {
    const newgate = evidence('evidence-newgate-roger-966')
    const battle = battleFor(newgate.battleId)
    const battleHtml = renderToStaticMarkup(<BattleTimeline items={[{ battle, evidence: [newgate] }]} />)
    expect(battleHtml).toContain('패왕색 패기 원점수')
    expect(battleHtml).not.toContain('Supreme 알베르')
    expect(battleHtml).not.toContain('Supreme King')

    const current = sampleEvaluations.find(e => e.id === 'evaluation-newgate-prime')
    expect(current).toBeDefined()
    const traceHtml = renderToStaticMarkup(<EvaluationTrace
      items={current!.items.map(item => ({ item, evidence: [] }))}
      status={current!.status} evaluationDataVersion={current!.evaluationDataVersion} hakiWeight={0.5} />)
    expect(traceHtml).toContain('패왕색 상쇄')
    expect(traceHtml).not.toContain('Supreme 알베르')
    expect(traceHtml).not.toContain('Supreme King')
  })

  it('preserves Buckingham Stussy and tanking in actual combat profiles and evidence cards', () => {
    const stussy = sampleCharacters.find(c => c.id === 'stussy')
    expect(stussy).toBeDefined()
    const profile = renderToStaticMarkup(<CombatProfile profile={stussy!.combatProfile} />)
    expect(profile).toContain('버킹엄 스튜시')
    expect(profile).not.toContain('버알베르')
    const stussyEvidence = evidence('evidence-stussy-infiltration-1105')
    const html = renderToStaticMarkup(<EvidenceList
      records={[{ evidence: stussyEvidence }]}
      battle={battleFor(stussyEvidence.battleId)} />)
    expect(html).toContain('버킹엄 스튜시')
    expect(html).not.toContain('버알베르')
    const oldTanking = sampleEvidence.find(e => e.interpretation.includes('탱킹이나'))
    expect(oldTanking).toBeDefined()
    expect(normalizeCharacterNamesForDisplay(oldTanking!.interpretation)).toContain('탱킹이나')
  })

  it('scans all 60 profiles, 62 evaluations, battle contexts, Evidence explanations and 17 Wano seed notes for destructive token substitutions', () => {
    expect(sampleCharacters).toHaveLength(60)
    expect(sampleEvaluations).toHaveLength(62)
    expect(wanoSeeds).toHaveLength(17)
    const text: string[] = [
      ...sampleCharacters.flatMap(c => [
        c.name, c.description ?? '', ...c.combatProfile.combatStyles,
        ...c.combatProfile.specialTraits.flatMap(t => [t.name, t.description, t.limitations ?? '', t.uncertainty ?? '']),
        ...c.combatProfile.haki.capabilities.flatMap(h => [h.note ?? '', h.infusion?.note ?? '']),
        ...c.combatProfile.sources.map(s => s.reference),
      ]),
      ...sampleEvaluations.flatMap(e => [
        e.subjectState?.label ?? '', e.subjectState?.note ?? '',
        ...e.items.flatMap(i => [i.rationale, ...i.hakiContributions.map(h => h.application)]),
      ]),
      ...sampleBattles.flatMap(b => [
        b.title, b.combatPurpose, b.environment, b.restrictions, b.externalFactors,
      ]),
      ...sampleEvidence.flatMap(e => [
        e.source.reference, e.source.description ?? '', e.fact,
        e.interpretation, e.evaluationImpact, e.uncertainty,
        ...e.statContributions.map(s => s.note),
      ]),
      ...wanoSeeds.flatMap(s => [s.fact, s.context, s.style, s.trait, ...s.notes]),
    ]
    expect(sampleEvaluations.flatMap(e => e.items)).toHaveLength(434)
    expect(text.length).toBeGreaterThan(3000)
    let supremeInputs = 0
    let protectedTermInputs = 0
    let urlTokensChecked = 0
    for (const original of text) {
      const converted = normalizeCharacterNamesForDisplay(original)
      expect(converted).not.toMatch(/Supreme\s+알베르|버알베르|탱알베르|랭알베르|스모알베르/)
      expect(normalizeCharacterNamesForDisplay(converted)).toBe(converted)
      if (original.includes('Supreme King')) {
        supremeInputs++
        expect(converted).toContain('패왕색')
      }
      for (const term of ['버킹엄', '탱킹', '랭킹', '스모킹']) {
        if (original.includes(term)) {
          protectedTermInputs++
          expect(converted).toContain(term)
        }
      }
      for (const match of original.matchAll(/https?:\/\/[^\s<>()"']+/g)) {
        urlTokensChecked++
        expect(converted).toContain(match[0])
      }
    }
    expect(supremeInputs).toBeGreaterThan(10)
    expect(protectedTermInputs).toBeGreaterThan(1)
    expect(urlTokensChecked).toBeGreaterThan(30)
  })
})
