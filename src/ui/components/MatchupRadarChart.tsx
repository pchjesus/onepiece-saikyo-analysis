import type { MatchupHubFighter } from '../../application/getMatchupHub'

const statShortLabels: Record<string, string> = {
  attack: '공격', defense: '방어', stamina: '지구력', speed: '속도',
  techniqueMastery: '기술', combatIQ: '전투 IQ', versatility: '범용성',
}

const SIZE = 320
const CENTER = SIZE / 2
const MAX_RADIUS = 112

function point(index: number, count: number, radius: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count
  return [CENTER + Math.cos(angle) * radius, CENTER + Math.sin(angle) * radius] as const
}

function polygonPoints(values: number[]) {
  return values.map((value, index) => {
    const [x, y] = point(index, values.length, MAX_RADIUS * value / 100)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

export function MatchupRadarChart({ characterA, characterB }: {
  characterA: MatchupHubFighter
  characterB: MatchupHubFighter
}) {
  const count = characterA.stats.length
  const gridLevels = [25, 50, 75, 100]

  return (
    <div className="matchup-radar-card">
      <div className="matchup-radar-legend">
        <span className="fighter-a-key">{characterA.name}</span>
        <span className="fighter-b-key">{characterB.name}</span>
      </div>
      <svg className="matchup-radar" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img"
        aria-label={`${characterA.name}와 ${characterB.name}의 7개 전투 스탯 레이더 비교`}>
        {gridLevels.map((level) => (
          <polygon key={level} className="radar-grid"
            points={polygonPoints(Array(count).fill(level))} />
        ))}
        {characterA.stats.map((stat, index) => {
          const [x2, y2] = point(index, count, MAX_RADIUS)
          const [lx, ly] = point(index, count, MAX_RADIUS + 29)
          return (
            <g key={stat.stat}>
              <line className="radar-axis" x1={CENTER} y1={CENTER} x2={x2} y2={y2} />
              <text className="radar-label" x={lx} y={ly} textAnchor="middle" dominantBaseline="middle">
                {statShortLabels[stat.stat] ?? stat.label}
              </text>
            </g>
          )
        })}
        <polygon className="radar-fighter-a" points={polygonPoints(characterA.stats.map(({ score }) => score))} />
        <polygon className="radar-fighter-b" points={polygonPoints(characterB.stats.map(({ score }) => score))} />
      </svg>
    </div>
  )
}
