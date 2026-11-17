import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { researchEntries } from '../data/research'
import { useReveal } from '../hooks/useReveal'

export function ResearchTeaser() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="research-teaser" className="section-nq">
      <div className="container-nq">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Archive</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Research archive
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">
              Published experiments from the lab. Failures are documented with the same structure as
              successes.
            </p>
          </div>
          <Link
            to="/research"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink transition hover:border-ink/25"
          >
            Open archive
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-panel)]">
          {researchEntries.map((entry) => (
            <li key={entry.id} className="reveal">
              <Link
                to={`/research/${entry.slug}`}
                className="flex flex-col gap-3 px-5 py-6 transition hover:bg-[#f7f7f4] sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-7"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-soft">
                    <span className="font-mono text-ink">{entry.id}</span>
                    <span className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[11px] text-ink">
                      {entry.decision}
                    </span>
                    <span>{entry.publishedAt}</span>
                  </div>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-ink">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {entry.question}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink">
                  Read
                  <ArrowUpRight size={14} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
