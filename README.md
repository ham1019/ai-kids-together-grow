# AI 아이교육 커뮤니티 플랫폼

## 📋 프로젝트 개요

**AI 아이교육**은 부모들이 AI 도구를 활용한 아이 교육 경험을 공유하고 소통할 수 있는 커뮤니티 플랫폼입니다. ChatGPT, Claude 등의 AI 도구를 활용한 창의적인 교육 방법을 나누고, 아이들의 성장을 함께 응원하는 공간을 제공합니다.

### 🎯 프로젝트 목적
- AI 도구를 활용한 혁신적인 교육 방법 공유
- 부모들의 교육 경험과 노하우 교환
- 아이들의 창의성과 학습 능력 향상을 위한 커뮤니티 구축
- 실용적이고 안전한 AI 교육 가이드 제공

## ✨ 주요 기능

### 🔐 사용자 관리
- 회원가입/로그인 (Supabase Auth)
- 사용자 프로필 관리
- 개인 설정 (테마, 언어, 알림 등)

### 📝 커뮤니티 기능
- 교육 경험 게시글 작성/조회
- 카테고리별 필터링 (AI 활용법, 연령별, 주제별)
- 좋아요, 댓글, 북마크 시스템
- 태그 기반 검색 및 분류

### 🎨 사용자 경험
- 반응형 디자인 (모바일/데스크톱)
- 직관적인 UI/UX
- 부드러운 애니메이션 효과
- 접근성 고려

### 📊 데이터 관리
- 실시간 조회수 추적
- 사용자 활동 통계
- 팔로우 시스템

## 🖼️ 프로젝트 대표 이미지

```
public/lovable-uploads/628e8006-be0b-44d5-812e-dffd9dc5113f.png
```

## 🛠️ 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스 구축
- **TypeScript** - 타입 안정성 및 개발 생산성
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **React Router DOM** - 클라이언트 사이드 라우팅

### UI/UX
- **shadcn/ui** - 모던한 UI 컴포넌트 라이브러리
- **Radix UI** - 접근성 중심의 프리미티브 컴포넌트
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Lucide React** - 아이콘 라이브러리

### State Management & Data Fetching
- **React Query (TanStack Query)** - 서버 상태 관리
- **React Context API** - 클라이언트 상태 관리

### Backend & Database
- **Supabase** - 백엔드 서비스 (Auth, Database, Storage)
- **PostgreSQL** - 관계형 데이터베이스
- **Row Level Security (RLS)** - 데이터 보안

### Development Tools
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **TypeScript** - 정적 타입 검사

## 🚀 설치 및 실행 방법

### 환경 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn 패키지 매니저
- Git

### 설치 과정

```bash
# 1. 저장소 클론
git clone <repository-url>
cd ai-education-community

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
# .env.local 파일 생성 후 Supabase 설정 추가
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. 개발 서버 실행
npm run dev

# 5. 브라우저에서 확인
# http://localhost:8080
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 배포 (Vercel, Netlify 등)
npm run build
```

## 📱 주요 화면

### 메인 페이지 (`/`)
```tsx
// src/pages/Index.tsx
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <OnboardingSection />
      <main className="container mx-auto px-4 py-12">
        {/* 게시글 목록 및 필터 */}
      </main>
    </div>
  );
};
```

### 인증 페이지 (`/auth`)
```tsx
// src/pages/Auth.tsx
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  // 회원가입/로그인 폼
}
```

### API 예시

#### 회원가입
```typescript
// src/contexts/AuthContext.tsx
const signUp = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });
  
  if (data.user) {
    await createProfile(data.user.id, username);
  }
  
  return { error };
};
```

#### 게시글 조회
```typescript
// 게시글 목록 조회
const { data: posts } = await supabase
  .from('posts')
  .select(`
    *,
    profiles!posts_author_id_fkey(username, display_name)
  `)
  .eq('is_published', true)
  .order('created_at', { ascending: false });
```

## 📁 디렉토리 구조

```
ai-education-community/
├── public/                    # 정적 파일
│   ├── favicon.ico
│   ├── lovable-uploads/      # 업로드된 이미지
│   └── robots.txt
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── ui/              # shadcn/ui 컴포넌트
│   │   ├── Header.tsx       # 헤더 컴포넌트
│   │   ├── PostCard.tsx     # 게시글 카드
│   │   └── ...
│   ├── contexts/            # React Context
│   │   └── AuthContext.tsx  # 인증 상태 관리
│   ├── data/                # 샘플 데이터
│   │   └── samplePosts.ts
│   ├── hooks/               # 커스텀 훅
│   ├── integrations/        # 외부 서비스 연동
│   │   └── supabase/       # Supabase 설정
│   ├── lib/                 # 유틸리티 함수
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Index.tsx       # 메인 페이지
│   │   ├── Auth.tsx        # 인증 페이지
│   │   └── NotFound.tsx    # 404 페이지
│   ├── App.tsx             # 앱 루트 컴포넌트
│   ├── main.tsx            # 진입점
│   └── index.css           # 글로벌 스타일
├── supabase/               # Supabase 설정
├── package.json            # 프로젝트 설정
├── tailwind.config.ts      # Tailwind 설정
├── vite.config.ts          # Vite 설정
└── README.md              # 프로젝트 문서
```

