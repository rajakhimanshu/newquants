import { useReveal } from '../hooks/useReveal'

const areas = [
  {
    title: 'Market Behaviour',
    description:
      'Price dynamics, volatility, regimes, and statistical properties of financial time series.',
  },
  {
    title: 'Systematic Strategies',
    description:
      'Rules-based hypotheses tested on historical data with explicit baselines and costs.',
  },
  {
    title: 'Quantitative Tools',
    description:
      'Research infrastructure for repeatable analysis, experiment tracking, and evaluation.',
  },
  {
    title: 'Research Validation',
    description:
      'Out-of-sample checks, leakage controls, robustness, and multiple-testing discipline.',
  },
]

export function ResearchAreas() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="focus" className="section-nq">
      <div className="container-nq">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Focus</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            What we investigate
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Research interests — not a claim that every topic already has a completed edge.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[var(--shadow-panel)] sm:grid-cols-2">
          {areas.map((area, i) => (
            <article
              key={area.title}
              className="reveal group bg-surface p-7 transition-colors duration-200 hover:bg-[#f7f7f4] sm:p-9"
            >
              <span className="font-mono text-[11px] text-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">{area.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
