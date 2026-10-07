# 원피스 사최간 전투력 분석

MVP v0.1.22

## MVP 샘플
- 마르코
- 킹
- 카타쿠리

현재 Marco / King / Katakuri는 draft 평가 상태다. v0.1.22부터 Overall Combat Power는 7개 Final Core Stat(Attack, Defense, Stamina, Speed, Technique, Combat IQ, Versatility)의 단순 산술평균으로 계산한다. Haki는 실제 Application Evidence가 있을 때 Raw Contribution을 보존하고 Balanced 1.2의 Haki Weight 0.5를 거쳐 Effective Contribution으로 반영한다. Special Combat Profile은 악마의 열매·종족 특성·개조·특수 장비 등 고유 전투요소를 비수치 정보로 보존하며 Overall에 직접 가산하지 않는다. 구조 전환 직후의 기계적 Overall은 Marco 80.571, King 80.286, Katakuri 81.714이며, 이후 전체 캐릭터 횡단 재평가를 거칠 draft 값이다.

## 구조
UI → Application → Domain
Application → Repository → Data

현재 Battle / Evidence 도메인과 Repository 경계를 사용한다. 캐릭터 상세에서는 마르코의 검증된 원작 근거를 시간 순 전투 기록으로 묶어 확인할 수 있다.

## 전투 기록 UI
- 시간 순 Battle 목록
- Battle 선택 시 전투 상황 확장
- 확장된 Battle 안에서 연결된 Canon Evidence 표시
- 평가 진행 상태(prototype / draft / official) 구분
- Evidence는 현재 점수를 자동 변경하지 않음

## 실행

### Windows PowerShell
```powershell
npm.cmd install
npm.cmd run dev
```

개발 서버 실행 후 `http://localhost:5173`에 접속합니다.

### 검증
```powershell
npm.cmd test
npm.cmd run build
```


## v0.1.22 note

- 숫자형 `Special Ability`를 Core Stat에서 제거하고 7개 Core Stat 구조로 전환했습니다.
- Special은 `Special Combat Profile`의 비수치 데이터로 분리해 악마의 열매, 종족 특성, 특수 생리, 개조, 장비, 과학 기술 등을 기록합니다.
- Special Trait은 설명·한계·불확실성·Evidence ID를 보존하지만 Balanced Overall에 직접 가산하지 않습니다. 실제 전투 성과가 확인된 경우 해당 Core Stat의 Evidence로 반영합니다.
- 패기는 실제 전투 Application이 확인되면 기존처럼 Stat-specific Raw Contribution과 Haki Weight 0.5를 통해 수치에 반영합니다.
- Balanced 1.2는 7개 Final Core Stat의 단순 평균을 사용합니다. Balanced 1.1의 8-stat 방식은 과거 버전 의미로 문서에 보존합니다.
- 기존 Marco / King / Katakuri의 Special 관련 Canon Evidence는 삭제하지 않고 Special Profile 및 기존 Core Stat 근거로 보존했습니다.
- 새 캐릭터 추가는 잠시 중단하고, 구조 전환 후 기존·논의 중 캐릭터의 Overall을 전체 재산정한 다음 재개합니다.

## v0.1.21 note

- 전투력 점수 상단 밀집을 완화하기 위해 90점 이상을 해당 능력축에서 세계관 최상위급과 직접 비교 가능한 영역으로 남기는 절대 스케일 calibration을 적용했습니다. 직책이나 티어를 고정 점수로 변환하지 않습니다.
- Marco / King / Katakuri를 기존 점수에서 일괄 감점하지 않고 현재 저장된 Canon Evidence와 Stat Definition을 기준으로 독립 재평가했습니다.
- Haki Raw Contribution 값은 유지하며 Balanced 1.1에서 `Effective Haki = Raw Haki × 0.5`를 적용합니다.
- Evaluation Trace에서 Base / Raw Haki / Weight / Effective Haki / Final을 구분합니다.
- King의 Flame ON 고방어와 Flame OFF 고속을 동시에 상시 Peak처럼 계산하지 않도록 재보정했습니다.
- Future Sight는 Defense / Technique-Mastery / Combat IQ와 연결하되 Weight 0.5를 적용하고 Speed에는 직접 Haki 가산하지 않습니다.
- Evidence 부족을 능력 부족으로 자동 해석하지 않습니다. Evidence Coverage / Confidence는 이번 버전에는 별도 필드로 추가하지 않고 후속 설계 후보로 남깁니다.
- v0.1.20 GitHub Actions에서 확인된 stale test fixture 7건을 현재 데이터에 맞게 수정했습니다.
- 최종 calibration에서 Marco의 정상결전/Wano 방어 및 Armament Application Evidence, Katakuri의 Snakeman Speed와 전투 판단 Evidence를 보강했습니다.
- 동일 Evidence가 여러 Stat에 연결되는 것은 서로 다른 평가 의미를 증명할 때만 허용하고 primary / secondary / context로 강도를 구분합니다.
- 개발 중에는 외부 공개를 하지 않으므로 main push에서는 test/build만 수행하고 GitHub Pages configure/deploy는 수동 workflow_dispatch에서만 실행합니다.

