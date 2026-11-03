import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { researchEntries } from '../data/research'
import { siteConfig } from '../data/site'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { LabOrbitLazy } from './graphics/LabOrbitLazy'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const latest = researchEntries[0]

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .from('.hero-reveal', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 })
        .from('.hero-visual', { opacity: 0, y: 12, duration: 0.85 }, '-=0.4')
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 85% 35%, rgba(29,78,216,0.06), transparent 70%)',
        }}
      />

      <div className="container-nq relative grid items-center gap-12 pt-28 pb-16 md:pt-32 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="max-w-xl">
          <p className="hero-reveal text-[13px] tracking-wide text-muted">
            Independent quantitative research
          </p>
          <h1 className="hero-reveal mt-4 text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Research. Test.
            <br />
            Understand.
          </h1>
          <p className="hero-reveal mt-5 max-w-[42ch] text-[15px] leading-relaxed text-muted">
            NewQuants investigates systematic trading and market behaviour through structured
            experiments — with costs, locked samples, and published limitations.
          </p>

          <div className="hero-reveal mt-8 flex flex-wrap gap-3">
            <Link to="/research" className="btn-primary">
              Research archive
              <ArrowRight size={15} aria-hidden />
            </Link>
            <a
              href={siteConfig.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Connect
            </a>
          </div>

          <dl className="hero-reveal mt-10 grid grid-cols-3 gap-5 border-t border-line pt-6">
            {[
              { k: 'Universe', v: 'FX + XAUUSD' },
              { k: 'Lab', v: 'Proofbook' },
              { k: 'Standard', v: 'Cost-adjusted' },
            ].map((item) => (
              <div key={item.k}>
                <dt className="text-[11px] uppercase tracking-wide text-soft">{item.k}</dt>
                <dd className="mt-1.5 text-sm font-medium text-ink">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-visual flex flex-col items-center gap-5 lg:items-end">
          <div className="w-full max-w-[380px] lg:max-w-[420px]">
            <div className="aspect-square w-full">
              <LabOrbitLazy />
            </div>
          </div>

          {latest ? (
            <Link
              to={`/research/${latest.slug}`}
              className="panel w-full max-w-[420px] p-5 transition hover:border-ink/25"
            >
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-soft">
                <span className="font-mono text-ink">{latest.id}</span>
                <span>·</span>
                <span className="font-mono">{latest.decision}</span>
                <span>·</span>
                <span>{latest.publishedAt}</span>
              </div>
              <p className="mt-2 text-sm font-medium leading-snug text-ink">{latest.title}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
                Read the note
                <ArrowRight size={14} aria-hidden />
              </p>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
