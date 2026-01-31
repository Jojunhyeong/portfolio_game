// src/components/FeaturedProjects.tsx
'use client'

import Link from 'next/link'
import React from 'react'
import SectionHeader from '@/components/SectionHeader'
import Image from 'next/image'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent">{children}</span>
}

type FeaturedProject = {
  slug: string
  title: string
  subtitle?: string
  summary?: string
  tags?: string[]
  icon?: string // 🔥 추가
}

export default function FeaturedProjects({ items }: { items: FeaturedProject[] }) {
  return (
    <section className="mt-10">
      <SectionHeader
        label="FEATURED"
        title="대표 프로젝트"
        desc="가장 많은 고민과 성장을 만든 프로젝트를 중심으로 정리했습니다."
        right={
          <Link href="/contents" className="btn btn-ghost h-10 px-3 text-b4">
            전체 보기 →
          </Link>
        }
      />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/contents/${p.slug}`}
            className="panel panel-glow p-5 md:p-6 hover:translate-y-[-1px] transition relative"
          >
            {/* 🔥 우측 상단 아이콘 */}
            {/* 🔥 우측 상단 아이콘 (고정된 40×40 박스) */}
{p.icon ? (
  <div className="absolute top-4 right-4 w-16 h-10 flex items-center justify-center">
    <Image
      src={p.icon}
      alt={`${p.title} icon`}
      width={60}
      height={60}
      className="object-contain"
    />
  </div>
) : null}


            <div className="text-b5 muted">PROJECT</div>
            <div className="text-b2 mt-2">{p.title}</div>
            {p.subtitle ? <div className="text-b4 muted mt-1">{p.subtitle}</div> : null}

            {p.summary ? (
              <div className="text-b4 mt-4 line-clamp-3">{p.summary}</div>
            ) : null}

            {p.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((tag, i) =>
                  i === 0 ? <AccentChip key={tag}>{tag}</AccentChip> : <Chip key={tag}>{tag}</Chip>,
                )}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  )
}
