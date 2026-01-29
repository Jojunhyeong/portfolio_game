// src/components/ProjectSelectGrid.tsx
'use client'

import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import type { ProjectLite } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent">{children}</span>
}
function safeText(v?: string | null) {
  return (v ?? '').trim()
}

export default function ProjectSelectGrid({ projects }: { projects: ProjectLite[] }) {
  const router = useRouter()

  // ✅ UI에서도 안전하게 정렬 (featured -> order -> title)
  const sorted = useMemo(() => {
    return [...projects].sort((a, b) => {
      const af = a.featured ? 0 : 1
      const bf = b.featured ? 0 : 1
      if (af !== bf) return af - bf

      const ao = a.order ?? 999
      const bo = b.order ?? 999
      if (ao !== bo) return ao - bo

      return (a.title ?? '').localeCompare(b.title ?? '')
    })
  }, [projects])

  // ✅ 추천은 “상단에 먼저 보여주는 큐레이션 섹션”
  const recommended = useMemo(() => sorted.filter((p) => p.featured).slice(0, 2), [sorted])

  // ✅ ALL은 진짜 전체 (추천 포함)
  const all = sorted

  const [selected, setSelected] = useState(0)

  // ✅ slug -> element 로 안정적으로 ref 관리
  const refMap = useRef<Record<string, HTMLAnchorElement | null>>({})

  useEffect(() => {
    setSelected(0)
  }, [sorted.length])

  /**
   * ✅ 핵심: StartMenu에서 넘어왔을 때 커서 위치가 유지되어,
   * 카드가 "커서 아래에 렌더"되면 onMouseEnter가 즉시 발생 → selected 변경 → scrollIntoView 발생.
   * 그래서 "사용자가 실제로 마우스를 움직인 후"에만 hover로 selected를 바꾸도록 가드합니다.
   */
  const hoverEnabledRef = useRef(false)
  useEffect(() => {
    const onMove = () => {
      hoverEnabledRef.current = true
      window.removeEventListener('pointermove', onMove)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // ✅ 첫 렌더에서 scrollIntoView는 막고, 그 이후부터만 동작
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    const item = sorted[selected]
    if (!item) return
    const el = refMap.current[item.slug]
    if (!el) return

    el.focus({ preventScroll: true })
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selected, sorted])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return

      const cols = window.matchMedia('(min-width: 768px)').matches ? 2 : 1
      const total = sorted.length
      const clamp = (n: number) => Math.max(0, Math.min(total - 1, n))

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((i) => clamp(i + cols))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((i) => clamp(i - cols))
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelected((i) => clamp(i + 1))
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelected((i) => clamp(i - 1))
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const item = sorted[selected]
        if (item?.slug) router.push(`/contents/${item.slug}`)
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        router.back()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router, selected, sorted])

  return (
    <div className="space-y-6">
      {/* RECOMMENDED */}
      {recommended.length ? (
        <section className="panel p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-b5 muted">RECOMMENDED</div>
              <div className="text-h3 mt-2">먼저 보고 싶었던 프로젝트</div>
              <p className="text-b3 muted mt-2 typo">
                새로운 시도와 시행착오, 그리고 기준이 가장 많이 쌓인 작업을 먼저 정리했습니다.{' '}
                <span className="accent">TTAK</span>은 그 흐름이 가장 잘 드러나는 프로젝트입니다.
              </p>
            </div>
            <div className="text-b5 muted">↑↓←→ 이동 · Enter 오픈 · ESC 뒤로</div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {recommended.map((p) => (
              <ProjectCard
                key={p.slug}
                p={p}
                selected={sorted[selected]?.slug === p.slug}
                onHover={() => {
                  // ✅ 첫 진입 시 커서가 카드 위에 있으면 mouseenter가 즉시 발생하는 문제 방지
                  if (!hoverEnabledRef.current) return
                  const idx = sorted.findIndex((x) => x.slug === p.slug)
                  if (idx >= 0) setSelected(idx)
                }}
                ref={(el) => {
                  refMap.current[p.slug] = el
                }}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* ALL PROJECTS */}
      <section className="panel p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-b5 muted">ALL PROJECTS</div>
            <div className="text-h3 mt-2">전체 프로젝트</div>
            <p className="text-b3 muted mt-2 typo">
              카드에서는 프로젝트의 성격을 한눈에 볼 수 있고, 상세 페이지에서는 역할, 문제 정의, 해결 과정을 확인할 수 있습니다.
            </p>
          </div>
          <div className="text-b5 muted">{sorted.length} titles</div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {all.map((p) => (
            <ProjectCard
              key={p.slug}
              p={p}
              selected={sorted[selected]?.slug === p.slug}
              onHover={() => {
                // ✅ 첫 진입 시 커서가 카드 위에 있으면 mouseenter가 즉시 발생하는 문제 방지
                if (!hoverEnabledRef.current) return
                const idx = sorted.findIndex((x) => x.slug === p.slug)
                if (idx >= 0) setSelected(idx)
              }}
              ref={(el) => {
                refMap.current[p.slug] = el
              }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

const ProjectCard = forwardRef<
  HTMLAnchorElement,
  { p: ProjectLite; selected: boolean; onHover: () => void }
>(function ProjectCard({ p, selected, onHover }, ref) {
  const role = safeText(p.team?.role)
  const keywords = (p.keywords ?? []).slice(0, 4)

  const topBadges = [
    ...(p.featured ? ['RECOMMENDED'] : []),
    ...(p.version ? [p.version] : []),
    ...(role ? [role] : []),
  ].slice(0, 3)

  const mediaSrc = safeText((p as any).cover) || safeText((p as any).logo)

  return (
    <Link
      href={`/contents/${p.slug}`}
      ref={ref}
      onMouseEnter={onHover}
      className={[
        'block',
        'panel panel-glow sweep',
        'p-6 md:p-7',
        selected ? 'selected-slot pulse -translate-y-1' : 'hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-[rgba(var(--accent),0.6)]',
        'relative overflow-hidden',
      ].join(' ')}
    >
      {/* ✅ MEDIA */}
      <div className="relative z-10 mb-5">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/10">
          {mediaSrc ? (
            <>
              {/* 배경 톤 */}
              <div className="absolute inset-0 bg-black/25" />

              {/* ✅ 중앙 정렬 */}
              <div className="absolute inset-0 flex items-center justify-center pt-6">
                <img
                  src={mediaSrc}
                  alt={`${p.title} cover`}
                  draggable={false}
                  className="max-h-24 max-w-40 object-contain"
                />
              </div>

              {/* HUD 하이라이트 */}
              <div
                className="absolute -inset-12 opacity-70"
                style={{
                  background:
                    'radial-gradient(520px 200px at 20% 0%, rgba(var(--accent), .20), transparent 60%), radial-gradient(520px 200px at 80% 0%, rgba(var(--accent-2), .16), transparent 60%)',
                }}
              />
            </>
          ) : (
            <>
              {/* fallback */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(620px 220px at 25% 10%, rgba(var(--accent), .22), transparent 60%), radial-gradient(560px 240px at 85% 0%, rgba(var(--accent-2), .18), transparent 58%), linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.01))',
                }}
              />
              <div className="absolute inset-0 bg-[rgba(var(--panel),0.35)]" />
            </>
          )}

          <div className="absolute left-3 top-3 flex gap-2">
            {p.featured ? <span className="panel px-2 py-1 text-b5 accent">RECOMMENDED</span> : null}
            {(p as any).status ? <span className="panel px-2 py-1 text-b5 muted">{(p as any).status}</span> : null}
          </div>
        </div>
      </div>

      {/* TEXT */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-b5 muted">PROJECT</div>
          <div className="text-h3 mt-2 truncate">{p.title}</div>
          {p.subtitle ? <p className="text-b3 muted mt-2 line-clamp-2">{p.subtitle}</p> : null}
        </div>

        <div className="shrink-0 flex flex-col items-end gap-2">
          {p.links?.live ? <AccentChip>LIVE</AccentChip> : <Chip>LOCAL</Chip>}
          <Chip>{selected ? 'SELECTED' : 'OPEN →'}</Chip>
        </div>
      </div>

      {topBadges.length ? (
        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {topBadges.map((b) =>
            b === 'RECOMMENDED' ? <AccentChip key={b}>{b}</AccentChip> : <Chip key={b}>{b}</Chip>,
          )}
        </div>
      ) : null}

      {keywords.length ? (
        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {keywords.map((k) => (
            <Chip key={k}>#{k}</Chip>
          ))}
        </div>
      ) : null}
    </Link>
  )
})
