# 원피스 전투력 분석

> **v0.4.14 — 에넬 초상 및 하늘섬 루피 실전 매치업:** 첨부된 640×512 WebP 원본을 **바이너리 동일성 보존**으로 등록하고, 하늘섬 편 에넬·루피의 고무/전격 상성·맨트라·전열 창·황금 구체·실제 루피 승리를 18번째 대진에 연결. 당시 루피의 7축 수치가 없으므로 **서로 다른 시대의 Overall·7축 비교를 보류**하며, 기존 81명 / 85 Evaluation / 595축 / 106 Membership / 17대진 및 Balanced 1.2, Haki 0.5, v0.3.3 기준선 모두 보존. 초상 권리는 `user-provided-unverified`. [변경·검증 범위](docs/V0_4_14_ENEL_PORTRAIT_LUFFY_HISTORICAL_MATCHUP_2026-10-16.md).

> **v0.4.13 — v0.4.9 미반영 평가 공개:** 에넬 하늘섬 편 7축 잠정 Evaluation 신규 등록, 카쿠 기존 평가의 재검토안 7축 공개(6축 조정, Stamina 유지). **81명 / 85 Evaluation / 595축 / 106 소속 / 17대진.** 과거 80명·84 평가 원본, Haki Weight 0.5, Balanced 1.2, 고정 v0.3.3 JSON 유지. 에넬 초상은 이니셜 대체·명대사는 근거 확인 전 pending. [검증·한계](docs/V0_4_13_ENEL_KAKU_DRAFT_PUBLICATION_2026-10-16.md).

> **v0.5.0 감사 Stage 1 당시 기록(당시 앱 v0.4.12):** 80명·84개 Evaluation·588개 7축을 대상으로 E1/E2/E3, 근거 연결 및 Haki 다축 중복 후보를 읽기 전용 CSV로 추출·검증하는 작업. 점수·모델·순위·매치업 변경 없음. [감사 설계·검증 및 승인 게이트](docs/V0_5_0_READONLY_AUDIT_STAGE1_2026-10-16.md).

현재 구현 패치: **v0.4.15** (에넬 사용자 초상 및 하늘섬 루피 실전 1대진 신규, 원작 상황과 시대 불일치 수치 분리) (npm package 버전 **0.4.15**)
평가 데이터: **81 Character master pool · 81 visible Character · 81 evaluated unique Character · 106 Membership · 85 Evaluation · 595 Stat** 
계산 모델: **Balanced 1.2 · 7 Final Core Stats · Haki Weight 0.5**

