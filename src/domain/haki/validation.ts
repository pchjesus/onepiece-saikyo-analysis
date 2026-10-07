import { HAKI_CONFIRMATION_STATUSES, HAKI_TYPES, type HakiProfile, type HakiStatContribution } from './types'

export function validateHakiProfile(profile: HakiProfile): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  for (const capability of profile.capabilities) {
    if (!(HAKI_TYPES as readonly string[]).includes(capability.type)) errors.push(`Invalid Haki type: ${capability.type}.`)
    if (!(HAKI_CONFIRMATION_STATUSES as readonly string[]).includes(capability.status)) errors.push(`Invalid Haki status for ${capability.type}.`)
    if (seen.has(capability.type)) errors.push(`Duplicate Haki capability: ${capability.type}.`)
    if (capability.infusion && capability.type !== 'conquerors') errors.push('패휘감 정보는 패왕색에만 기록할 수 있습니다.')
    if (capability.infusion && !(HAKI_CONFIRMATION_STATUSES as readonly string[]).includes(capability.infusion.status)) errors.push('Invalid conquerors infusion status.')
    seen.add(capability.type)
  }
  return errors
}

export function validateHakiContribution(contribution: HakiStatContribution): string[] {
  const errors: string[] = []
  if (!Number.isFinite(contribution.amount) || contribution.amount < 0 || contribution.amount > 10) {
    errors.push('Haki contribution must be between 0 and 10.')
  }
  if (contribution.amount % 2 !== 0) errors.push('Haki contribution should use the current 2-point step scale.')
  if (!contribution.application.trim()) errors.push('Haki contribution application is required.')
  if (contribution.evidenceIds.length === 0 && contribution.amount > 0) errors.push('Positive Haki contribution requires Evidence.')
  return errors
}
