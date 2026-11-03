import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteConfig } from '../../data/site'

const links = [
  { to: '/research', label: 'Research' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#methodology', label: 'Methodology' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const hashLink = (hash: string) => (location.pathname === '/' ? hash : `/${hash}`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'border-b border-line bg-paper/95 backdrop-blur-sm' : 'bg-paper/80'
      }`}
    >
      <nav className="container-nq flex h-14 items-center justify-between" aria-label="Primary">
        <Link to="/" className="text-sm font-semibold tracking-tight text-ink">
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) =>
            link.to.startsWith('/#') ? (
              <li key={link.to}>
                <a href={hashLink(link.to.slice(1))} className="text-[13px] text-muted hover:text-ink">
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-[13px] ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ),
          )}
          <li>
            <a
              href={siteConfig.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-ink px-3 py-1.5 text-[13px] font-medium text-paper"
            >
              Connect
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex rounded-md border border-line p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
          <ul className="container-nq flex flex-col py-3">
            {links.map((link) => (
              <li key={link.to}>
                {link.to.startsWith('/#') ? (
                  <a
                    href={hashLink(link.to.slice(1))}
                    className="block px-1 py-2.5 text-sm text-muted"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    to={link.to}
                    className="block px-1 py-2.5 text-sm text-muted"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
            <li className="pt-2">
              <a
                href={siteConfig.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md bg-ink px-3 py-2.5 text-center text-sm font-medium text-paper"
              >
                Connect
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
