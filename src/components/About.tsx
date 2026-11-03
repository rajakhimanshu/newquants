import { ArrowUpRight } from 'lucide-react'
import { founder } from '../data/founder'
import { useReveal } from '../hooks/useReveal'

export function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="about" className="section-nq border-t border-line bg-surface">
      <div className="container-nq">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="reveal">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">{founder.name}</h2>
            <p className="mt-2 text-sm text-muted">{founder.role}, NewQuants</p>
          </div>
          <div className="reveal max-w-xl">
            <p className="text-[15px] leading-relaxed text-muted">{founder.headline}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{founder.summary}</p>
            <p className="mt-4 text-sm text-soft">
              {founder.location} · {founder.studying}
            </p>
            <a
              href={founder.personalSite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:opacity-70"
            >
              himanshurajak.in
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </div>

        <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {founder.milestones.map((item) => (
            <div key={item.label} className="reveal">
              <dt className="text-[12px] text-soft">{item.label}</dt>
              <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
