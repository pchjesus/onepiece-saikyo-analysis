# v0.1.57 — 잔여 51축 근거 충분도 최종 분류와 전투 조건 감사

**기준 커밋:** `main@4be641e9b0d0aec29c4206f6a0b5462b5bff3c42` (v0.1.56). 작성일 2026-10-10.

## 목적 및 결과

- 대표 캐릭터 **59명×7축 413개**에서 남은 미분류 **51축**(비스타4, 잭3, 스무디4, 조로6, 상디6, 후지토라4, 시류3, 반 오거3, 바제스3, 피사로3, 핸콕5, 크로커다일7)을 **개별** 판단하여 `EvaluationItem.readiness`를 설정했다.
- 이번 분류 **E1 +10 / E2 +35 / E3 +6**. 이전 전체 E1 43/E2 208/E3 111/미분류51 → **E1 53/E2 243/E3 117/미분류0**. E1/E2/E3 합 413.
- 프로젝트 기존 Evidence ID, fact, statContributions, 불확실성 설명, 기존 Base·Final·Haki Raw, 전투/매치업 구조, Calculation Model, UI, 저장상태, PROJECT_SPEC는 수정하지 않았다. **근거 충분도 메타데이터만 51축 추가**했다.
- **분류 완료 ≠ 점수 정확성 검증 완료.** E1은 평가축을 직접·반복 근거로 뒷받침할 수 있다는 뜻, E2는 주/보조 관찰은 있으나 표본·조건 한계가 있다는 뜻, E3는 해당 능력의 단독 반복 실증이 부족하다는 뜻. E3라도 기존 높은 수치는 자동 감점하지 않았다.
- 이번 분석은 저장소의 원작 Chapter 인용과 평가 이유를 비교하고, ONE PIECE.com의 공식 캐릭터 소개·방영분 줄거리를 **표본 교차확인**했다. 만화 51축 원문 패널을 모두 독립 열람했다고 주장하지 않는다.
- **기존 51축 Evidence는 전부 Primary29/Secondary22 기여 역할을 이미 갖는다.** 대표 413축 전체에서 Evidence ID가 0개인 축은 사카즈키 Speed, 스무디 Speed, 샹크스 Stamina, 로쿠규 Speed **4개**로, 모두 E3이며 근거를 만들어 연결하지 않는다. 링크가 붙었다는 사실과 E1의 성립은 별개이다. 일부 단일장면의 역할은 E2/E3로 제한했다.

## 51축 개별 판단 (v0.1.56 보류 → v0.1.57 등급)

아래 숫자는 `EvaluationItem.score`(Base)이며, 사용자 화면의 Final은 현행 Haki Raw×0.5를 반영한 값이다. 근거 역할은 연결된 `statContributions`의 **최상위** 역할(Primary > Secondary)이다.

