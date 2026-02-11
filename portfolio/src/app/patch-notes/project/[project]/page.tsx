// src/app/patch-notes/project/[project]/page.tsx
import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPatchNotesByProject, getProjectBySlug } from '@/lib/content'
import MountSection from '@/components/MountSection'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel panel-glow px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel panel-glow px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

export default async function ProjectPatchNotesPage({
  params,
}: {
  params: Promise<{ project: string }>
}) {
  const { project } = await params

  const proj = await getProjectBySlug(project)
  if (!proj) return notFound()

  // ✅ 대표 6개만 (featured 우선 + 부족하면 최신 로그로 보충)
  const notes = await getPatchNotesByProject(project, {
    limit: 6,
    fillToLimit: true,
    featuredOnly: false,
  })

  const title = proj.frontMatter.title

  return (
    <div className="space-y-6">
      {/* HERO */}
      <MountSection delay={0}>
        <section className="panel panel-glow p-6 md:p-10">
          <div className="text-b5 muted">PATCH NOTES</div>
          <div className="text-h2 mt-2">{title} 변경 기록</div>
          <p className="text-b3 muted mt-3 typo">
            이 프로젝트의 주요 변경/개선/핫픽스 중 대표 로그만 선별했습니다.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={`/contents/${project}`} className="btn text-b5">
              ← Back to Project
            </Link>
            <Link href="/patch-notes" className="btn text-b5">
              전체 Patch Notes →
            </Link>
          </div>
        </section>
      </MountSection>

      {/* LIST */}
      <MountSection delay={1}>
        <section className="panel panel-glow p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-b5 muted">PROJECT LOG</div>
              <div className="text-h3 mt-2">대표 패치 로그</div>
              <p className="text-b4 muted mt-2 typo">
                최대 6개까지 노출됩니다.
              </p>
            </div>
            <div className="text-b5 muted">{notes.length} / 6</div>
          </div>

          {notes.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {notes.map((n) => {
                const href = n.links?.velog?.trim()
                const clickable = Boolean(href)

                const CardInner = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        {n.date ? <div className="text-b5 muted">{n.date}</div> : null}
                        <div className="text-h4 mt-2">{n.title}</div>
                        {n.summary ? (
                          <p className="text-b3 muted mt-2 line-clamp-2">{n.summary}</p>
                        ) : null}
                      </div>
                      <div className="shrink-0">
                        {clickable ? <AccentChip>OPEN →</AccentChip> : <Chip>NO LINK</Chip>}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {n.featured ? <AccentChip>FEATURED</AccentChip> : null}
                      {n.version ? <Chip>{n.version}</Chip> : null}
                      {(n.tags ?? []).slice(0, 4).map((t) => (
                        <Chip key={t}>#{t}</Chip>
                      ))}
                    </div>
                  </>
                )

                return (
                  <div key={n.slug} className="mount-reveal d-2">
                    {clickable ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="block panel panel-glow sweep p-6 md:p-7 hover:-translate-y-1 transition-transform duration-150"
                      >
                        {CardInner}
                      </a>
                    ) : (
                      <div className="block panel panel-glow p-6 md:p-7 opacity-80">
                        {CardInner}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="mt-6 text-b3 muted typo">아직 이 프로젝트에 연결된 패치 로그가 없습니다.</div>
          )}

          
        </section>
      </MountSection>
    </div>
  )
}
