import { labMarquee, labStats } from '../data/lab'
import { useReveal } from '../hooks/useReveal'

export function LabStrip() {
  const ref = useReveal<HTMLElement>()
  const loop = [...labMarquee, ...labMarquee]

  return (
    <section ref={ref} className="border-b border-line bg-surface" aria-label="Lab snapshot">
      <div className="container-nq grid grid-cols-2 gap-x-6 gap-y-8 py-12 md:grid-cols-5 md:gap-6 md:py-14">
        {labStats.map((stat) => (
          <div key={stat.label} className="reveal">
            <p className="font-mono text-[11px] tracking-wide text-soft uppercase">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-[2rem]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-nq overflow-hidden py-3.5">
          <div className="marquee-track" aria-hidden>
            {loop.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex items-center gap-2.5 text-[12px] tracking-wide text-soft whitespace-nowrap"
              >
                <span className="h-1 w-1 rounded-full bg-signal/70" />
                {item}
              </span>
            ))}
          </div>
          <p className="sr-only">
            Proofbook scoreboard as of 2026-11-17. 1803 frozen tests. One paper candidate. No live
            survivor. OOS sealed until train and validation clear.
          </p>
        </div>
      </div>
    </section>
  )
}
