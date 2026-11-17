import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'

export function Projects({ compact = false }: { compact?: boolean }) {
  const ref = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="projects"
      className={`${compact ? 'section-nq-compact' : 'section-nq'} border-t border-line bg-surface`}
    >
      <div className="container-nq">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Build</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Research & engineering
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Software that supports the research process. Only real work is listed.
          </p>
        </div>

        <ul className="mt-12 space-y-4">
          {projects.map((project) => (
            <li
              key={project.name}
              className="reveal panel p-7 transition duration-200 hover:shadow-[var(--shadow-lift)] sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
                <span className="rounded-md border border-line bg-paper px-2.5 py-1 text-[12px] text-soft">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line bg-paper/80 px-2.5 py-1 text-[11px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              {!project.repoUrl && (
                <p className="mt-5 text-xs text-soft">Public repository pending</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
