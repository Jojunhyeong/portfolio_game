'use client'

import React from 'react'

type Props = {
  children: React.ReactNode
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
}

export default function MountSection({ children, delay = 0, className = '' }: Props) {
  return (
    <div className={`mount-reveal d-${delay} ${className}`}>
      {children}
    </div>
  )
}
