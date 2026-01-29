// src/components/RememberLastSeen.tsx
'use client'

import { useEffect } from 'react'
import { writeLastSeen } from '@/lib/lastSeen'

export function RememberLastSeen({
  type,
  slug,
}: {
  type: 'project' | 'patch'
  slug: string
}) {
  useEffect(() => {
    writeLastSeen({ type, slug })
  }, [type, slug])

  return null
}
