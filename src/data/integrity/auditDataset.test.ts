import { describe, it, expect } from 'vitest'
import { auditCombatDataset } from './auditDataset'
import { liveDataset } from './v033Snapshot'

describe('v0.4 integrity audit detects tampering and respects intended omissions', () => {
  const clone = () => structuredClone(liveDataset)
  const issues = (data: ReturnType<typeof clone>) =>
    auditCombatDataset(data).errors.map(x => x.scope + ': ' + x.detail).join('\n')

  it('rejects duplicate group and character identifiers and missing membership links', () => {
    const data = clone()
    data.groups.push(data.groups[0])
    data.characters.push({ ...data.characters[0] })
    data.memberships[0].groupId = 'no-such-group'
    const output = issues(data)
    expect(output).toContain('Duplicate identifier')
    expect(output).toContain('Unknown group')
  })

  it('rejects missing battle participants and dangling evidence battles', () => {
    const data = clone()
    data.battles[0].participantIds.push('ghost-participant')
    data.evidence[0].battleId = 'ghost-battle'
    const output = issues(data)
    expect(output).toContain('missing participant')
    expect(output).toContain('Unknown battle')
  })

  it('rejects invalid Haki ownership and dangling special-trait evidence', () => {
    const data = clone()
    const marco = data.characters.find(x => x.id === 'marco')!
    marco.combatProfile.haki.characterId = 'another-character'
    marco.combatProfile.specialTraits[0].evidenceIds.push('ghost-ability-evidence')
    const output = issues(data)
    expect(output).toContain('Haki profile owner mismatch')
    expect(output).toContain('Missing special trait evidence')
  })

  it('rejects missing Matchup Evidence and unresolved per-character state', () => {
    const data = clone()
    data.matchups[0].factors[0].evidenceIds.push('ghost-matchup-evidence')
    data.matchups[0].characterAStateId = 'no-such-era'
    const output = issues(data)
    expect(output).toContain('Unknown matchup Evidence')
    expect(output).toContain('Unresolvable Evaluation state')
  })

  it('rejects additional explicit default evaluations without reassigning them', () => {
    const data = clone()
    const original = data.evaluations.find(e => e.characterId === 'marco')!
    data.evaluations.push({ ...structuredClone(original), id:'duplicate-marco-default', isDefault:true })
    expect(issues(data)).toContain('Multiple explicit default Evaluations')
  })

  it('allows E3 items without direct Evidence and narrative-only battles', () => {
    const report = auditCombatDataset(clone())
    expect(report.errors).toEqual([])
    expect(report.warnings.some(x => x.scope.includes('evaluation-buggy') && x.detail.includes('speed'))).toBe(true)
    expect(liveDataset.battles.some(b => b.participantIds.length === 0)).toBe(true)
  })
})
