import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getResearchBySlug } from '../data/research'

export function ResearchNotePage() {
  const { slug = '' } = useParams()
  const entry = getResearchBySlug(slug)

  if (!entry) {
    return <Navigate to="/research" replace />
  }

  const blocks = [
    { label: 'Research question', body: entry.question },
    { label: 'Hypothesis', body: entry.hypothesis },
    { label: 'Dataset', body: entry.dataset },
    { label: 'Methodology', body: entry.methodology },
    { label: 'Evaluation', body: entry.evaluation },
    { label: 'Results', body: entry.results },
    { label: 'Limitations', body: entry.limitations },
    { label: 'Conclusion', body: entry.conclusion },
  ]

  return (
    <main className="min-h-[100dvh] border-b border-line pt-28 pb-20 md:pt-32 md:pb-28">
      <article className="container-nq max-w-3xl">
        <Link
          to="/research"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} aria-hidden />
          Research archive
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-[12px]">
          <span className="rounded-md bg-ink px-2 py-1 font-mono text-paper">{entry.id}</span>
          <span className="rounded-md border border-line px-2 py-1 font-mono text-muted">
            {entry.decision}
          </span>
          <span className="rounded-md border border-line px-2 py-1 font-mono text-muted">
            {entry.status}
          </span>
          <span className="font-mono text-soft">{entry.publishedAt}</span>
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {entry.title}
        </h1>
        <p className="mt-3 text-sm text-muted">{entry.category} · Proofbook lab</p>

        <div className="mt-10 space-y-8">
          {blocks.map((block) => (
            <section key={block.label} className="border-t border-line pt-6">
              <h2 className="text-sm font-semibold text-ink">{block.label}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{block.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 rounded-xl border border-line bg-surface p-5 text-xs leading-relaxed text-soft">
          Historical results do not guarantee future performance. This note documents a frozen
          experiment from an individual retail research lab — not investment advice.
        </p>
      </article>
    </main>
  )
}
