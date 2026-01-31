// src/components/TopNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function TopNav() {
  const pathname = usePathname() ?? '/'
  const pathLabel = pathname === '/' ? '/home' : pathname

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* 상단 HUD haze */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="h-full w-full bg-gradient-to-b from-black/55 via-black/25 to-transparent backdrop-blur-md" />
      </div>

      <div className="shell">
        <div className="hud-bar mt-3">
          {/* LEFT */}
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/" className="hud-btn">
              ⛭ Launcher
            </Link>
            <span className="hud-path hidden md:inline">{pathLabel}</span>
          </div>

       <div className="hidden md:flex justify-self-center items-center">
  <span className="hud-chip">
    <span
      aria-hidden="true"
      style={{
        width: 9,
        height: 9,
        borderRadius: 9999,
        display: 'inline-block',
        flexShrink: 0,
        background: '#35ff6a', // ✅ 초록 강제
        boxShadow: '0 0 10px rgba(53,255,106,.75), 0 0 26px rgba(53,255,106,.35)', // ✅ 글로우
      }}
    />
    ONLINE
  </span>
</div>


          {/* RIGHT: 외부 링크 (데스크탑만) */}
          <div className="hidden sm:flex items-center justify-end gap-2">
            <a className="hud-btn" href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="hud-btn" href="https://velog.io/@jojh0323/posts" target="_blank" rel="noreferrer">
              Velog ↗
            </a>
            <a className="hud-btn" href="mailto:jojh0323@pukyong.ac.kr">
              Contact ✉
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
