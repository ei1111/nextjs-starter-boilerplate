# PromptLy — AI 프롬프트 마켓플레이스

> ChatGPT, Midjourney, DALL-E 등 다양한 AI 모델의 프롬프트를 사고파는 마켓플레이스

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [다국어 지원 (i18n)](#다국어-지원-i18n)
- [페이지 구성](#페이지-구성)
- [컴포넌트 구조](#컴포넌트-구조)
- [시작하기](#시작하기)

---

## 프로젝트 개요

**PromptLy**는 AI 프롬프트를 사고팔 수 있는 마켓플레이스 웹 애플리케이션입니다.  
판매자는 자신이 만든 프롬프트를 등록해 수익을 창출하고, 구매자는 전문가가 제작한 검증된 프롬프트를 구매해 더 나은 AI 결과를 얻을 수 있습니다.

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui (Radix UI 기반) |
| **i18n** | next-intl 4.8 |
| **Theme** | next-themes (라이트/다크 모드) |
| **Form** | React Hook Form + Zod |
| **Toast** | Sonner |
| **Analytics** | Vercel Analytics |
| **Package Manager** | pnpm |

---

## 프로젝트 구조

```
prompt-site/
├── app/
│   ├── [locale]/               # 다국어 라우트 루트
│   │   ├── layout.tsx          # locale 레이아웃 (NextIntlClientProvider)
│   │   ├── page.tsx            # 홈 페이지
│   │   ├── admin/              # 관리자 대시보드
│   │   ├── auth/
│   │   │   ├── login/          # 로그인
│   │   │   └── join/           # 회원가입
│   │   ├── cart/               # 장바구니
│   │   ├── mypage/             # 마이페이지
│   │   └── prompts/
│   │       ├── page.tsx        # 프롬프트 목록
│   │       ├── [id]/           # 프롬프트 상세
│   │       └── new/            # 프롬프트 등록
│   ├── admin/                  # locale 없는 fallback (proxy.ts가 리다이렉트)
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 루트 페이지 (기본 locale로 리다이렉트)
├── components/
│   ├── ui/                     # shadcn/ui 기본 컴포넌트
│   ├── site-header.tsx         # 글로벌 헤더 (검색, 네비게이션, 인증)
│   ├── site-footer.tsx         # 글로벌 푸터
│   ├── home-sections.tsx       # 홈 히어로 & 프롬프트 그리드 섹션
│   ├── prompt-card.tsx         # 프롬프트 카드 컴포넌트
│   ├── locale-switcher.tsx     # 언어 전환 드롭다운
│   ├── theme-toggle.tsx        # 라이트/다크 테마 토글
│   └── theme-provider.tsx      # 테마 컨텍스트 프로바이더
├── i18n/
│   ├── routing.ts              # next-intl 라우팅 설정 (locales, defaultLocale)
│   ├── request.ts              # 서버사이드 메시지 로더
│   └── navigation.ts           # locale-aware Link, useRouter, usePathname
├── messages/
│   ├── ko.json                 # 한국어 번역
│   └── en.json                 # 영어 번역
├── lib/
│   ├── mock-data.ts            # 목업 데이터 (프롬프트, 판매/구매 내역)
│   ├── auth-context.tsx        # 인증 상태 관리 (Context API)
│   ├── cart-context.tsx        # 장바구니 상태 관리 (Context API)
│   └── utils.ts                # 유틸 함수 (cn 등)
├── proxy.ts                    # Next.js 16 미들웨어 (next-intl locale 감지 & 리다이렉트)
└── next.config.mjs             # Next.js 설정 (next-intl 플러그인)
```

---

## 주요 기능

### 🛍️ 마켓플레이스
- AI 모델별 필터링 (ChatGPT / Midjourney / DALL-E / Stable Diffusion / Claude / Gemini)
- 인기순 · 최신순 · 가격순 정렬
- 제목 · 설명 · 판매자 통합 검색
- 그리드 / 리스트 뷰 전환

### 📄 프롬프트 상세
- 구매 전: 프롬프트 내용 잠금 표시
- 구매 후: 프롬프트 전문 열람 및 원클릭 복사
- 판매자 정보, 판매 수, 등록일, AI 모델 표시

### 🛒 장바구니
- 프롬프트 담기 / 삭제 / 전체 삭제
- 주문 요약 (수량, 할인, 총 결제 금액)
- 로그인 여부에 따른 접근 제어

### 👤 인증
- 이메일 + 비밀번호 로그인 / 회원가입
- Google, 카카오 소셜 로그인 UI
- 테스트 계정 제공 (일반 사용자 / 관리자)

### 📝 프롬프트 판매 등록
- 제목, AI 모델 선택, 가격 설정
- 상세 설명 및 프롬프트 본문 입력
- 예시 결과 이미지 업로드 (드래그 앤 드롭)

### 🗂️ 마이페이지
- **구매 목록**: 구매한 프롬프트 내역 및 상세 이동
- **판매 관리**: 등록한 프롬프트 목록과 판매 건수
- **수익/정산**: 총 판매액, 수수료(20%), 정산 예정 금액, 계좌 등록

### 🔧 관리자 대시보드
- 월별 매출 현황 테이블
- 총 누적 매출, 플랫폼 수수료(20%), 총 주문 건수 요약 카드
- 관리자 계정 전용 접근 제어

### 🎨 UI/UX
- 라이트 / 다크 테마 지원
- 완전 반응형 디자인 (모바일 햄버거 메뉴 포함)
- 헤더 통합 검색창

---

## 다국어 지원 (i18n)

`next-intl` 기반으로 한국어(기본)와 영어를 지원합니다.

### 지원 언어

| 언어 | 코드 | URL 예시 |
|---|---|---|
| 한국어 (기본) | `ko` | `/ko`, `/ko/prompts` |
| English | `en` | `/en`, `/en/prompts` |

### 동작 방식

- **`proxy.ts`** (미들웨어): 모든 요청을 가로채 `Accept-Language` 헤더 기반으로 locale 자동 감지 후 `/ko/...` 또는 `/en/...`로 리다이렉트
- **`localePrefix: "always"`**: URL에 항상 locale이 포함됨
- **`localeDetection: true`**: 브라우저 언어 설정 자동 감지
- **언어 전환**: 헤더의 🌐 버튼으로 현재 페이지를 유지하며 언어 전환

### 번역 구조

```
messages/
├── ko.json   # 한국어 (common, nav, hero, prompts, cart, auth,
│             #         mypage, admin, footer, prompt_detail, prompt_new, locale)
└── en.json   # 영어 (동일 키 구조)
```

---

## 페이지 구성

| 경로 | 설명 | 인증 필요 |
|---|---|---|
| `/[locale]` | 홈 — 히어로 섹션 + 인기 프롬프트 그리드 | ❌ |
| `/[locale]/prompts` | 전체 프롬프트 목록 (검색 · 필터 · 정렬) | ❌ |
| `/[locale]/prompts/[id]` | 프롬프트 상세 및 구매 | ❌ |
| `/[locale]/prompts/new` | 프롬프트 판매 등록 | ✅ |
| `/[locale]/cart` | 장바구니 | ✅ |
| `/[locale]/mypage` | 마이페이지 (구매 · 판매 · 수익) | ✅ |
| `/[locale]/auth/login` | 로그인 | ❌ |
| `/[locale]/auth/join` | 회원가입 | ❌ |
| `/[locale]/admin` | 관리자 대시보드 | ✅ (admin) |

---

## 컴포넌트 구조

### 전역 컴포넌트

- **`SiteHeader`** — 로고, 검색창, 테마 토글, 언어 전환, 로그인/로그아웃, 장바구니, 마이페이지, 관리자 메뉴. 모바일 햄버거 메뉴 포함.
- **`SiteFooter`** — 브랜드 설명, 마켓플레이스 링크, AI 모델 목록, 고객지원 링크, 저작권
- **`LocaleSwitcher`** — 현재 경로를 유지하며 언어 전환
- **`ThemeToggle`** — 라이트/다크/시스템 테마 전환

### 페이지별 컴포넌트

- **`HeroSection`** — 메인 슬로건, CTA 버튼, 통계 수치
- **`PromptGrid`** — AI 모델 필터 + 프롬프트 카드 리스트
- **`PromptCard`** — 썸네일, 모델 배지, 제목, 설명, 가격, 판매자 정보

### 상태 관리 (Context API)

- **`AuthProvider`** — 로그인 상태, 유저 정보, 로그인/로그아웃 액션
- **`CartProvider`** — 장바구니 아이템, 총 가격, 담기/삭제/초기화 액션

---

## 시작하기

### 요구 사항

- Node.js 18+
- pnpm 8+

### 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd prompt-site

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속 시 기본 locale(`/ko`)로 자동 리다이렉트됩니다.

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 테스트 계정

| 역할 | 이메일 | 비밀번호 |
|---|---|---|
| 일반 사용자 | `user@promptly.kr` | `user1234` |
| 관리자 | `admin@promptly.kr` | `admin1234` |
