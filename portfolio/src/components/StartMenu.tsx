// src/components/StartMenu.tsx
'use client'

import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import avatar from '@/../public/avatar.jpg'
import { readLastSeen } from '@/lib/lastSeen'

import FeaturedProjects from '@/components/FeaturedProjects'
import RecentPatchNotes from '@/components/RecentPatchNotes'
import MountSection from '@/components/MountSection'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent">{children}</span>
}

function MiniCard({
  label,
  title,
  desc,
}: {
  label: string
  title: string
  desc: string
}) {
  return (
    <div className="panel panel-glow p-5 md:p-6">
      <div className="text-b5 muted">{label}</div>
      <div className="text-b2 mt-2">{title}</div>
      <div className="text-b4 muted mt-2 leading-relaxed">{desc}</div>
    </div>
  )
}

function SectionHeader({
  label,
  title,
  desc,
}: {
  label: string
  title: string
  desc: string
}) {
  return (
    <div className="mb-4">
      <div className="text-b5 muted">{label}</div>
      <div className="text-b2 mt-2">{title}</div>
      <div className="text-b4 muted mt-2 leading-relaxed">{desc}</div>
    </div>
  )
}

function Shortcut() {
  return (
    <div className="text-b5 muted mt-4">
      Shortcut:{' '}
      <span className="accent">C</span> Projects · <span className="accent">P</span> Patch Notes ·{' '}
      <span className="accent">H</span> Home 
    </div>
  )
}

