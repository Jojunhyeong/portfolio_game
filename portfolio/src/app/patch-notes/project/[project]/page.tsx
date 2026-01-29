// src/app/patch-notes/project/[project]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPatchNotesByProject, getProjectBySlug } from '@/lib/content'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

export default async function ProjectPatchNotesPage({
  params,
}: {
  params: Promise<{ project: string }>
}) {
  const { project } = await params

  // 프로젝트 존재 검증(선택)
  const proj = await getProjectBySlug(project)
  if (!proj) return notFound()

  const notes = await getPatchNotesByProject(project)

  return (
    <div className="space-y-6">
      <section className="panel p-6 md:p-10">
        <div className="text-b5 muted">PATCH NOTES</div>
        <div className="text-h2 mt-2">{proj.frontMatter.title} 변경 기록</div>
        <p className="text-b3 muted mt-3 typo">
          이 프로젝트에서 발생한 변경/개선/핫픽스를 모았습니다.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`/contents/${project}`} className="btn text-b5">
            ← Back to Project
          </Link>
          <Link href="/patch-notes" className="btn text-b5">
            전체 Growth Log →
          </Link>
        </div>
      </section>

      <section className="panel p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-b5 muted">PROJECT LOG</div>
            <div className="text-h3 mt-2">프로젝트 패치 로그</div>
          </div>
          <div className="text-b5 muted">{notes.length} items</div>
        </div>

        {notes.length ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {notes.map((n) => (
              <a
                key={n.slug}
                href={n.links?.blog ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="block panel panel-glow sweep p-6 md:p-7 hover:-translate-y-1 transition-transform duration-150"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    {n.date ? <div className="text-b5 muted">{n.date}</div> : null}
                    <div className="text-h4 mt-2">{n.title}</div>
                    {n.summary ? (
                      <p className="text-b3 muted mt-2 line-clamp-2">{n.summary}</p>
                    ) : null}
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
        ) : (
          <div className="mt-6 text-b3 muted typo">
            아직 이 프로젝트에 연결된 패치 로그가 없습니다.
          </div>
        )}
      </section>
    </div>
  )
}
