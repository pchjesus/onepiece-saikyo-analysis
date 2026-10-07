import type { Group } from '../../domain/character/types'

/**
 * Group registry for the current MVP.
 *
 * This intentionally mirrors the three existing Crew records first. New
 * organizations can be added without changing Character identity or combat
 * evaluation data.
 */
export const sampleGroups: Group[] = [
  { id: 'whitebeard-pirates', name: '흰수염 해적단', type: 'pirate-crew' },
  { id: 'beasts-pirates', name: '백수 해적단', type: 'pirate-crew' },
  { id: 'big-mom-pirates', name: '빅 맘 해적단', type: 'pirate-crew' },
]
