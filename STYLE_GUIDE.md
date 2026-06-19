# GRI 채용자격검증 — 스타일 가이드

**프로젝트:** 경기연구원 채용자격검증 웹앱  
**최종 업데이트:** 2026-06-19

---

## 1. 폰트

| 항목 | 값 |
|------|---|
| 폰트 패밀리 | `Pretendard` (CDN) → `-apple-system` → `system-ui` 순 폴백 |
| 기본 크기 | `16px` (html 기준) |
| 기본 행간 | `1.5` |
| 안티앨리어싱 | `-webkit-font-smoothing: antialiased` |

### 텍스트 크기 계층

| 용도 | 크기 | 굵기 |
|------|------|------|
| 페이지 타이틀 | `1.1rem` | 700 |
| 섹션 헤더 | `0.95rem` | 700 |
| 본문 (기본) | `0.82rem` | 400 |
| 보조 텍스트 | `0.78rem` | 400 |
| 라벨·캡션 | `0.74rem` | 500 |
| 마이크로 텍스트 | `0.68–0.72rem` | 700 |

---

## 2. 컬러 시스템

### 브랜드 컬러

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--gri-primary` | `#2563eb` | 주요 버튼, 링크, 강조 |
| `--gri-primary-dark` | `#1d4ed8` | 호버·활성 상태 |
| `--gri-primary-light` | `#3b82f6` | 그라디언트 끝색 |
| `--gri-primary-50` | `#eff6ff` | 배경 틴트 |
| `--gri-primary-100` | `#dbeafe` | 배경 틴트 진한 것 |
| `--gri-accent` | `#F5A623` | 강조 포인트 (선택) |

### 텍스트 컬러

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--gri-text-primary` | `#212121` | 제목·본문 기본 |
| `--gri-text-secondary` | `#6b7280` | 보조 설명 |
| `--gri-text-muted` | `#9ca3af` | 비활성·플레이스홀더 |

### 배경·테두리

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--gri-bg` | `#f9fafb` | 페이지 배경 |
| `--gri-surface` | `#ffffff` | 카드·모달 배경 |
| `--gri-border` | `#e5e7eb` | 일반 테두리 |
| `--gri-border-light` | `#f3f4f6` | 연한 구분선 |

### 상태 컬러

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--gri-success` | `#10B981` | 성공·완료 |
| `--gri-error` | `#EF4444` | 오류·위반 |
| `--gri-warning` | `#F59E0B` | 경고 |
| `--gri-info` | `#3B82F6` | 정보 |

---

## 3. 간격 & 모서리 둥글기

### Border Radius

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--gri-radius-sm` | `4px` | 배지·태그 |
| `--gri-radius` (md) | `8px` | 입력필드·소형 카드 |
| `--gri-radius-lg` | `12px` | 모달·패널 |
| `--gri-radius-xl` | `16px` | 대형 카드·오버레이 |
| `--gri-radius-circle` | `50%` | 아이콘 버튼 |

### 그림자

| 토큰 | 용도 |
|------|------|
| `--gri-shadow-sm` | 버튼·입력필드 |
| `--gri-shadow-md` | 카드·드롭다운 |
| `--gri-shadow-lg` | 모달·팝업 |
| `--gri-shadow-xl` | 최상위 레이어 |

---

## 4. 버튼

### 기본 구조

```css
.btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  transition: 0.15s ease;
}
```

### 크기 변형

| 클래스 | 패딩 | 폰트 | 용도 |
|--------|------|------|------|
| `.btn` (기본) | `10px 20px` | `0.95rem` | 일반 동작 |
| `.btn--sm` | `6px 14px` | `0.85rem` / radius `8px` | 툴바·인라인 |
| `.btn--lg` | `12px 28px` | `1.05rem` | 강조 CTA |
| `.btn--icon` | `40×40px` | — | 원형 아이콘 버튼 |

### 스타일 변형

| 클래스 | 배경 | 텍스트 | 용도 |
|--------|------|--------|------|
| `.btn--primary` | `#2563eb → #3b82f6` (그라디언트) | 흰색 | 주요 액션 (검토완료, 추가 등) |
| `.btn--secondary` | 흰색 + 테두리 | `#212121` | 보조 액션 (Map, 미리보기 등) |
| `.btn--danger` | `#EF4444` | 흰색 | 삭제·취소 |
| `.btn--ghost` | 투명 | `#6b7280` | 최소화 동작 (완료해제, 저장 등) |
| `.btn:disabled` | — | 50% 투명도 | 비활성 |

---

## 5. 배지 & 상태 칩

### 지원자 목록 상태 (`.rc-status`)

| 클래스 | 배경 | 텍스트 색 | 의미 |
|--------|------|-----------|------|
| `.rc-status--done` | primary 10% | `#1d4ed8` | 검토 완료 |
| `.rc-status--anomaly` | error 8% | `#EF4444` | 이상 검토 필요 |

### 건수 카운트 (`.rc-cnt`)

