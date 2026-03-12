// src/app/patch-notes/page.tsx
import React from 'react'
import { getPatchNotesAll } from '@/lib/content'
import MountSection from '@/components/MountSection'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}

function TagChip({ tag }: { tag: string }) {
  const isRelease = ['RELEASE', 'DEPLOY', 'INFRA'].includes(tag.toUpperCase())
  if (isRelease) {
    return (
      <span
        className="px-2 py-0.5 text-b5 rounded border font-medium"
        style={{
          color: 'rgb(var(--accent))',
          borderColor: 'rgba(var(--accent),0.4)',
          background: 'rgba(var(--accent),0.08)',
        }}
      >
        #{tag}
      </span>
    )
  }
  return <Chip>#{tag}</Chip>
}

export default async function PatchNotesPage() {
  const notes = await getPatchNotesAll()
  const curated = notes.slice(0, 12)

  return (
    <div className="space-y-6">
      {/* HERO */}
      <MountSection delay={0}>
        <section
          className="panel panel-glow p-6 md:p-10"
          style={{ borderLeft: '3px solid rgb(var(--accent))' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-b5 font-bold" style={{ color: 'rgb(var(--accent))' }}>//</span>
            <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>PATCH NOTES</span>
          </div>

          <div className="text-d3">업데이트로 기록한 성장 로그</div>

          <p className="text-b3 muted mt-4 typo max-w-[60ch]">
            성장 과정은 하나의 <span className="accent">라이브 서비스가 업데이트</span>되며
            완성도를 높여가는 흐름과 닮아 있다고 생각했습니다.
            <br />
            문제를 만났던 순간, 새롭게 시도했던 선택, 개선의 결과를{' '}
            <span className="accent">Patch Notes</span>로 남겼습니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              className="btn text-b5"
              href="https://velog.io/@jojh0323/posts"
              target="_blank"
              rel="noreferrer"
            >
              ✎ Velog 전체 보기 →
            </a>
            <span className="panel px-3 py-2 text-b5 muted">
              프로젝트별 Patch Notes는 Projects 내부에 있습니다
            </span>
          </div>
        </section>
      </MountSection>

      {/* CURATED LIST */}
      {curated.length ? (
        <MountSection delay={1}>
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-b5 font-bold" style={{ color: 'rgb(var(--accent))' }}>//</span>
              <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>CHANGELOG</span>
              <div className="flex-1 border-t border-white/8" />
              <span className="text-b5 muted">{curated.length} entries</span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {curated.map((n) => (
                <a
                  key={n.slug}
                  href={n.links?.velog ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="panel panel-glow flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-150"
                >
                  {/* 상단 액센트 라인 */}
                  <div
                    className="h-[2px] w-full shrink-0"
                    style={{
                      background: 'linear-gradient(90deg, rgb(var(--accent)) 0%, rgba(var(--accent-2),0.6) 55%, transparent 100%)',
                      opacity: 0.45,
                    }}
                  />

                  <div className="flex flex-col flex-1 p-5">
                    {/* 버전 + 날짜 */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {n.version ? (
                          <span
                            className="px-2 py-0.5 text-b5 rounded border font-medium"
                            style={{
                              color: 'rgb(var(--accent))',
                              borderColor: 'rgba(var(--accent),0.4)',
                              background: 'rgba(var(--accent),0.08)',
                            }}
                          >
                            {n.version}
                          </span>
                        ) : null}
                        {n.project ? <span className="text-b5 muted">{n.project}</span> : null}
                      </div>
                      {n.date ? <span className="text-b5 muted shrink-0">{n.date}</span> : null}
                    </div>

                    {/* 제목 */}
                    <div className="text-b2">{n.title}</div>

                    {/* 요약 */}
                    {n.summary ? (
                      <p className="text-b4 muted mt-2 line-clamp-2 flex-1">{n.summary}</p>
                    ) : null}

                    {/* 태그 */}
                    {(n.tags ?? []).length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(n.tags ?? []).slice(0, 4).map((t) => (
                          <TagChip key={t} tag={t} />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          </section>
        </MountSection>
      ) : null}
    </div>
  )
}
