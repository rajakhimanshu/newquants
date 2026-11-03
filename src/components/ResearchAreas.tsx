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
          <h2 className="text-3xl font-semibold tracking-tight text-ink">What we investigate</h2>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Research interests — not a claim that every topic already has a completed edge.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {areas.map((area) => (
            <article key={area.title} className="reveal bg-surface p-6 sm:p-8">
              <h3 className="text-base font-semibold text-ink">{area.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
