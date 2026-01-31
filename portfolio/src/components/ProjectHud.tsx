// src/components/ProjectHud.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { ProjectFrontMatter } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

export default function ProjectHud({ project: p }: { project: ProjectFrontMatter }) {
  const router = useRouter()

  // ✅ HOTKEY 실제 동작
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return

      const key = e.key.toLowerCase()

      if (key === 'escape') {
        e.preventDefault()
        router.back()
        return
      }
      if (key === 'c') {
        e.preventDefault()
        router.push('/contents')
        return
      }
      if (key === 'p') {
        e.preventDefault()
        router.push('/patch-notes')
        return
      }
      if (key === 'h') {
        e.preventDefault()
        router.push('/')
        return
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router])

  const period =
    p.period?.start || p.period?.end ? `${p.period?.start ?? '??'} ~ ${p.period?.end ?? '??'}` : null

  // ✅ 칩 과다 방지 (면접관용: 핵심만)
  const chips = [
    ...(p.featured ? ['FEATURED'] : []),
    ...(p.version ? [p.version] : []),
    ...(p.status ? [p.status] : []),
    ...(period ? [period] : []),
    ...(p.team?.role ? [p.team.role] : []),
  ].slice(0, 5)

  return (
    <header className="panel p-6 md:p-8 sweep">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="text-b5 muted">PROJECT</div>
          <div className="text-d3 mt-2">{p.title}</div>
          {p.subtitle ? <div className="text-b2 muted mt-3 typo">{p.subtitle}</div> : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {chips.map((c) =>
            c === 'FEATURED' ? (
              <AccentChip key={c}>{c}</AccentChip>
            ) : (
              <Chip key={c}>{c}</Chip>
            ),
          )}
        </div>
      </div>

      {p.links ? (
        <div className="mt-5 flex flex-wrap gap-3">
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
          
        </div>
      ) : null}

      <div className="mt-5 text-b5 muted">
        HOTKEY: <span className="accent">ESC</span> back · <span className="accent">C</span> contents ·{' '}
        <span className="accent">P</span> patch notes · <span className="accent">H</span> home
      </div>
    </header>
  )
}
