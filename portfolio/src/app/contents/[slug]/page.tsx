// src/app/contents/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getProjectBySlug, getProjectSlugs } from '@/lib/content'

import { RememberLastSeen } from '@/components/RememberLastSeen'
import ProjectHud from '@/components/ProjectHud'
import { TechRolePanel } from '@/components/TechRolePanel'
import MountSection from '@/components/MountSection'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}

function SectionLabel({ label, right }: { label: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-b5 font-bold" style={{ color: 'rgb(var(--accent))' }}>//</span>
      <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>{label}</span>
      <div className="flex-1 border-t border-white/8" />
      {right ? <span className="text-b5 muted">{right}</span> : null}
    </div>
  )
}

function periodText(p?: { start?: string; end?: string }) {
  if (!p?.start && !p?.end) return null
  return `${p.start ?? '??'} ~ ${p.end ?? '??'}`
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const item = await getProjectBySlug(slug)
  if (!item) return notFound()

  const { frontMatter: p } = item

  return (
    <>
      <RememberLastSeen type="project" slug={slug} />

      <MountSection delay={0}>
        <ProjectHud project={p} />
      </MountSection>

      <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* LEFT SIDEBAR */}
        <aside className="space-y-4">
          {/* NAVIGATION */}
          <MountSection delay={1}>
            <section className="panel panel-glow p-5">
              <SectionLabel label="NAVIGATION" />
              <div className="flex flex-col gap-2">
                <Link href="/contents" className="btn text-b5">← Back to Projects</Link>
                {p.links?.blog ? (
                  <a href={p.links.blog} target="_blank" rel="noreferrer" className="btn text-b5">
                    ✎ Patch Notes →
                  </a>
                ) : null}
              </div>
            </section>
          </MountSection>

          {/* MY WORK */}
          {(p as { myWork?: string[] }).myWork?.length ? (
            <MountSection delay={2}>
              <section className="panel panel-glow p-5">
                <SectionLabel label="MY WORK" right={`${(p as { myWork?: string[] }).myWork!.length} items`} />
                <ul className="space-y-2">
                  {(p as { myWork?: string[] }).myWork!.map((w, i) => (
                    <li key={i} className="text-b4 muted flex gap-2">
                      <span style={{ color: 'rgb(var(--accent))' }} className="shrink-0">▸</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </MountSection>
          ) : null}

          {/* META */}
          <MountSection delay={3}>
            <section className="panel panel-glow p-5">
              <SectionLabel label="META" />
              <div className="space-y-3">
                {[
                  { key: 'ROLE', val: p.team?.role },
                  { key: 'TEAM', val: p.team?.composition?.join(' · ') },
                  { key: 'PERIOD', val: periodText(p.period) },
                  { key: 'STATUS', val: p.status },
                  { key: 'VERSION', val: p.version },
                ].map(({ key, val }) =>
                  val ? (
                    <div key={key} className="flex items-start justify-between gap-4">
                      <div className="text-b5 muted shrink-0">{key}</div>
                      <div className="text-b4 text-right">{val}</div>
                    </div>
                  ) : null
                )}
              </div>

              {p.tech ? (
                <div className="mt-5 pt-4 border-t border-white/8">
                  <div className="text-b5 muted mb-3" style={{ letterSpacing: '0.1em' }}>STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(p.tech).flat().slice(0, 14).map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          </MountSection>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">
          {/* HIGHLIGHTS */}
          {p.highlights?.length ? (
            <MountSection delay={1}>
              <section className="panel panel-glow p-6 md:p-8">
                <SectionLabel label="HIGHLIGHTS" right={`${p.highlights.length} items`} />
                <div className="grid gap-3">
                  {p.highlights.slice(0, 12).map((h, idx) => (
                    <div
                      key={`${idx}-${h}`}
                      className="flex gap-4 p-4 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span
                        className="text-b5 font-bold shrink-0 mt-0.5"
                        style={{ color: 'rgb(var(--accent))', minWidth: '1.5rem' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="text-b3 typo">{h}</div>
                    </div>
                  ))}
                </div>
              </section>
            </MountSection>
          ) : null}

          {/* TECH STACK */}
          <MountSection delay={2}>
            <TechRolePanel p={p} />
          </MountSection>
        </div>
      </div>
    </>
  )
}
