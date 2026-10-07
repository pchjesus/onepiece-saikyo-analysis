import type { CombatStat } from '../evaluation/types'

export type EvidenceSourceType = 'canon' | 'community' | 'supplementary'
export type EvidenceStrength = 'strong' | 'moderate' | 'weak' | 'unclear'
export type EvidenceStatRole = 'primary' | 'secondary' | 'context'

export type EvidenceSource = {
  type: EvidenceSourceType
  reference: string
  description?: string
}

export type EvidenceStatContribution = {
  stat: CombatStat
  role: EvidenceStatRole
  note: string
}

export type Evidence = {
  id: string
  battleId: string
  subjectCharacterId: string
  source: EvidenceSource
  evidenceStrength: EvidenceStrength
  fact: string
  supportedAbilities: string[]
  statContributions: EvidenceStatContribution[]
  interpretation: string
  evaluationImpact: string
  uncertainty: string
}
