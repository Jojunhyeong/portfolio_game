// src/components/RecentPatchNotes.tsx
'use client'

import React from 'react'

type PatchNoteLite = {
  slug: string
  title: string
  date?: string
  subtitle?: string
  projectSlug?: string
  href?: string
}

export default function RecentPatchNotes({ items }: { items: PatchNoteLite[] }) {
  return (
    <div className="space-y-3">
      {items.slice(0, 3).map((n) => (
        <a
          key={n.slug}
          href={n.href ?? '#'}
          target="_blank"
          rel="noreferrer"
          className="panel panel-glow flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-150"
        >
          {/* 상단 액센트 라인 */}
          <div
            className="h-[2px] w-full shrink-0"
            style={{
              background: 'linear-gradient(90deg, rgb(var(--accent)) 0%, rgba(var(--accent-2),0.6) 55%, transparent 100%)',
              opacity: 0.45,
            }}
          />
          <div className="flex items-start justify-between gap-4 p-5">
            <div className="min-w-0 flex-1">
              {n.date ? (
                <div className="text-b5 muted mb-1">{n.date}{n.projectSlug ? ` · ${n.projectSlug}` : ''}</div>
              ) : null}
              <div className="text-b3">{n.title}</div>
              {n.subtitle ? (
                <div className="text-b4 muted mt-1 line-clamp-2">{n.subtitle}</div>
              ) : null}
            </div>
            <span className="text-b5 muted shrink-0 mt-1">↗</span>
          </div>
        </a>
      ))}

      <div className="text-b5 muted pt-1">Tip: <span style={{ color: 'rgb(var(--accent))' }}>P</span> 키로 Patch Notes 바로 이동</div>
    </div>
  )
}
