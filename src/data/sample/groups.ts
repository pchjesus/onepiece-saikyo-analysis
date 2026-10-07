import type { Group } from '../../domain/character/types'

/**
 * Canonical group registry used by navigation and character memberships.
 *
 * A Group is a UI/domain grouping boundary, not a combat tier. Cross-cutting
 * classifications such as Worst Generation remain tags/filters rather than
 * primary groups.
 */
export const sampleGroups: Group[] = [
  { id: 'whitebeard-pirates', name: '흰수염 해적단', type: 'pirate-crew' },
  { id: 'beasts-pirates', name: '백수 해적단', type: 'pirate-crew' },
  { id: 'big-mom-pirates', name: '빅맘 해적단', type: 'pirate-crew' },
  { id: 'straw-hat-pirates', name: '밀짚모자 일당', type: 'pirate-crew' },
  { id: 'red-hair-pirates', name: '빨간 머리 해적단', type: 'pirate-crew' },
  { id: 'blackbeard-pirates', name: '검은 수염 해적단', type: 'pirate-crew' },
  { id: 'roger-pirates', name: '로저 해적단', type: 'historical' },
  { id: 'rocks-pirates', name: '록스 해적단', type: 'historical' },
  { id: 'cross-guild', name: '크로스 길드', type: 'institution' },

  { id: 'marines', name: '해군', type: 'marine' },
  { id: 'world-government', name: '세계정부', type: 'government' },
  { id: 'cp0', name: 'CP0', type: 'government', parentGroupId: 'world-government' },
  { id: 'cp9', name: 'CP9', type: 'government', parentGroupId: 'world-government' },
  { id: 'impel-down', name: '임펠다운', type: 'government', parentGroupId: 'world-government' },
  { id: 'revolutionary-army', name: '혁명군', type: 'revolutionary' },
  { id: 'seven-warlords', name: '왕의 부하 칠무해', type: 'institution' },
  { id: 'five-elders', name: '오로성', type: 'government', parentGroupId: 'world-government' },

  { id: 'wano', name: '와노쿠니', type: 'regional' },
  { id: 'skypiea', name: '하늘섬', type: 'regional' },
  { id: 'elbaf-giants', name: '엘바프 / 거인족', type: 'regional' },
]
