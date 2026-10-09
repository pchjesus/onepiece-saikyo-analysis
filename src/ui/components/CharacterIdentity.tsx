import type { CSSProperties } from 'react'
import type { Group } from '../../domain/character/types'

/**
 * Muted visual identity only. Group colors and simplified icon motifs do not
 * create canon facts, hierarchy, source links or combat stat modifiers.
 * Admiral epithets have their characteristic color even after an affiliation
 * change (e.g. Kuzan now belongs to Blackbeard's crew).
 */
const groupAccent: Record<string, string> = {
  'whitebeard-pirates': '#426582',
  'beasts-pirates': '#65547c',
  'big-mom-pirates': '#995c7c',
  'straw-hat-pirates': '#aa783a',
  'red-hair-pirates': '#9d5253',
  'blackbeard-pirates': '#625774',
  'roger-pirates': '#a47d43',
  'rocks-pirates': '#655370',
  'cross-guild': '#626b80',
  marines: '#446f92',
  'revolutionary-army': '#8a5c52',
  cp0: '#697586',
  'seven-warlords': '#567987',
}

const admiralAccent: Record<string, string> = {
  akainu: '#ac4c43', // 赤犬
  kuzan: '#4579ab', // 青雉
  kizaru: '#ab883b', // 黄猿
  fujitora: '#826a9f', // 藤虎
  ryokugyu: '#5e8769', // 緑牛
}

export function getCharacterAccent(groupId: string, characterId: string) {
  return admiralAccent[characterId] ?? groupAccent[groupId] ?? '#65717b'
}

export function characterIdentityStyle(groupId: string, characterId: string): CSSProperties {
  return { '--identity-accent': getCharacterAccent(groupId, characterId) } as CSSProperties
}

function WhitebeardEmblem() {
  // Small self-drawn crescent-moustache skull-and-bones motif; not an official logo asset.
  return <svg viewBox="0 0 48 48" width="25" height="25" role="img" aria-label="흰수염 해적단 수염 달린 해골 문양">
    <path d="M6 10 42 38M42 10 6 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="24" cy="22" r="12" fill="#fff" stroke="currentColor" strokeWidth="2"/>
    <circle cx="20" cy="20" r="2" fill="currentColor"/><circle cx="28" cy="20" r="2" fill="currentColor"/>
    <path d="M12 26Q17 32 24 28Q31 32 36 26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
}

/** Minimal original horned-skull motif inspired by the Beasts Pirates Jolly Roger.
 * This is an icon-sized interpretation, not a traced official flag asset.
 */
function BeastsEmblem() {
  return <svg viewBox="0 0 48 48" width="25" height="25" role="img"
    aria-label="백수 해적단의 뿔 달린 해골 상징">
    <g fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
      <path d="M8 8L40 40M40 8L8 40M5 24H43M24 4V44"/>
      <path d="M14 14C7 10 6 6 8 3C10 10 17 11 20 12M34 14C41 10 42 6 40 3C38 10 31 11 28 12"/>
    </g>
    <path d="M14 17Q24 8 34 17L36 29L31 35H17L12 29Z"
      fill="#fff" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 21L22 24L20 27L16 26ZM32 21L26 24L28 27L32 26Z" fill="currentColor"/>
    <path d="M24 27L22 30H26Z" fill="currentColor"/>
    <path d="M20 33V35M24 32V35M28 33V35" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
}

const groupMark = (group: Group): string => {
  // Decorative echoes of each crew's theme; not asserted to be their canon Jolly Rogers.
  const markByGroup: Record<string, string> = {
    'big-mom-pirates': '♛',
    'straw-hat-pirates': '☀',
    'red-hair-pirates': '⚔',
    'blackbeard-pirates': '☠',
    'roger-pirates': '✦',
    'rocks-pirates': '⚔',
    'cross-guild': '◆',
    marines: '⚓',
    'revolutionary-army': '✦',
    cp0: '♟',
    'seven-warlords': '♟',
  }
  return markByGroup[group.id] ?? '◆'
}

export function CharacterIdentity({ group, characterId, showPastMembership }: {
  group: Group
  characterId: string
  showPastMembership: boolean
}) {
  return <div className="character-identity" aria-label="캐릭터 소속 및 상징">
    <span className="identity-mark">
      {group.id === 'whitebeard-pirates'
        ? <WhitebeardEmblem/>
        : group.id === 'beasts-pirates'
          ? <BeastsEmblem/>
          : <span aria-hidden="true">{groupMark(group)}</span>}
    </span>
    <span className="eyebrow">{group.name}</span>
    {showPastMembership && <span className="membership-context">과거 소속</span>}
  </div>
}
