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
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Research archive</h2>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted">
              Published experiments from the lab. Failures are documented with the same structure as
              successes.
            </p>
          </div>
          <Link
            to="/research"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:opacity-70"
          >
            Open archive
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {researchEntries.map((entry) => (
            <li key={entry.id} className="reveal">
              <Link
                to={`/research/${entry.slug}`}
                className="flex flex-col gap-3 py-6 transition hover:bg-surface/70 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-soft">
                    <span className="font-mono text-ink">{entry.id}</span>
                    <span>{entry.decision}</span>
                    <span>{entry.publishedAt}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {entry.question}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-ink">Read</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