| # | 캐릭터 | 축 | 기존 Base | 최고 Evidence 역할 | 최종 readiness | 기존 Evidence ID와 역할 | 원작에서 기록한 사실·조건·해석·한계 |
|---:|---|---|---:|---|---|---|---|
| 1 | `vista` | `attack` | 80 | primary | **E2** | `evidence-vista-mihawk-561-562` (secondary); `evidence-vista-official-mihawk-profile` (secondary); `evidence-vista-armament-akainu-574` (primary) | 미호크 검술 요격과 마르코와의 아카이누 동시 검격은 공격 성과이지만, 미호크와 단시간 공방을 장기 1대1 대등 승부로 확대하거나 무장색 Raw를 Base에 중복하지 않는다. |
| 2 | `vista` | `defense` | 79 | secondary | **E2** | `evidence-vista-mihawk-561-562` (secondary) | 미호크 공격을 검술로 요격하고 큰 피해 없이 공방한 직접 장면. 반복된 최상위 공격 방어전·특수 내구의 독립 자료는 적다. |
| 3 | `vista` | `speed` | 80 | secondary | **E3** | `evidence-vista-mihawk-561-562` (secondary) | 미호크 추격 차단은 기동·반응의 정황이나 순수 Speed 80을 다수 대결에서 재현한 독립 표본이 없다. |
| 4 | `vista` | `techniqueMastery` | 86 | primary | **E1** | `evidence-vista-mihawk-561-562` (primary); `evidence-vista-official-mihawk-profile` (primary); `evidence-vista-armament-akainu-574` (secondary) | 공식 비스타 프로필은 이도류 대검호·미호크와 겨룰 수준을 소개하고 실제 검술 공방, 아카이누 대상 무장색 검격도 확인돼 서로 다른 자료가 숙련을 뒷받침한다. |
| 5 | `jack` | `attack` | 79 | primary | **E2** | `evidence-jack-ashura-921` (primary); `evidence-jack-zou-809-810` (context) | 슈텐마루에게 유효 검격을 적중시켰지만 상대가 먼저 가슴에 상처를 냈다. 조우 병력 전술·독가스의 효과를 잭 개인 타격력으로 계산하지 않는다. |
| 6 | `jack` | `defense` | 84 | secondary | **E2** | `evidence-jack-zou-809-810` (secondary); `evidence-jack-ashura-921` (context); `evidence-jack-sulong-1026` (secondary) | 5일 동안 교대하며 상대하는 밍크 지도자들과 전선을 유지했고 스론 군세 이후 복귀했지만, 그 교전은 단독 무제약 1대1이 아니며 후속 유효타·패배 한계가 있다. |
| 7 | `jack` | `stamina` | 88 | primary | **E1** | `evidence-jack-zou-809-810` (primary); `evidence-jack-sulong-1026` (primary); `evidence-jack-convoy-801` (context) | 공식 TV 760화가 5일 연속 교전을 확인하고 프로젝트 원작 근거에는 부상 후 오니가시마 복귀 기록이 더 있다. 집단 참전·적 교대·독가스는 지구력 수치 정밀 비교의 제약. |
| 8 | `smoothie` | `attack` | 76 | primary | **E2** | `evidence-smoothie-pursuit-894` (primary) | 수분 흡수로 검·신체를 거대화하고 써니호에 대형 참격을 날린 사실은 공격 범위의 성과. 징베가 조타로 회피했으므로 대장급 대상 명중·결정력은 확인되지 않는다. |
| 9 | `smoothie` | `techniqueMastery` | 80 | primary | **E2** | `evidence-smoothie-poison-869` (primary); `evidence-smoothie-pursuit-894` (secondary) | 독을 짜내 제거한 능력 응용과 수분 흡수·거대화·원거리 검격이라는 두 직접 활용 장면이 있으며, 상위 1대1 정밀 운용은 별도이다. |
| 10 | `smoothie` | `combatIQ` | 77 | primary | **E3** | `evidence-smoothie-command-897` (primary) | 함대를 동원한 배후 포위 지시는 확인되지만 개인전에서 상대 분석·전술 반복 개선을 직접 시험한 고급 Combat IQ 표본이 부족하다. |
| 11 | `smoothie` | `versatility` | 78 | primary | **E2** | `evidence-smoothie-poison-869` (primary); `evidence-smoothie-pursuit-894` (primary); `evidence-smoothie-command-897` (secondary) | 접촉 탈수·독 제거·자기 강화·원거리 참격은 서로 다른 활용 역할. 해상 지휘는 개인 교전 기량이 아니라 상황 참조로 제한하고 능력 종류 중복 가산을 막는다. |
| 12 | `zoro` | `attack` | 85 | primary | **E1** | `evidence-zoro-ashura-scar-1010` (primary); `evidence-zoro-conquerors-1033-1035` (primary); `evidence-zoro-lucci-1110-1111` (secondary) | 카이도에게 아수라 흉터, 킹 상대 패왕색 검격, 루치와 재교전의 직접 기록이 독립적으로 누적됐다. 고급 패기 Raw는 Base에서 다시 더하지 않는다. |
| 13 | `zoro` | `defense` | 81 | primary | **E2** | `evidence-zoro-hakai-1009` (primary) | 카이도+빅맘 합동 패해를 잠시 막아 동료에게 회피 시간을 주었지만, 상쇄하지 못하고 크게 다쳤다. 완전 차단력 또는 일반 피해 경감의 E1 사례로 보지 않는다. |
| 14 | `zoro` | `stamina` | 87 | primary | **E1** | `evidence-zoro-nothing-happened-485` (primary); `evidence-zoro-hakai-1009` (secondary); `evidence-zoro-ashura-scar-1010` (secondary) | 스릴러 바크의 극심한 누적 고통 생존과 와노 옥상 패해 피격 후 추가 교전·아수라 성공은 서로 다른 시기의 반복 지구력 자료다. |
| 15 | `zoro` | `techniqueMastery` | 85 | primary | **E1** | `evidence-zoro-hakai-1009` (축 미지정); `evidence-zoro-ashura-scar-1010` (secondary); `evidence-zoro-conquerors-1033-1035` (primary) | 아수라 검술·엔마 제어·킹의 속성 읽기와 패왕색을 결합한 세 검 운용이 복수 시점에 나타난다. 강한 패기 출력량을 검술 자체의 숙련도 점수로 중복 가산하지 않는다. |
| 16 | `zoro` | `combatIQ` | 82 | primary | **E2** | `evidence-zoro-lunarian-read-1035` (primary) | 킹의 등에 붙은 불이 꺼지는 타이밍을 파악해 공격 타이밍을 바꾼 직접 전투 적응. 한 상대의 공략 성공을 모든 상대의 전략적 우위로 확대하지 않는다. |
| 17 | `zoro` | `versatility` | 81 | secondary | **E2** | `evidence-zoro-hakai-1009` (secondary); `evidence-zoro-conquerors-1033-1035` (축 미지정) | 검술로 요격·광역 참격·고화력 차단과 동료 보호 역할을 수행했다. 아수라·검법의 서로 다른 명칭을 독립 메커니즘 수만큼 가산하지 않는다. |
| 18 | `sanji` | `attack` | 81 | primary | **E2** | `evidence-sanji-speed-ifrit-1034` (primary) | Ifrit Jambe 연속타로 퀸 격파. 외골격·근력·무장색을 포함한 한 번의 복합 성공을 순수 Attack/Speed/패기 항목에 여러 번 가산하지 않는다. |
| 19 | `sanji` | `defense` | 85 | primary | **E1** | `evidence-sanji-exoskeleton-1028` (primary); `evidence-sanji-speed-ifrit-1034` (축 미지정); `evidence-sanji-kizaru-laser-1107` (secondary) | 퀸의 압착 후 각성 신체로 전투를 지속했고 키자루 레이저를 발차기로 차단한 별도 사건은 직접 방어/보호 수단 반복 증거다. 회복은 피격 전 방어와 분리한다. |
| 20 | `sanji` | `stamina` | 85 | primary | **E2** | `evidence-sanji-exoskeleton-1028` (primary); `evidence-sanji-speed-ifrit-1034` (축 미지정) | 퀸 압착 뒤 다시 가속하고 Ifrit 연속 공격을 지속한 실제 성과. 회복 특성이 장기간 독립 결투의 무한 체력을 보증하지 않는다. |
| 21 | `sanji` | `speed` | 91 | primary | **E1** | `evidence-sanji-speed-ifrit-1034` (primary); `evidence-sanji-kizaru-laser-1107` (secondary); `evidence-sanji-nusjuro-1113` (secondary) | 퀸의 투명화에 순수 고속 이동으로 대응, 에그헤드 레이저 차단과 누스주로 요격 개입까지 별개 전투에서 기동·반응 성과가 반복된다. 레이저 차단을 광속 신체 이동으로 단정하지 않는다. |
| 22 | `sanji` | `techniqueMastery` | 84 | secondary | **E2** | `evidence-sanji-speed-ifrit-1034` (secondary) | 고속 기동·외골격·Diable/Ifrit 계열 발기술과 무장색 조합은 실제 구현됐으나 거의 하나의 퀸 결투에 표본이 집중돼 E2. |
| 23 | `sanji` | `versatility` | 82 | secondary | **E2** | `evidence-sanji-exoskeleton-1028` (축 미지정); `evidence-sanji-speed-ifrit-1034` (secondary); `evidence-sanji-kizaru-laser-1107` (secondary); `evidence-sanji-nusjuro-1113` (secondary) | 공중·근접·요격·보호·신체 회복과 화염 강화가 실전에 등장한다. 단순 기술 수나 비전투 요리 능력을 포함하지 않는다. |
| 24 | `fujitora` | `attack` | 91 | secondary | **E2** | `evidence-fujitora-meteor-713` (secondary) | 운석 투하와 중력도를 사용한 큰 공격 범위는 관찰되지만 직접 상위 전투원에게 가한 유효 피해량이나 무제약 고점은 입증되지 않는다. |
| 25 | `fujitora` | `techniqueMastery` | 92 | primary | **E2** | `evidence-fujitora-meteor-713` (primary); `evidence-fujitora-luffy-observation-799` (secondary) | 운석 낙하·중력 방향 조작과 루피와의 검술/중력도 공방은 능력 운용의 직접 성과지만 다수 기술 간 정밀도 상한을 반복 시험한 자료는 적다. |
| 26 | `fujitora` | `combatIQ` | 85 | secondary | **E2** | `evidence-fujitora-luffy-observation-799` (secondary) | 민간인과 전투 목적을 고려해 잔해 공격 사용을 제한한 선택은 상황 판단의 근거지만, 정치적 선호·체포 의도를 단독 결투 IQ로 변환하지 않는다. |
| 27 | `fujitora` | `versatility` | 94 | secondary | **E2** | `evidence-fujitora-meteor-713` (secondary); `evidence-fujitora-luffy-observation-799` (secondary) | 운석·중력 제어·검술·지형 억제는 서로 다른 역할. 높은 94라는 숫자는 직접 연속된 1대1 역할 전환 표본만으로 완전히 재현하지 못한다. |
| 28 | `shiryu` | `techniqueMastery` | 77 | secondary | **E2** | `evidence-shiryu-garp-1087` (secondary) | 투명화와 라이우를 결합해 가프에게 검을 찔러 넣은 운용 성과지만 보호 대상을 이용한 기습이며 검격 패기 Raw 사용의 직접성은 별도 확인이 필요하다. |
| 29 | `shiryu` | `combatIQ` | 78 | primary | **E2** | `evidence-shiryu-garp-1087` (primary) | 코비를 겨냥해 가프의 보호 개입을 유도한 실제 전술은 확인된다. 독립적인 전술 수정·예측 성공이 여러 상대에게 반복됐다고 보긴 어렵다. |
| 30 | `shiryu` | `versatility` | 78 | primary | **E2** | `evidence-shiryu-garp-1087` (primary) | 검술·투명 은신·기습이라는 실제 운용이지만 대부분 단일 사건의 같은 메커니즘에서 나온다. 다양한 임무 상황의 반복 표본이 적다. |
| 31 | `van-augur` | `techniqueMastery` | 80 | primary | **E2** | `evidence-augur-warp-1063-1064` (primary); `evidence-augur-jean-bart-1064` (축 미지정) | 워프로 아군 위치를 바꾸면서 저격수 역할을 수행했지만, 장 바르트에게 막힌 총격은 최고급 저격 결정력·명중 실적을 증명하지 않는다. |
| 32 | `van-augur` | `combatIQ` | 78 | primary | **E2** | `evidence-augur-warp-1063-1064` (primary) | 위험한 돌진에 철수를 제안하고 아군 워프 지원을 선택한 판단은 관찰된다. 팀 전장 내 보조 판단을 무제약 개인 결투 IQ로 전환하지 않는다. |
| 33 | `van-augur` | `versatility` | 82 | primary | **E2** | `evidence-augur-warp-1063-1064` (primary) | 사격과 본인·아군 워프 기동 역할을 실제 사용한 사례. 워프의 이론상 가능한 모든 공간 응용을 이미 보여준 것으로 평가하지 않는다. |
| 34 | `burgess` | `attack` | 74 | secondary | **E2** | `evidence-burgess-mountain-1063` (secondary); `evidence-burgess-sabo-737-792` (secondary) | 힘힘 열매로 산을 던진 파괴 규모와 사보와의 근접 교전은 있지만 상위 적에게 유효한 피니시로 적중한 기록은 제한된다. |
| 35 | `burgess` | `stamina` | 79 | secondary | **E3** | `evidence-burgess-sabo-737-792` (secondary) | 사보에게 큰 피해를 입고 활동했다는 사례는 있지만 수일간 동급 상대의 고강도 공방을 견딘 직접 장기전 표본이 부족하다. |
| 36 | `burgess` | `versatility` | 74 | secondary | **E2** | `evidence-burgess-mountain-1063` (secondary) | 근접 완력 타격·대형 물체 투척의 역할이 확인되나 모두 완력 중심이고 전술·능력 메커니즘 폭은 제한된다. |
| 37 | `pizarro` | `attack` | 72 | secondary | **E3** | `evidence-pizarro-island-1087-1088` (secondary) | 섬 동화로 거대한 팔을 생성해 탈출 군함 파괴를 시도했으나 코비의 공격과 구조대의 개입으로 저지됐다. 시도의 범위를 실전 명중·결정력으로 환산하지 않는다. |
| 38 | `pizarro` | `techniqueMastery` | 74 | secondary | **E2** | `evidence-pizarro-island-1087-1088` (secondary) | 섬 규모 팔과 구조물의 움직임을 제어한 능력은 관찰되지만 세밀한 개별 목표 대응이나 여러 독립 교전 기술로 확장됐는지 불명. |
| 39 | `pizarro` | `versatility` | 74 | primary | **E2** | `evidence-pizarro-island-1087-1088` (primary) | 섬 동화·거대 손 생성·지형과 신체의 연계 활용이라는 역할은 실제 등장. 전술 종류가 많다는 표현보다는 하나의 시마시마 능력을 쓴 제한된 장면으로 평가한다. |
| 40 | `hancock` | `attack` | 79 | primary | **E1** | `evidence-hancock-marineford-559` (primary); `evidence-hancock-amazon-lily-1059` (primary) | 정상결전 스모커에 대한 직접 체술·패기 타격과 아마존릴리 다수 해군·검은수염 해적단 석화는 별도 전장의 유효 공격·즉시 제압 성과다. 티치에게 능력 봉쇄된 한계와 구분한다. |
| 41 | `hancock` | `speed` | 80 | secondary | **E3** | `evidence-hancock-marineford-559` (secondary) | 스모커 상대 근접 개입 성공은 있으나 독립적인 순간 이동·반응 속도 80을 다른 고속 상대전에서 반복 확인하지 못했다. |
| 42 | `hancock` | `techniqueMastery` | 82 | secondary | **E2** | `evidence-hancock-marineford-559` (secondary); `evidence-hancock-amazon-lily-1059` (secondary) | 체술로 자연계에게 유효타를 내고 여러 상대에 석화 기술을 적용한 장면은 숙련 근거지만 각각의 석화 기술 목록 전부를 개별 고난도 실전 성공으로 가산하지 않는다. |
| 43 | `hancock` | `combatIQ` | 75 | secondary | **E2** | `evidence-hancock-amazon-lily-1059` (secondary) | 석화 해제를 협상 조건으로 활용한 판단은 실전 정보 사용의 성과지만 티치의 접촉 봉쇄·레일리 개입으로 독립 승부 판단의 상한은 불명. |
| 44 | `hancock` | `versatility` | 82 | secondary | **E2** | `evidence-hancock-marineford-559` (축 미지정); `evidence-hancock-amazon-lily-1059` (secondary) | 근접 패기 체술·원거리/다수 석화 등 적용 역할은 실제 확인되지만 많은 역할이 매료·석화라는 공통 메커니즘을 기반으로 한다. |
| 45 | `crocodile` | `attack` | 76 | secondary | **E2** | `evidence-crocodile-alabasta-mastery-178-209` (secondary); `evidence-crocodile-marineford-interventions-561-578` (context) | 알라바스타 탈수·모래 절단·독 공격과 정상결전 원거리 개입은 관찰되지만 당시 루피에게 최종 패했고 현재 사최간급 상대 최신 직접 피해량은 부족하다. |
| 46 | `crocodile` | `defense` | 72 | primary | **E2** | `evidence-crocodile-water-weakness-199` (primary); `evidence-crocodile-jozu-560` (primary) | 물·피를 통한 자연계 약점 공략과 죠즈의 직접 피격은 명확한 방어 한계. 모래화의 조건부 무효화는 인정하되 현재 고급 무장색 방어까지 입증되지 않는다. |
| 47 | `crocodile` | `stamina` | 77 | secondary | **E2** | `evidence-crocodile-alabasta-mastery-178-209` (secondary); `evidence-crocodile-jozu-560` (secondary); `evidence-crocodile-marineford-interventions-561-578` (secondary) | 알라바스타의 다회 교전 및 정상결전에서 죠즈 피격 후 계속 활동한 지속력은 확인되지만 독립 고강도 장기 결투의 정확한 지속시간이 부족하다. |
| 48 | `crocodile` | `speed` | 74 | secondary | **E3** | `evidence-crocodile-marineford-interventions-561-578` (secondary) | 정상결전의 여러 지점 개입과 모래 형태 이동은 사실이지만 이동에 걸린 시간·고속 대결 반응 수준이 독립 측정되지 않는다. |
| 49 | `crocodile` | `techniqueMastery` | 86 | primary | **E1** | `evidence-crocodile-alabasta-mastery-178-209` (primary); `evidence-crocodile-marineford-interventions-561-578` (축 미지정) | 알라바스타부터 정상결전까지 탈수·폭풍·절단·지면 붕괴·모래화·보조 무장을 다르게 조합한 복수 전장 숙련 기록이 있다. |
| 50 | `crocodile` | `combatIQ` | 86 | primary | **E2** | `evidence-crocodile-alabasta-mastery-178-209` (primary); `evidence-crocodile-water-weakness-199` (context); `evidence-crocodile-marineford-interventions-561-578` (primary) | 상대 약점 노출에 따른 전술 선택과 정상결전의 표적 변경·아군 이탈 지원은 직접 전투 판단이지만 조직 전략·국가 장악 계략까지 전투 IQ로 더하지 않는다. |
| 51 | `crocodile` | `versatility` | 82 | primary | **E1** | `evidence-crocodile-alabasta-mastery-178-209` (primary); `evidence-crocodile-marineford-interventions-561-578` (primary) | 근접 탈수·독, 장거리 절단·폭풍, 지형 제어·모래 이동·방해와 보호 지원을 서로 다른 전장에서 수행한 반복 역할 자료가 풍부하다. 한 열매 파생기술 중복 가산은 제한. |

