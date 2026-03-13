// src/components/StartMenu.tsx
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import avatar from '@/../public/avatar.jpg'
import { readLastSeen } from '@/lib/lastSeen'

import FeaturedProjects from '@/components/FeaturedProjects'
import RecentPatchNotes from '@/components/RecentPatchNotes'
import MountSection from '@/components/MountSection'
import SystemBoot from '@/components/SystemBoot'

const SKILLS = [
  { name: 'React', pct: 90, main: true },
  { name: 'TypeScript', pct: 82, main: true },
  { name: 'Next.js', pct: 80, main: true },
  { name: 'Tailwind CSS', pct: 78, main: false },
  { name: 'Supabase', pct: 62, main: false },
]

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
        slug: 'ttak',
        title: 'TTAK',
        subtitle: '공공데이터 기반 건강기능식품 가이드 제공 서비스',
        summary:
          '공공데이터 기반 탐색/상세 경험을 구현하며 PM·디자이너·백엔드와 함께 사용자 흐름을 설계했고, 프론트엔드 파트를 리딩하며 화면 구조와 기준을 잡았습니다.',
        tags: ['Next.js', 'Google Oauth', 'Event Log'],
        icon: '/ttak_logo.svg',
        version: 'v1.2',
        status: 'Official Release',
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
    ],
    [],
  )

  const stackBadges = useMemo(
    () => [
      'React', 'TypeScript', 'JavaScript', 'Next.js', ,
      'Zustand', 'TanStack React Query', 'Storybook',
      'AWS EC2', 'GitHub Actions', 'GitHub', 'Jira', 'Confluence',
    ],
    [],
  )

  const [showAvatar, setShowAvatar] = useState(false)

  return (
    <div className="w-full space-y-6">

      {/* ── HERO ──────────────────────────────── */}
      <MountSection delay={0}>
        <section
          className="panel panel-glow p-0 overflow-hidden"
          style={{ borderLeft: '3px solid rgb(var(--accent))', borderTop: '1px solid rgba(var(--accent-2), 0.22)' }}
        >
          {/* HUD 코너 브래킷 */}
          <span className="absolute top-4 left-4 w-5 h-5 pointer-events-none" style={{ borderTop: '2px solid rgba(var(--accent-2),0.7)', borderLeft: '2px solid rgba(var(--accent-2),0.7)', zIndex: 10 }} />
          <span className="absolute top-4 right-4 w-5 h-5 pointer-events-none" style={{ borderTop: '2px solid rgba(var(--accent-2),0.5)', borderRight: '2px solid rgba(var(--accent-2),0.5)', zIndex: 10 }} />
          <span className="absolute bottom-4 left-4 w-5 h-5 pointer-events-none" style={{ borderBottom: '2px solid rgba(var(--accent-2),0.4)', borderLeft: '2px solid rgba(var(--accent-2),0.4)', zIndex: 10 }} />
          <span className="absolute bottom-4 right-4 w-5 h-5 pointer-events-none" style={{ borderBottom: '2px solid rgba(var(--accent-2),0.4)', borderRight: '2px solid rgba(var(--accent-2),0.4)', zIndex: 10 }} />

          <div className="flex">

            {/* ── 왼쪽 탭 (클릭해서 아바타 토글) ────── */}
            <button
              onClick={() => setShowAvatar(v => !v)}
              className="hidden lg:flex shrink-0 flex-col items-center justify-center gap-2 relative"
              style={{
                width: '28px',
                background: showAvatar
                  ? 'linear-gradient(to bottom, rgba(var(--accent),0.18), rgba(var(--accent),0.08))'
                  : 'linear-gradient(to bottom, rgba(var(--accent),0.10), rgba(var(--accent),0.04))',
                borderRight: `2px solid rgba(var(--accent),0.5)`,
                cursor: 'pointer',
                borderTop: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
                outline: 'none',
                transition: 'background 0.3s',
              }}
            >
              <span
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  writingMode: 'vertical-rl',
                  letterSpacing: '0.15em',
                  userSelect: 'none',
                }}
              >
                CHAR
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '12px',
                  display: 'inline-block',
                  transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                  transform: showAvatar ? 'rotate(180deg)' : 'rotate(0deg)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                ▶
              </span>
            </button>

            {/* ── 아바타 (슬라이드인) ────── */}
            <div
              className="hidden lg:flex items-center relative shrink-0 overflow-hidden"
              style={{
                width: showAvatar ? '260px' : '0px',
                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div style={{
                width: '260px', aspectRatio: '1/1', position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 0 0 2px rgba(0,229,255,0.4), 0 0 30px rgba(0,229,255,0.35), 0 0 80px rgba(0,229,255,0.15)',
              }}>
                <Image
                  src={avatar}
                  alt="avatar"
                  fill
                  className="object-cover object-center"
                  style={{ filter: 'brightness(1.05) contrast(1.08) saturate(1.1)' }}
                  priority
                />
                {/* 바닥 발광 */}
                <div className="absolute bottom-0 inset-x-0 h-16" style={{
                  background: 'linear-gradient(to top, rgba(0,229,255,0.22), transparent)',
                  pointerEvents: 'none',
                }} />
                {/* 상단 비네트 */}
                <div className="absolute top-0 inset-x-0 h-12" style={{
                  background: 'linear-gradient(to bottom, rgba(4,5,12,0.5), transparent)',
                  pointerEvents: 'none',
                }} />
                {/* 시안 글로우 오버레이 */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(0,229,255,0.08) 0%, transparent 60%)',
                }} />
              </div>
            </div>

            {/* ── 프로필 ─────────────────── */}
            <div className="flex-1 min-w-0 p-6 md:p-8">
              <SectionLabel>PLAYER PROFILE</SectionLabel>

              <h1 className="text-d3 text-glow" style={{ lineHeight: 1.05 }}>
                조준형<span className="blink font-normal" style={{ color: 'rgb(var(--accent))', fontSize: '0.7em', marginLeft: '0.1em' }}>_</span>
              </h1>
              <div className="text-b2 muted mt-2" style={{ letterSpacing: '0.06em' }}>Frontend Developer</div>

              {/* 스탯 뱃지 */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span
                  className="px-2 py-1 text-b5 rounded-md border"
                  style={{ color: 'rgb(var(--accent))', borderColor: 'rgba(var(--accent),0.4)', background: 'rgba(var(--accent),0.08)' }}
                >
                  CLASS: Frontend
                </span>
                <span className="panel px-2 py-1 text-b5 muted">LVL: 27</span>
                <span className="panel px-2 py-1 text-b5 muted">LOC: Busan, KR</span>
                <span className="panel px-2 py-1 text-b5 muted">BUILDS: 4 shipped</span>
              </div>

              {/* 소개 */}
              <p className="text-b3 muted mt-5 typo">
                성장 과정은 하나의 서비스가 <span className="accent">출시</span>되고{' '}
                <span className="accent">개선</span>되며 안정화되는 흐름과 닮아 있다고 생각합니다.
                <br />
                협업 과정에서는 팀과 <span className="accent">문제를 함께 정의</span>하고,
                새로운 시도를 <span className="accent">코드로 검증</span>하는 과정을 중요하게 여깁니다.
                <br/>이러한 경험과 고민을 <span className="accent">기록</span>으로 남기며 변화를 정리해 왔습니다.
              </p>

              {/* 서브 스택 칩 */}
              <div className="mt-4">
                <div className="text-b5 muted mb-2">// ALSO EQUIPPED</div>
                <div className="flex flex-wrap gap-2">
                  {stackBadges.slice(4).map((s) => <Chip key={s}>{s}</Chip>)}
                </div>
              </div>
            </div>

            {/* ── 스킬 트리 (슬라이드아웃) ────── */}
            <div
              className="shrink-0 overflow-hidden"
              style={{
                width: showAvatar ? '0px' : '200px',
                transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ width: '200px', padding: '24px 32px' }}>
                <div className="text-b5 muted mb-3">// SKILL TREE</div>
                <div className="space-y-2.5">
                  {SKILLS.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-b5 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span>{s.name}</span>
                          {s.main && (
                            <span style={{ color: 'rgb(var(--accent))', fontSize: '10px', border: '1px solid rgba(var(--accent),0.35)', padding: '0 3px', borderRadius: 3, lineHeight: '1.5' }}>
                              MAIN
                            </span>
                          )}
                        </span>
                        <span className="muted">{s.pct}%</span>
                      </div>
                      <div className="relative rounded-sm overflow-hidden" style={{ height: '5px', background: 'rgba(255,255,255,0.07)' }}>
                        <div
                          className="absolute inset-y-0 left-0"
                          style={{ width: `${s.pct}%`, background: 'linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent-2)))', boxShadow: '0 0 10px rgba(var(--accent-2),0.5)', borderRadius: 2 }}
                        />
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="absolute inset-y-0" style={{ left: `${(i + 1) * 10}%`, width: '1px', background: 'rgba(0,0,0,0.5)' }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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
            <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>FEATURED PROJECTS</span>
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
            <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>PATCH NOTES</span>
            <div className="flex-1 border-t border-white/8" />
            <Link href="/patch-notes" className="btn text-b5 shrink-0">전체 보기 →</Link>
          </div>
          <RecentPatchNotes
            items={[
              {
                slug: 'v2-1-0-typography-system',
                title: 'Typography System Update',
                date: '2026-01-28',
                subtitle:
                  'Tailwind v4 기반 타이포그래피 토큰/유틸 구조를 설계하고 사용 규칙을 문서화했습니다.',
                href: 'https://velog.io/@jojh0323/%EA%B8%B0%ED%9A%8D%EC%95%88-%ED%83%80%EC%9D%B4%ED%8F%AC-%EC%8A%A4%ED%8E%99%EC%9D%84-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%BD%94%EB%93%9C%EB%A1%9C-%EC%98%AE%EA%B8%B0%EA%B8%B0-Tailwind-v4-globals.css',
              },
              {
                slug: 'v2-0-3-oauth-hotfix',
                title: 'OAUTH Login Hotfix',
                date: '2026-01-25',
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
