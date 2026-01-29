// src/lib/lastSeen.ts
export const LAST_SEEN_KEY = 'portfolio:lastSeen:v1'

export type LastSeen =
  | { type: 'project'; slug: string; at: number }
  | { type: 'patch'; slug: string; at: number }

export function lastSeenToHref(last: LastSeen | null) {
  if (!last) return null
  if (!last.slug) return null
  return last.type === 'project' ? `/contents/${last.slug}` : `/patch-notes/${last.slug}`
}

export function readLastSeen(): LastSeen | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(LAST_SEEN_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<LastSeen>

    if (!parsed || typeof parsed !== 'object') return null
    if (parsed.type !== 'project' && parsed.type !== 'patch') return null
    if (typeof parsed.slug !== 'string' || !parsed.slug.trim()) return null

    return {
      type: parsed.type,
      slug: parsed.slug.trim(),
      at: typeof parsed.at === 'number' ? parsed.at : Date.now(),
    } as LastSeen
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
