import type { CombatProfile } from '../../domain/character/types'
import type { Evaluation } from '../../domain/evaluation/types'

/**
 * Qualitative display for King's verified Lunarian flame trade-off.
 * This is NOT an additional Evaluation or a source of numeric scores:
 * both displayed Finals come from the existing live Evaluation.
 */
export function KingFlameModeNote({ evaluation, profile }: {
  evaluation: Evaluation
  profile: CombatProfile
}) {
  const lunarian = profile.specialTraits.find((trait) => trait.id === 'special-king-lunarian')
  const defense = evaluation.items.find((item) => item.stat === 'defense')
  const speed = evaluation.items.find((item) => item.stat === 'speed')
  if (evaluation.characterId !== 'king' || !lunarian || !defense || !speed) return null

  return (
    <aside className="king-flame-mode-note" aria-label="킹의 불꽃 ON 및 OFF 상태와 통합 평가" data-testid="king-flame-mode-note">
      <div className="king-flame-mode-heading">
        <h3>불꽃 ON / OFF</h3>
        <span>조건부 전투 능력</span>
      </div>
      <p className="king-flame-mode-intro">
        위의 방어 <strong>{defense.score}</strong> · 속도 <strong>{speed.score}</strong>는
        전투 중 상태를 바꿀 수 있다는 점을 포함한 <strong>통합 7축 평가</strong>입니다.
        두 상태의 최고 방어와 최고 속도를 한순간에 동시에 발휘한다는 뜻은 아닙니다.
      </p>
      <dl className="king-flame-mode-grid">
        <div>
          <dt>불꽃 ON <span>방어형</span></dt>
          <dd>등의 불꽃이 켜진 상태. 높은 피해 저항을 발휘하지만 OFF의 고속 상태와는 구분됩니다.</dd>
        </div>
        <div>
          <dt>불꽃 OFF <span>고속형</span></dt>
          <dd>등의 불꽃이 꺼진 상태. ON보다 속도가 빨라지는 대신 방어가 약해집니다.</dd>
        </div>
      </dl>
      <p className="king-flame-mode-footnote">
        상대가 상태 변화를 파악해 취약한 시점을 노릴 수 있습니다. ON/OFF 각각의 별도 점수는 산정하지 않았으며,
        상태 전환의 지속시간·정확한 변화 폭도 확정하지 않았습니다.
      </p>
      <small className="king-flame-mode-source">
        근거 · 원작 1032·1035화 / 기존 {lunarian.name} 전투 프로필 및 아래 평가 근거
      </small>
    </aside>
  )
}
