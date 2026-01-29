// src/components/Mdx.tsx
import * as React from 'react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

type Props = {
  /** 권장: source */
  source?: string
  /** 호환: content(옛 호출용) */
  content?: string
}

export async function Mdx({ source, content }: Props) {
  const mdxSource = source ?? content ?? ''

  const { default: MDXContent } = await evaluate(mdxSource, {
    ...runtime,
    // @ts-expect-error - evaluate 타입이 runtime 형태를 완벽히 명시하지 않음
    useDynamicImport: false,

    development: process.env.NODE_ENV !== 'production',
  })

  return <MDXContent />
}