## v0.1.20 note

- Marco / King / Katakuri를 현재 8개 스탯과 Evidence 역할 규칙으로 전면 재평가했습니다. 기존 점수의 증감이 아니라 현재 Canon Evidence에서 다시 산정한 draft입니다.
- Katakuri의 미러월드 루피전 Battle Context와 미래예지·각성·무장색·패왕색 Canon Evidence를 추가했습니다.
- Haki Contribution을 실제 Evaluation에 처음 적용했습니다. 보유 사실만으로 가산하지 않고 실제 전투 활용 Evidence가 있는 경우에만 적용합니다.
- Katakuri의 미래예지는 Defense / Technique-Mastery / Combat IQ에 반영하고 Speed에는 자동 가산하지 않아 선행 예측과 순수 속도를 구분했습니다. 패왕색 방출은 확인 정보로 보존하되 현재 상위권 1대1 스탯에는 별도 가산하지 않습니다.
- King은 검술에 실제 적용한 무장색만 Attack / Technique-Mastery에 제한적으로 반영했습니다. Marco는 패기 보유는 확인되지만 현재 저장된 Canon Evidence에 구체적인 Haki Application이 부족하여 가산하지 않았습니다.
- Haki Contribution이 참조하는 Evidence가 존재하고 같은 캐릭터 소유이며 해당 EvaluationItem에도 연결되었는지 검증하도록 referential validation을 강화했습니다.
- GitHub Pages 배포를 위해 상대 asset base와 `.github/workflows/deploy-pages.yml` 자동 배포 workflow를 추가했습니다. main push 시 test → build → Pages deploy 순서로 실행됩니다.

