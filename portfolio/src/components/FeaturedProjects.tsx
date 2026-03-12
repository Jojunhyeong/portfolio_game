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
          className="panel panel-glow flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-150"
        >
          {/* 상단 액센트 라인 */}
          <div
            className="h-[2px] w-full shrink-0"
            style={{
              background: 'linear-gradient(90deg, rgb(var(--accent)) 0%, rgba(var(--accent-2), 0.6) 60%, transparent 100%)',
            }}
          />

          <div className="flex flex-col flex-1 p-5 md:p-6">
            {/* 버전 + 아이콘 */}
            <div className="flex items-start justify-between gap-3 mb-4">
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
            <div className="text-h4">{p.title}</div>
            {p.subtitle ? <div className="text-b4 muted mt-1 line-clamp-2">{p.subtitle}</div> : null}

            {/* 요약 */}
            {p.summary ? (
              <div className="text-b4 muted mt-3 line-clamp-3 flex-1 text-white">{p.summary}</div>
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
        </Link>
      ))}
    </div>
  )
}
