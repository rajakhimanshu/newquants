import { labStats } from '../data/lab'
import { useReveal } from '../hooks/useReveal'

export function LabStrip() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="border-b border-line bg-surface" aria-label="Lab snapshot">
      <div className="container-nq grid grid-cols-2 gap-8 py-10 md:grid-cols-5 md:gap-6">
        {labStats.map((stat) => (
          <div key={stat.label} className="reveal">
            <p className="text-2xl font-semibold tracking-tight text-ink md:text-[1.75rem]">
              {stat.value}
            </p>
            <p className="mt-1 text-[12px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="container-nq border-t border-line py-3.5">
        <p className="reveal text-[12px] leading-relaxed text-soft">
          Proofbook scoreboard · as of 2026-10-11 · no live survivor · OOS sealed until train and
          validation clear
        </p>
      </div>
    </section>
  )
}
