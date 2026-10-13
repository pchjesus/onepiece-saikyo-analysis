# v0.3.2 — 64 초상 이미지, 이조 프로필, 로저 해적단 과거 소속

**날짜:** 2026-10-13  
**범위:** 발표 이미지, 캐릭터 마스터, 소속 메타데이터 및 UI·테스트만

## 적용 범위

- 사용자가 이 채팅에서 제공한 **64장** PNG를 캐릭터 ID 기준 WebP로 변환해 `public/images/characters/{id}.webp`에 보관.
- `src/data/media/characterPortraits.ts`의 64개 초상 등록과 `CharacterPortrait` 렌더링. `import.meta.env.BASE_URL`을 사용하여 GitHub Pages 하위 경로에서 불러오며 오류 시 기존 이름 기반 fallback을 유지.
- 미확보 7명: `buggy`, `teach`, `shiryu`, `burgess`, `van-augur`, `pizarro`, `koby`. 버기는 원래 평가/소속 목록에서 제외되어 있고, 나머지 6명은 이름 표시로 유지.
- **이조(Izo)**: 공식 인물 프로필에 기재된 흰수염 해적단 16번대 대장, 광월가 가신. 오니가시마 아카자야 측 합류는 원래의 9인 편성과 별도로 설명.
- **샹크스·이누아라시·네코마무시**: 로저 해적단 과거 견습 또는 오뎅 수행원으로 동승한 사실을 과거 소속으로 등록. 현재 소속은 변경하지 않음.
- 이조의 7개 전투 스탯·Haki Raw·전투 Evidence는 기존 근거 검증 없이 생성하지 않음. 별도 미평가 프로필로 표시하며 정렬·랭킹 및 매치업 계산 대상에서 제외.

## 정량 영향

| 구분 | 이전 v0.3.1 | 이번 v0.3.2 |
|---|---:|---:|
| 캐릭터 마스터 | 70 | 71 |
| 그룹에 표시되는 고유 캐릭터 | 69 | 70 |
| 평가된 고유 캐릭터 | 69 | 69 |
| 소속(Membership) | 88 | 93 |
| 평가(Evaluation) | 72 | 72 |
| 평가축(Stat rows) | 504 | 504 |
| 이미지 등록 | 0 | 64 |

## 권리와 출처

이미지들은 사용자가 직접 채팅에 첨부하여 전달한 파일이지만, **원저작권·2차적 저작물·게임 일러스트의 공개 재배포 권한은 검증하지 못했음**. 사이트 내 표기 `user-provided-unverified`는 사용권 확보를 의미하지 않는다. 허락 없는 공개 게시를 권장하거나 원작자 권리를 보증하지 않는다. 권리자의 요청 또는 검증 결과에 따라 공개 이미지 제거가 필요할 수 있다.

공식 확인: [ONE PIECE 이조 프로필](https://one-piece.com/character/izo/index.html); [ONE PIECE TV 772화(로저 해적단 동승 회상)](https://one-piece.com/anime/o3051/index.html).

## 검증과 후속

- PR #89: https://github.com/pchjesus/onepiece-saikyo-analysis/pull/89
- 기존 점수/계산 모델/전투 기록/패위감 수치 및 15개 직접 매치업은 이 변경에서 수정하지 않음.
- CI 후 실제 GitHub Pages URL, 로딩 이미지, fallback, 미평가 이조 화면, 과거 로저 소속의 실기기 시각 검증을 진행하는 것이 바람직함.
- 원저작권자 허가 정보 및 캐릭터별 원출처 URL은 후속 보강 대상.
