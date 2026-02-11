// src/lib/content.ts
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const PROJECT_DIR = path.join(ROOT, 'content', 'projects')
const PATCH_DIR = path.join(ROOT, 'content', 'patch-notes')

export type ProjectFrontMatter = {
  type: 'project'
  slug: string
  title: string
  subtitle?: string
  date?: string
  order?: number
  featured?: boolean

  version?: string
  status?: string

  period?: { start?: string; end?: string }
  team?: { composition?: string[]; role?: string }
  keywords?: string[]
  links?: { live?: string; repo?: string; blog?: string }

  highlights?: string[]
  tech?: Record<string, string[]>
  myWork?: string[]

  /** ✅ 카드에서 쓸 이미지 */
  cover?: string // e.g. "/chop_logo.png" or "/projects/chop/cover.png"
  logo?: string // e.g. "/chop_logo.png"
}

export type PatchNoteFrontMatter = {
  type: 'patch'
  slug: string
  title: string
  date?: string
  version?: string
  tags?: string[]
  summary?: string

  project?: string

  /** ✅ 프로젝트 페이지에서 대표로 노출할지 */
  featured?: boolean
  /** ✅ 대표 노출 순서 (작을수록 먼저) */
  featuredOrder?: number

  links?: {
    project?: string
    repo?: string
    velog?: string
    live?: string
  }
}

export type MdxItem<TFrontMatter> = {
  slug: string
  frontMatter: TFrontMatter
  content: string
}

export type ProjectLite = Pick<
  ProjectFrontMatter,
  | 'slug'
  | 'title'
  | 'subtitle'
  | 'version'
  | 'status'
  | 'featured'
  | 'order'
  | 'period'
  | 'keywords'
  | 'team'
  | 'links'
  | 'cover'
  | 'logo'
>

export type PatchNoteLite = Pick<
  PatchNoteFrontMatter,
  'slug' | 'title' | 'date' | 'version' | 'tags' | 'summary'
> & {
  project?: string
  links?: PatchNoteFrontMatter['links']

  /** ✅ 큐레이션용 */
  featured?: boolean
  featuredOrder?: number
}

async function ensureDirReadable(dirPath: string) {
  try {
    const stat = await fs.stat(dirPath)
    if (!stat.isDirectory()) throw new Error('Not a directory')
  } catch {
    const msg = [
      `[content] Directory not found or not readable.`,
      `- dirPath: ${dirPath}`,
      `- cwd(process.cwd()): ${process.cwd()}`,
      `- expected structure:`,
      `  ${PROJECT_DIR}/*.mdx`,
      `  ${PATCH_DIR}/*.mdx`,
    ].join('\n')
    throw new Error(msg)
  }
}

function slugFromFilename(filename: string) {
  return filename.replace(/\.mdx$/, '')
}

function safeString(v: unknown, fallback = '') {
  return typeof v === 'string' ? v : fallback
}

function safeBoolean(v: unknown, fallback = false) {
  return typeof v === 'boolean' ? v : fallback
}

function safeNumber(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined
}

async function readMdxFile<TFrontMatter>(filePath: string): Promise<MdxItem<TFrontMatter>> {
  const raw = await fs.readFile(filePath, 'utf8')
  const parsed = matter(raw)
  const slug = slugFromFilename(path.basename(filePath))

  const fm = (parsed.data ?? {}) as Record<string, unknown>
  if (!fm.slug) fm.slug = slug

  return {
    slug,
    frontMatter: fm as TFrontMatter,
    content: parsed.content,
  }
}

async function readMdxDir<TFrontMatter>(dirPath: string): Promise<Array<MdxItem<TFrontMatter>>> {
  await ensureDirReadable(dirPath)
  const files = await fs.readdir(dirPath)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'))
  const items = await Promise.all(mdxFiles.map((f) => readMdxFile<TFrontMatter>(path.join(dirPath, f))))
  return items
}

/** =========================
 *  Projects
 *  ========================= */
export async function getProjectsAll(): Promise<ProjectLite[]> {
  const items = await readMdxDir<ProjectFrontMatter>(PROJECT_DIR)

  const list: ProjectLite[] = items.map((it) => {
    const p = it.frontMatter as ProjectFrontMatter
    return {
      slug: safeString(p.slug, it.slug) || it.slug,
      title: safeString(p.title, it.slug),
      subtitle: p.subtitle,
      version: p.version,
      status: p.status,
      featured: p.featured,
      order: p.order,
      period: p.period,
      keywords: p.keywords,
      team: p.team,
      links: p.links,

      cover: p.cover,
      logo: p.logo,
    }
  })

  return list.sort((a, b) => {
    const af = a.featured ? 0 : 1
    const bf = b.featured ? 0 : 1
    if (af !== bf) return af - bf
    const ao = a.order ?? 999
    const bo = b.order ?? 999
    if (ao !== bo) return ao - bo
    return (a.title ?? '').localeCompare(b.title ?? '')
  })
}

