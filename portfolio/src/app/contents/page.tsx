// src/app/contents/page.tsx
import { getProjectsAll } from '@/lib/content'
import ProjectSelectGrid from '@/components/ProjectSelectGrid'
import MountSection from '@/components/MountSection'

export const dynamic = 'force-static'

export default async function ContentsPage() {
  const items = await getProjectsAll()

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <MountSection delay={0}>
        <header
          className="panel panel-glow p-6 md:p-10"
          style={{ borderLeft: '3px solid rgb(var(--accent))' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-b5 font-bold" style={{ color: 'rgb(var(--accent))' }}>//</span>
            <span className="text-b5 muted" style={{ letterSpacing: '0.12em' }}>CONTENT SELECT</span>
          </div>

          <div className="text-d3">Projects</div>

          <p className="text-b3 muted mt-4 typo max-w-[60ch]">
            하나의 <span className="accent">라이브 서비스가 출시되고 개선</span>되는 흐름처럼,
            각 프로젝트는 그 시점의 고민과 역할을 담고 있습니다.
            <br />
            <span className="accent">TTAK</span>에서 가장 완성된 흐름을 확인할 수 있습니다.
          </p>

          {/* PROJECT STAGE 범례 */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-b4">
            <div>
              <span
                className="px-2 py-0.5 rounded border text-b5 font-medium mr-2"
                style={{
                  color: 'rgb(var(--accent))',
                  borderColor: 'rgba(var(--accent),0.4)',
                  background: 'rgba(var(--accent),0.08)',
                }}
              >
                EA
              </span>
              <span className="muted">Early Access — 도입기</span>
            </div>
            <div>
              <span
                className="px-2 py-0.5 rounded border text-b5 font-medium mr-2"
                style={{
                  color: 'rgb(var(--accent))',
                  borderColor: 'rgba(var(--accent),0.4)',
                  background: 'rgba(var(--accent),0.08)',
                }}
              >
                β
              </span>
              <span className="muted">Open Beta — 확장·정제</span>
            </div>
            <div>
              <span
                className="px-2 py-0.5 rounded border text-b5 font-medium mr-2"
                style={{
                  color: 'rgb(var(--accent))',
                  borderColor: 'rgba(var(--accent),0.4)',
                  background: 'rgba(var(--accent),0.08)',
                }}
              >
                v1+
              </span>
              <span className="muted">Official Release — 서비스 완성도</span>
            </div>
          </div>
        </header>
      </MountSection>

      {/* PROJECT GRID */}
      <MountSection delay={1}>
        <ProjectSelectGrid projects={items} />
      </MountSection>
    </div>
  )
}
