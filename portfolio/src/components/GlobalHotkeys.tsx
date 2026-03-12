'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function GlobalHotkeys() {
  const router = useRouter()
  const routerRef = useRef(router)
  routerRef.current = router

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return

      const key = e.key.toLowerCase()

      if (key === 'c') { e.preventDefault(); routerRef.current.push('/contents'); return }
      if (key === 'p') { e.preventDefault(); routerRef.current.push('/patch-notes'); return }
      if (key === 'h') { e.preventDefault(); routerRef.current.push('/'); return }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, []) // 빈 배열 — 마운트 시 1회만 등록

  return null
}
