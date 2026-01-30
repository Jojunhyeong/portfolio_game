// src/components/BottomDock.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ITEMS = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/contents', label: 'Contents', icon: '▦' },
  { href: '/patch-notes', label: 'Patch', icon: '⟳' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function BottomDock() {
  const pathname = usePathname() ?? '/'

  return (
    <div className="fixed  bottom-4 z-50 right-4">
      <div className="shell">
        <div className="dock" role="navigation" aria-label="Bottom navigation">
          {ITEMS.map((it) => {
            const active = isActive(pathname, it.href)
            return (
              <Link key={it.href} href={it.href} className={active ? 'dock-item is-active' : 'dock-item'}>
                <span className="dock-ic" aria-hidden="true">
                  {it.icon}
                </span>
                <span className="dock-tx">{it.label}</span>
              </Link>
            )
          })}



          
        </div>
      </div>
    </div>
  )
}
