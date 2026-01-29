import React from 'react'
import { getPatchNotesByProject } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

export default async function ProjectPatchNotes({ project }: { project: string }) {
  const notes = await getPatchNotesByProject(project )

  if (!notes.length) return null

  return (
    <section className="panel p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-b5 muted">PATCH NOTES</div>
          <div className="text-h3 mt-2">이 프로젝트의 변경 기록</div>
          <p className="text-b3 muted mt-2 typo">
            카드 클릭 시 해당 기록(블로그 글)로 이동합니다.
          </p>
        </div>
        <div className="text-b5 muted">{notes.length} logs</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {notes.map((n) => (
          <a
            key={n.slug}
            href={n.links?.blog ?? '#'}
            target="_blank"
            rel="noreferrer"
            className={[
              'block',
              'panel panel-glow sweep',
              'p-6 md:p-7',
              'hover:-translate-y-1',
              'transition-transform duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[rgba(var(--accent),0.6)]',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {n.date ? <div className="text-b5 muted">{n.date}</div> : null}
                <div className="text-h4 mt-2">{n.title}</div>
                {n.summary ? <p className="text-b3 muted mt-2 line-clamp-2">{n.summary}</p> : null}
              </div>
              <div className="shrink-0">
                <AccentChip>OPEN →</AccentChip>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {n.version ? <Chip>{n.version}</Chip> : null}
              {(n.tags ?? []).slice(0, 4).map((t) => (
                <Chip key={t}>#{t}</Chip>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
