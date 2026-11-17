import { useReveal } from '../hooks/useReveal'

const steps = [
  { title: 'Observe', body: 'Identify a behaviour or question worth testing.' },
  { title: 'Hypothesise', body: 'State what evidence would support or contradict it.' },
  { title: 'Design', body: 'Lock data, assumptions, baseline, and evaluation criteria.' },
  { title: 'Test', body: 'Run the experiment with realistic costs applied.' },
  { title: 'Validate', body: 'Check robustness, leakage, and out-of-sample behaviour.' },
  { title: 'Document', body: 'Publish methods, results, limits, and next questions.' },
]

export function Methodology({ compact = false }: { compact?: boolean }) {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="methodology"
      className={`${compact ? 'section-nq-compact' : 'section-nq'} border-y border-line bg-surface`}
    >
      <div className="container-nq">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Methodology</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            A structured approach
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Ideas are hypotheses to investigate, not conclusions to assume.
          </p>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="reveal group relative border-t border-line pt-5">
              <span className="absolute top-5 right-0 font-mono text-[11px] text-soft transition group-hover:text-signal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="pr-8 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