- **v0.4.12 명대사 후속 — 80/80명 선정·표출 완료:** 스무디(934화)·마하(1018화/애니 1040화) 추천 A안 추가. 14명 공식 일본어 인용, 66명 2차 자료 인용(원작·한국 정식판 미대조), pending 0. 스탯·평가·매치업 불변. [80인 명대사 검증 기록](docs/V0_4_12_FULL_80_QUOTES_SMOOTHIE_MAHA_2026-10-15.md).
- **v0.4.12 8명 잠정 평가 및 명대사 확대:** 80인 모두 7축 평가(84 Evaluation·588 Stat), 기존 76개 평가 원본 유지. 69명 공식/2차자료 근거를 구분한 대표 대사 후보 표시, 11명 정확한 발언 확인 전 미노출. [v0.4.12 검토](docs/V0_4_12_QUOTES_EIGHT_EVALUATIONS_REVIEW_2026-10-15.md).
- **v0.4.11 8명 선등록 (WebP 8장 GitHub 업로드 완료 · PR 검증 중):** [8인 프로필·소속·이미지·명대사 작업](docs/V0_4_11_EIGHT_CHARACTER_ONBOARDING_2026-10-15.md). 게르니카/마하 + 우솝/나미/쵸파/로빈/프랑키/브룩. 신규 인원은 스탯 미평가로 표시하고 기존 72명 점수 불변. 기존 검증된 일본어 인용 6건을 새 인물과 연결. 사진 권리 미확인.
- **v0.4.10 명대사 기능(검증 진행 중):** 캐릭터 72명에 인용 검토 슬롯을 연결하고 13명은 ONE PIECE.com 일본어 인용 확인·한국어 자체 번역을 표시. 나머지 59명은 미확인으로 화면 표시하지 않음. 만화 컷/한국 공식 번역은 대조 전이며 전투력 평가·계산·조직도 등 불변. [검증 보고서](docs/V0_4_10_CHARACTER_QUOTES_REVIEW_2026-10-15.md).
- **v0.4.9 확정 패치:** [코비·스모커 7축 재평가 및 조직도 시기 통합](docs/V0_4_9_KOBY_SMOKER_ORGANIZATION_REVIEW_2026-10-15.md). 코비 Overall71.00, 스모커74.29. 다른 70명 점수/계산/상태/역사 원본 불변. 카쿠·신규 9인은 별도 평가안으로 보고하고 등록하지 않음.
- **v0.4.8 조직도:** [읽기 전용 독립 조직도 탭·소속 시기·중복 구성원 회귀 검증](docs/V0_4_8_READONLY_ORGANIZATION_CHART_2026-10-14.md). 25개 Group 및 97개 기존 Membership에서만 생성; 조직도와 순위/매치업을 구분. [PR #110](https://github.com/pchjesus/onepiece-saikyo-analysis/pull/110) 병합 및 [main Pages CI 38524967824](https://github.com/pchjesus/onepiece-saikyo-analysis/actions/runs/38524967824)에서 94파일/406테스트·빌드·배포 성공. 실기기 시각 QA는 별도.
- **v0.4.7 UI 안정화:** [종합 순위 팝업 선택값 자동 초기화와 캐릭터별 매치업 상태 귀속](docs/V0_4_7_RANKING_POPUP_RESET_AND_MATCHUP_LABELS_2026-10-14.md). 점수와 매치업 데이터 불변.
- **v0.4.6 당시 평가:** 쿠잔 Defense92/Stamina97 유지, 사카즈키 Stamina97·Speed87(E3)·Technique93·Combat IQ93·Versatility93, 보르살리노 Attack93·Defense Final90·Technique95·Combat IQ91·Versatility94, 샹크스 Defense93·Combat IQ Final94·Versatility91, 미호크 Versatility86. 나머지 기존 점수 및 Balanced 1.2/Haki 0.5 유지.
- **v0.4.6 화면 수정:** 루피·흰수염 등 복수 평가 상태의 순위표를 한 사람당 1행으로 유지하면서 선택 상태에 따라 재정렬; 매치업 추천 대진 상태명 및 체크표시 한 줄 유지.
- [v0.4.6 평가·상태별 순위·매치업 UI 패치 보고서](docs/V0_4_6_FIVE_CHARACTER_STATES_RANKING_MATCHUP_2026-10-14.md)
- **v0.4.5 당시 평가:** 티치 Attack96 / Defense91 / Stamina97 / Speed82 / Technique**94** / Combat IQ94(E2 잠정) / Versatility**96**, Overall **92.857143**. 다른 71명과 v0.4.4 역사적 평가·v0.3.3 독립 기준선 불변.
- [v0.4.5 티치 이중 열매 Technique/Versatility 원작·추론 대조](docs/V0_4_5_TEACH_DUAL_FRUIT_REVIEW_2026-10-14.md)
- **조직도 이전 UX 검토 이력:** [당시 조직도 UX·5인 재평가 검토](docs/POST_V0_4_5_ORG_CHART_AND_FIVE_CHARACTER_AXIS_REVIEW_2026-10-14.md). 5인 재평가는 v0.4.6, 조직도 도입은 A안 사용자 승인 후 v0.4.8에서 별도 UI 기능으로 구현.
- **v0.4.4 당시 평가:** 티치 Attack96 / Defense91 / Stamina97 / Speed82 / Technique93 / Combat IQ94(E2 잠정 상단) / Versatility95, Overall **92.571429**; 미호크 Attack **97**, Overall **92.857143**. 기존 70명과 루피 두 상태는 불변. 현재 core-v0.4.3 및 v0.3.3 독립 기준선 유지.
- [v0.4.4 티치 전체 7축·미호크 Attack 근거/반론 및 변경 전후 분석](docs/V0_4_4_TEACH_MIHAWK_RECALIBRATION_2026-10-14.md)

- [v0.4.3 루피 상태별 평가·티치 조건부 시나리오·티치 상향 검토](docs/V0_4_3_LUFFY_STATES_TEACH_MATCHUPS_2026-10-14.md)
- [v0.4.1 이미지 교정·버기/루피 초상·루피 평가](docs/V0_4_1_PORTRAITS_LUFFY_2026-10-14.md)
- [v0.4.0 독립 기준선·무결성·재현성 릴리즈](docs/V0_4_0_DATA_INTEGRITY_BASELINE_2026-10-13.md)
- [v0.3.3 이미지 확대·버기/이조 잠정평가·v0.4 준비](docs/V0_3_3_PORTRAIT_ZOOM_BUGGY_IZO_2026-10-13.md)
- [v0.3.2 초상 이미지·이조·과거 소속 패치](docs/V0_3_2_PORTRAITS_AND_MEMBERSHIPS_2026-10-13.md)
- [v0.3.0 근거·출처 가독성 릴리즈 기록](docs/V0_3_0_EVIDENCE_READABILITY_RELEASE_2026-10-13.md)

## v1.0까지의 기본 개발 방향

- **[v0.3~v1.0 정식 출시 개발 로드맵](docs/V1_0_DEVELOPMENT_ROADMAP.md)** — 앞으로의 개발 기준 문서. v0.4.1 신규 루피·이미지 변경을 배포했으며, v0.4.2 화면 가독성 패치도 배포 완료했다. v0.4.3은 루피 상태별 평가와 루피·티치 매치업 시나리오를 추가했고, **v0.4.4에서 티치 7축과 미호크 공격력 재산정, v0.4.5에서 티치 두 축, v0.4.6에서 해군·샹크스·미호크 15축 재평가 및 순위/매치업 UX 교정**을 수행했다. v0.5 이후 다른 평가 재산정은 별도 승인 후 진행. 단계별 검증·승인 및 출시 게이트를 기록.
- 현행 Balanced 1.2/Haki 0.5 계산 모델을 유지하고, 루피 1명의 기어 4 이하·기어 5 평가를 별도 등록했다. 기존 71명 중 티치·미호크에 v0.4.4 재평가가 적용됐으며, v0.4.5에서는 티치의 두 축만 추가 조정했다. 직접 분석한 기존 15개 대진 외에 조건부 루피·티치 시나리오 2개를 별도로 관리한다. 다른 기존 점수 변경에는 별도 승인이 필요하다.


- [v0.1.26 27인 재보정 보고서](docs/RECALIBRATION_0_1_26_DRAFT.md)
- [Evidence-aware Matchup v0.1 Draft](docs/MATCHUP_MODEL_0_1_DRAFT.md)
- [하이브리드 Haki 확정 기준](docs/HYBRID_HAKI_CRITERIA_2026-10-09.md)
- [v0.1.35 초안 — 전체 39 평가 재산정 위험 검토](docs/HYBRID_RECALIBRATION_DECISION_REPORT_2026-10-09.md)
- [v0.1.35 초안 — 6인 하이브리드 Haki 재산정 파일럿](docs/HYBRID_HAKI_PILOT_RECALIBRATION_2026-10-09.md)
- [v0.1.35 초안 — Haki Raw 14건 판정 및 4건 실제 Base 이관 후보](docs/HYBRID_HAKI_14_CONTRIBUTION_DISPOSITION_2026-10-09.md)
- [v0.1.36 초안 — 샹크스·카타쿠리·빅 맘 6 Raw 중복 심사 및 FEATURED 선택 표시](docs/HYBRID_HAKI_OVERLAP_SCENE_REVIEW_2026-10-09.md)
- [v0.1.35 초안 — 273축 Base/Raw/Final 전후 감사표](docs/HYBRID_RECALIBRATION_273_STAT_AUDIT_2026-10-09.md)
- [전체 39 Evaluation 전수 감사](docs/FULL_ROSTER_SCALE_HAKI_REVIEW_2026-10-09.md)
- [v0.1.37 검토용 — 산먹깨비·한글 용어·패기 수치 승인안](docs/V0_1_37_KOREAN_TERMS_AND_HYBRID_APPROVAL_2026-10-09.md)
- [신규 2집단 사전 Evidence 조사 — 혁명군·CP0](docs/PROPOSED_NEXT_TWO_GROUPS_EVIDENCE_2026-10-09.md)
- [v0.1.39 혁명군·CP0 6인 초안 7축·근거·불확실성 보고서](docs/V0_1_39_REVOLUTIONARY_ARMY_CP0_INITIAL_EVALUATION_2026-10-09.md)
- [v0.2.1 출처 링크 가독성 통합 수정 보고서](docs/V0_2_1_SOURCE_CITATION_READABILITY_2026-10-13.md)
- [v0.2.0 릴리즈 보고서](docs/V0_2_0_RELEASE_REPORT_2026-10-13.md)
- [v0.2.0 개발 설계](docs/V0_2_0_KICKOFF_DESIGN_AND_DECISIONS_2026-10-13.md)
- [v0.1.81 패치 내역 카테고리 및 필터, 버튼 항목 간소화](docs/V0_1_81_PATCH_HISTORY_CATEGORIES_2026-10-12.md)
- [v0.1.80 패치 내역 버튼·해군/혁명군 4명·사최간 6인 대인 공격력 감사](docs/V0_1_80_PATCH_HISTORY_AND_CHARACTER_EXPANSION_2026-10-12.md)
- [v0.1.79 스무디·크래커·퀸 9축 동축 근거 교차 감사 및 퀸 Versatility 보정](docs/V0_1_79_THREE_COMMANDER_NINE_AXIS_REVIEW_2026-10-12.md)
- [v0.1.78 하치노스 위험 판단과 스무디·토비롯포 전투 조건 근거 확장](docs/V0_1_78_KOBY_HACHINOSU_RISK_AND_SMOOTHIE_TOBIROPPO_CONTEXT_2026-10-11.md)
- [v0.1.77 코비 Combat IQ·그루스 Versatility 하향 재보정 및 9축 후속 캐릭터 근거 감사](docs/V0_1_77_KOBY_IQ_GRUS_VERSATILITY_ROSTER_AUDIT_2026-10-11.md)
- [v0.1.76 코비 실직권골 단발 화력 재평가(Attack82→77) 및 IQ·그루스·토비롯포 등 후속 근거 감사](docs/V0_1_76_KOBY_SINGLE_BURST_ATTACK_AND_IQ_COHORT_REVIEW_2026-10-11.md)
- [v0.1.75 집중 동축 재평가·그루스 점토 인형 전장 통제 Evidence 추가(수치 불변)](docs/V0_1_75_FOCUSED_COHORT_REVIEW_AND_GRUS_EVIDENCE_2026-10-11.md)
- [v0.1.74 루치·마르코 2축 근거형 재산정 및 도플라밍고/코비/징베 등 미수정 비교 보고서](docs/V0_1_74_LUCCI_MARCO_TARGETED_RECALIBRATION_AND_PEER_REVIEW_2026-10-11.md)
- [v0.1.73 65명 7축 Final 전수 감사·122쌍 간극·38개 비교 심사 및 65명 전체 점수표](docs/V0_1_73_ALL_65_SEVEN_AXIS_GAP_AUDIT_2026-10-11.md)
- [v0.1.72 전투력 기준 캐릭터 13인·7축 간극 검증 및 고정/조건부/유보 판정](docs/V0_1_72_BASELINE_ANCHOR_COHORT_AND_AXIS_VALIDATION_2026-10-11.md)
- [v0.1.71 에이스 7축 재산정·전투 판단 교정·원작 근거 연결](docs/V0_1_71_ACE_COMBAT_IQ_AND_SEVEN_STAT_RECALIBRATION_2026-10-11.md)
- [v0.1.70 SWORD·돈키호테 패밀리·에이스 추가 / 티치 상향 재검토 보고서](docs/V0_1_70_SWORD_DONQUIXOTE_ACE_TEACH_REVIEW_2026-10-11.md)
- [v0.1.69 4인 Haki Raw 독립효과/중복 원인 감사·징베 Evidence 불확실성 보완](docs/V0_1_69_FOUR_CHARACTER_HAKI_INDEPENDENT_EFFECT_REVIEW_2026-10-11.md)
- [v0.1.68 비스타–미호크 원작 회차 대사 교차검증·전투 맥락 설명 정정](docs/V0_1_68_VISTA_MIHAWK_SOURCE_CORROBORATION_CONTEXT_PATCH_2026-10-11.md)
- [v0.1.67 비스타–미호크 Ch.561–562 검술 검증·6명 동축 비교·Technique90 미적용](docs/V0_1_67_VISTA_MIHAWK_CH561_562_PRIMARY_SOURCE_AND_PEER_AUDIT_2026-10-11.md)
- [v0.1.66 비스타·샹크스 7축 및 Haki Raw 독립효과 검증, 승인 전 Technique 상향안](docs/V0_1_66_VISTA_SHANKS_SEVEN_AXIS_HAKI_DECISION_GATE_2026-10-10.md)
- [v0.1.65 Supreme 알베르·버킹엄·탱킹 등 문자열 변환 오류 및 전수 회귀검증](docs/V0_1_65_DISPLAY_STRING_NORMALIZATION_AND_REGRESSION_2026-10-10.md)
- [v0.1.64 60인 전투 설명·캐릭터 귀속·근거·전투 장소 교정 보고서](docs/V0_1_64_ROSTER_COMBAT_NARRATIVE_SOURCE_ATTRIBUTION_AUDIT_2026-10-10.md)
- [v0.1.63 비스타 전체 7축 상향 심사·샹크스 7축·카타쿠리/징베 Haki 독립효과 검증](docs/V0_1_63_VISTA_ALL_SEVEN_STATS_SHANKS_UPSIDE_AND_HAKI_OVERLAP_2026-10-10.md)
- [v0.1.62 다축 Haki 중복 보정·샹크스/비스타 상향 심사](docs/V0_1_62_APPROVED_MULTISTAT_HAKI_PATCH_AND_SHANKS_VISTA_UPSIDE_2026-10-10.md)
- [v0.1.61 Haki Raw 독립효과·5인 12축 의사결정·가상 민감도](docs/V0_1_61_HAKI_RAW_INDEPENDENT_EFFECT_AND_DECISION_2026-10-10.md)
- [v0.1.60 카이도 Defense100 승인 적용·로쿠규 방어 근거·Haki Raw 5건 심화검수](docs/V0_1_60_KAIDO_DEFENSE100_HAKI_AND_RYOKUGYU_SOURCE_REVIEW_2026-10-10.md)
- [v0.1.59 고득점 E3 14축·Haki Raw 13건 개별 심화검수](docs/V0_1_59_E3_AND_HAKI_RAW_CASE_AUDIT_2026-10-10.md)
- [v0.1.59 점수 보정 전 영향분석·v0.1.60 사용자 의사결정](docs/V0_1_59_DECISION_GATE_AND_V0_1_60_PLAN_2026-10-10.md)
- [v0.1.58 59인×7축 Base·Raw·Final 전체 기준표](docs/V0_1_58_59x7_BASE_RAW_FINAL_READINESS_BASELINE_2026-10-10.md)
- [v0.1.58 점수 타당성·Haki Raw 공유 출처 13건·순위 민감도/후속 승인안](docs/V0_1_58_COMPREHENSIVE_SCORING_VALIDITY_AND_DECISION_BRIEF_2026-10-10.md)
- [v0.1.57 잔여 51축 충분도 전체 검수 완료](docs/V0_1_57_FINAL_51_AXIS_READINESS_AUDIT_2026-10-10.md)
- [v0.1.57 다음 점수 적정성 검증 착수 브리핑](docs/V0_1_57_POST_READINESS_CALIBRATION_BRIEF_2026-10-10.md)
- [v0.1.56 상위 5명 29축 원작 근거·전투 조건 검수](docs/V0_1_56_TOP_TIER_29_AXIS_SOURCE_CONTEXT_AUDIT_2026-10-09.md)
- [v0.1.56 80축 전후 Evidence 추적표·51축 미분류](docs/V0_1_56_80_AXIS_BEFORE_AFTER_TRACE_2026-10-09.md)
- [v0.1.55 5명 31축 원작 기반 충분도 검수](docs/V0_1_55_FIVE_CHARACTER_CANON_READINESS_AUDIT_2026-10-09.md)
- [v0.1.55 이전 미분류 111축 전체 전후 Evidence 추적표](docs/V0_1_55_111_AXIS_TRACE_2026-10-09.md)
- [v0.1.54 37축 Evidence-role & Context 개별 감사](docs/V0_1_54_ROLELESS_CONTEXT_37_AXIS_ADJUDICATION_2026-10-09.md)
- [v0.1.54 148축 전후 추적표/111축 보류](docs/V0_1_54_148_AXIS_SOURCE_ROLE_MATRIX_2026-10-09.md)
- [v0.1.54 이후 111축 검수→스케일 검증→Matchup·UX 개발 로드맵](docs/V0_1_54_POST_AXIS_AUDIT_ROADMAP_2026-10-09.md)
- [v0.1.53 10축 근거 연결·마르코/킹 재분류·148축 Evidence 역할 감사](docs/V0_1_53_LINK_GAPS_AND_EVIDENCE_ROLE_REVIEW_2026-10-09.md)
- [v0.1.53 172축 전체 Evidence 연결·역할 전후 비교표](docs/V0_1_53_172_AXIS_EVIDENCE_ROLE_TRACE_2026-10-09.md)
- [v0.1.52 189축 충분도 추적·죠즈/퀸/루치 7축 앵커 재검토](docs/V0_1_52_READINESS_CALIBRATION_AND_THREE_CHARACTER_ANCHORS_2026-10-09.md)
- [v0.1.52 189축 Evidence ID 전체 추적표](docs/V0_1_52_READINESS_189_AXIS_TRACE_MATRIX_2026-10-09.md)
- [v0.1.51 Evidence 충분도 미입력 감사·루치/시류 후속 검증](docs/V0_1_51_EVIDENCE_READINESS_AND_PRIORITY_CANON_AUDIT_2026-10-09.md)
- [v0.1.50 59인 7축 심화 감사·크래커 설명 오류 수정](docs/V0_1_50_SEVEN_AXIS_DEEP_AUDIT_AND_CRACKER_RATIONALE_2026-10-09.md)
- [v0.1.49 59인 Overall 타당성·축별 분포·가중치 민감도 감사](docs/V0_1_49_OVERALL_VALIDITY_AND_SENSITIVITY_59x7_2026-10-09.md)
- [v0.1.48 B안 인원 선택 UX·Overall 타당성 분석](docs/V0_1_48_PICKER_B_AND_OVERALL_VALIDITY_2026-10-09.md)
- [v0.1.47 59명×7축 감사 및 A안 6인 재산정 결과](docs/V0_1_47_A_PATH_59_CHARACTER_SEVEN_AXIS_CROSS_AUDIT_2026-10-09.md)
- [v0.1.46 공식 에피소드·전투 구도 대조 / 루치·카쿠 잠정 평가 점검](docs/V0_1_46_OFFICIAL_EPISODE_CROSSCHECK_2026-10-09.md)
- [v0.1.45 키드 해적단·아카자야 9남자·토비롯포 17명 근거·스탯 보고서](docs/V0_1_45_WANO_THREE_GROUP_EVIDENCE_RECALIBRATION_2026-10-09.md)
- [v0.1.44 루치·카쿠·몰리 횡단 재산정 및 다음 집단 후보](docs/V0_1_44_CROSS_CHARACTER_CALIBRATION_AND_NEXT_GROUPS_2026-10-09.md)
- [v0.1.43 혁명군·CP0 6인 42축 Evidence 재산정 보고서](docs/V0_1_43_REVOLUTIONARY_CP0_EVIDENCE_RECALIBRATION_2026-10-09.md)
- [v0.1.42 세로 표시 및 한국어 열매 명칭 패치](docs/V0_1_42_SPECIAL_VERTICAL_AND_KOREAN_FRUIT_2026-10-09.md)
- [v0.1.41 특수 전투요소·근거 충분도·소속 상징·한글화 검증](docs/V0_1_41_SPECIAL_PROFILE_AND_READINESS_2026-10-09.md)
- [v0.1.40 캐릭터 프로필 UI·소속·서열 개선 검토](docs/V0_1_40_PROFILE_UI_AND_MEMBERSHIP_2026-10-09.md)
- [전체 UI 색감 3안 · 컨펌 요청(미적용)](docs/UI_COLOR_PALETTE_OPTIONS_2026-10-09.md)
- [프로젝트 입문 가이드](docs/PROJECT_GUIDE.md)

## 현재 평가 로스터

대표 Group 기준의 69명 evaluated unique Character는 다음과 같다. Group 탭은 Membership-expanded view라 과거 소속이 있는 캐릭터가 다른 Group에도 추가로 표시될 수 있지만 Ranking / Matchup selector에는 한 번만 나타난다.

- 흰수염 해적단: 마르코 / 죠즈 / 비스타 / 에드워드 뉴게이트 / 포트거스 D. 에이스(생전)
- 백수 해적단: 알베르(통칭 킹) / 퀸 / 잭 / 카이도 / 토비롯포 6인 (X 드레이크는 현재 SWORD, 과거 백수 해적단 소속)
- 키드 해적단: 유스타스 키드 / 킬러 (마지막으로 확인된 조직 소속)
- 아카자야 9남자: 킨에몬 / 덴지로 / 아슈라 동자 / 카와마츠 / 키쿠노죠 / 라이조 / 이누아라시 / 네코마무시 / 쿠로즈미 칸주로(전 구성원)
- 토비롯포: 후즈 후 / 사사키 / 블랙 마리아 / 울티 / 페이지 원 / X 드레이크(과거 소속)
- 빅 맘 해적단: 샬롯 카타쿠리 / 샬롯 스무디 / 샬롯 크래커 / 샬롯 링링
- 밀짚모자 일당: 롤로노아 조로 / 상디 / 징베
- 빨간 머리 해적단: 샹크스
- 해군: 사카즈키 / 보르살리노 / 잇쇼 / 아라마키 / 몽키 D. 가프 (쿠잔은 과거 해군 소속)
- 검은 수염 해적단: 마샬 D. 티치 / 지저스 바제스(1번선) / 시류(2번선) / 반 오거(3번선) / 아발로 피사로(4번선) / 쿠잔(10번선)
- 전 왕의 부하 칠무해: 트라팔가 로 / 돈키호테 도플라밍고 / 보아 핸콕 / 징베 / 미호크 / 크로커다일 (모두 과거 소속 표시, 본인의 현 소속은 별도)
- 크로스 길드: 쥬라큘 미호크 / 크로커다일
- 로저 해적단: 골 D. 로저 / 실버즈 레일리 / 스코퍼 가반
- 록스 해적단: 록스 D. 지벡 (뉴게이트·카이도·링링도 과거 소속)
- SWORD: X 드레이크(기존 평가 재사용) / 코비 / 프린스 그루스
- 돈키호테 패밀리: 돈키호테 도플라밍고(기존 평가 재사용) / 베르고 / 피카 / 디아만테
- 혁명군: 사보 / 몰리 / 카라스
- CP0: 로브 루치 / 스튜시(전 요원) / 카쿠

버기는 크로스 길드 대표로 소속 등록되었고 E3 하위권 잠정 평가(Overall 38.0)가 있다. 이조는 아카자야 측 전투원·흰수염 해적단 16번대 대장으로 E2/E3 잠정 평가(Overall 약 76.14)가 있다. 스코퍼 가반의 전성기도 E3로 수치 Evaluation을 만들지 않고 현재 엘바프 Evaluation만 등록한다.

Overall Combat Power는 7개 Final Core Stat의 단순 산술평균이다. Special Combat Profile과 Matchup-specific Advantage는 Overall에 직접 합산하지 않는다.

## v0.1.34 주요 변경

- 사용자가 승인한 **하이브리드 Haki 평가 기준**을 PROJECT_SPEC §5에 확정했다.
- 기존 7 Stat / Balanced 1.2 / Weight 0.5 및 **39개 Evaluation의 Base·Raw·Final 점수는 변경하지 않았다**.
- 무장색·견문색·패왕색의 **직접 확인된 특출난 응용 vs 고숙련의 강한 추론**을 선택적으로 기록하고 캐릭터 전투 프로필에 근거와 한계를 함께 표시한다.
- 미호크는 영구 흑도 「夜」와 무장색 검술 지도를 근거로 고숙련 가능성을 표시하지만 **본인이 영구 흑도를 직접 제작했는지는 확정하지 않는다**.
- 샹크스·카타쿠리·가프의 패기 특수성도 동일한 정성적 틀에 기록했다.
- 신규 미호크 무장색 지도 Evidence/훈련 시점 기록을 추가했다. 이는 **수치 가산이 아니며** 기존 랭킹·매치업 승률에 영향을 주지 않는다.
- 앞선 v0.1.34 문서·매치업 4건 및 특수 전투요소 팝업 바깥 클릭 닫기 패치도 포함한다.
- 현행 Raw Haki는 *레거시 draft 데이터*이며 새 기준에 따라 자동 승인된 것으로 해석하지 않는다. 향후 39개 Evaluation/273개 Stat의 개별 재보정은 변경 전후 비교 및 사용자 승인 후 진행한다.

## v0.1.33 주요 변경

- 전설급 7 Character를 추가했다: **골 D. 로저 / 실버즈 레일리 / 스코퍼 가반 / 록스 D. 지벡 / 에드워드 뉴게이트 / 카이도 / 샬롯 링링**.
- 복수 시점은 Character를 복제하지 않고 Evaluation으로 분리한다.
  - 레일리: **전성기 / 현재**
  - 뉴게이트: **전성기 / 정상결전**
  - 가반: **현재만 수치화**하며 전성기는 E3 미평가
  - 록스: **갓 밸리 자연 상태만** 수치화
  - 카이도·링링: **오니가시마를 전성기**로 사용
- 현재 상단 Overall calibration:
  - 골 D. 로저 97.571
  - 전성기 에드워드 뉴게이트 97.571
  - 전성기 몽키 D. 가프 97.429
  - 자연 상태 록스 D. 지벡 97.286
  - 카이도 96.571
  - 현재 몽키 D. 가프 94.429
  - 샬롯 링링 94.286
  - 전성기 실버즈 레일리 92.857
  - 정상결전 뉴게이트 92.857
  - 현재 스코퍼 가반 92.143
  - 현재 실버즈 레일리 90.286
- 현재 가반은 이무와 교전·생존했다는 사실을 대장 이상 전투력으로 자동 환산하지 않고 **92.143**으로 대장급 밴드 안에 둔다.
- 전성기 레일리는 공식 위상과 노년 보르살리노전 하한은 강하지만 직접 전성기 전투 표본이 부족하므로 **92.857 · E2**로 보수적으로 평가한다.
- 현재 가프는 하치노스의 선제 주도권·중상 후 임무 지속·구조전 판단을 재검토해 **94.429**로 상향했다.
- 샬롯 링링은 압도적인 공격·방어·지구력·능력 폭은 유지하되 오니가시마에서 노출된 Speed/Combat IQ 한계를 반영해 **94.286**으로 소폭 조정했다.
- EvaluationItem에 optional **Evidence readiness(E1/E2/E3)**를 추가했다. readiness는 점수 가중치가 아니라 근거 충분성을 표시하는 별도 정보다.
- 에드워드 뉴게이트·카이도·샬롯 링링에 과거 록스 해적단 Membership을 추가했으며, Group UI에는 **과거 소속**으로 표시한다. Ranking / Matchup selector는 Character-unique라 중복되지 않는다.
- 악마화 록스는 별도 Evaluation으로 만들지 않고 자연 상태의 scale context로만 보존한다.
- Balanced 1.2 / Haki Weight 0.5 / 7 Core Stat 산술평균은 변경하지 않았다.

## v0.1.32 주요 변경

- Character ↔ Group 관계를 **복수 Membership**으로 정식 허용한다.
- Group 탭/소속 탐색은 Membership-expanded view를 사용해 동일 Character가 여러 Group에 나타날 수 있다.
- Ranking / Matchup selection은 **Character-unique roster**를 사용해 복수 Membership이 있어도 Character당 한 번만 집계한다.
- 대표 Group은 migration 동안 `Character.crewId`와 일치하는 Membership을 우선하고, 없으면 current Membership → 첫 Membership 순으로 결정한다.
- 쥬라큘 미호크·크로커다일의 **크로스 길드 + 과거 왕의 부하 칠무해** Membership을 실제 데이터로 추가해 회귀를 검증한다.
- 검색은 여러 소속으로 찾을 수 있지만 suggestion은 Character identity 기준 한 건으로 중복 제거한다.
- 현재 **30 Character master pool / 29 evaluated unique Character / 31 Membership / 30 Evaluation**이다.
- Balanced 1.2 / Haki Weight 0.5 / Evaluation 점수는 변경하지 않는다.

## v0.1.31 주요 변경

- 돈키호테 도플라밍고의 공식 이명 **천야차**를 추가하고 표시 순서를 **천야차 → 조커**로 정리했다.
- Matchup Arena를 고정 prototype 선택형에서 **좌/우 캐릭터 직접 선택형 Matchup Builder**로 변경했다.
- 29명 evaluated roster에서 서로 다른 두 캐릭터를 자유롭게 선택할 수 있다. 복수 Evaluation 캐릭터는 평가 시점도 별도로 선택한다.
- 스포츠/UFC식 기능으로 **SWAP / RANDOM / FEATURED 직접 Evidence 대진 빠른 선택**을 추가했다.
- 좌/우 각 Character panel에서 수치상 앞서는 Core Stat, 전투 스타일, Special/Haki toolkit, 해당 캐릭터 관점의 유리·주의·조건부 factor를 표시한다.
- 아래 통합 panel에서 Radar / Tale of the Tape / Evidence-aware 종합 factor를 표시한다.
- 직접 Matchup Evidence가 없는 임의 조합은 스탯 비교까지만 허용하고 **상성 결론을 자동 생성하지 않는다**.
- 상성이 좋은/나쁜 상대 자동 추천, scenario 조건 변경, 공유 링크, 커뮤니티 pick 등은 데이터/저장 구조가 준비되는 순서대로 후속 개발한다.

## v0.1.30 주요 변경

- 전성기 몽키 D. 가프를 **99 / 99 / 99 / 98 / 99 / 97 / 91 → Overall 97.429**로 재보정. 96대가 아니라 향후 로저·흰수염·록스와 비교할 세계관 최상단 밴드의 첫 anchor로 둔다.
- 현재 몽키 D. 가프는 하치노스에서 쿠잔을 상대로 여러 차례 선제 주도권을 만든 점, 시류 관통상 이후에도 전투를 지속한 점을 반영해 **96 / 92 / 95 / 96 / 96 / 94 / 87 → 93.714**로 상향.
- 쿠잔은 Blue Hole을 방어한 것으로 처리하지 않고, 피격 후 재교전·10일 결투를 중심으로 **93 / 93 / 97 / 90 / 93 / 91 / 92 → 92.714**로 상향.
- 크로커다일은 현상금·크로스 길드 위상을 전투 스탯 성장량으로 환산하지 않고 **76 / 72 / 77 / 74 / 86 / 86 / 82 → 79.000**으로 하향. Technique/Combat IQ는 강점으로 유지.
- 첫 화면은 기존 **Stats**로 유지한다. Matchup은 Character Detail의 탭에서 제거하고 상단 **VS 아이콘 → Matchup Arena**라는 별도 화면으로 분리한다.
- Matchup Arena는 7-Core 레이더 그래프, Tale of the Tape, Evidence-aware factor cards로 구성한다. 승률·고정 상성 보너스는 도입하지 않는다.
- 커뮤니티 의견 기능은 후순위다. Stat/Evidence 옆 의견 아이콘은 Authentication/Backend/Database 저장 구조가 준비되는 시점에 실제 기능과 함께 추가하며, 현재는 무동작 아이콘을 노출하지 않는다.

## v0.1.29 주요 변경

- 크로스 길드의 **쥬라큘 미호크 / 크로커다일**은 기존 7-Core E2 draft를 보존하고, **버기**는 v0.3.3에서 E3 전면 잠정 평가를 추가했다.
- 전성기 몽키 D. 가프를 Ch.1165의 직접 Supreme King Haki Application까지 반영해 **99 / 98 / 98 / 97 / 99 / 95 / 86 → Overall 96.000**으로 재보정했다.
- 쥬라큘 미호크는 공식 세계 최강 검사·샹크스와의 검술 비교를 Evidence sparsity와 분리해 **96 / 93 / 91 / 94 / 99 / 92 / 84 → Overall 92.714**로 두었다.
- 크로커다일은 현재 높은 위상을 미확인 성장량으로 환산하지 않고 **78 / 75 / 79 / 76 / 88 / 86 / 84 → Overall 80.857**로 보수적으로 조정했다.
- Evidence-aware Matchup은 데이터-only 상태에서 벗어나 캐릭터 상세의 **매치업 분석** 탭으로 노출한다. 기존 6개 + 크로스 길드 관련 5개 = 11개 prototype이며 승률·고정 상성 보너스는 없다.
- 버기는 로저 해적단 견습·칠무해 과거 소속과 크로스 길드 현재 소속으로 목록에 포함되며, 잠정 점수로 순위에 표시되지만 확정 서열은 아니다.

## v0.1.28 주요 변경

- 하나의 Character에 여러 Evaluation 상태를 연결할 수 있도록 Repository/Application 경계를 확장했다.
- 몽키 D. 가프를 첫 실제 사례로 `전성기`(기본 순위 상태) / `현재`(하치노스 기준) 두 Evaluation으로 분리했다.
- 현재 몽키 D. 가프 Draft Final은 **94 / 90 / 92 / 93 / 94 / 92 / 83 → Overall 91.143**이다. 전성기 94.429와 별도 데이터이며 갓 밸리 성과를 현재 점수에 직접 합산하지 않는다.
- 캐릭터 설명, 평가 근거, 전투 기록, Evidence 설명, 전투 프로필에서 로마자 이름·해군 통칭이 남아 있더라도 UI에서는 한글 공식 주표기 이름으로 정규화한다. 공식 통칭·이명·칭호 배지와 검색어는 그대로 보존한다.
- Matchup v0.1을 3개 → **6개** prototype으로 확장하고 Evaluation 상태를 지정할 수 있게 했다. 신규 사례는 현재 몽키 D. 가프 vs 쿠잔, 롤로노아 조로 vs 알베르, 상디 vs 퀸이다.
- Overall/Stat 순위에는 한 Character의 **대표(default) Evaluation 한 개만** 포함해 가프가 두 번 나타나는 것을 방지한다.
- 다음 신규 집단은 **크로스 길드**로 확정한다. 미호크·크로커다일을 우선 조사하고, 버기는 충분한 7축 Evidence가 없으면 억지로 점수화하지 않는다.

## v0.1.27 주요 변경

- Character의 **공식 주표기 이름**과 통칭 / 이명 / 칭호를 분리했다.
- 검색은 본명뿐 아니라 공식 통칭·이명·칭호와 소속까지 찾는다. 예: 키자루 → 보르살리노, 아카이누 → 사카즈키, 킹 → 알베르.
- 캐릭터 상세 상단에 확인된 공식 이명·칭호와 프로젝트 소개 문구를 표시한다. 불분명한 이명은 만들지 않는다.
- 가프의 현 점수는 평가 시점 · 전성기로 명시한다. 현재/전성기 복수 점수는 Character를 복제하지 않고 Evaluation의 시대/상태를 분리하는 방식으로 확장할 예정이다.
- PR은 test/build만 수행하고, **main에 성공적으로 병합된 변경은 GitHub Pages에 자동 배포**하도록 공개 사이트 운영 정책을 전환했다.

중요한 평가 원칙:
- 직책·현상금·승패만으로 Core Stat을 역산하지 않는다.
- Evidence 부족은 약함의 증거로 자동 해석하지 않는다.
- 본명·통칭·이명·칭호는 공식 자료로 확인되는 경우에만 데이터에 등록한다.
- 현재와 전성기처럼 시점이 다른 상태는 하나의 Character identity에 억지로 합성하지 않는다.
- 모든 Evaluation은 아직 draft이며 프로젝트 점수이지 공식 전투력 수치가 아니다.

### 현재 UI

- 29명 Overall 및 7 Core Stat 순위
- 높은 점수순 / 낮은 점수순 전환
- 본명·이명·칭호·소속 검색
- 캐릭터 상세의 공식 identity 정보와 평가 시점 표시
- Special Combat Profile 및 Haki Profile
- Evaluation Trace와 Battle / Canon Evidence
- 별도 Matchup Arena: 7-Core 레이더 비교 / Tale of the Tape / 비수치 Evidence-aware Matchup factors

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



## v0.1.24 note

- Shanks와 해군 상위 전투원(Garp / Akainu / Kuzan / Kizaru / Fujitora / Ryokugyu)을 현재 7-Core 모델에 추가했습니다.
- Blackbeard Pirates에서 Teach(E1), Shiryu / Burgess / Van Augur / Pizarro(E2)를 Character / Battle / Evidence / Evaluation 구조로 추가했습니다.
- Doc Q는 현재 7축 Evidence가 부족해 수치 평가하지 않습니다.
- Vista / Jack / Cracker를 기존 캐릭터 및 신규 상위권 anchor와 다시 비교해 재보정했습니다.
- Attack ≠ Strength ≠ Area of Effect 원칙을 적용해 Burgess의 완력, Pizarro의 공격 규모, Shiryu의 기습을 Attack에 자동 환산하지 않습니다.
- Cracker는 Final 74 / 76 / 77 / 74 / 76 / 74 / 76, Jack은 73 / 80 / 84 / 73 / 71 / 70 / 72, Vista는 82 / 79 / 77 / 80 / 87 / 77 / 75로 조정했습니다.
- 모든 Evaluation은 여전히 draft이며, E2는 현재 공개 Evidence 기준 provisional score입니다.

## v0.1.23 note

- 초기 3해적단 9인(Marco / Jozu / Vista / King / Queen / Jack / Katakuri / Smoothie / Cracker)의 7 Core Stat 횡단 calibration을 완료했습니다.
- 기존 Marco / King / Katakuri를 재보정하고 나머지 6인의 Character Profile / Special Combat Profile / Haki Profile / Battle Context / Canon Evidence / Evaluation을 추가했습니다.
- 직책·현상금·커뮤니티 평가는 점수로 직접 환산하지 않고 portrayal 및 calibration sanity check로만 사용합니다.
- Evidence 부족은 능력 부족으로 자동 해석하지 않으며 Vista / Smoothie처럼 표본이 적은 캐릭터는 draft 불확실성을 유지합니다.
- 캐릭터 선택 UI는 해적단 탭 + compact character chips로 변경했으며, 인원 증가 시 검색 버튼을 추가할 수 있도록 단순한 선택 구조를 유지합니다.
- 스탯 카드의 Haki 반영값은 Final 점수 아래에 `Base + Haki` 형태로 표시하고 상세 Raw × Weight는 Evaluation Trace에 유지합니다.

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
