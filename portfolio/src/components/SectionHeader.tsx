'use client'
import React from 'react'

export default function SectionHeader({
  label,
  title,
  desc,
  right,
}: {
  label: string
  title: string
  desc?: string
  right?: React.ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <div className="text-b5 muted">{label}</div>
        <div className="text-b2 mt-1">{title}</div>
        {desc ? <div className="text-b4 muted mt-1">{desc}</div> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  )
}
