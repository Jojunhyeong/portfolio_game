import React from 'react'
import { getPatchNotesAll } from '@/lib/content'
import MountSection from '@/components/MountSection'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel panel-glow px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel panel-glow px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

export default async function PatchNotesPage() {
  const notes = await getPatchNotesAll()

  const curated = notes.slice(0, 12)

  return (
    <div className="space-y-6">
      {/* HERO */}
      <MountSection delay={0}>
        <section className="panel panel-glow p-6 md:p-10">
          <div className="text-b5 muted">PATCH NOTES</div>
          <div className="text-h2 mt-2">업데이트로 기록한 성장 로그</div>

          <p className="text-b3 muted mt-3 typo max-w-[70ch]">
            제 성장 과정은 하나의 <span className="accent">라이브 서비스가 업데이트</span>되며 완성도를 높여가는 흐름과 닮아 있다고
            생각했습니다.
            <br />
            그래서 문제를 만났던 순간, 새롭게 시도했던 선택, 그리고 개선의 결과를{' '}
            <span className="accent">Patch Notes</span>로 남겼습니다.
          </p>

          <p className="text-b3 muted mt-3 typo max-w-[70ch]">
            프로젝트별 변경 기록은 각 프로젝트 상세에서 확인할 수 있으며,
            전체 흐름은 블로그에서 시간순으로 이어집니다.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              className="btn text-b5"
              href="https://velog.io/@jojh0323/posts"
              target="_blank"
              rel="noreferrer"
            >
              ✎ Velog 전체 보기 →
            </a>
            <span className="panel panel-glow px-3 py-2 text-b5 muted">
              프로젝트별 Patch Notes는 Projects 내부에 있습니다
            </span>
          </div>
        </section>
      </MountSection>

      {/* CURATED LIST */}
      {curated.length ? (
        <MountSection delay={1}>
          <section className="panel panel-glow p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-b5 muted">CURATED</div>
                <div className="text-h3 mt-2">기억에 남는 업데이트</div>
                <p className="text-b3 muted mt-2 typo">
                  단순한 문제 해결 모음이 아니라, 제가 <span className="accent">새롭게 시도했던 것</span> 중
                  흐름을 바꿨던 기록을 골랐습니다.
                </p>
              </div>
              <div className="text-b5 muted">{curated.length} picks</div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {curated.map((n, idx) => (
                <div key={n.slug} className="mount-reveal d-2">
                  <a
                    href={n.links?.velog ?? '#'}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      'block',
                      'panel panel-glow sweep',
                      'p-6 md:p-7',
                      'hover:-translate-y-1',
                      'transition-transform duration-150',
                    ].join(' ')}
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
                </div>
              ))}
            </div>
          </section>
        </MountSection>
      ) : null}
    </div>
  )
}
