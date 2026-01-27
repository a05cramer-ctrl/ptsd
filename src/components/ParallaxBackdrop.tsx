import { useEffect, useMemo, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  imageUrl: string
}

export function ParallaxBackdrop({ imageUrl }: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  const style = useMemo(
    () =>
      ({
        ['--bg' as string]: `url(${imageUrl})`,
      }) as React.CSSProperties,
    [imageUrl],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion) return

    let raf = 0
    let lastY = -1

    const onScroll = () => {
      const y = window.scrollY || 0
      if (y === lastY) return
      lastY = y
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // Keep the effect subtle — premium, not gimmicky
        const p1 = Math.min(160, y * 0.18)
        const p2 = Math.min(240, y * 0.28)
        el.style.setProperty('--p1', `${p1}px`)
        el.style.setProperty('--p2', `${p2}px`)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 parallax-root"
      style={style}
      aria-hidden="true"
    >
      <div className="parallax-layer parallax-photo" />
      <div className="parallax-layer parallax-smoke" />
      <div className="parallax-layer parallax-vignette" />
    </div>
  )
}

