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


/**
 * Original miniature symbol sketches of researched motifs, NOT licensed exact
 * flag art. Roger: curly moustache; Blackbeard: triple skull; Cross Guild:
 * sword + wings + jester skull. Other groups retain their existing symbols.
 */
function CrewSymbol({ id }: { id: string }) {
  if (!['roger-pirates','blackbeard-pirates','cross-guild','red-hair-pirates','straw-hat-pirates'].includes(id)) return null
  const label: Record<string,string> = {
    'roger-pirates':'로저 해적단의 곱슬 수염 해골을 단순화한 상징',
    'blackbeard-pirates':'검은수염 해적단의 세 해골을 단순화한 상징',
    'cross-guild':'크로스 길드의 광대 해골과 검, 날개를 단순화한 상징',
    'red-hair-pirates':'빨간 머리 해적단의 상처 있는 해골을 단순화한 상징',
    'straw-hat-pirates':'밀짚모자 일당의 밀짚모자 해골을 단순화한 상징',
  }
  return <svg viewBox="0 0 48 48" width="26" height="26" role="img" aria-label={label[id]}
    fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {id === 'blackbeard-pirates' ? <>
      <path d="M6 41L42 10M6 10L42 41M4 25H44" strokeWidth="2.5"/>
      {[11,24,37].map((cx,index)=><g key={cx}>
        <circle cx={cx} cy={index===1?20:25} r={index===1?8:7} fill="white" strokeWidth="1.8"/>
        <path d={`M${cx-3} ${index===1?19:24}h1m5 0h1`} strokeWidth="2.3"/>
        <path d={`M${cx-3} ${index===1?24:29}q3 2 6 0`} strokeWidth="1.4"/>
      </g>)}
    </> : <>
      <path d="M8 9L40 39M40 9L8 39" strokeWidth="2.6" opacity=".8"/>
      {id==='cross-guild' && <>
        <path d="M24 2V44M21 8H27" strokeWidth="3.2"/>
        <path d="M12 21L3 15 5 27 12 30M36 21L45 15 43 27 36 30" strokeWidth="2.1" />
      </>}
      <ellipse cx="24" cy="23" rx="12" ry="12" strokeWidth="2" fill="#f8f8f8"/>
      <path d="M18 20h2m8 0h2M22 25l2-2 2 2M19 29h10" strokeWidth="2.3"/>
      {id==='roger-pirates' && <path d="M24 29Q15 22 10 31Q14 37 22 31M24 29Q33 22 38 31Q34 37 26 31" strokeWidth="2.2"/>}
      {id==='red-hair-pirates' && <path d="M18 12l-3 10m8-11l-3 10m8-10l-3 10" stroke="#9d5253" strokeWidth="2.2"/>}
      {id==='straw-hat-pirates' && <><path d="M11 17Q13 6 24 7Q35 6 37 17Z" fill="#dfc088" strokeWidth="2"/><path d="M7 18Q24 23 41 18" stroke="#ad6539" strokeWidth="3"/></>}
      {id==='cross-guild' && <><circle cx="24" cy="24" r="3" fill="#c5545d" stroke="none"/><path d="M14 15q10-11 20 0" stroke="#9978a0" strokeWidth="3"/></>}
    </>}
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
          : <>{CrewSymbol({ id: group.id }) ?? <span aria-hidden="true">{groupMark(group)}</span>}</>}
    </span>
    <span className="eyebrow">{group.name}</span>
    {showPastMembership && <span className="membership-context">과거 소속</span>}
  </div>
}
