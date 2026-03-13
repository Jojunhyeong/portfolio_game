// src/components/FeaturedProjects.tsx
'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

type FeaturedProject = {
  slug: string
  title: string
  subtitle?: string
  summary?: string
  tags?: string[]
  icon?: string
  version?: string
  status?: string
}

export default function FeaturedProjects({ items }: { items: FeaturedProject[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((p) => (
        <Link
          key={p.slug}
          href={`/contents/${p.slug}`}
          className="group panel panel-glow relative flex flex-col overflow-hidden hover:-translate-y-1 transition-all duration-200"
        >
          {/* 상단 액센트 라인 */}
          <div
            className="h-[2px] w-full shrink-0"
            style={{
              background: 'linear-gradient(90deg, rgb(var(--accent)) 0%, rgba(var(--accent-2), 0.6) 60%, transparent 100%)',
            }}
          />

          <div className="flex flex-col flex-1 p-5 md:p-6">
            {/* MISSION 레이블 + 아이콘 */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex flex-col gap-1">
                <div
                  className="text-b5 font-bold"
                  style={{ color: 'rgba(var(--accent-2), 0.75)', letterSpacing: '0.12em', fontSize: '11px' }}
                >
                  MISSION
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {p.version ? (
                    <span
                      className="px-2 py-0.5 text-b5 rounded border font-medium"
                      style={{
                        color: 'rgb(var(--accent))',
                        borderColor: 'rgba(var(--accent), 0.45)',
                        background: 'rgba(var(--accent), 0.10)',
                      }}
                    >
                      {p.version}
                    </span>
                  ) : null}
                  {p.status ? (
                    <span className="text-b5 muted">{p.status}</span>
                  ) : null}
                </div>
              </div>
              {p.icon ? (
                <div className="shrink-0 w-10 h-10 flex items-center justify-center opacity-80">
                  <Image
                    src={p.icon}
                    alt={`${p.title} icon`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>

            {/* 제목 */}
            <div className="text-h3">{p.title}</div>
            {p.subtitle ? <div className="text-b4 muted mt-1 line-clamp-2">{p.subtitle}</div> : null}

            {/* 요약 */}
            {p.summary ? (
              <div className="text-b4 muted mt-3 line-clamp-3 flex-1">{p.summary}</div>
            ) : null}

            {/* 태그 */}
            {p.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((tag, i) =>
                  i === 0 ? <AccentChip key={tag}>{tag}</AccentChip> : <Chip key={tag}>{tag}</Chip>,
                )}
              </div>
            ) : null}
          </div>

          {/* Hover 오버레이 — VIEW MISSION DETAILS */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(4,5,12,0.72)', backdropFilter: 'blur(3px)' }}
          >
            <div
              className="text-b3 font-bold"
              style={{
                color: 'rgb(var(--accent-2))',
                textShadow: '0 0 24px rgba(var(--accent-2),0.9), 0 0 48px rgba(var(--accent-2),0.4)',
                letterSpacing: '0.1em',
                border: '1px solid rgba(var(--accent-2),0.35)',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'rgba(0,229,255,0.06)',
              }}
            >
              VIEW RELEASE DETAILS →
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
