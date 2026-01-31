// src/lib/lastSeen.ts
export const LAST_SEEN_KEY = 'portfolio:lastSeen:v1'

export type LastSeen =
  | { type: 'project'; slug: string; at: number }
  | { type: 'patch'; slug: string; at: number }

/** LastSeen → href 변환 */
export function lastSeenToHref(last: LastSeen | null) {
  if (!last) return null
  const slug = (last.slug ?? '').trim()
  if (!slug) return null
  return last.type === 'project' ? `/contents/${slug}` : `/patch-notes/${slug}`
}

/** LastSeen → 사람이 읽기 좋은 라벨 (StartMenu에서 사용) */
export function lastSeenToLabel(last: LastSeen | null) {
  if (!last) return null
  const slug = (last.slug ?? '').trim()
  if (!slug) return null

  // project:chop · 2026-01-31 16:20
  const when = formatKST(last.at)
  return `${last.type}:${slug} · ${when}`
}

export function readLastSeen(): LastSeen | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(LAST_SEEN_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null

    const p = parsed as Partial<LastSeen>

    if (p.type !== 'project' && p.type !== 'patch') return null
    if (typeof p.slug !== 'string') return null

    const slug = p.slug.trim()
    if (!slug) return null

    const at =
      typeof p.at === 'number' && Number.isFinite(p.at) && p.at > 0 ? p.at : Date.now()

    return { type: p.type, slug, at } as LastSeen
  } catch {
    return null
  }
}

export function writeLastSeen(input: { type: 'project' | 'patch'; slug: string }) {
  if (typeof window === 'undefined') return

  const slug = (input.slug ?? '').trim()
  if (!slug) return

  const next: LastSeen = {
    type: input.type,
    slug,
    at: Date.now(),
  }

  try {
    window.localStorage.setItem(LAST_SEEN_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
}

export function clearLastSeen() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(LAST_SEEN_KEY)
  } catch {
    // ignore
  }
}

/** KST(+09:00) 기준 날짜 포맷 */
function formatKST(ms: number) {
  try {
    const d = new Date(ms)
    // 브라우저 환경에서 Asia/Seoul 지원됨
    return new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d)
  } catch {
    // Intl 실패 시 fallback
    const d = new Date(ms)
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(
      d.getHours(),
    )}:${pad2(d.getMinutes())}`
  }
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}
