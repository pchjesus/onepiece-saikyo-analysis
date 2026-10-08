export const MATCHUP_FACTORS = [
  'attack-access',
  'damage-validity',
  'defensive-response',
  'mobility-control',
  'haki-interaction',
  'resource-endurance',
  'recovery-regeneration',
  'special-win-condition',
  'environment',
] as const

export type MatchupFactor = typeof MATCHUP_FACTORS[number]

export const MATCHUP_PHASES = ['opening', 'sustained', 'long', 'all'] as const
export type MatchupPhase = typeof MATCHUP_PHASES[number]

export const MATCHUP_CONFIDENCE = ['confirmed', 'supported', 'unclear'] as const
export type MatchupConfidence = typeof MATCHUP_CONFIDENCE[number]

export const MATCHUP_ADVANTAGES = [
  'character-a',
  'character-b',
  'none',
  'conditional',
  'unknown',
] as const
export type MatchupAdvantage = typeof MATCHUP_ADVANTAGES[number]

export type MatchupFactorAssessment = {
  id: string
  factor: MatchupFactor
  phase: MatchupPhase
  advantage: MatchupAdvantage
  confidence: MatchupConfidence
  summary: string
  evidenceIds: string[]
  conditions?: string
  uncertainty: string
}

export type MatchupAssumptions = {
  battlefield: string
  preparation: string
  startingCondition: string
  externalIntervention: string
}

export type MatchupAnalysis = {
  id: string
  characterAId: string
  characterBId: string
  assumptions: MatchupAssumptions
  factors: MatchupFactorAssessment[]
}

/**
 * Matchup v0.1 deliberately stores no win probability or fixed numeric bonus.
 * Core Stats remain character-level measurements; these factors describe
 * whether and how those strengths can actually operate against one opponent.
 */
