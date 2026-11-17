import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const tools = [
  {
    slug: 'monte-carlo',
    title: 'Monte Carlo pass odds',
    description:
      'Browser-only simulation: estimate pass vs max-loss odds from win rate, R, and risk % — not a promise.',
  },
]

export function ToolsPage() {
  return (
    <main className="min-h-[100dvh] border-b border-line pt-28 pb-20 md:pt-32">
      <div className="container-nq max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={15} aria-hidden />
          Home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink">Tools</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Free utilities that stay on your device. Outputs are guides for thinking — not trade
          signals or investment advice.
        </p>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                to={`/tools/${tool.slug}`}
                className="flex flex-col gap-2 py-7 transition hover:bg-surface/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-ink">{tool.title}</h2>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
                    {tool.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-ink">
                  Open
                  <ArrowUpRight size={14} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