## 💻 프로젝트 사용법

### 회원가입 및 로그인

```typescript
// 회원가입
const { signUp } = useAuth();
const result = await signUp(email, password, username);

// 로그인
const { signIn } = useAuth();
const result = await signIn(email, password);
```

### 게시글 작성 (예시)

```typescript
// 게시글 작성
const { data, error } = await supabase
  .from('posts')
  .insert({
    title: 'ChatGPT로 아이와 함께하는 창의적 학습',
    content: 'AI를 활용한 교육 경험을 공유합니다...',
    category: 'AI 활용법',
    tags: ['ChatGPT', '창의성', '7세'],
    author_id: user.id
  });
```

### 게시글 조회

```typescript
// 카테고리별 필터링
const filteredPosts = posts.filter(post => 
  selectedCategory === "all" || 
  post.category === selectedCategory
);

// 정렬
const sortedPosts = posts.sort((a, b) => {
  switch (sortBy) {
    case "popular": return b.likes - a.likes;
    case "latest": return new Date(b.created_at) - new Date(a.created_at);
    default: return 0;
  }
});
```

## 🤝 기여 방법

### 개발 환경 설정

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/ai-education-community.git
   cd ai-education-community
   ```

2. **브랜치 생성**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **개발 및 테스트**
   ```bash
   npm install
   npm run dev
   npm run lint
   ```

### 코드 스타일 가이드

- **TypeScript** 사용 필수
- **ESLint** 규칙 준수
- **Prettier** 포맷팅 적용
- **컴포넌트명**: PascalCase (예: `PostCard.tsx`)
- **함수명**: camelCase (예: `handleSubmit`)
- **상수명**: UPPER_SNAKE_CASE (예: `API_BASE_URL`)

### Pull Request 가이드

1. **이슈 생성**: 새로운 기능이나 버그 수정 전에 이슈 생성
2. **브랜치명**: `feature/기능명` 또는 `fix/버그명`
3. **커밋 메시지**: 명확하고 간결하게 작성
4. **테스트**: 기능 추가/수정 시 관련 테스트 코드 작성
5. **문서화**: API 변경 시 README 업데이트

### 이슈 등록

- **버그 리포트**: 재현 가능한 단계와 예상/실제 결과 포함
- **기능 요청**: 명확한 사용 사례와 기대 효과 설명
- **문서 개선**: 구체적인 개선 사항 제안

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

```
MIT License

Copyright (c) 2024 AI 아이교육 커뮤니티

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 연락처 및 지원

### 주요 연락처
- **프로젝트 관리자**: [your-email@example.com]
- **기술 지원**: [tech-support@example.com]
- **일반 문의**: [contact@example.com]

### 지원 방법
- **GitHub Issues**: 버그 리포트 및 기능 요청
- **Discord**: 커뮤니티 토론 및 실시간 지원
- **이메일**: 개인적인 문의사항

### 문서 및 리소스
- **API 문서**: [API Documentation Link]
- **디자인 시스템**: [Design System Link]
- **배포 가이드**: [Deployment Guide Link]

## 📈 변경 로그

### v1.0.0 (2024-01-XX)
#### 추가된 기능
- ✅ 사용자 인증 시스템 (회원가입/로그인)
- ✅ 게시글 작성 및 조회 기능
- ✅ 카테고리별 필터링 시스템
- ✅ 좋아요, 댓글, 북마크 기능
- ✅ 반응형 디자인 구현
- ✅ Supabase 연동 및 데이터베이스 설계

#### 기술적 개선사항
- 🔧 TypeScript 타입 안정성 강화
- 🔧 ESLint 및 Prettier 설정
- 🔧 성능 최적화 (React Query 활용)
- 🔧 접근성 개선 (ARIA 라벨, 키보드 네비게이션)

#### 버그 수정
- 🐛 회원가입 후 자동 로그인 문제 해결
- 🐛 프로필 생성 실패 이슈 수정
- 🐛 모바일 반응형 레이아웃 개선

### v0.9.0 (2024-01-XX)
- 초기 프로젝트 설정
- 기본 UI 컴포넌트 구현
- Supabase 연동 설정

## 🚀 향후 계획

### 단기 계획 (1-2개월)
- [ ] 이미지 업로드 기능
- [ ] 실시간 알림 시스템
- [ ] 검색 기능 개선
- [ ] 모바일 앱 버전

### 중기 계획 (3-6개월)
- [ ] AI 도구 추천 시스템
- [ ] 교육 콘텐츠 큐레이션
- [ ] 부모 커뮤니티 기능
- [ ] 다국어 지원

### 장기 계획 (6개월 이상)
- [ ] AI 기반 개인화 추천
- [ ] 교육 성과 추적 시스템
- [ ] 전문가 멘토링 프로그램
- [ ] 교육 리소스 마켓플레이스

---

**AI 아이교육 커뮤니티**는 아이들의 미래를 위한 혁신적인 교육 플랫폼을 만들어갑니다. 여러분의 기여와 피드백을 기다립니다! 🌟

