// src/components/StartMenu.tsx
'use client'

import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import avatar from '@/../public/avatar.jpg'
import { readLastSeen } from '@/lib/lastSeen'

import FeaturedProjects from '@/components/FeaturedProjects'
import RecentPatchNotes from '@/components/RecentPatchNotes'
import MountSection from '@/components/MountSection'

// // SECTION LABEL ──────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="accent text-b3 font-bold select-none">//</span>
      <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>{children}</span>
      <div className="flex-1 border-t border-white/8" />
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

function MiniCard({ label, title, desc }: { label: string; title: string; desc: string }) {
  return (
    <div className="panel panel-glow p-5 md:p-6">
      <div className="text-b5 accent mb-2">// {label}</div>
      <div className="text-b2">{title}</div>
      <div className="text-b4 muted mt-2 leading-relaxed">{desc}</div>
    </div>
  )
}

export default function StartMenu() {
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
        icon: '/chop_logo.png',
        version: 'EA',
        status: 'Early Access',
      },
      {
        slug: 'on-fit',
        title: 'on-fit',
        subtitle: '거리 기반 좌표를 이용한 우리동네 운동 소모임 매칭 서비스',
        summary:
          '기획부터 Next.js 기반 화면 설계, Supabase 백엔드 구성, CI/CD·배포까지 서비스 전 과정을 처음으로 직접 경험한 프로젝트였습니다.',
        tags: ['Next.js', 'Tailwind', 'Supabase'],
        icon: '/onfit_logo.png',
        version: 'v0.85',
        status: 'Open Beta',
      },
      {
        slug: 'ttak',
        title: 'TTAK',
        subtitle: '공공데이터 기반 건강기능식품  가이드 제공 서비스',
        summary:
          '공공데이터 기반 탐색/상세 경험을 구현하며 PM·디자이너·백엔드와 함께 사용자 흐름을 설계했고, 프론트엔드 파트를 리딩하며 화면 구조와 기준을 잡았습니다.',
        tags: ['Next.js', 'Google Oauth', 'Event Log'],
        icon: '/ttak_logo.svg',
        version: 'v1.2',
        status: 'Official Release',
      },
    ],
    [],
  )

  const stackBadges = useMemo(
    () => [
      'React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind CSS',
      'Zustand', 'TanStack React Query', 'Storybook',
      'AWS EC2', 'GitHub Actions', 'GitHub', 'Jira', 'Confluence',
    ],
    [],
  )

  return (
    <div className="w-full space-y-6">

      {/* ── HERO ──────────────────────────────── */}
      <MountSection delay={0}>
        <section
          className="panel panel-glow p-6 md:p-10"
          style={{ borderLeft: '3px solid rgb(var(--accent))' }}
        >
          <SectionLabel>PLAYER PROFILE</SectionLabel>

          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            <div className="flex-1 min-w-0">
              {/* 이름 */}
              <h1 className="text-d2" style={{ lineHeight: 1.05 }}>조준형</h1>
              <div className="text-b2 muted mt-2">Frontend Developer</div>

              {/* 스탯 뱃지 */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span
                  className="px-2 py-1 text-b5 rounded-md border"
                  style={{
                    color: 'rgb(var(--accent))',
                    borderColor: 'rgba(var(--accent), 0.4)',
                    background: 'rgba(var(--accent), 0.08)',
                  }}
                >
                  CLASS: Frontend
                </span>
                <span className="panel px-2 py-1 text-b5 muted">BUILDS: 4 shipped</span>
               
              </div>

              {/* 소개 */}
              <p className="text-b3 muted mt-6 typo max-w-[62ch]">
                성장 과정은 하나의 서비스가 <span className="accent">출시</span>되고{' '}
                <span className="accent">개선</span>되며 안정화되는 흐름과 닮아 있다고 생각합니다.
                <br />
                협업 과정에서는 팀과 <span className="accent">문제를 함께 정의</span>하고,
                새로운 시도를 <span className="accent">코드로 검증</span>하는 과정을 중요하게 여깁니다.
                <br />
                이러한 경험과 고민을 <span className="accent">기록</span>으로 남기며 변화를 정리해 왔습니다.
              </p>

              {/* 단축키 */}
              <div className="text-b5 muted mt-5">
                Shortcut:{' '}
                <span className="accent">C</span> Projects ·{' '}
                <span className="accent">P</span> Patch Notes ·{' '}
                <span className="accent">H</span> Home
              </div>

              {/* 스택 */}
              <div className="mt-6">
                <div className="text-b5 muted mb-3">// EQUIPPED STACK</div>
                <div className="flex flex-wrap gap-2">
                  {stackBadges.map((s, i) =>
                    i === 0 ? <AccentChip key={s}>{s}</AccentChip> : <Chip key={s}>{s}</Chip>,
                  )}
                </div>
              </div>
            </div>

            {/* 아바타 */}
            <div className="shrink-0 w-[180px]">
              <div className="panel panel-glow p-3">
                <Image
                  src={avatar}
                  alt="avatar"
                  className="rounded-2xl w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </MountSection>

      {/* ── FEATURED RELEASES ─────────────────── */}
      <MountSection delay={1}>
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="accent text-b3 font-bold select-none">//</span>
            <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>FEATURED RELEASES</span>
            <div className="flex-1 border-t border-white/8" />
            <Link href="/contents" className="btn text-b5 shrink-0">전체 보기 →</Link>
          </div>
          <FeaturedProjects items={featured} />
        </section>
      </MountSection>

      {/* ── PLAYSTYLE ─────────────────────────── */}
      <MountSection delay={2}>
        <section>
          <SectionLabel>PLAYSTYLE</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MiniCard
              label="SPAWN POINT"
              title="CHOP! → minds-safe → on-fit → TTAK"
              desc="구현 중심에서 시작해, 구조·운영·협업까지 확장해 왔습니다."
            />
            <MiniCard
              label="OBJECTIVE"
              title="문제 정의 · 기준 합의 · 실행"
              desc="문제를 정리해 팀이 같은 기준으로 움직이도록 만들고, 실행까지 연결해 왔습니다."
            />
            <MiniCard
              label="SIGNATURE SKILL"
              title="소통 · 실행 · 기록"
              desc="대화를 통해 문제를 풀고, 새로운 시도를 코드로 검증하며 기록합니다."
            />
          </div>
        </section>
      </MountSection>

      {/* ── DEV LOG (패치노트 미리보기) ────────── */}
      <MountSection delay={3}>
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="accent text-b3 font-bold select-none">//</span>
            <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>DEV LOG</span>
            <div className="flex-1 border-t border-white/8" />
            <Link href="/patch-notes" className="btn text-b5 shrink-0">전체 보기 →</Link>
          </div>
          <RecentPatchNotes
            items={[
              {
                slug: 'v2-1-0-typography-system',
                title: 'Typography System Update',
                date: '2025-12',
                subtitle:
                  'Tailwind v4 기반 타이포그래피 토큰/유틸 구조를 설계하고 사용 규칙을 문서화했습니다.',
                href: 'https://velog.io/@jojh0323/%EA%B8%B0%ED%9A%8D%EC%95%88-%ED%83%80%EC%9D%B4%ED%8F%AC-%EC%8A%A4%ED%8E%99%EC%9D%84-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%BD%94%EB%93%9C%EB%A1%9C-%EC%98%AE%EA%B8%B0%EA%B8%B0-Tailwind-v4-globals.css',
              },
              {
                slug: 'v2-0-3-oauth-hotfix',
                title: 'OAUTH Login Hotfix',
                date: '2026-01',
                subtitle: '도메인/쿠키/CORS 이슈를 추적하며 OAUTH 로그인 흐름을 안정화했습니다.',
                href: 'https://velog.io/@jojh0323/OAUTH-%EC%82%BD%EC%A7%88%EA%B8%B0-1-%EC%99%84%EC%A0%84%ED%9E%88-%EB%8B%A4%EB%A5%B8-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%97%90%EC%84%9C-%EC%8B%9C%EC%9E%91%ED%95%9C-%EC%8B%A4%ED%8C%A8',
              },
            ]}
          />
        </section>
      </MountSection>

      {/* ── GAME GUIDE + SERVER LOG ───────────── */}
      <MountSection delay={4}>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="panel panel-glow p-5 md:p-6">
            <div className="text-b5 accent mb-1">// GAME GUIDE</div>
            <div className="text-b5 muted mb-4">이 포트폴리오를 읽는 방법</div>
            <div className="space-y-3 text-b4">
              <div className="flex gap-3">
                <span className="accent shrink-0">▦</span>
                <div>
                  <span className="accent">Projects</span>
                  <span className="muted"> — 프로젝트별 역할·성과·기술 스택</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="accent shrink-0">⟳</span>
                <div>
                  <span className="accent">Patch Notes</span>
                  <span className="muted"> — 문제 해결·개선 기록, Velog로 연결</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-glow p-5 md:p-6">
            <div className="text-b5 accent mb-1">// SERVER LOG</div>
            <div className="text-b5 muted mb-4">참여 이력</div>
            <div className="space-y-2 text-b4 muted leading-relaxed">
              <div className="flex gap-2">
                <span className="accent shrink-0">·</span>
                <span>부경대학교 컴퓨터공학과 졸업</span>
              </div>
              <div className="flex gap-2">
                <span className="accent shrink-0">·</span>
                <span>권오흠 교수님 알고리즘 연구실 학부 연구생</span>
              </div>
              <div className="flex gap-2">
                <span className="accent shrink-0">·</span>
                <span>구름 deepdive 부트캠프 수료</span>
              </div>
            </div>
          </div>
        </section>
      </MountSection>

      <MountSection delay={4}>
        <div className="text-b5 muted">© {new Date().getFullYear()} · Portfolio</div>
      </MountSection>

    </div>
  )
}
