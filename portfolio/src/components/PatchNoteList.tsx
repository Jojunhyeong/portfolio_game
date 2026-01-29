// src/components/PatchNoteList.tsx
'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import type { PatchNoteLite } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent">{children}</span>
}

function fmtDate(s?: string) {
  if (!s) return ''
  // 면접관/가독성: YYYY-MM-DD 그대로
  return s
}

export default function PatchNoteList({ items }: { items: PatchNoteLite[] }) {
  const sorted = useMemo(() => {
    // date 내림차순 (없으면 뒤로)
    return [...items].sort((a, b) => {
      const ad = a.date ?? ''
      const bd = b.date ?? ''
      if (!ad && bd) return 1
      if (ad && !bd) return -1
      return bd.localeCompare(ad)
    })
  }, [items])

  const recent = sorted.slice(0, 3)
  const rest = sorted.slice(3)

  return (
    <div className="space-y-6">
      {/* RECENT */}
      {recent.length ? (
        <section className="panel p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-b5 muted">RECENT UPDATES</div>
              <div className="text-h3 mt-2">최신 변경사항</div>
              <p className="text-b3 muted mt-2 typo">
                패치노트는 “문제 → 수정 → 안정화” 흐름으로 읽으면 맥락이 가장 빠르게 잡힌다.
              </p>
            </div>
            <div className="text-b5 muted">{sorted.length} logs</div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {recent.map((n) => (
              <Link
                key={n.slug}
                href={`/patch-notes/${n.slug}`}
                className={[
                  'block',
                  'panel panel-glow sweep',
                  'p-5',
                  'focus:outline-none focus:ring-2 focus:ring-[rgba(var(--accent),0.6)]',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-b5 muted">{fmtDate(n.date) || '—'}</div>
                  <AccentChip>OPEN →</AccentChip>
                </div>

                <div className="text-b2 mt-3 line-clamp-2">{n.title}</div>

                {n.summary ? (
                  <p className="text-b4 muted mt-2 typo line-clamp-3">{n.summary}</p>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {n.version ? <Chip>{n.version}</Chip> : null}
                  {(n.tags ?? []).slice(0, 3).map((t) => (
                    <Chip key={t}>#{t}</Chip>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* TIMELINE */}
      <section className="panel p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-b5 muted">TIMELINE</div>
            <div className="text-h3 mt-2">전체 로그</div>
            <p className="text-b3 muted mt-2 typo">
              제목만 보고 들어가도 되지만, 요약/태그를 먼저 보면 맥락 파악이 더 빠르다.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {(rest.length ? rest : sorted).map((n) => (
            <Link
              key={n.slug}
              href={`/patch-notes/${n.slug}`}
              className={[
                'block',
                'panel panel-glow',
                'p-5',
                'focus:outline-none focus:ring-2 focus:ring-[rgba(var(--accent),0.6)]',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-b5 muted">
                    {fmtDate(n.date) || '—'}
                    {n.version ? <span className="ml-2 accent">{n.version}</span> : null}
                  </div>
                  <div className="text-b2 mt-2 truncate">{n.title}</div>
                  {n.summary ? (
                    <p className="text-b4 muted mt-2 typo line-clamp-2">{n.summary}</p>
                  ) : null}
                </div>

                <div className="shrink-0">
                  <Chip>OPEN →</Chip>
                </div>
              </div>

              {(n.tags ?? []).length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(n.tags ?? []).slice(0, 6).map((t) => (
                    <Chip key={t}>#{t}</Chip>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER HINT */}
      <div className="panel p-5">
        <div className="text-b5 muted">HINT</div>
        <div className="mt-2 text-b4 typo muted space-y-1">
          <div>- 추천: 최신 3개 → 관심 태그 → 관련 프로젝트 확인</div>
          <div>- Projects에서 대표(TTAK) 확인 후 Patch Notes로 오면 이해가 더 빠르다</div>
        </div>
      </div>
    </div>
  )
}
