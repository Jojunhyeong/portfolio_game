// src/components/ProjectMetaPanel.tsx
import React from 'react'
import type { ProjectFrontMatter } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-b5 muted">{children}</div>
}

export function ProjectMetaPanel({ p }: { p: ProjectFrontMatter }) {
  const periodText =
    p.period?.start || p.period?.end ? `${p.period?.start ?? '??'} ~ ${p.period?.end ?? '??'}` : null

  return (
    <section className="panel p-8 space-y-6">
      {/* chips */}
      <div className="flex flex-wrap items-center gap-2">
        {p.version ? <Chip>{p.version}</Chip> : null}
        {p.status ? <Chip>{p.status}</Chip> : null}
        {p.featured ? <AccentChip>FEATURED</AccentChip> : null}
        {p.keywords?.slice(0, 6).map((k) => (
          <Chip key={k}>#{k}</Chip>
        ))}
      </div>

      {/* role/period */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <SectionTitle>ROLE</SectionTitle>
          <div className="text-b2">{p.team?.role ?? '—'}</div>
          {p.team?.composition?.length ? (
            <div className="text-b4 muted">{p.team.composition.join(' · ')}</div>
          ) : null}
        </div>

        <div className="space-y-2">
          <SectionTitle>PERIOD</SectionTitle>
          <div className="text-b2">{periodText ?? '—'}</div>
        </div>
      </div>

      {/* links */}
      {p.links ? (
        <div className="flex flex-wrap gap-4">
          {p.links.live ? (
            <a
              className="text-b5 typo hover:accent transition-colors"
              href={p.links.live}
              target="_blank"
              rel="noreferrer"
            >
              Live →
            </a>
          ) : null}
          {p.links.repo ? (
            <a
              className="text-b5 typo hover:accent transition-colors"
              href={p.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              Repo →
            </a>
          ) : null}
          {p.links.blog ? (
            <a
              className="text-b5 typo hover:accent transition-colors"
              href={p.links.blog}
              target="_blank"
              rel="noreferrer"
            >
              Notes →
            </a>
          ) : null}
        </div>
      ) : null}

      {/* highlights */}
      {p.highlights?.length ? (
        <div>
          <SectionTitle>HIGHLIGHTS</SectionTitle>
          <ul className="mt-3 list-disc pl-5 text-b3 muted">
            {p.highlights.map((h) => (
              <li key={h} className="mt-1">
                {h}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* my work */}
      {p.myWork?.length ? (
        <div>
          <SectionTitle>MY WORK</SectionTitle>
          <ul className="mt-3 list-disc pl-5 text-b3 muted">
            {p.myWork.map((w) => (
              <li key={w} className="mt-1">
                {w}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
