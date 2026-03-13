// src/components/TopNav.tsx
'use client'

import Link from 'next/link'

import React from 'react'

export default function TopNav() {
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
            <Link href="/home" className="hud-btn">
              ⛭ Launcher
            </Link>
            <span className="hud-path hidden md:inline text-b5" style={{ letterSpacing: '0.06em' }}>
              <span style={{ opacity: 0.4, marginRight: '6px' }}>Shortcut:</span>
              <Link href="/contents" className="hover:text-white/70 transition-colors"><span style={{ color: 'rgb(var(--accent))' }}>C</span> Projects</Link>
              <span className="mx-1.5 opacity-30">·</span>
              <Link href="/patch-notes" className="hover:text-white/70 transition-colors"><span style={{ color: 'rgb(var(--accent))' }}>P</span> Patch Notes</Link>
              <span className="mx-1.5 opacity-30">·</span>
              <Link href="/home" className="hover:text-white/70 transition-colors"><span style={{ color: 'rgb(var(--accent))' }}>H</span> Home</Link>
            </span>
          </div>

       <div className="hidden md:flex justify-self-center items-center">
  <span
                  className="flex items-center gap-1.5 px-2 py-1 text-b5 rounded-md border"
                  style={{ color: 'rgb(var(--ok))', borderColor: 'rgba(var(--ok),0.35)', background: 'rgba(var(--ok),0.07)' }}
                >
                  <span className="blink inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgb(var(--ok))', boxShadow: '0 0 6px rgba(var(--ok),0.8)' }} />
                  ONLINE
                </span>
</div>


          {/* RIGHT: 외부 링크 (데스크탑만) */}
          <div className="hidden sm:flex items-center justify-end gap-2">
            <a className="hud-btn" href="https://github.com/Jojunhyeong" target="_blank" rel="noreferrer">
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
