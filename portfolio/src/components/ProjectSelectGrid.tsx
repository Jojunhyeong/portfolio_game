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

  const recommended = useMemo(() => sorted.filter((p) => p.featured).slice(0, 2), [sorted])

  // ✅ 선택은 "전체 기준" 딱 하나만
  const [selected, setSelected] = useState(0)

  // ✅ ref는 섹션별로 따로 두되, 스크롤 타겟은 우선 ALL에서 찾습니다(중복 렌더라도 안정적)
  const recRefMap = useRef<Record<string, HTMLAnchorElement | null>>({})
  const allRefMap = useRef<Record<string, HTMLAnchorElement | null>>({})

  // ✅ 첫 진입 스크롤 방지 + 키보드 이동 때만 스크롤
  const didMountRef = useRef(false)
  const lastInputRef = useRef<'init' | 'keyboard' | 'hover' | 'reset'>('init')

  // 리스트 길이 바뀌면 첫 카드 선택(스크롤은 하지 않음)
  useEffect(() => {
    lastInputRef.current = 'reset'
    setSelected(0)
  }, [sorted.length])

  // ✅ 선택이 바뀌면: "키보드일 때만" focus + scroll
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    if (lastInputRef.current !== 'keyboard') return

    const item = sorted[selected]
    if (!item) return

    // ✅ 스크롤/포커스는 ALL 쪽 element가 있으면 그걸 우선
    const el = allRefMap.current[item.slug] ?? recRefMap.current[item.slug]
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
        lastInputRef.current = 'keyboard'
        setSelected((i) => clamp(i + cols))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        lastInputRef.current = 'keyboard'
        setSelected((i) => clamp(i - cols))
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        lastInputRef.current = 'keyboard'
        setSelected((i) => clamp(i + 1))
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        lastInputRef.current = 'keyboard'
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
      {/* RECOMMENDED (선택은 전체 기준 하나, 여기서는 표시만) */}
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
            {recommended.map((p) => {
              const idx = sorted.findIndex((x) => x.slug === p.slug)
              const isSelected = idx >= 0 && selected === idx

              return (
                <ProjectCard
                  key={p.slug}
                  p={p}
                  selected={isSelected}
                  onHover={() => {
                    if (idx < 0) return
                    lastInputRef.current = 'hover'
                    setSelected(idx)
                  }}
                  ref={(el) => {
                    recRefMap.current[p.slug] = el
                  }}
                />
              )
            })}
          </div>
        </section>
      ) : null}

      {/* ALL (추천 포함 전체) */}
      <section className="panel p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-b5 muted">ALL PROJECTS</div>
            <div className="text-h3 mt-2">전체 프로젝트</div>
            <p className="text-b3 muted mt-2 typo">
              카드에서는 프로젝트의 성격을 한눈에 볼 수 있고, 상세 페이지에서는 역할, 문제 정의, 해결 과정을 확인하실 수 있습니다.
            </p>
          </div>
          <div className="text-b5 muted">{sorted.length} titles</div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sorted.map((p, idx) => (
            <ProjectCard
              key={p.slug}
              p={p}
              selected={selected === idx}
              onHover={() => {
                lastInputRef.current = 'hover'
                setSelected(idx)
              }}
              ref={(el) => {
                allRefMap.current[p.slug] = el
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
      {/* MEDIA */}
      <div className="relative z-10 mb-5">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/10">
          {mediaSrc ? (
            <>
              <div className="absolute inset-0 bg-black/25" />

              {/* 중앙 로고 */}
              <div className="absolute inset-0 flex items-center justify-center pt-6">
                <img
                  src={mediaSrc}
                  alt={`${p.title} cover`}
                  draggable={false}
                  className="max-h-24 max-w-40 object-contain"
                />
              </div>

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
