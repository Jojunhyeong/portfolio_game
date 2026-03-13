'use client'
import { useEffect, useState } from 'react'

const LINES = [
  { text: 'INITIALIZING SYSTEM...', type: 'accent2' as const },
  { text: '> Loading Player Profile...', type: 'muted' as const },
  { text: '> Connecting Dev Network...', type: 'muted' as const },
  { text: '> Syncing Project Database...', type: 'muted' as const },
  { text: '> STATUS: ONLINE', type: 'ok' as const },
]
const DELAYS = [0, 420, 820, 1180, 1600]

const COLOR = {
  accent2: 'rgb(var(--accent-2))',
  muted: 'rgb(var(--muted))',
  ok: 'rgb(var(--ok))',
}

export default function SystemBoot() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timers = DELAYS.map((d, i) => setTimeout(() => setCount(i + 1), d))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      style={{
        padding: '14px 18px',
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 'var(--text-b4)',
        letterSpacing: '0.04em',
        background: 'rgba(6, 8, 14, 0.6)',
        borderRadius: '10px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        borderLeft: '2px solid rgba(0,229,255,0.5)',
      }}
    >
      {LINES.map((line, i) => {
        if (i >= count) return null
        return (
          <div key={i} style={{ color: COLOR[line.type], marginBottom: i < LINES.length - 1 ? '3px' : 0 }}>
            {line.text}
            {i === count - 1 && count < LINES.length && (
              <span className="blink ml-1" style={{ color: COLOR.accent2 }}>█</span>
            )}
          </div>
        )
      })}
      {count >= LINES.length && (
        <span className="blink" style={{ color: COLOR.ok }}>_</span>
      )}
    </div>
  )
}
