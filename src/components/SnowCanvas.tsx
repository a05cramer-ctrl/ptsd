import { useEffect, useRef } from 'react'

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  wind: number
  opacity: number
  wobble: number
}

export function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let snowflakes: Snowflake[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createSnowflakes = () => {
      // LOTS of snowflakes for INTENSE effect
      const count = Math.floor((canvas.width * canvas.height) / 2500)
      snowflakes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        speed: Math.random() * 3 + 1,
        wind: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        wobble: Math.random() * Math.PI * 2,
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach((flake) => {
        // Draw snowflake
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
        ctx.fill()

        // Some flakes have a glow effect
        if (flake.radius > 2.5) {
          ctx.shadowColor = 'rgba(200, 230, 255, 0.8)'
          ctx.shadowBlur = 10
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Update position with wobble
        flake.wobble += 0.02
        flake.y += flake.speed
        flake.x += flake.wind + Math.sin(flake.wobble) * 0.8

        // Reset if off screen
        if (flake.y > canvas.height + flake.radius) {
          flake.y = -flake.radius
          flake.x = Math.random() * canvas.width
        }
        if (flake.x > canvas.width + flake.radius) {
          flake.x = -flake.radius
        }
        if (flake.x < -flake.radius) {
          flake.x = canvas.width + flake.radius
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    createSnowflakes()
    animate()

    const handleResize = () => {
      resize()
      createSnowflakes()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  )
}
