// src/components/TechRolePanel.tsx
import React from 'react'
import type { ProjectFrontMatter } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap shrink-0">
      {children}
    </span>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-b5 muted">{children}</div>
}

const DEFAULT_ROLE_MAP: Record<string, { role: string; value: string }> = {
  'Next.js': {
    role: '라우팅/렌더링 구조',
    value:
      'App Router 기반으로 페이지 라우팅과 서버/클라이언트 책임을 분리해 전체 화면 흐름을 구성했다.',
  },

  React: {
    role: 'UI 상태/컴포넌트',
    value:
      '상태 변화에 따라 UI를 컴포넌트 단위로 조합하고, 재사용 가능한 화면 구조로 유지보수를 쉽게 했다.',
  },

  TypeScript: {
    role: '타입 안정성',
    value:
      'API 응답/컴포넌트 Props 계약을 타입으로 고정해 런타임 오류를 줄이고 협업 시 실수를 예방했다.',
  },

  'Tailwind CSS': {
    role: '디자인 시스템/스타일',
    value:
      '토큰(색/타이포/간격)과 유틸 기반으로 스타일 규칙을 표준화해 화면 간 일관성을 유지했다.',
  },

  Storybook: {
    role: '컴포넌트 문서화',
    value:
      '페이지와 분리된 UI 컴포넌트를 독립적으로 개발/검증하고 상태 케이스를 문서화해 협업 효율을 높였다.',
  },

  'TanStack React Query': {
    role: '서버 상태 관리',
    value:
      '캐싱/로딩/에러/리패칭 정책을 표준화해 데이터 패칭 코드를 단순화하고 사용자 경험을 안정화했다.',
  },

  Nginx: {
    role: '리버스 프록시',
    value:
      '도메인 라우팅과 프록시 설정으로 서비스 트래픽을 백엔드/프론트로 분기하고 운영 구성을 정리했다.',
  },

  PM2: {
    role: '프로세스 관리',
    value:
      'Node 프로세스 실행/자동 재시작/로그 관리를 통해 장애 상황에서도 서비스가 안정적으로 유지되게 했다.',
  },

  'AWS EC2': {
    role: '배포/운영 환경',
    value:
      '실서비스 배포 환경(서버/네트워크/권한)을 구성하고 운영 관점에서 배포/장애 대응 경험을 쌓았다.',
  },

  'GitHub Actions': {
    role: 'CI/CD',
    value:
      '빌드/배포 과정을 자동화해 반복 작업을 줄이고, 브랜치 전략에 맞춘 배포 흐름을 고정했다.',
  },

  'Stay-time events': {
    role: '사용자 행동 지표',
    value:
      '상품 상세에서 active/total 체류시간을 측정해 “사용자가 실제로 읽는지”를 데이터로 확인 가능하게 했다.',
  },

  'Funnel sessions': {
    role: '퍼널 분석',
    value:
      '상세 페이지 도달까지의 클릭 흐름을 세션 단위로 기록해 전환 병목을 찾고 개선 포인트를 도출했다.',
  },

  'Styled-components': {
  role: '스타일 엔진',
  value: '디자인 토큰을 바로 코드에서 사용할 수 있게 해 UI 룰(색·타입·간격)을 컴포넌트 단위로 일관되게 적용했다.',
},
 
'Axios': {
  role: '네트워크 레이어',
  value: '백엔드 API 요청을 인터셉터 기반 파이프라인으로 통합해 에러 처리·헤더·쿠키 정책을 일관된 흐름에서 관리했다.',
},
'Zustand': {
  role: 'UI 상태 엔진',
  value: '페이지 간 공유되는 UI 상태(오버레이·사이드바·카드 확장 등)를 가볍고 예측 가능한 스토어로 관리해 인터랙션의 연속성을 유지했다.',
},
'Kakao maps api': {
  role: '지도 엔진',
  value: '지도 렌더링·마커·좌표/주소 기반 탐색을 묶어 “사용자 주변 정보”를 화면에서 바로 탐색 가능한 흐름으로 만들었다.',
},

'Supabase': {
  role: '백엔드 플랫폼',
  value: 'DB·Auth·Storage를 한 곳에서 운영하고 RLS로 접근 규칙을 고정해, 프론트는 “권한이 보장된 데이터”만 일관되게 다루도록 구성했다.',
},

'Swagger': {
  role: 'API 명세서',
  value: '엔드포인트·스키마·에러 규격을 문서로 고정해 FE/BE가 같은 규칙으로 개발하고, 요청/응답을 빠르게 검증할 수 있게 했다.',
},


}


function toRoleSentence(name: string) {
  const hit = DEFAULT_ROLE_MAP[name]
  if (hit) return hit
  return {
    role: '도구(Utility)',
    value: `${name}을(를) 프로젝트의 안정성과 구현 속도를 위해 활용했다.`,
  }
}

export function TechRolePanel({ p }: { p: ProjectFrontMatter }) {
  if (!p.tech) return null

  const totalCount = Object.values(p.tech).reduce((acc, arr) => acc + arr.length, 0)

  return (
    <section className="panel p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionTitle>TECH (as roles)</SectionTitle>
          <div className="text-b3 mt-2">기술을 “역할”로 번역해서, 왜 이 스택을 선택했는지 설명한다.</div>
        </div>
        <div className="text-b5 muted">{totalCount} items</div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {Object.entries(p.tech).map(([group, items]) => (
          <div key={group} className="panel p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-b5 muted">{group.toUpperCase()}</div>
              <Chip>{items.length}</Chip>
            </div>

            <div className="mt-4 space-y-3">
              {items.map((t) => {
  const { role, value } = toRoleSentence(t)

  return (
    <div
      key={t}
      className="rounded-[14px] border border-white/10 bg-white/5 p-4"
    >
      {/* ✅ HEADER: title + badge 를 같은 흐름에 둬서 절대 안 겹치게 */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {/* title은 2줄까지 허용(긴 스택명 대응) */}
          <div className="text-b3 leading-snug break-words">
            {t}
          </div>
        </div>

        {/* badge는 오른쪽에 고정, 흐름 안에 있으니 겹칠 일이 없음 */}
        <div className="shrink-0">
          <Chip>{role}</Chip>
        </div>
      </div>

      {/* ✅ BODY: 본문은 아래에서 풀폭으로 이어짐 */}
      <div className="mt-2 text-b4 muted typo">
        {value}
      </div>
    </div>
  )
})}

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
