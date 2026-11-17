import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-nq py-12 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-ink">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted">{siteConfig.tagline}</p>
            <p className="mt-3 text-sm text-soft">
              Independent quantitative research and technology.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div>
              <p className="mb-3 text-[12px] text-soft">Navigate</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a href="/#lab" className="hover:text-ink">
                    Lab
                  </a>
                </li>
                <li>
                  <Link to="/tools" className="hover:text-ink">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link to="/tools/monte-carlo" className="hover:text-ink">
                    Monte Carlo
                  </Link>
                </li>
                <li>
                  <Link to="/research" className="hover:text-ink">
                    Research
                  </Link>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-ink">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="/#methodology" className="hover:text-ink">
                    Methodology
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-ink">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[12px] text-soft">Social</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a href={siteConfig.linkedInUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-soft">
            NewQuants publishes research for informational and educational purposes. Historical
            backtests do not guarantee future results. Nothing on this website is investment advice
            or an offer to manage capital.
          </p>
          <p className="mt-4 text-[11px] text-soft">
            © {year} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
