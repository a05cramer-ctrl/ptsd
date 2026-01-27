import { useEffect, useMemo, useState } from 'react'

type Options = {
  speedMs?: number
  startDelayMs?: number
  enabled?: boolean
}

export function useTypewriter(text: string, options?: Options) {
  const speedMs = options?.speedMs ?? 18
  const startDelayMs = options?.startDelayMs ?? 0
  const enabled = options?.enabled ?? true

  const safeText = useMemo(() => text ?? '', [text])
  const [out, setOut] = useState(enabled ? '' : safeText)
  const [done, setDone] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      setOut(safeText)
      setDone(true)
      return
    }

    let t0: number | undefined
    let raf = 0
    let timeout = 0

    setOut('')
    setDone(false)

    const step = (ts: number) => {
      if (!t0) t0 = ts
      const elapsed = ts - t0
      const idx = Math.min(safeText.length, Math.floor(elapsed / speedMs))
      setOut(safeText.slice(0, idx))
      if (idx >= safeText.length) {
        setDone(true)
        return
      }
      raf = requestAnimationFrame(step)
    }

    timeout = window.setTimeout(() => {
      raf = requestAnimationFrame(step)
    }, startDelayMs)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [enabled, safeText, speedMs, startDelayMs])

  return { text: out, done }
}

