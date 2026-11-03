import { useReveal } from '../hooks/useReveal'

const steps = [
  { title: 'Observe', body: 'Identify a behaviour or question worth testing.' },
  { title: 'Hypothesise', body: 'State what evidence would support or contradict it.' },
  { title: 'Design', body: 'Lock data, assumptions, baseline, and evaluation criteria.' },
  { title: 'Test', body: 'Run the experiment with realistic costs applied.' },
  { title: 'Validate', body: 'Check robustness, leakage, and out-of-sample behaviour.' },
  { title: 'Document', body: 'Publish methods, results, limits, and next questions.' },
]

export function Methodology() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="methodology" className="section-nq border-y border-line bg-surface">
      <div className="container-nq">
        <div className="reveal max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            A structured approach
          </h2>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Ideas are hypotheses to investigate, not conclusions to assume.
          </p>
        </div>

        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="reveal border-t border-line pt-4">
              <span className="font-mono text-[11px] text-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
