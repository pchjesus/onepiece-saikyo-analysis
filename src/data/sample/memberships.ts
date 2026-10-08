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

  { characterId: 'zoro', groupId: 'straw-hat-pirates', role: '전투원 / 검사', status: 'current' },
  { characterId: 'sanji', groupId: 'straw-hat-pirates', role: '요리사 / 전투원', status: 'current' },
  { characterId: 'jinbe', groupId: 'straw-hat-pirates', role: '조타수 / 전투원', status: 'current' },

  { characterId: 'shanks', groupId: 'red-hair-pirates', role: '선장', status: 'current' },
  { characterId: 'garp', groupId: 'marines', role: '중장 / 해군 영웅', status: 'current' },
  { characterId: 'akainu', groupId: 'marines', role: '원수', status: 'current' },
  { characterId: 'kuzan', groupId: 'marines', role: '전 대장', status: 'former' },
  { characterId: 'kizaru', groupId: 'marines', role: '대장', status: 'current' },
  { characterId: 'fujitora', groupId: 'marines', role: '대장', status: 'current' },
  { characterId: 'ryokugyu', groupId: 'marines', role: '대장', status: 'current' },

  { characterId: 'teach', groupId: 'blackbeard-pirates', role: '제독 / 선장', status: 'current' },
  { characterId: 'burgess', groupId: 'blackbeard-pirates', subgroup: '1번선', role: '선장', status: 'current' },
  { characterId: 'shiryu', groupId: 'blackbeard-pirates', subgroup: '2번선', role: '선장', status: 'current' },
  { characterId: 'van-augur', groupId: 'blackbeard-pirates', subgroup: '3번선', role: '선장', status: 'current' },
  { characterId: 'pizarro', groupId: 'blackbeard-pirates', subgroup: '4번선', role: '선장', status: 'current' },
  { characterId: 'law', groupId: 'seven-warlords', role: '하트 해적단 선장', status: 'former' },
  { characterId: 'doflamingo', groupId: 'seven-warlords', role: '돈키호테 해적단 선장', status: 'former' },
  { characterId: 'hancock', groupId: 'seven-warlords', role: '구사 해적단 선장', status: 'former' },
  { characterId: 'mihawk', groupId: 'cross-guild', role: '공동 창설자 / 핵심 전력', status: 'current' },
  { characterId: 'crocodile', groupId: 'cross-guild', role: '공동 창설자', status: 'current' },

]
