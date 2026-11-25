import { describe, expect, it } from 'vitest'
import { matchupRepository } from '../data/repositories/matchupRepository'
import { evidenceRepository } from '../data/repositories/evidenceRepository'
import { battleRepository } from '../data/repositories/battleRepository'
import { getMatchupEvidenceTrace } from './getMatchupEvidenceTrace'

describe('v0.6 read-only matchup evidence provenance', () => {
  it('audits every registered matchup and factor without inventing source records', () => {
    const matchups = matchupRepository.getAllMatchups()
    expect(matchups).toHaveLength(18)
    expect(new Set(matchups.map(m => m.id)).size).toBe(matchups.length)
    const factors = matchups.flatMap(matchup => matchup.factors)
    expect(factors.length).toBeGreaterThan(40)
    expect(new Set(factors.map(f => f.id)).size).toBe(factors.length)
    const broken: string[] = []
    for (const factor of factors) {
      const traced = getMatchupEvidenceTrace(factor)
      expect(traced.map(t => t.evidenceId)).toEqual(factor.evidenceIds)
      expect(traced.length).toBeGreaterThan(0)
      for (const item of traced) {
        if (item.status !== 'linked') broken.push(`${factor.id}: ${item.evidenceId} (${item.status})`)
        const source = evidenceRepository.getEvidenceById(item.evidenceId)
        if (source) {
          expect(item.sourceType).toBe(source.source.type)
          expect(item.reference).toBe(source.source.reference)
          expect(item.fact).toBe(source.fact)
          expect(item.battleTitle).toBe(battleRepository.getBattle(source.battleId)?.title)
        }
      }
    }
    // The source links are existing data relationships; no manufactured placeholders.
    expect(broken).toEqual([])
  })

  it('keeps factual battle conditions separate from scenario assumptions', () => {
    const matchup = matchupRepository.getAllMatchups().find(m => m.id === 'matchup-marco-king')!
    expect(matchup.assumptions.battlefield).toBe('neutral')
    expect(matchup.assumptions.externalIntervention).toBe('none')
    const factor = matchup.factors.find(f => f.id === 'marco-king-recovery')!
    const traced = getMatchupEvidenceTrace(factor)
    expect(traced).toHaveLength(2)
    for (const source of traced) {
      expect(source.status).toBe('linked')
      expect(source.sourceType).toBe('canon')
      expect(source.battleTitle).toBeTruthy()
      expect(source.fact).toBeTruthy()
      expect(source.uncertainty).toBeTruthy()
    }
  })

  it('renders absent refs as explicit gaps rather than making up Canon facts', () => {
    const traces = getMatchupEvidenceTrace({ evidenceIds: ['not-an-evidence-id'] })
    expect(traces).toEqual([{ evidenceId: 'not-an-evidence-id', status: 'evidence-missing' }])
    expect(getMatchupEvidenceTrace({ evidenceIds: [] })).toEqual([])
  })
})
