'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GlobalHotkeys() {
  const router = useRouter()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase()

      // 입력폼에서 단축키 동작 X
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return

      const key = e.key.toLowerCase()

      if (key === 'escape') {
        e.preventDefault()
        router.back()
        return
      }
      if (key === 'c') {
        e.preventDefault()
        router.push('/contents')
        return
      }
      if (key === 'p') {
        e.preventDefault()
        router.push('/patch-notes')
        return
      }
      if (key === 'h') {
        e.preventDefault()
        router.push('/')
        return
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router])

  return null
}
