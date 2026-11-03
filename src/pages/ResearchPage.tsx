import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { researchEntries } from '../data/research'

export function ResearchPage() {
  return (
    <main className="min-h-[100dvh] border-b border-line pt-28 pb-20 md:pt-32">
      <div className="container-nq">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={15} aria-hidden />
          Home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink">Research</h1>
        <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-muted">
          Notes from the Proofbook lab. Each entry separates hypothesis, method, result, and
          limitation.
        </p>

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {researchEntries.map((entry) => (
            <li key={entry.id}>
              <Link
                to={`/research/${entry.slug}`}
                className="block py-7 transition hover:bg-surface/50"
              >
                <div className="flex flex-wrap gap-2 text-[12px] text-soft">
                  <span className="font-mono text-ink">{entry.id}</span>
                  <span>{entry.decision}</span>
                  <span>{entry.status}</span>
                  <span>{entry.publishedAt}</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                  {entry.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{entry.question}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
