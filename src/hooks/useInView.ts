import { RefObject, useEffect, useMemo, useRef, useState } from 'react'

type Options = IntersectionObserverInit & {
  once?: boolean
}

export function useInView<T extends HTMLElement>(options?: Options) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  const opts = useMemo<Options>(
    () => ({
      root: options?.root ?? null,
      rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
      threshold: options?.threshold ?? 0.12,
      once: options?.once ?? true,
    }),
    [options?.root, options?.rootMargin, options?.threshold, options?.once],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true)
        if (opts.once) observer.disconnect()
      } else if (!opts.once) {
        setInView(false)
      }
    }, opts)

    observer.observe(el)
    return () => observer.disconnect()
  }, [opts])

  return { ref: ref as RefObject<T>, inView }
}

