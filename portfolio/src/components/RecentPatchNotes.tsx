// src/components/RecentPatchNotes.tsx
'use client'

import Link from 'next/link'
import React from 'react'

type PatchNoteLite = {
  slug: string
  title: string
  date?: string // "2026-01-31" 같은 형태면 좋음
  subtitle?: string
  projectSlug?: string // 있으면 좋음 (없어도 동작)
  href?: string
}

export default function RecentPatchNotes({
  items,
}: {
  items: PatchNoteLite[]
}) {
  return (
    <section className="mt-8">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-b5 muted">DEV LOG</div>
          <div className="text-b2 mt-1">패치 노트</div>
          <div className="text-b4 muted mt-1">
            개발하며 가장 인상 깊었던 작업/기록을 담았습니다.
          </div>
        </div>

        <Link href="/patch-notes" className="btn btn-ghost h-10 px-3 text-b4">
          전체 보기 →
        </Link>
      </div>

      <div className="mt-4 panel panel-glow p-4 md:p-6">
        <div className="flex flex-col gap-2">
          {items.slice(0, 3).map((n) => (
            <Link
              key={n.slug}
              href={`${n.href}`}
              className="panel panel-glow p-4 hover:translate-y-[-1px] transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-b5 muted">
                    {n.date ? n.date : 'PATCH'} {n.projectSlug ? `· ${n.projectSlug}` : ''}
                  </div>
                  <div className="text-b3 mt-1 truncate">{n.title}</div>
                  {n.subtitle ? (
                    <div className="text-b4 muted mt-1 line-clamp-2">{n.subtitle}</div>
                  ) : null}
                </div>
                <span className="text-b5 muted shrink-0">↵</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-b5 muted">Tip: P 키로 Patch Notes 바로 이동</div>
         
        </div>
      </div>
    </section>
  )
}
