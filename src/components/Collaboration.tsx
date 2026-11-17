import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export function Collaboration({ compact = false }: { compact?: boolean }) {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="contact"
      className={`${compact ? 'section-nq-compact' : 'section-nq'} border-t border-line`}
    >
      <div className="container-nq">
        <div className="reveal relative overflow-hidden rounded-[1.35rem] bg-ink p-8 text-paper shadow-[var(--shadow-lift)] sm:p-10 md:p-14">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 55% 70% at 90% 10%, rgba(29,78,216,0.35), transparent 55%), radial-gradient(ellipse 40% 50% at 0% 100%, rgba(251,251,249,0.06), transparent 50%)',
            }}
          />
          <div className="relative">
            <p className="text-[12px] font-medium tracking-[0.14em] text-paper/45 uppercase">
              Collaborate
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              Better research starts with better questions
            </h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-paper/60">
              Conversations welcome with people working in quantitative finance, statistics, data
              science, systematic trading, and research engineering.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={siteConfig.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-paper px-4 py-2.5 text-sm font-medium text-ink transition hover:opacity-90"
              >
                LinkedIn
                <ArrowUpRight size={14} aria-hidden />
              </a>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-paper/20 px-4 py-2.5 text-sm font-medium text-paper transition hover:border-paper/45"
              >
                GitHub
                <ArrowUpRight size={14} aria-hidden />
              </a>
              {siteConfig.email ? (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center px-2 py-2.5 text-sm text-paper/55 transition hover:text-paper"
                >
                  {siteConfig.email}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
