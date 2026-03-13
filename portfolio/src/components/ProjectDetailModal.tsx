// src/components/ProjectDetailModal.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import type { ProjectFrontMatter } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}

function SectionLabel({ label, right }: { label: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-b5 font-bold" style={{ color: 'rgb(var(--accent))' }}>//</span>
      <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>{label}</span>
      <div className="flex-1 border-t border-white/8" />
      {right ? <span className="text-b5 muted">{right}</span> : null}
    </div>
  )
}

function periodText(p?: { start?: string; end?: string }) {
  if (!p?.start && !p?.end) return null
  return `${p.start ?? '??'} ~ ${p.end ?? '??'}`
}

const ROLE_MAP: Record<string, string> = {
  'Next.js': '라우팅/렌더링', React: 'UI 컴포넌트', TypeScript: '타입 안정성',
  'Tailwind CSS': '디자인 시스템', Storybook: '컴포넌트 문서화',
  'TanStack React Query': '서버 상태 관리', Nginx: '리버스 프록시', PM2: '프로세스 관리',
  'AWS EC2': '배포 환경', 'GitHub Actions': 'CI/CD',
  'Stay-time events': '사용자 행동 지표', 'Funnel sessions': '퍼널 분석',
  'Styled-components': '스타일 엔진', Axios: '네트워크 레이어',
  Zustand: 'UI 상태 엔진', 'Kakao maps api': '지도 엔진',
  Supabase: '백엔드 플랫폼', Swagger: 'API 명세서',
}

export default function ProjectDetailModal({
  project: p,
  onClose,
}: {
  project: ProjectFrontMatter
  onClose: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const icon = p.cover || p.logo
  const period = periodText(p.period)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [p.slug])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    /* 백드롭 */
    <div
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* 모달 패널 */}
      <div
        ref={scrollRef}
        className="panel w-full md:max-w-3xl max-h-[92dvh] md:max-h-[88dvh] overflow-y-auto flex flex-col"
        style={{
          borderTop: '2px solid',
          borderImage: 'linear-gradient(90deg, rgb(var(--accent)), rgba(var(--accent-2),0.7), transparent) 1',
          borderRadius: '18px 18px 0 0',
          animation: 'modalSlideUp 240ms cubic-bezier(0.2,0.8,0.2,1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4"
          style={{ background: 'rgba(14,16,28,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {icon ? <img src={icon} alt={p.title} className="w-8 h-8 object-contain opacity-85 shrink-0" /> : null}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {p.version ? (
                  <span className="px-2 py-0.5 text-b5 rounded border font-medium" style={{ color: 'rgb(var(--accent))', borderColor: 'rgba(var(--accent),0.45)', background: 'rgba(var(--accent),0.10)' }}>
                    {p.version}
                  </span>
                ) : null}
                <span className="text-h5 font-bold truncate">{p.title}</span>
              </div>
              {p.subtitle ? <div className="text-b5 muted truncate">{p.subtitle}</div> : null}
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn text-b5 shrink-0"
            style={{ padding: '6px 12px' }}
            aria-label="닫기"
          >
            ESC ✕
          </button>
        </div>

        {/* 바디 */}
        <div className="p-6 space-y-8">
          {/* META */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { k: 'ROLE', v: p.team?.role },
              { k: 'PERIOD', v: period },
              { k: 'STATUS', v: p.status },
              { k: 'TEAM', v: p.team?.composition?.join(' · ') },
            ].filter(({ v }) => v).map(({ k, v }) => (
              <div key={k} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-b5 muted mb-1">{k}</div>
                <div className="text-b4">{v}</div>
              </div>
            ))}
          </div>

          {/* 링크 */}
          {p.links ? (
            <div className="flex flex-wrap gap-3">
              {p.links.live ? <a className="btn text-b5" href={p.links.live} target="_blank" rel="noreferrer">▶ Live</a> : null}
              {p.links.repo ? <a className="btn text-b5" href={p.links.repo} target="_blank" rel="noreferrer">⎘ Repo</a> : null}
              {p.links.blog ? <a className="btn text-b5" href={p.links.blog} target="_blank" rel="noreferrer">✎ Blog</a> : null}
            </div>
          ) : null}

          {/* HIGHLIGHTS */}
          {p.highlights?.length ? (
            <div>
              <SectionLabel label="HIGHLIGHTS" right={`${p.highlights.length} items`} />
              <div className="grid gap-2 md:grid-cols-2">
                {p.highlights.map((h, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-b5 font-bold shrink-0 tabular-nums mt-0.5" style={{ color: 'rgba(var(--accent),0.6)' }}>{String(i+1).padStart(2,'0')}</span>
                    <div className="text-b4 typo">{h}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* MY WORK */}
          {(p as { myWork?: string[] }).myWork?.length ? (
            <div>
              <SectionLabel label="MY WORK" right={`${(p as { myWork?: string[] }).myWork!.length} items`} />
              <div className="space-y-2">
                {(p as { myWork?: string[] }).myWork!.map((w, i) => (
                  <div key={i} className="flex gap-3 text-b4 muted">
                    <span style={{ color: 'rgb(var(--accent))' }} className="shrink-0">▸</span>
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* TECH STACK */}
          {p.tech ? (
            <div>
              <SectionLabel label="TECH STACK" right={`${Object.values(p.tech).flat().length} items`} />
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(p.tech).map(([group, techs]) => (
                  <div key={group}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-b5 font-bold" style={{ color: 'rgba(var(--accent),0.55)' }}>//</span>
                      <span className="text-b5 muted" style={{ letterSpacing: '0.1em' }}>{group.toUpperCase()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((t) => (
                        <div key={t} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <span className="text-b4">{t}</span>
                          {ROLE_MAP[t] ? <span className="text-b5 muted">· {ROLE_MAP[t]}</span> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from { transform: translateY(32px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}
