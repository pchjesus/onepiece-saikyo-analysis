# Legendary Era Expansion — v0.1.33 Implemented Calibration

**State:** merged into main via PR #21 on 2026-10-08 (merge commit `ac06c3e8e935f0b86b7e916b79579811e0bd7461`)  
**Model:** Balanced 1.2 · 7 Final Core Stats · Haki Weight 0.5  
**Policy:** Canon Fact → Combat Context → Interpretation → Evaluation. Status/title alone does not determine a Core Stat.

## 1. Final classification

| Character | Representative Group | Numeric Evaluation states |
|---|---|---|
| 골 D. 로저 | 로저 해적단 | 전성기 |
| 실버즈 레일리 | 로저 해적단 | 전성기(default) / 현재 |
| 스코퍼 가반 | 로저 해적단 | 현재 only |
| 록스 D. 지벡 | 록스 해적단 | 갓 밸리 · 자연 상태 |
| 에드워드 뉴게이트 | 흰수염 해적단 | 전성기(default) / 정상결전 |
| 카이도 | 백수 해적단 | 전성기 · 오니가시마 |
| 샬롯 링링 | 빅 맘 해적단 | 전성기 · 오니가시마 |

스코퍼 가반의 전성기는 공식 위상은 높지만 7축 직접 전투 표본이 부족하므로 **E3 / 숫자 Evaluation 없음**을 유지한다.

뉴게이트·카이도·링링은 대표 Group 외에 록스 해적단 historical Membership도 가진다. Group navigation에는 과거 소속으로 표시되지만 Ranking / Matchup selector는 Character-unique라 중복되지 않는다.

## 2. Final score slate

| Character / state | Attack | Defense | Stamina | Speed | Technique | Combat IQ | Versatility | Overall |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 골 D. 로저 / 전성기 | 100 | 99 | 99 | 98 | 99 | 97 | 91 | **97.571** |
| 에드워드 뉴게이트 / 전성기 | 100 | 99 | 99 | 96 | 98 | 95 | 96 | **97.571** |
| 몽키 D. 가프 / 전성기 existing | 99 | 99 | 99 | 98 | 99 | 97 | 91 | **97.429** |
| 록스 D. 지벡 / 자연 상태 | 100 | 98 | 97 | 98 | 98 | 96 | 94 | **97.286** |
| 카이도 / 오니가시마 | 98 | 99 | 100 | 96 | 96 | 91 | 96 | **96.571** |
| 몽키 D. 가프 / 현재 | 96 | 93 | 95 | 97 | 97 | 95 | 88 | **94.429** |
| 샬롯 링링 / 오니가시마 | 98 | 99 | 99 | 89 | 94 | 84 | 97 | **94.286** |
| 실버즈 레일리 / 전성기 | 94 | 92 | 91 | 93 | 96 | 95 | 89 | **92.857** |
| 에드워드 뉴게이트 / 정상결전 | 98 | 88 | 95 | 88 | 94 | 92 | 95 | **92.857** |
| 스코퍼 가반 / 현재 | 91 | 90 | 92 | 94 | 95 | 95 | 88 | **92.143** |
| 실버즈 레일리 / 현재 | 89 | 89 | 86 | 91 | 96 | 94 | 87 | **90.286** |

0.1~0.3 차이는 Canon 1v1 서열이나 승률이 아니다.

## 3. Why Prime Rayleigh and Current Gaban were lowered

### Prime Rayleigh
Official status as Roger's vice-captain / right hand and old-age combat against Borsalino are strong portrayal and lower-bound evidence. However, the directly shown Prime combat sample remains narrow.

Therefore:
- Prime Rayleigh is not automatically placed above the Admirals.
- Final Overall is **92.857**.
- All seven Prime Rayleigh stats are **E2**.

This preserves “extremely strong” without turning title/reputation into unsupported 95+ values across the board.

### Current Gaban
The first draft overreacted to late-Elbaf feats.

Current Gaban:
- repeatedly evades and tests Luffy;
- seriously damages Sommers and interacts with Knight regeneration;
- uses future prediction in the Colon hostage sequence;
- intervenes against Imu, loses an arm, survives and orders retreat after judging the fight unwinnable.

Survival against Imu is **not** treated as proof of 94+ overall. The manifested Imu body was not a clean neutral 1v1 target, the fight was incomplete, and survival alone is not equivalent to combat parity.

Final current Gaban is **92.143**:
- same arithmetic Overall as Borsalino;
- below Kuzan and Sakazuki;
- above many commander-level anchors;
- Prime remains unscored E3.

