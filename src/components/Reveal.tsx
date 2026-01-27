import type { PropsWithChildren } from 'react'
import { useInView } from '../hooks/useInView'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = PropsWithChildren<{
  className?: string
  delayMs?: number
}>

export function Reveal({ children, className, delayMs = 0 }: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ once: true })

  const shown = reducedMotion ? true : inView
  return (
    <div
      ref={ref}
      className={[
        'will-change-transform',
        'transition-all duration-700 ease-out',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className ?? '',
      ].join(' ')}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}

