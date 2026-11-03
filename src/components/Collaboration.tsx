import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export function Collaboration() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="contact" className="section-nq border-t border-line">
      <div className="container-nq">
        <div className="reveal panel overflow-hidden bg-ink p-8 text-paper sm:p-10 md:p-12">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight">
            Better research starts with better questions
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-paper/65">
            Conversations welcome with people working in quantitative finance, statistics, data
            science, systematic trading, and research engineering.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-paper px-4 py-2.5 text-sm font-medium text-ink transition hover:opacity-90"
            >
              LinkedIn
              <ArrowUpRight size={14} aria-hidden />
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-paper/20 px-4 py-2.5 text-sm font-medium text-paper transition hover:border-paper/45"
            >
              GitHub
              <ArrowUpRight size={14} aria-hidden />
            </a>
            {siteConfig.email ? (
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center px-2 py-2.5 text-sm text-paper/60 hover:text-paper"
              >
                {siteConfig.email}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
