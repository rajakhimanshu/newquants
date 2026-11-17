import { useReveal } from '../hooks/useReveal'

const principles = [
  {
    title: 'Reproducibility',
    body: 'Methods and assumptions should be inspectable where data and code allow.',
  },
  {
    title: 'Robustness',
    body: 'Results checked across periods and assumptions — not one favourable backtest.',
  },
  {
    title: 'Transparency',
    body: 'Limitations and important assumptions are stated honestly.',
  },
  {
    title: 'Continuous improvement',
    body: 'Each experiment should sharpen the next question or method.',
  },
]

export function Philosophy({ compact = false }: { compact?: boolean }) {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="philosophy"
      className={`${compact ? 'section-nq-compact' : 'section-nq'} border-t border-line`}
    >
      <div className="container-nq grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal">
          <p className="eyebrow">Principles</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Evidence over assumptions
          </h2>
          <p className="mt-5 max-w-[28ch] font-display text-3xl leading-snug text-ink italic md:text-4xl">
            Every hypothesis deserves a test.
          </p>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            We document what appears to work, what fails, and what remains uncertain. These are
            guiding principles — not a claim that every experiment already meets an ideal.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {principles.map((item) => (
            <article key={item.title} className="reveal border-t border-line pt-5">
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