## 확인 가능한 공식 ONE PIECE.com 교차 근거

| 공식 출처 | 검증 가능한 관찰 | 추가 제한 |
|---|---|---|
| [비스타 공식 캐릭터](https://one-piece.com/character/bista/index.html) | 이도류 대검호이자 미호크와 검술을 겨룰 수준 | 공식 설정의 검술 숙련을 전체 전투력·순수 속도 우위로 확대하지 않음 |
| [TV760화 잭](https://one-piece.com/anime/o3027/index.html) | 5일간 낮밤 교전, 지도자 교대, 지원 병력, 독가스 사용 | 지속 기간과 개인 Attack/CombatIQ/Defense 분리 |
| [TV868화 스무디](https://one-piece.com/anime/o4939/index.html) | 거대 검격, 징베의 조타 회피 | 함선 대상 공격을 상위 강자 정면 명중으로 보지 않음 |
| [TV1062화 조로](https://one-piece.com/anime/61675/index.html) | 킹 등의 불빛 조건을 간파하고 타격 전환 | 개별 공략을 모든 적에 대한 전투 지능 상한으로 환산하지 않음 |
| [TV1061화 상디](https://one-piece.com/anime/61599/index.html) | 퀸의 투명화에 고속 이동 대응, 무장색·각성 신체·고열 발차기 | 복합 공격 요소를 각 축에 중복 가산하지 않음 |
| [TV643/743화 후지토라](https://one-piece.com/anime/o2679/index.html) / [743화](https://one-piece.com/anime/o2879/index.html) | 운석과 중력도, 공격 예고/민간인 제약하의 루피전 | 광역 위협을 대장급 개인 대상 결정타로 환산하지 않음 |
| [TV1121/1122화 시류·피사로](https://one-piece.com/anime/69144/index.html) / [1122화](https://one-piece.com/anime/69263/index.html) | 코비 구출 중 가프 관통상, 피사로가 함선 파괴를 시도하나 코비와 구조대에게 저지 | 기습/보호 개입, 광역 공격 시도와 실제 결정타 구분 |
| [TV1093화 반 오거·바제스](https://one-piece.com/anime/65154/index.html) | 워프 순간이동과 힘힘 열매의 초괴력 사용 | 워프≠순수 신체 Speed, 산 던지기≠고위력 단일 피해 적중 |
| [TV1087화 핸콕](https://one-piece.com/anime/64696/index.html) | 다수 상대 석화 및 티치의 능력 봉쇄, 3세력 참전 | 석화 즉시 무력화≠모든 상성 상대 동일 효과 |
| [TV111화·122화·126화 크로커다일](https://one-piece.com/anime/111/index.html) / [122화](https://one-piece.com/anime/122/index.html) / [126화](https://one-piece.com/anime/126/index.html) | 물로 자연계 약점이 드러남, 루피의 최종 승리와 모래·독 전투 | 당시 알라바스타와 현재의 미표현 능력 고점을 동일시하지 않음 |

여기 기재된 공식 TV 링크는 **기존 만화 Chapter를 독립 검증할 수 있는 1:1 동일 패널 열람의 대체재가 아니다**. 동작·조건을 일부 교차 확인하는 보조 자료이다.

## 다음 단계: score calibration의 필수 게이트

1. **근거 부족 위험축:** 비스타 Speed80, 스무디 CombatIQ77, 바제스 Stamina79, 피사로 Attack72, 핸콕 Speed80, 크로커다일 Speed74 등 이번 E3 여섯 개. 이전 감사의 전성기 가프 Stamina99·Speed98·CombatIQ97, 샹크스 Speed95, 미호크 Speed94, 로 Speed82 등도 높은 우선순위로 유지.
2. 다른 캐릭터의 같은 축/상황을 **같은 기준으로 교차 비교**한 뒤 실제 점수 변경의 근거와 `Base+HakiRaw×0.5→Final→Overall→순위/매치업` 영향을 사전에 시뮬레이션한다. 모든 E1/E2/E3 완료를 점수 확정/공식 확정으로 자동 승격하지 않는다.
3. 사용자 결정 전까지 **수치·패기·가중/공식 변경 없음**. 특히 E3를 이유로 일괄 감점하거나 임의의 +N 상성 보너스를 만들지 않는다.
4. 59인 전체 Base/Final/Haki·15 매치업 회귀 검증과 모바일·데스크톱 실제 동작 수동 테스트, 필요 시 원작 패널 직접 재검증을 별도 수행한다.
5. [점수 검증 착수 제안](./V0_1_57_POST_READINESS_CALIBRATION_BRIEF_2026-10-10.md)과 [기존 장기 로드맵](./V0_1_54_POST_AXIS_AUDIT_ROADMAP_2026-10-09.md)을 참고한다.

**보존 기록:** `readiness`의 완전한 기입만으로 source provenance와 편집 이력의 전면 독립 검증이나 전투력 모델의 과학적 객관성을 확보했다고 주장하지 않는다.
