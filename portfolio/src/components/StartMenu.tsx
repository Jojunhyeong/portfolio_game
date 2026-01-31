// src/components/StartMenu.tsx
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import avatar from '@/../public/avatar.jpg'
import { clearLastSeen, readLastSeen, LAST_SEEN_KEY, type LastSeen } from '@/lib/lastSeen'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel panel-glow px-2 py-1 text-b5 muted">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel panel-glow px-2 py-1 text-b5 accent">{children}</span>
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
      <div className="text-b4 muted mt-2 typo">{desc}</div>
    </div>
  )
}

export default function StartMenu() {
  const router = useRouter()
  const pathname = usePathname()

  const [last, setLast] = useState<LastSeen | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setLast(readLastSeen())
  }, [pathname])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== LAST_SEEN_KEY) return
      setLast(readLastSeen())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  

  const goProjects = () => router.push('/contents')
  const goPatch = () => router.push('/patch-notes')

  const onReset = () => {
    clearLastSeen()
    setLast(null)
  }

  const STACK = useMemo(
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

  const ACCENT_STACK = useMemo(() => new Set(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']), [])

  return (
    <section className="panel panel-glow p-6 md:p-10 overflow-hidden">
      {/* TOP */}
      <div className="mount-reveal d-0">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="text-b5 muted">PORTFOLIO</div>
            <h1 className="text-d2 mt-2">
              조준형 <span className="text-b2 muted ml-2">Frontend Developer</span>
            </h1>

            <p className="text-b3 muted mt-4 typo max-w-[68ch]">
              성장 과정은 하나의 서비스가 <span className="accent">출시</span>되고{' '}
              <span className="accent">개선</span>되며 안정화되는 흐름과 닮아 있다고 생각합니다.
              <br />
              협업 과정에서는 팀과 <span className="accent">문제를 함께 정의</span>하고, 새로운 시도를{' '}
              <span className="accent">코드로 검증</span>하는 과정을 중요하게 여기고 있습니다.
              <br />
              이러한 경험과 고민을 <span className="accent">기록</span>으로 남기며 스스로의 변화를 정리해 왔습니다.
            </p>

            <div className="mt-4 text-b5 muted">
              Shortcut: <span className="accent">C</span> Projects · <span className="accent">P</span> Patch Notes ·{' '}
              <span className="accent">H</span> Home · <span className="accent">ESC</span> Back
            </div>
          </div>

          {/* avatar */}
          <div className="flex items-start gap-4 md:justify-end">
            <div className="relative h-40 w-40 shrink-0">
              <div
                className="absolute inset-0 rounded-full opacity-90"
                style={{
                  background: 'linear-gradient(180deg, rgba(var(--accent), .85), rgba(var(--accent-2), .65))',
                }}
              />
              <div className="absolute inset-[2px] rounded-full bg-[rgba(var(--panel),0.85)]" />

              <Image
                src={avatar}
                alt="조준형 프로필"
                width={200}
                height={200}
                priority
                className="
                  relative z-10 h-full w-full
                  rounded-xl object-cover
                  saturate-125 contrast-110
                  ring-[3px] ring-[rgba(var(--accent),1)]
                  shadow-[0_0_8px_rgba(var(--accent),1)]
                  drop-shadow-[0_0_16px_rgba(var(--accent),0.95)]
                  drop-shadow-[0_0_32px_rgba(var(--accent),0.75)]
                  drop-shadow-[0_0_56px_rgba(var(--accent-2),0.45)]
                  drop-shadow-[0_0_88px_rgba(var(--accent-2),0.25)]
                  select-none pointer-events-none
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* STACK PREVIEW */}
      <div className="mount-reveal d-1">
        <div className="mt-6 panel panel-glow p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-b5 muted">STACK PREVIEW</div>
              <div className="text-b3 mt-2 muted typo">프로젝트 전반에서 반복적으로 사용한 기술/협업 도구입니다.</div>
            </div>
            <div className="text-b5 muted">{STACK.length} badges</div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {STACK.map((name) =>
              ACCENT_STACK.has(name) ? <AccentChip key={name}>{name}</AccentChip> : <Chip key={name}>{name}</Chip>,
            )}
          </div>
        </div>
      </div>

      {/* RUN / FOCUS / SIGNATURE */}
      <div className="mount-reveal d-2">
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <MiniCard label="RUN" title="CHOP! → minds-safe → on-fit → TTAK" desc="구현 중심에서 시작해, 구조·운영·협업까지 확장해 왔습니다." />
          <MiniCard label="FOCUS" title="문제 정의 · 기준 합의 · 실행" desc="문제를 정리해 팀이 같은 기준으로 움직이도록 만들고, 실행까지 연결해 왔습니다." />
          <MiniCard label="SIGNATURE" title="소통 · 실행 · 기록" desc="대화를 통해 문제를 풀고, 새로운 시도를 코드로 검증하며 기록합니다." />
        </div>
      </div>

      {/* MAIN CTA */}
      <div className="mount-reveal d-3">
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <button type="button" onClick={goProjects} className="btn text-b3 justify-center">
            ▶ Contents
          </button>
          <button type="button" onClick={goPatch} className="btn text-b3 justify-center">
            ✦ Patch Notes
          </button>
        </div>
      </div>

      {/* GUIDE + CAREER */}
      <div className="mount-reveal d-4">
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="panel panel-glow p-6">
            <div className="text-b5 muted">HOW TO READ</div>
            <ul className="mt-3 space-y-2 text-b3 muted">
              <li>
                <span className="accent">Projects</span>: 대표 프로젝트 / 역할 / 성과를 결과물 중심으로 정리했습니다.
              </li>
              <li>
                <span className="accent">Patch Notes</span>: 개선/문제 해결 과정을 시간순으로 정리했습니다.
              </li>
              <li>
                추천 동선: <span className="accent">Projects → TTAK → Patch Notes</span>
              </li>
            </ul>
          </div>

          <div className="panel panel-glow p-6">
            <div className="text-b5 muted">CAREER</div>
            <ul className="mt-3 space-y-2 text-b3 muted typo">
              <li>• 부경대학교 컴퓨터공학과 졸업</li>
              <li>• 권오흠 교수님 알고리즘 연구실 학부 연구생</li>
              <li>• 구름 Deep Dive 프론트엔드 부트캠프 수료</li>
            </ul>

            {/* 필요하면 남겨두기 */}
            {/* <button type="button" onClick={onReset} className="btn text-b5 mt-4">Reset →</button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
