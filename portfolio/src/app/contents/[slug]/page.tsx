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
  return <span className="panel panel-glow px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
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
      {/* last seen 저장(continue 용) */}
      <RememberLastSeen type="project" slug={slug} />

      {/* 상단 HUD (상단은 즉시 보여야 자연스러움) */}
      <MountSection delay={0}>
        <ProjectHud project={p} />
      </MountSection>

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* LEFT NAV / META */}
        <aside className="space-y-6">
          {/* NAV */}
          <MountSection delay={1}>
            <section className="panel panel-glow p-6">
              <div className="text-b5 muted">NAV</div>
              <div className="mt-4 flex flex-col gap-2">
                <Link href="/contents" className="btn text-b5">
                  ← Back to Projects
                </Link>
                <Link href={`/patch-notes/project/${p.slug}`} className="btn text-b5">
                  Patch Notes →
                </Link>
              </div>

              
            </section>
          </MountSection>

          {/* QUICK SUMMARY */}
          <MountSection delay={2}>
            <section className="panel panel-glow p-6">
              <div className="text-b5 muted">QUICK SUMMARY</div>
              <ul className="mt-3 space-y-2 text-b3 muted typo">
                {p.team?.role ? (
                  <li>
                    <span className="accent">•</span> 역할: {p.team.role}
                  </li>
                ) : null}
                {periodText(p.period) ? (
                  <li>
                    <span className="accent">•</span> 기간: {periodText(p.period)}
                  </li>
                ) : null}
                {p.highlights?.[0] ? (
                  <li>
                    <span className="accent">•</span> 핵심: {p.highlights[0]}
                  </li>
                ) : null}
              </ul>

              {(p.keywords ?? []).length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.keywords ?? []).slice(0, 6).map((k) => (
                    <Chip key={k}>#{k}</Chip>
                  ))}
                </div>
              ) : null}
            </section>
          </MountSection>

          {/* META */}
          <MountSection delay={3}>
            <section className="panel panel-glow p-6">
              <div className="text-b5 muted">META</div>

              <div className="mt-4 space-y-3 text-b4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-b5 muted">ROLE</div>
                  <div className="text-b4">{p.team?.role ?? '—'}</div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-b5 muted">TEAM</div>
                  <div className="text-b4">{p.team?.composition?.length ? p.team.composition.join(' · ') : '—'}</div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-b5 muted">PERIOD</div>
                  <div className="text-b4">{periodText(p.period) ?? '—'}</div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-b5 muted">STATUS</div>
                  <div className="text-b4">{p.status ?? '—'}</div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-b5 muted">VERSION</div>
                  <div className="text-b4">{p.version ?? '—'}</div>
                </div>
              </div>

              {p.tech ? (
                <div className="mt-5">
                  <div className="text-b5 muted">STACK</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.values(p.tech)
                      .flat()
                      .slice(0, 14)
                      .map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                  </div>
                </div>
              ) : null}
            </section>
          </MountSection>
        </aside>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* HIGHLIGHTS */}
          {p.highlights?.length ? (
            <MountSection delay={1}>
              <section className="panel panel-glow p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-b5 muted">HIGHLIGHTS</div>
                    <div className="text-h3 mt-2">핵심 성과/기여</div>
                  </div>
                  <div className="text-b5 muted">{p.highlights.length} items</div>
                </div>

                <div className="mt-6 grid gap-3">
                  {p.highlights.slice(0, 12).map((h, idx) => (
                    <div key={`${idx}-${h}`} className="panel panel-glow p-5">
                      <div className="text-b3 typo">
                        <span className="accent">•</span> {h}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </MountSection>
          ) : null}

          {/* TECH as roles */}
          <MountSection delay={2}>
            <div className="panel panel-glow">
              <TechRolePanel p={p} />
            </div>
          </MountSection>

          {/* DETAIL MDX */}
          {/* <MountSection delay={3}>...</MountSection> */}
        </div>
      </div>
    </>
  )
}
