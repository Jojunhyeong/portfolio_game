// src/components/HotkeyManager.tsx
'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Options = {
  enable?: boolean
}

export default function HotkeyManager({ enable = true }: Options) {
  const router = useRouter()
  const pathname = usePathname()


  useEffect(() => {
    if (!enable) return

    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null
      if (!el) return false
      const tag = (el.tagName || '').toLowerCase()
      return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return
      if (isTyping()) return

      const k = e.key

      // ESC: 뒤로(가능하면) / 아니면 홈
      if (k === 'Escape') {
        e.preventDefault()

        if (pathname?.startsWith('/contents/') || pathname?.startsWith('/patch-notes/')) {
          
          router.back()
        } else {
         
          router.push('/')
        }
        return
      }

      if (k === 'p' || k === 'P') {
        e.preventDefault()
      
        router.push('/patch-notes')
        return
      }

      if (k === 'c' || k === 'C') {
        e.preventDefault()
     
        router.push('/contents')
        return
      }

      if (k === 'h' || k === 'H') {
        e.preventDefault()
       
        router.push('/')
        return
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enable, pathname,  router])

  return null
}