## 4. Current Garp vs Big Mom calibration

The previous draft had Big Mom clearly above current Garp. Re-review changed both sides.

### Current Garp
Hachinosu directly supports:
- repeated initiative against Kuzan;
- Blue Hole after breaking out of Ice Ball;
- continued combat after Shiryu's protection-related abdominal wound;
- Galaxy Divide and rescue-command execution;
- high-speed movement between multiple rescue objectives.

Final: **94.429**.

### Big Mom
Her Attack / Defense / Stamina / Versatility remain world-top:
- direct Kaido clash;
- Hakai participation;
- Supreme King Haki strike;
- repeated awakened Law/Kid damage;
- self-repair;
- prolonged resistance before ring-out/environmental defeat.

However, Speed and Combat IQ are kept lower because the Onigashima fight contains exploitable positioning, target-priority and conditional Soul Pocus sequences.

Final: **94.286**.

The 0.143 difference means “same highest-current band”, not “Garp canonically beats Big Mom”.

## 5. Haki audit

### Roger
- Armament: confirmed
- Observation: confirmed
- Supreme King: confirmed
- direct Supreme King application: Attack / Defense / Technique
- Raw: +8 to each of those three stats before ×0.5

### Rayleigh
- all three types confirmed
- current Armament demonstration is used for Current Attack / Technique Raw
- current Raw is **not** copied back into Prime

### Gaban
- Armament: unclear
- Observation: confirmed
- Supreme King: confirmed
- current Combat IQ uses only the explicitly demonstrated Observation application
- past Supreme King output is not copied into current Attack/Technique Raw

### Rocks
- Supreme King: confirmed
- Armament / Observation typed application: unclear
- Supreme King application supports Attack / Defense / Technique
- Demonized-state regeneration/durability is excluded from natural-state numeric stats

### Newgate
- all three types confirmed
- Prime: Supreme King directly applied to Attack / Defense / Technique
- Marineford: typed Raw Haki remains 0 because current-state application is not clear enough to allocate by type

### Kaido
- all three types confirmed
- Supreme King → Attack / Technique
- advanced Observation → Defense / Combat IQ

### Linlin
- all three types confirmed
- Supreme King → Attack / Technique
- “Haki too strong for Law's direct movement” remains Matchup Interaction and is not arbitrarily allocated to a specific Haki Raw stat

## 6. Evidence readiness

v0.1.33 implements optional per-stat readiness:

- **E1**: strong direct/repeated support
- **E2**: score possible but meaningful uncertainty remains
- **E3**: too little direct Evidence; numeric evaluation may be withheld

Readiness is independent from score magnitude and has no Balanced calculation weight.

Examples:
- Kaido: mostly E1
- Prime Rayleigh: seven E2 stats
- natural Rocks: Attack/Technique E1, several less directly sampled axes E2
- Prime Gaban: E3, no numeric Evaluation

## 7. Rocks state boundary

Numeric Rocks Evaluation = **God Valley natural state only**.

Domi Reversi / demonized Rocks:
- is an external altered state;
- is not a second Evaluation in v0.1.33;
- does not donate regeneration or altered durability to natural Rocks;
- remains a scale sanity-check only.

Roger + Garp's joint attack and the later fate of normal-state Rocks are recorded separately so the project does not simplify the sequence into “Roger and Garp directly killed natural Rocks”.

## 8. Membership architecture

v0.1.32 multi-membership is now used by real historical data.

Representative:
- Newgate → Whitebeard Pirates
- Kaido → Beasts Pirates
- Linlin → Big Mom Pirates

Historical:
- Newgate → Rocks Pirates
- Kaido → Rocks Pirates
- Linlin → Rocks Pirates

The UI labels former/historical group context as **과거 소속**.
Ranking and Matchup selectors still contain one row per Character.

## 9. Counts after implementation

- **37 Character master pool**
- **36 evaluated unique Characters**
- **41 Membership rows**
- **39 Evaluation records**

Buggy remains master-pool-only E3.
Prime Gaban remains non-numeric E3.

## 10. Verification

First PR CI attempt exposed one stale assumption:
- the old test required each initial crew to remain exactly 3 Characters.

That is no longer a product rule after adding Newgate / Kaido / Linlin to their representative crews.

After replacing the exact-three assertion with an expandable baseline and explicit four-character checks:

- **25 test files passed**
- **116 tests passed**
- production build passed

Balanced 1.2 / Haki Weight 0.5 remain unchanged.
