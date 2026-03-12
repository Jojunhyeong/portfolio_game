// src/components/ProjectHud.tsx
'use client'

import type { ProjectFrontMatter } from '@/lib/content'

function AccentChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
  )
}

export default function ProjectHud({ project: p }: { project: ProjectFrontMatter }) {
  const icon = p.cover || p.logo
  const period =
    p.period?.start || p.period?.end
      ? `${p.period?.start ?? '??'} ~ ${p.period?.end ?? '??'}`
      : null

  return (
    <header
      className="panel panel-glow p-6 md:p-10"
      style={{ borderLeft: '3px solid rgb(var(--accent))' }}
    >
      {/* // PROJECT 라벨 */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-b5 font-bold" style={{ color: 'rgb(var(--accent))' }}>//</span>
        <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>PROJECT</span>
        <div className="flex-1 border-t border-white/8" />
        {p.featured ? <AccentChip>RECOMMENDED</AccentChip> : null}
      </div>

      <div className="flex items-start gap-6">
        {/* 타이틀 영역 */}
        <div className="flex-1 min-w-0">
          {/* 버전 + 상태 */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {p.version ? (
              <span
                className="px-2 py-0.5 text-b5 rounded border font-medium"
                style={{
                  color: 'rgb(var(--accent))',
                  borderColor: 'rgba(var(--accent),0.45)',
                  background: 'rgba(var(--accent),0.10)',
                }}
              >
                {p.version}
              </span>
            ) : null}
            {p.status ? <span className="text-b5 muted">{p.status}</span> : null}
            {period ? <span className="text-b5 muted">{period}</span> : null}
          </div>

          <div className="text-d3">{p.title}</div>
          {p.subtitle ? (
            <p className="text-b3 muted mt-2 typo max-w-[60ch]">{p.subtitle}</p>
          ) : null}

          {/* 역할 */}
          {p.team?.role ? (
            <div className="mt-3 text-b4 muted">
              <span style={{ color: 'rgb(var(--accent))' }}>// </span>{p.team.role}
            </div>
          ) : null}
        </div>

        {/* 아이콘 — 오른쪽, 크게 */}
        {icon ? (
          <img
            src={icon}
            alt={`${p.title} icon`}
            className="w-24 h-24 object-contain opacity-85 shrink-0"
          />
        ) : null}
      </div>

      {/* 링크 버튼 */}
      {p.links ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.live ? (
            <a className="btn text-b5" href={p.links.live} target="_blank" rel="noreferrer">
              ▶ Live
            </a>
          ) : null}
          {p.links.repo ? (
            <a className="btn text-b5" href={p.links.repo} target="_blank" rel="noreferrer">
              ⎘ Repo
            </a>
          ) : null}
          {p.links.blog ? (
            <a className="btn text-b5" href={p.links.blog} target="_blank" rel="noreferrer">
              ✎ Blog
            </a>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
