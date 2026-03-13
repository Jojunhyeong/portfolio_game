'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const LINES = [
  { text: '// JOSH PORTFOLIO', type: 'title' as const },
  { text: '─────────────────────────────────────', type: 'sep' as const },
  { text: 'INITIALIZING SYSTEM...', type: 'accent2' as const },
  { text: '> Loading Player Profile...', type: 'muted' as const },
  { text: '> Connecting Dev Network...', type: 'muted' as const },
  { text: '> Syncing Project Database...', type: 'muted' as const },
  { text: '> STATUS: ONLINE ✓', type: 'ok' as const },
]
const DELAYS_MS = [120, 200, 520, 960, 1360, 1720, 2200]

const COLOR: Record<(typeof LINES)[number]['type'], string> = {
  title: 'rgb(var(--accent-2))',
  sep: 'rgba(255,255,255,0.14)',
  accent2: 'rgb(var(--accent-2))',
  muted: 'rgb(var(--muted))',
  ok: 'rgb(var(--ok))',
}

const CORNER: React.CSSProperties = { position: 'absolute', width: 18, height: 18, pointerEvents: 'none' }

// 랜덤 문자 풀 — 해킹 느낌
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}|?/\\-_=+'
const TARGET = 'START'

/** 마우스 올리면 글자가 랜덤 스크램블 → TARGET으로 수렴 */
function ReadyButton({ onProceed, onUnlock }: { onProceed: () => void; onUnlock: () => void }) {
  const [label, setLabel] = useState('READY?')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startScramble = () => {
    if (timerRef.current) return // 이미 진행 중
    let frame = 0
    const totalFrames = TARGET.length * 6 // 각 글자가 약 6프레임 후 확정
    timerRef.current = setInterval(() => {
      frame++
      const next = TARGET.split('').map((ch, i) => {
        if (i < Math.floor(frame / 6)) return ch
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }).join('')
      setLabel(next)
      if (frame >= totalFrames) {
        clearInterval(timerRef.current!)
        timerRef.current = null
        setLabel(TARGET)
        onUnlock()
      }
    }, 38)
  }

  const stopScramble = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    setLabel('READY?')
  }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  return (
    <button
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      onClick={label === TARGET ? onProceed : undefined}
      style={{
        marginTop: 20,
        display: 'inline-block',
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: '0.22em',
        color: label === TARGET ? 'rgb(var(--accent-2))' : 'rgba(255,255,255,0.55)',
        textShadow: label === TARGET ? '0 0 18px rgba(0,229,255,0.85), 0 0 40px rgba(0,229,255,0.4)' : 'none',
        background: 'none',
        border: 'none',
        cursor: label === TARGET ? 'pointer' : 'default',
        padding: '8px 0',
        transition: 'color 80ms, text-shadow 80ms',
        outline: 'none',
        userSelect: 'none',
      }}
    >
      {label}
    </button>
  )
}

export default function SplashScreen() {
  const router = useRouter()
  const [count, setCount] = useState(0)
  const [ready, setReady] = useState(false)
  const [canProceed, setCanProceed] = useState(false)

  const proceed = useCallback(() => { router.push('/home') }, [router])

  useEffect(() => {
    const timers = DELAYS_MS.map((d, i) => setTimeout(() => setCount(i + 1), d))
    const readyTimer = setTimeout(() => setReady(true), DELAYS_MS[LINES.length - 1] + 400)
    return () => { timers.forEach(clearTimeout); clearTimeout(readyTimer) }
  }, [proceed])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (canProceed && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); proceed() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [canProceed, proceed])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(6,8,14,0.88)',
      }}
    >
      {/* Terminal window */}
      <div
        style={{
          position: 'relative',
          minWidth: 340,
          maxWidth: 480,
          width: '88%',
          padding: '28px 32px',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '13px',
          lineHeight: 1.75,
          letterSpacing: '0.04em',
          background: 'rgba(4,5,12,0.96)',
          borderRadius: 12,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          borderLeft: '2px solid rgba(0,229,255,0.65)',
          boxShadow: '0 0 60px rgba(0,229,255,0.07), 0 40px 100px rgba(0,0,0,0.85)',
        }}
      >
        {/* HUD corners */}
        <span style={{ ...CORNER, top: 8, left: 8, borderTop: '1.5px solid rgba(0,229,255,0.65)', borderLeft: '1.5px solid rgba(0,229,255,0.65)' }} />
        <span style={{ ...CORNER, top: 8, right: 8, borderTop: '1.5px solid rgba(0,229,255,0.5)', borderRight: '1.5px solid rgba(0,229,255,0.5)' }} />
        <span style={{ ...CORNER, bottom: 8, left: 8, borderBottom: '1.5px solid rgba(0,229,255,0.4)', borderLeft: '1.5px solid rgba(0,229,255,0.4)' }} />
        <span style={{ ...CORNER, bottom: 8, right: 8, borderBottom: '1.5px solid rgba(0,229,255,0.4)', borderRight: '1.5px solid rgba(0,229,255,0.4)' }} />

        {/* Boot lines */}
        {LINES.map((line, i) => {
          if (i >= count) return null
          return (
            <div
              key={i}
              style={{
                color: COLOR[line.type],
                marginBottom: line.type === 'sep' ? 8 : 2,
                fontWeight: line.type === 'title' ? 700 : 400,
              }}
            >
              {line.text}
              {i === count - 1 && !ready && (
                <span className="blink" style={{ marginLeft: 6, color: 'rgb(var(--accent-2))' }}>█</span>
              )}
            </div>
          )
        })}

        {/* READY? → START 스크램블 버튼 */}
        {ready && <ReadyButton onProceed={proceed} onUnlock={() => setCanProceed(true)} />}
      </div>
    </div>
  )
}
