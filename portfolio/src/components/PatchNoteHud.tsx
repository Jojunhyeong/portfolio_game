// src/components/PatchNoteHud.tsx
'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type PatchNoteFrontMatter = {
  title: string
  date?: string
  version?: string
  summary?: string
  tags?: string[]

  /** ✅ patch 분류 */
  kind?: string

  links?: { repo?: string; blog?: string; live?: string }
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

function iconOf(kind?: string) {
  const t = (kind ?? '').toLowerCase()
  if (t.includes('release')) return '🚀'
  if (t.includes('hotfix')) return '🧯'
  if (t.includes('fix')) return '🛠'
  if (t.includes('refactor')) return '🧩'
  if (t.includes('feature')) return '✨'
  return '📌'
}

export default function PatchNoteHud({ note: n }: { note: PatchNoteFrontMatter }) {
  const router = useRouter()
  const icon = iconOf(n.kind)



  const headline = `${n.version ? `${n.version} ` : ''}${icon} ${n.title}`

  const summary =
    (n.summary ?? '').trim() ||
    '이 업데이트에서 “무엇이 바뀌었는지 / 왜 바뀌었는지 / 어떤 효과가 있었는지”를 기록했다.'

  const tags = (n.tags ?? []).slice(0, 8)

  return (
    <header className="panel p-6 md:p-8 sweep">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="text-b5 muted">PATCH DETAIL</div>
          <div className="text-d3 mt-2">{headline}</div>
          <div className="text-b2 muted mt-3 typo max-w-[72ch]">{summary}</div>
        </div>

        {/* meta chips */}
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {n.date ? <Chip>{n.date}</Chip> : null}
          {n.kind ? <Chip>{n.kind}</Chip> : null}
          {n.version ? <AccentChip>{n.version}</AccentChip> : null}

          {tags.map((t) => (
            <Chip key={t}>#{t}</Chip>
          ))}
        </div>
      </div>

      

    </header>
  )
}
