// src/components/ProjectSelectGrid.tsx
'use client'

import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import type { ProjectLite } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
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

  // RECOMMENDED / ALL 섹션 각자 독립 selected
  const [recSelected, setRecSelected] = useState<number | null>(null)
  const [allSelected, setAllSelected] = useState<number | null>(null)

  const recRefMap = useRef<Record<string, HTMLAnchorElement | null>>({})
  const allRefMap = useRef<Record<string, HTMLAnchorElement | null>>({})
  const didMountRef = useRef(false)

  useEffect(() => {
    setRecSelected(null)
    setAllSelected(null)
  }, [sorted.length])

  useEffect(() => {
    if (!didMountRef.current) { didMountRef.current = true; return }
    if (allSelected === null) return
    const item = sorted[allSelected]
    if (!item) return
    const el = allRefMap.current[item.slug]
    if (!el) return
    el.focus({ preventScroll: true })
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [allSelected, sorted])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return
      const cols = window.matchMedia('(min-width: 768px)').matches ? 2 : 1
      const total = sorted.length
      const clamp = (n: number) => Math.max(0, Math.min(total - 1, n))
      const cur = allSelected ?? 0
      if (e.key === 'ArrowDown') { e.preventDefault(); setRecSelected(null); setAllSelected(clamp(cur + cols)); return }
      if (e.key === 'ArrowUp') { e.preventDefault(); setRecSelected(null); setAllSelected(clamp(cur - cols)); return }
      if (e.key === 'ArrowRight') { e.preventDefault(); setRecSelected(null); setAllSelected(clamp(cur + 1)); return }
      if (e.key === 'ArrowLeft') { e.preventDefault(); setRecSelected(null); setAllSelected(clamp(cur - 1)); return }
      if (e.key === 'Enter') {
        e.preventDefault()
        const item = allSelected !== null ? sorted[allSelected] : null
        if (item?.slug) router.push(`/contents/${item.slug}`)
        return
      }
      if (e.key === 'Escape') { e.preventDefault(); router.back() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router, allSelected, sorted])

  return (
    <div className="space-y-8">
      {/* RECOMMENDED */}
      {recommended.length ? (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-b5 font-bold select-none" style={{ color: 'rgb(var(--accent))' }}>//</span>
            <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>RECOMMENDED</span>
            <div className="flex-1 border-t border-white/8" />
            <span className="text-b5 muted">{recommended.length} picks</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {recommended.map((p, recIdx) => (
              <ProjectCard
                key={p.slug}
                p={p}
                selected={recSelected === recIdx}
                onHover={() => { setRecSelected(recIdx); setAllSelected(null) }}
                ref={(el) => { recRefMap.current[p.slug] = el }}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* ALL PROJECTS */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-b5 font-bold select-none" style={{ color: 'rgb(var(--accent))' }}>//</span>
          <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>ALL PROJECTS</span>
          <div className="flex-1 border-t border-white/8" />
          <span className="text-b5 muted">{sorted.length} titles</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {sorted.map((p, idx) => (
            <ProjectCard
              key={p.slug}
              p={p}
              selected={allSelected === idx}
              onHover={() => { setAllSelected(idx); setRecSelected(null) }}
              ref={(el) => { allRefMap.current[p.slug] = el }}
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
  const status = safeText(p.status)
  const version = safeText(p.version)
  const icon = safeText(p.cover) || safeText(p.logo)

  return (
    <Link
      href={`/contents/${p.slug}`}
      ref={ref}
      onMouseEnter={onHover}
      className={[
        'panel panel-glow flex flex-col overflow-hidden focus:outline-none',
        selected
          ? '-translate-y-1 ring-2 ring-[rgba(var(--accent),0.5)] shadow-[0_0_32px_rgba(var(--accent),0.12)]'
          : 'hover:-translate-y-1',
        'transition-all duration-150',
      ].join(' ')}
    >
      {/* 배너 영역 — 아이콘 중앙 */}
      <div
        className="relative flex items-center justify-center shrink-0 overflow-hidden"
        style={{
          height: '9rem',
          background: 'rgba(255,255,255,0.025)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* 선택 시 배너 글로우 */}
        {selected ? (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(var(--accent),0.08) 0%, transparent 70%)' }}
          />
        ) : null}

        {/* 상단-좌: RECOMMENDED + 상태 칩 */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {p.featured ? <AccentChip>RECOMMENDED</AccentChip> : null}
          {status ? <Chip>{status}</Chip> : null}
        </div>

        {/* 상단-우: LIVE 칩 */}
        <div className="absolute top-3 right-3">
          {p.links?.live ? <AccentChip>LIVE</AccentChip> : <Chip>LOCAL</Chip>}
        </div>

        {/* 중앙: 아이콘 또는 타이틀 폴백 */}
        {icon ? (
          <img
            src={icon}
            alt={`${p.title} icon`}
            className="pt-4 h-24 w-24 object-contain opacity-85"
          />
        ) : (
          <span className="text-h3 font-bold select-none" style={{ opacity: 0.08 }}>{p.title}</span>
        )}
      </div>

      {/* 하단 정보 영역 */}
      <div className="flex flex-1 gap-4 p-5 md:p-6">
        {/* 왼쪽: 텍스트 */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* 버전 뱃지 */}
          {version ? (
            <div className="mb-2">
              <span
                className="px-2 py-0.5 text-b5 rounded border font-medium"
                style={{
                  color: 'rgb(var(--accent))',
                  borderColor: 'rgba(var(--accent), 0.45)',
                  background: 'rgba(var(--accent), 0.10)',
                }}
              >
                {version}
              </span>
            </div>
          ) : null}

          {/* 제목 */}
          <div className="text-h4">{p.title}</div>
          {p.subtitle ? <p className="text-b4 muted mt-1 line-clamp-2">{p.subtitle}</p> : null}

          {/* 역할 */}
          {role ? (
            <div className="mt-3 text-b5 muted">
              <span style={{ color: 'rgb(var(--accent))' }}>// </span>{role}
            </div>
          ) : null}

          {/* 키워드 */}
          {keywords.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {keywords.map((k) => <Chip key={k}>#{k}</Chip>)}
            </div>
          ) : null}
        </div>

        {/* 오른쪽: OPEN 버튼 */}
        <div className="flex flex-col items-end justify-end shrink-0">
          <span
            className="panel px-3 py-1.5 text-b5 transition-opacity duration-150"
            style={{ opacity: selected ? 1 : 0.5, color: selected ? 'rgb(var(--accent))' : undefined }}
          >
            {selected ? '↵ OPEN' : 'OPEN →'}
          </span>
        </div>
      </div>
    </Link>
  )
})
