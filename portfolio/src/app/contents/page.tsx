// src/app/contents/page.tsx
import Link from 'next/link'
import { getProjectsAll } from '@/lib/content'
import ProjectSelectGrid from '@/components/ProjectSelectGrid'

export const dynamic = 'force-static'

export default async function ContentsPage() {
  const items = await getProjectsAll()

  return (
    <>
      {/* HEADER */}
      <header className="panel p-6 md:p-8 sweep">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-b5 muted">CONTENT SELECT</div>
            <div className="text-d3 mt-2">Projects</div>

            {/* 🔥 핵심 서사 */}
            <p className="text-b2 muted mt-3 typo max-w-[70ch]">
              프로젝트를 통한 제 성장은
              <br />
              하나의 <span className="accent">라이브 서비스의 업데이트 흐름</span>와 닮아 있습니다.
            </p>

            <p className="text-b3 muted mt-2 typo max-w-[70ch]">
              각 프로젝트는 그 시점의 고민과 역할을 담고 있으며,
              <span className="accent"> TTAK</span>에서 가장 완성된 흐름을 확인할 수 있습니다.
            </p>

            {/* CONTROLS */}
           
          </div>

         
        </div>
      </header>

      {/* PROJECT GRID */}
      <div className="mt-6">
        <ProjectSelectGrid projects={items} />
      </div>

      {/* 🔎 LEGEND */}
      <section className="panel p-5 mt-6">
        <div className="text-b5 muted">PROJECT STAGE</div>

        <ul className="mt-3 space-y-1 text-b4 muted typo">
          <li>
            <span className="accent">Early Access</span> · 프론트엔드 개발자로서의 출발과
            기본기를 다진 <span className="accent">도입기</span>
          </li>
          <li>
            <span className="accent">Open Beta</span> · 역할과 책임이 분명해지고
            기능을 확장·정제한 단계
          </li>
          <li>
            <span className="accent">Official Release</span> · 운영과 개선까지 고려하며
            서비스 완성도를 끌어올린 단계
          </li>
        </ul>
      </section>
    </>
  )
}
