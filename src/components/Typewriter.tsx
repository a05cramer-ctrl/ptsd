import type { ReactNode } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  text: string
  className?: string
  as?: 'div' | 'p' | 'span' | 'h1' | 'h2'
  speedMs?: number
  startDelayMs?: number
  after?: ReactNode
}

export function Typewriter({
  text,
  className,
  as: Tag = 'div',
  speedMs,
  startDelayMs,
  after,
}: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const { text: out, done } = useTypewriter(text, {
    speedMs,
    startDelayMs,
    enabled: !reducedMotion,
  })

  return (
    <Tag className={className}>
      <span className={!done ? 'type-caret pr-0.5' : undefined}>{out}</span>
      {done ? after : null}
    </Tag>
  )
}