export default function StartMenu() {
  const router = useRouter()
  const pathname = usePathname()

  // lastSeen 기능은 유지하지만 UI 노출은 제거
  useEffect(() => {
    readLastSeen()
  }, [])



  const featured = useMemo(
    () => [
      {
        slug: 'chop',
        title: 'CHOP!',
        subtitle: 'PWA 기반 온라인 게임 아이템·계정 현금거래 중개 서비스',
        summary:
          '현업 개발자들과 협업하며 작업 기준, 의사소통 방식, 코드 리뷰 흐름을 익히며 프론트엔드 개발자로서의 기반을 만들었습니다.',
        tags: ['React', 'TypeScript', 'Styled Components'],
        icon: '/chop_logo.png'
      },
      {
        slug: 'on-fit',
        title: 'on-fit',
        subtitle: '거리 기반 좌표를 이용한 우리동네 운동 소모임 매칭 서비스',
        summary:
          '기획부터 Next.js 기반 화면 설계, Supabase 백엔드 구성, CI/CD·배포까지 서비스 전 과정을 처음으로 직접 경험한 프로젝트였습니다.',
        tags: ['Next.js', 'Tailwind', 'Supabase'],
        icon: '/onfit_logo.png'
      },
      {
        slug: 'ttak',
        title: 'TTAK',
        subtitle: '공공데이터 기반 건강기능식품 탐색·상세 가이드 제공 서비스',
        summary:
          '공공데이터 기반 탐색/상세 경험을 구현하며 PM·디자이너·백엔드와 함께 사용자 흐름을 설계했고, 프론트엔드 파트를 리딩하며 화면 구조와 기준을 잡았습니다.',
        tags: ['Next.js', 'Google Oauth', 'Event Log'],
        icon: '/ttak_logo.svg'
      },
    ],
    [],
  )

  const stackBadges = useMemo(
    () => [
      'React',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Tailwind CSS',
      'Zustand',
      'TanStack React Query',
      'Storybook',
      'AWS EC2',
      'GitHub Actions',
      'GitHub',
      'Jira',
      'Confluence',
    ],
    [],
  )

  return (
    <div className="w-full">
      {/* ✅ 바깥 “유리판넬” 프레임 */}
      <div className="panel panel-glow p-6 md:p-8">
        {/* 내부는 섹션 간격으로만 분리 */}
        <div className="space-y-10">
          {/* ========== HERO ========== */}
          <MountSection delay={0}>
            <section className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1 min-w-0">
                <div className="text-b5 muted">PORTFOLIO</div>

                <div className="flex items-baseline gap-3 mt-2">
                  <h1 className="text-h2">조준형</h1>
                  <div className="text-b3 muted">Frontend Developer</div>
                </div>

                <p className="text-b3 muted mt-4 typo max-w-[68ch]">
                  성장 과정은 하나의 서비스가 <span className="accent">출시</span>되고{' '}
                  <span className="accent">개선</span>되며 안정화되는 흐름과 닮아 있다고 생각합니다.
                  <br />
                  협업 과정에서는 팀과 <span className="accent">문제를 함께 정의</span>하고, 새로운 시도를{' '}
                  <span className="accent">코드로 검증</span>하는 과정을 중요하게 여기고 있습니다.
                  <br />
                  이러한 경험과 고민을 <span className="accent">기록</span>으로 남기며 스스로의 변화를 정리해
                  왔습니다.
                </p>

                <Shortcut />

                {/* ✅ STACK: Hero 바로 아래 얇게 */}
                <div className="mt-5">
                  <div className="text-b5 muted mb-2">STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {stackBadges.map((s, i) =>
                      i === 0 ? <AccentChip key={s}>{s}</AccentChip> : <Chip key={s}>{s}</Chip>,
                    )}
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <div className="panel panel-glow p-3 w-[200px]">
                  <Image
                    src={avatar}
                    alt="avatar"
                    className="rounded-2xl w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </section>
          </MountSection>

          {/* ========== FEATURED PROJECTS ========== */}
          <MountSection delay={1}>
            <FeaturedProjects items={featured} />
          </MountSection>

          {/* ✅ 섹션 분리: WORK STYLE */}
          <MountSection delay={2}>
            <section>
              <SectionHeader
                label="WORK STYLE"
                title="프로젝트를 진행하며 반복적으로 사용한 방식"
                desc="문제를 정의하고 기준을 맞춘 뒤, 실행과 기록으로 연결하는 흐름을 정리했습니다."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MiniCard
                  label="RUN"
                  title="CHOP! → minds-safe → on-fit → TTAK"
                  desc="구현 중심에서 시작해, 구조·운영·협업까지 확장해 왔습니다."
                />
                <MiniCard
                  label="FOCUS"
                  title="문제 정의 · 기준 합의 · 실행"
                  desc="문제를 정리해 팀이 같은 기준으로 움직이도록 만들고, 실행까지 연결해 왔습니다."
                />
                <MiniCard
                  label="SIGNATURE"
                  title="소통 · 실행 · 기록"
                  desc="대화를 통해 문제를 풀고, 새로운 시도를 코드로 검증하며 기록합니다."
                />
              </div>
            </section>
          </MountSection>

          {/* ========== RECENT PATCH NOTES ========== */}
          <MountSection delay={3}>
            <RecentPatchNotes
              items={[
                {
                  slug: 'home-ia-refactor',
                  title: 'Typography System Update',
                  date: '2025-12',
                  subtitle:
                    'Tailwind v4 기반 타이포그래피 토큰/유틸 구조를 설계하고 사용 규칙을 문서화했습니다.',
                    href: 'https://velog.io/@jojh0323/%EA%B8%B0%ED%9A%8D%EC%95%88-%ED%83%80%EC%9D%B4%ED%8F%AC-%EC%8A%A4%ED%8E%99%EC%9D%84-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%BD%94%EB%93%9C%EB%A1%9C-%EC%98%AE%EA%B8%B0%EA%B8%B0-Tailwind-v4-globals.css'
                },
                {
                  slug: 'project-embed-patchnotes',
                  title: 'OAUTH Login Hotfix',
                  date: '2026-01',
                  subtitle: '도메인/쿠키/CORS 이슈를 추적하며 OAUTH 로그인 흐름을 안정화했습니다.',
                  href:'https://velog.io/@jojh0323/OAUTH-%EC%82%BD%EC%A7%88%EA%B8%B0-1-%EC%99%84%EC%A0%84%ED%9E%88-%EB%8B%A4%EB%A5%B8-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%97%90%EC%84%9C-%EC%8B%9C%EC%9E%91%ED%95%9C-%EC%8B%A4%ED%8C%A8'
                },
              ]}
            />
          </MountSection>

          {/* ========== HOW TO READ + CAREER ========== */}
          <MountSection delay={4}>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="panel panel-glow p-5 md:p-6">
                <div className="text-b5 muted">HOW TO READ</div>
                <div className="mt-3 space-y-2 text-b4">
                  <div>
                    <span className="accent">Projects</span>: 대표 프로젝트 / 역할 / 성과 중심
                  </div>
                  <div>
                    <span className="accent">Patch Notes</span>: 문제 해결/개선 기록을 시간순으로 정리
                  </div>
                </div>
              </div>

              <div className="panel panel-glow p-5 md:p-6">
                <div className="text-b5 muted">CAREER</div>
                <div className="mt-3 space-y-2 text-b4 muted leading-relaxed">
                  <div>· 부경대학교 컴퓨터공학과 졸업</div>
                  <div>· 권오흠 교수님 알고리즘 연구실 학부 연구생</div>
                  <div>· 구름 deepdive 부트캠프 수료</div>
                </div>
              </div>
            </section>
          </MountSection>

          {/* Footer (프레임 안에 넣으면 통일감 더 좋음) */}
          <MountSection delay={4}>
            <div className="text-b5 muted">© {new Date().getFullYear()} · Portfolio</div>
          </MountSection>
        </div>
      </div>
    </div>
  )
}
