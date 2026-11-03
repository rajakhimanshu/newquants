import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'

/** Soft drifting dots behind the hero — fills empty canvas space. */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = prefersReducedMotion()
    let raf = 0
    let w = 0
    let h = 0

    const dots = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      a: 0.12 + Math.random() * 0.25,
    }))

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        if (!reduced) {
          d.x += d.vx
          d.y += d.vy
          if (d.x < 0 || d.x > 1) d.vx *= -1
          if (d.y < 0 || d.y > 1) d.vy *= -1
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(47, 111, 237, ${d.a})`
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.strokeStyle = 'rgba(23,23,23,0.04)'
      ctx.lineWidth = 1
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dx = (a.x - b.x) * w
          const dy = (a.y - b.y) * h
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            ctx.globalAlpha = 1 - dist / 120
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-80"
      aria-hidden
    />
  )
}
