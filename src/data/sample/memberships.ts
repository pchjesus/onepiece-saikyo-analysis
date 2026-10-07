import type { CharacterMembership } from '../../domain/character/types'

export const sampleMemberships: CharacterMembership[] = [
  { characterId: 'marco', groupId: 'whitebeard-pirates', subgroup: '1번대', role: '대장', status: 'current' },
  { characterId: 'jozu', groupId: 'whitebeard-pirates', subgroup: '3번대', role: '대장', status: 'current' },
  { characterId: 'vista', groupId: 'whitebeard-pirates', subgroup: '5번대', role: '대장', status: 'current' },

  { characterId: 'king', groupId: 'beasts-pirates', subgroup: '대간판', role: '대간판', status: 'current' },
  { characterId: 'queen', groupId: 'beasts-pirates', subgroup: '대간판', role: '대간판', status: 'current' },
  { characterId: 'jack', groupId: 'beasts-pirates', subgroup: '대간판', role: '대간판', status: 'current' },

  { characterId: 'katakuri', groupId: 'big-mom-pirates', subgroup: '스위트 3장성', role: '장성', status: 'current' },
  { characterId: 'smoothie', groupId: 'big-mom-pirates', subgroup: '스위트 3장성', role: '장성', status: 'current' },
  { characterId: 'cracker', groupId: 'big-mom-pirates', subgroup: '스위트 3장성', role: '장성', status: 'current' },
]