| 클래스 | 색상 | 의미 |
|--------|------|------|
| `.rc-cnt--ok` | muted | 정상 |
| `.rc-cnt--bad` | error | 이상 있음 |
| `.rc-cnt--na` | muted | 해당 없음 |
| `.rc-cnt-sep` | 50% 투명 | `/` 구분자 |

### 인라인 배지 (`.rc-badge`)

| 클래스 | 배경 | 텍스트 |
|--------|------|--------|
| `.rc-badge--ok` | primary 10% | primary |
| `.rc-badge--warn` / `--miss` | error 8% | error |
| `.rc-badge--pending` | border-light | muted |
| `.rc-badge--na` | 투명 | muted |

### 일반 배지 (`.badge`)

| 클래스 | 의미 |
|--------|------|
| `.badge--success` | 성공 (초록) |
| `.badge--warning` | 경고 (노랑) |
| `.badge--danger` | 위험 (빨강) |
| `.badge--info` | 정보 (파랑) |

---

## 6. 탭

### 페이지 탭 (지원자검증 / 평가위원검증)

```
비활성: 흰 배경 + border + text-secondary
활성:   primary 배경 + 흰 텍스트
```

### 목록 필터 탭 (전체 / 검토 / 완료)

```
비활성: 투명 배경 + border-light + text-secondary
호버:   primary 테두리 + primary 텍스트
활성:   primary 배경 + 흰 텍스트
카운트 뱃지: 활성 시 흰색 25% 반투명 배경
```

---

## 7. 테이블

### 지원자 목록 그리드

```
grid-template-columns: 24px 1fr 36px 36px 50px 52px
열 구성: 번호 | 이름+직책 | 서류 | 논문 | 블라인드 | 상태
```

- 행 높이: 자동 (패딩 `8px 10px`)
- 헤더 배경: `--gri-bg`
- 행 구분: `border-bottom: 1px solid --gri-border-light`
- 호버: `--gri-primary-50` 배경

### 평가위원 테이블 그리드

```
grid-template-columns: 90px 1.6fr 1fr 90px 65px 65px
열 구성: 이름 | 소속 | 전문분야 | 연관성 지수 | 최고 | 최저
```

- 숫자 컬럼: 소수점 두 자리 표기 (예: `0.85`)
- 색상: 전부 `--gri-text-primary` (블랙 통일)

---

## 8. 대시보드 카드

```
배경: white
테두리: --gri-border (1px)
그림자: --gri-shadow-sm
레이아웃: flex column, center 정렬
패딩: 10px 12px
```

| 카드 | 숫자 색 | 아이콘 색 |
|------|---------|-----------|
| 총 인원 | text-primary | text-muted |
| 서류 | text-primary | text-muted |
| 논문 | text-primary | text-muted |
| 블라인드 | text-primary | text-muted |
| 활성 필터 | — | primary (파란 테두리 + 그림자) |

- 숫자 크기: `1.2rem`, weight `800`
- `명` 단위: `0.65rem`, weight `500`, muted 색상
- 라벨: `0.74rem`, weight `500`, muted

---

## 9. 아이콘

라이브러리: **Lucide Icons** (`unpkg.com/lucide@latest`)

```html
<i data-lucide="아이콘명" style="width:Xpx;height:Xpx;"></i>
```

| 용도 | 아이콘 | 크기 |
|------|--------|------|
| 네비 타이틀 | `clipboard-list` | 20px |
| 업로드 | `upload` | 16px |
| 서류 카드 | `file-text` | 18px |
| 논문 카드 | `book-open` | 18px |
| 블라인드 카드 | `eye-off` | 18px |
| 총 인원 카드 | `users` | 18px |
| 온톨로지 맵 | `share-2` | 13px |
| 새 세션 | `plus` | 13px |
| 엑셀 내보내기 | `file-spreadsheet` | 14px |
| 분야 드롭다운 | `chevron-down` | 11px |

---

## 10. 스크롤바

```css
width: 4px
track: transparent
thumb: --gri-border (rgba(0,0,0,0.12))
thumb:hover: --gri-text-muted
border-radius: 2px
```

---

## 11. 트랜지션

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--gri-transition` | `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)` | 일반 |
| `--gri-transition-fast` | `all 0.15s cubic-bezier(0.4, 0, 0.2, 1)` | 버튼·호버 |

---

## 12. 레이아웃 구조

```
Navbar (height: 56px)
└── App Layout (height: calc(100vh - 56px))
    ├── Session Sidebar (width: 220px, 고정)
    └── Main Content (flex: 1)
        └── Recruitment Page
            max-width: 1200px
            margin: 0 auto
            padding: 0 16px
            height: calc(100vh - 104px)
            ├── rc-session-sidebar (width: 180px)
            └── rc-page-main (flex: 1)
                ├── recruit-top-row (height: 140px)
                │   ├── upload-card (flex: 1)
                │   └── dashboard-cards (flex: 2, 4개)
                └── recruit-layout (flex, gap: 12px)
                    ├── recruit-list-col (flex: 4)
                    └── recruit-detail-col (flex: 6)
```

---

*본 문서는 Claude Code와 함께 작성되었습니다.*