export async function getProjectSlugs(): Promise<string[]> {
  const items = await readMdxDir<ProjectFrontMatter>(PROJECT_DIR)
  return items.map((it) => it.slug)
}

export async function getProjectBySlug(slug: string): Promise<MdxItem<ProjectFrontMatter> | null> {
  const filePath = path.join(PROJECT_DIR, `${slug}.mdx`)
  try {
    return await readMdxFile<ProjectFrontMatter>(filePath)
  } catch {
    return null
  }
}

/** =========================
 *  Patch Notes
 *  ========================= */

function resolvePatchProject(p: PatchNoteFrontMatter): string | undefined {
  const a = (p.project ?? '').trim()
  if (a) return a
  const b = (p.links?.project ?? '').trim()
  return b || undefined
}

function sortPatchByDateDesc(a: PatchNoteLite, b: PatchNoteLite) {
  const ad = a.date ?? ''
  const bd = b.date ?? ''
  if (!ad && bd) return 1
  if (ad && !bd) return -1
  return bd.localeCompare(ad)
}

/** featuredOrder 오름차순(작을수록 먼저), 그 다음 최신순 */
function sortFeaturedFirst(a: PatchNoteLite, b: PatchNoteLite) {
  const af = a.featured ? 0 : 1
  const bf = b.featured ? 0 : 1
  if (af !== bf) return af - bf

  const ao = a.featuredOrder ?? 999
  const bo = b.featuredOrder ?? 999
  if (ao !== bo) return ao - bo

  return sortPatchByDateDesc(a, b)
}

export async function getPatchNotesAll(): Promise<PatchNoteLite[]> {
  const items = await readMdxDir<PatchNoteFrontMatter>(PATCH_DIR)

  const list: PatchNoteLite[] = items.map((it) => {
    const p = it.frontMatter as PatchNoteFrontMatter
    return {
      slug: safeString(p.slug, it.slug) || it.slug,
      title: safeString(p.title, it.slug),
      date: p.date,
      version: p.version,
      tags: p.tags,
      summary: p.summary,
      project: resolvePatchProject(p),
      links: p.links,

      featured: safeBoolean(p.featured, false),
      featuredOrder: safeNumber(p.featuredOrder),
    }
  })

  // 전체 리스트는 “최신순”을 기본으로 유지
  return list.sort(sortPatchByDateDesc)
}

type GetPatchNotesByProjectOptions = {
  /** 대표 패치만 보고 싶으면 true */
  featuredOnly?: boolean
  /** 대표 우선 + 부족하면 보충해서 limit 맞춤 (기본 true) */
  fillToLimit?: boolean
  /** 노출 개수 제한 (기본 6) */
  limit?: number
}

/**
 * 프로젝트별 패치노트
 * - 기본: 대표 우선 + 부족하면 보충 + 최대 6개
 * - 전체 타임라인이 필요하면 limit 크게 주거나 fillToLimit 끄면 됨
 */
export async function getPatchNotesByProject(
  projectSlug: string,
  options: GetPatchNotesByProjectOptions = {},
): Promise<PatchNoteLite[]> {
  const { featuredOnly = false, fillToLimit = true, limit = 6 } = options

  const all = await getPatchNotesAll()
  const key = projectSlug.trim()

  const scoped = all.filter((n) => (n.project ?? '').trim() === key)

  if (featuredOnly) {
    return scoped.filter((n) => n.featured).sort(sortFeaturedFirst).slice(0, limit)
  }

  // 대표 우선 정렬
  const sorted = scoped.sort(sortFeaturedFirst)

  if (!fillToLimit) {
    return sorted.slice(0, limit)
  }

  // 대표 먼저, 부족하면 나머지 최신순으로 보충
  const featured = sorted.filter((n) => n.featured).sort(sortFeaturedFirst)
  const rest = sorted.filter((n) => !n.featured).sort(sortPatchByDateDesc)

  return [...featured, ...rest].slice(0, limit)
}

export async function getPatchNoteSlugs(): Promise<string[]> {
  const items = await readMdxDir<PatchNoteFrontMatter>(PATCH_DIR)
  return items.map((it) => it.slug)
}

export async function getPatchNoteBySlug(slug: string): Promise<MdxItem<PatchNoteFrontMatter> | null> {
  const filePath = path.join(PATCH_DIR, `${slug}.mdx`)
  try {
    return await readMdxFile<PatchNoteFrontMatter>(filePath)
  } catch {
    return null
  }
}
