import { COMBAT_STATS } from '../evaluation/types'
import type { Evidence } from './types'

export function validateEvidence(evidence: Evidence): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  for (const contribution of evidence.statContributions) {
    if (!(COMBAT_STATS as readonly string[]).includes(contribution.stat)) errors.push(`Invalid evidence stat: ${contribution.stat}.`)
    const key = `${contribution.stat}:${contribution.role}`
    if (seen.has(key)) errors.push(`Duplicate evidence contribution: ${key}.`)
    seen.add(key)
    if (!contribution.note.trim()) errors.push(`Evidence contribution note is required for ${contribution.stat}.`)
  }
  return errors
}
