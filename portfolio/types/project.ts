// src/types/project.ts
export type ProjectStatus = 'DONE' | 'WIP' | 'ARCHIVED'

export type ProjectItem = {
  slug: string
  title: string
  summary: string
  tags?: string[]
  stack?: string[]
  featured?: boolean
  order?: number
  status?: ProjectStatus
  updatedAt?: string // '2026-01-28' 같은 ISO string 권장
  cover?: { src: string; alt?: string } // optional
}
