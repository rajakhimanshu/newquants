import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'

export function Projects() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="projects" className="section-nq border-t border-line bg-surface">
      <div className="container-nq">
        <div className="reveal max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Research & engineering
          </h2>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Software that supports the research process. Only real work is listed.
          </p>
        </div>

        <ul className="mt-10 space-y-4">
          {projects.map((project) => (
            <li key={project.name} className="reveal panel p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
                <span className="rounded-md border border-line px-2 py-0.5 text-[12px] text-soft">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line px-2 py-0.5 text-[11px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              {!project.repoUrl && (
                <p className="mt-4 text-xs text-soft">Public repository pending</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
