import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '../../lib/gsap'

/** Floating research preview — illustrative, not live market data. */
export function SignalField() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return

      gsap.to(root.current, {
        y: -10,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      const path = root.current.querySelector('.signal-path')
      if (path) {
        const length = (path as SVGPathElement).getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.inOut',
          delay: 0.45,
        })
      }
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-white/40 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.25rem] border border-white/70 bg-surface/90 shadow-[var(--shadow-float)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-signal" />
            <span className="text-[12px] text-muted">Research note</span>
          </div>
          <span className="font-mono text-[10px] text-soft">illustrative</span>
        </div>

        <div className="space-y-3 px-5 pt-5">
          <p className="text-[13px] font-medium text-ink">H — walk-forward validation</p>
          <p className="max-w-[18rem] text-[12px] leading-relaxed text-muted">
            Hypothesis tested across folds. Costs applied. Leakage checks recorded before any claim.
          </p>
        </div>

        <svg viewBox="0 0 420 180" className="mt-2 h-auto w-full px-2 pb-2">
          <defs>
            <linearGradient id="softFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F6FED" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2F6FED" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[48, 88, 128].map((y) => (
            <line key={y} x1="24" x2="396" y1={y} y2={y} stroke="rgba(23,23,23,0.06)" />
          ))}
          <path
            d="M28 120 C 70 108, 100 140, 140 92 S 210 50, 250 78 S 310 120, 350 70 S 380 48, 396 56 L 396 156 L 28 156 Z"
            fill="url(#softFill)"
          />
          <path
            className="signal-path"
            d="M28 120 C 70 108, 100 140, 140 92 S 210 50, 250 78 S 310 120, 350 70 S 380 48, 396 56"
            fill="none"
            stroke="#2F6FED"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
