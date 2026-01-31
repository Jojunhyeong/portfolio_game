// src/app/patch-notes/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPatchNoteBySlug, getPatchNoteSlugs } from '@/lib/content'
import { Mdx } from '@/components/Mdx'
import { RememberLastSeen } from '@/components/RememberLastSeen'
import PatchNoteHud from '@/components/PatchNoteHud'
import MountSection from '@/components/MountSection'

export async function generateStaticParams() {
  const slugs = await getPatchNoteSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function PatchNoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const item = await getPatchNoteBySlug(slug)
  if (!item) return notFound()

  const { frontMatter: n, content } = item

  const tags = (n.tags ?? []).slice(0, 10)
  const summary =
    (n.summary ?? '').trim() || '이 패치에서 해결한 문제와 적용한 수정, 그리고 결과를 기록했다.'

  const bullets = buildBulletSummary(n)

  return (
    <>
      <RememberLastSeen type="patch" slug={slug} />

      {/* 상단 HUD */}
      <MountSection delay={0}>
        <PatchNoteHud note={n} />
      </MountSection>

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* LEFT PANEL */}
        <aside className="space-y-6">
          {/* Quick Summary */}
          <MountSection delay={1}>
            <section className="panel panel-glow p-6">
              <div className="text-b5 muted">QUICK SUMMARY</div>

              <div className="mt-3 text-b3 typo">{summary}</div>

              <ul className="mt-4 space-y-2 text-b4 muted">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="accent">•</span>
                    <span className="min-w-0">{b}</span>
                  </li>
                ))}
              </ul>

              {tags.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((t: string) => (
                    <span key={t} className="panel panel-glow px-2 py-1 text-b5 muted">
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          </MountSection>

          {/* Links & Trust */}
          <MountSection delay={2}>
            <section className="panel panel-glow p-6">
              <div className="text-b5 muted">LINKS</div>

              <div className="mt-4 flex flex-col gap-2">
                {n.links?.repo ? (
                  <a className="btn text-b5" href={n.links.repo} target="_blank" rel="noreferrer">
                    ⎘ Repo
                  </a>
                ) : null}
                {n.links?.velog ? (
                  <a className="btn text-b5" href={n.links.velog} target="_blank" rel="noreferrer">
                    ✎ Velog
                  </a>
                ) : null}
                {n.links?.live ? (
                  <a className="btn text-b5" href={n.links.live} target="_blank" rel="noreferrer">
                    ▶ Live
                  </a>
                ) : null}
              </div>

              <div className="mt-4 text-b4 muted typo space-y-1">
                <div>- Repo/Blog 링크가 있으면 문제 해결 과정까지 검증 가능하다.</div>
                <div>- Live가 있으면 실제 동작 화면까지 바로 확인 가능하다.</div>
              </div>
            </section>
          </MountSection>

          {/* Navigation */}
          <MountSection delay={3}>
            <section className="panel panel-glow p-6">
              <div className="text-b5 muted">NAV</div>

              <div className="mt-4 flex flex-col gap-2">
                <Link href="/patch-notes" className="btn text-b5">
                  ← Back to Patch Notes
                </Link>
                <Link href="/contents" className="btn text-b5">
                  Content Select →
                </Link>
                <Link href="/" className="btn text-b5">
                  Launcher →
                </Link>
              </div>
            </section>
          </MountSection>
        </aside>

        {/* RIGHT LOG */}
        <MountSection delay={1}>
          <section className="panel panel-glow p-6 md:p-8">
            <div className="text-b5 muted">CHANGELOG</div>
            <article className="mt-5 prose prose-invert max-w-none">
              <Mdx content={content} />
            </article>
          </section>
        </MountSection>
      </div>
    </>
  )
}

/**
 * frontmatter 기반으로 "면접관용 3포인트"를 만들기
 * - 없으면 kind/version/태그로 최대한 의미 있게 fallback
 */
function buildBulletSummary(n: {
  kind?: string
  version?: string
  tags?: string[]
}) {
  const bullets: string[] = []

  const kind = (n.kind ?? '').trim()
  const version = (n.version ?? '').trim()
  const tags = (n.tags ?? []).slice(0, 4)

  if (kind) bullets.push(`분류: ${kind}`)
  if (version) bullets.push(`버전: ${version}`)
  if (tags.length) bullets.push(`키워드: ${tags.map((t) => `#${t}`).join(' ')}`)

  while (bullets.length < 3) {
    bullets.push('변경 이유 / 적용 내용 / 결과를 본문에서 확인할 수 있다.')
  }

  return bullets.slice(0, 3)
}
