'use client'

import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  delayClassName?: 'd-0' | 'd-1' | 'd-2' | 'd-3' | 'd-4'
  once?: boolean
  rootMargin?: string

  /** ✅ 첫 렌더에서 숨기지 않기 */
  initialVisible?: boolean
}

export default function Reveal({
  children,
  className = '',
  delayClassName = 'd-0',
  once = true,
  rootMargin = '0px 0px -12% 0px',
  initialVisible = true, // ✅ 기본값 true로
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(initialVisible)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { root: null, threshold: 0.12, rootMargin },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [once, rootMargin])

  return (
    <div
      ref={ref}
      className={[
        'reveal',
        delayClassName,
        inView ? 'reveal-in' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