### 로컬 검증 순서 (Windows PowerShell)
```powershell
npm.cmd install
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

### GitHub Pages 공개 시점
현재는 외부 공유 전이므로 Pages를 활성화하지 않습니다. main push에서는 자동 test/build만 수행합니다.

향후 각 해적단의 주요 최고간부 2~3명 데이터가 충분히 추가되어 외부 공유를 시작할 때:
1. `Settings → Pages → Build and deployment → Source`를 `GitHub Actions`로 선택합니다.
2. `Actions → Validate / Deploy GitHub Pages → Run workflow`를 수동 실행합니다.
3. test/build가 통과하면 Pages artifact를 배포합니다.

## v0.1.18 note

- Haki를 9번째 0~100 스탯으로 만들지 않고 `Capability → Application → Stat-specific Contribution` 구조로 모델링했습니다.
- Haki Contribution은 스탯별 총 +0~10 범위, 현재 2점 단위 기준을 사용하며 실제 Evidence가 없는 양의 가산은 허용하지 않습니다.
- 최종 스탯은 `Base Stat + Haki Contribution`(최대 100)으로 계산하고 Overall은 기존처럼 8개 최종 스탯의 단순 평균을 유지합니다.
- Evidence의 단순 `supportedStats`를 `statContributions`로 교체하여 각 연결을 `primary / secondary / context`로 구분합니다.
- Marco의 재생 Evidence는 Special Ability(primary), Stamina(secondary), Technique(context)로 분리하여 회복 사실이 숙련도로 중복 점수화되지 않도록 했습니다.
- Marco Technique / Mastery를 86 → 78, King Technique / Mastery를 93 → 86으로 재평가했습니다. 두 값 모두 현재 저장된 Evidence 범위의 draft이며 최종값이 아닙니다.
- Katakuri는 현재 프로젝트에 Canon Evidence가 없어 prototype을 유지합니다. Zoro는 Haki 구조 테스트의 synthetic fixture에만 사용하며 실제 캐릭터 평가 데이터로 추가하지 않았습니다.

## v0.1.17 note

- Defense의 Stat Definition에서 제거된 `Durability` 명칭을 완전히 제거하고 현재 모델의 Recovery 처리 원칙만 남겼습니다.
- Battle Evidence 화면에서 전투 구조, 전투 목적, 전투 의도, 환경, 제한 조건, 외부 요인, 전투 결과를 함께 확인할 수 있도록 Battle Context 표시를 보강했습니다.
- Battle Context와 Canon Evidence를 함께 읽을 수 있도록 UI 구조를 정리했습니다.

## v0.1.16 note

- Recovery를 독립적인 최상위 스탯에서 제거하고 `Technique / Mastery`를 8번째 평가축으로 도입했습니다.
- Technique / Mastery는 검술·체술·무기술·능력 운용 등 자신이 사용하는 전투 수단을 얼마나 높은 수준으로 정교하게 다루는지를 평가하며, Special Ability / Combat IQ / Versatility와 분리합니다.
- Recovery 관련 기존 Evidence는 삭제하지 않습니다. 회복·재생이라는 작중 사실은 Evidence와 고유 전투 능력 정보로 보존하고, 실제 전투 지속에 기여한 장면은 Combat Context에 따라 Stamina의 근거로 활용할 수 있습니다. 회복 사실 자체를 Defense에 자동 합산하지 않습니다.
- Defense는 공격을 회피·방어·차단하거나 피해를 줄이는 능력으로 유지하며, 손상 이후의 회복·재생을 Defense 점수에 자동으로 포함하지 않습니다.
- Marco / King의 Technique / Mastery를 현재 확보된 Evidence에 맞춰 draft 산정하고, Versatility의 과도한 90점대 집중을 완화했습니다. 이는 전체 작중행적 재검토 전의 중간 draft이며 최종값이 아닙니다.
- Special Ability는 악마의 열매에 한정하지 않고 캐릭터의 고유 전투 능력 전반을 평가하는 방향으로 정리합니다.
- 현재 모델은 향후 사최간·토비롯포뿐 아니라 사황·대장·중장 및 비능력자 강자에게도 적용 가능한지를 기준으로 계속 검증합니다.

## v0.1.14 note

- 기존 `Durability`를 독립적인 최상위 스탯에서 제거하고 `Versatility`를 추가했습니다.
- Defense는 회피·방어·차단·피해 감소뿐 아니라 특정 상태에서 강화되는 조건부 방어 메커니즘까지 하나의 종합 방어 점수로 평가합니다.
- Recovery는 손상 이후의 회복·재생에 집중하고, Stamina는 피로 누적 상황에서의 전투 지속에 집중하도록 설명을 보강했습니다.
- Special Ability는 능력 자체의 성능·특수 효과·직접적인 유틸리티를, Versatility는 서로 다른 상황·역할·전투 방식에 적용하는 폭과 적응력을 평가하도록 구분했습니다.
- Marco와 King의 draft 평가를 현재 연결된 Evidence를 기준으로 재검토했습니다. Katakuri는 근거 데이터가 충분히 확보되지 않아 prototype 50점 구조 검증값을 유지합니다.
- Marco의 기존 Durability 평가를 제거하고 Defense 80, Versatility 94로 재평가했습니다. Recovery 93과 Stamina 84는 관련 Evidence를 재검토한 뒤 유지했습니다.
- King은 Defense 96을 유지하되, 불꽃 on/off에 따른 조건부 방어를 별도 스탯으로 분리하지 않고 하나의 Defense 평가 안에서 설명하도록 정리했습니다.
- Evidence의 `supportedStats`에서 제거된 `durability` 참조를 정리하고 Versatility 근거를 추가했습니다.

## v0.1.13 note

- Defense / Durability / Recovery의 평가 경계를 명확히 정리했습니다.
- Marco Durability를 78 → 74로 조정했습니다. Recovery로 인한 전투 지속과 순수 내구도를 분리하기 위한 보수적 조정입니다.
- Marco Defense는 79를 유지했습니다. 현재 연결된 Evidence만으로 직접적인 방어 근거가 충분하지 않아 추가 근거 검토 대상으로 남겼습니다.
- 캐릭터별 전투 기록의 UI 순번과 전체 Battle chronologyOrder를 분리했습니다.
- King의 전투 기록이 기존 4, 5가 아니라 1, 2로 표시되도록 수정했습니다.


## v0.1.9 note

Battle Context keeps the existing domain structure. Battle validation now checks Battle/Participant reference integrity, including missing links, unlinked participant records, duplicate participant IDs, and participant records assigned to another Battle.

## v0.1.8 note

Evidence now separates the original work fact from its interpretation. Marco’s current draft evaluation is 78 / 79 / 78 / 84 / 86 / 93 / 92 / 84 across Attack, Defense, Durability, Stamina, Speed, Recovery, Special Ability, and Combat IQ, for a current arithmetic mean of 84.25 / 100.

## v0.1.6 note

The eight combat stats now have centralized domain definitions. The Character page exposes each definition through a `?` button, including what the stat includes and which neighboring concepts are intentionally evaluated separately.
