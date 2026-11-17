import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../data/site'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { LabOrbitLazy } from './graphics/LabOrbitLazy'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .from('.hero-reveal', { y: 22, opacity: 0, duration: 0.7, stagger: 0.09 })
        .from('.hero-visual', { opacity: 0, y: 18, scale: 0.97, duration: 1 }, '-=0.45')
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 mesh-hero" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-fade" aria-hidden />
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden />

      <div className="container-nq relative grid min-h-0 items-center gap-8 pt-24 pb-12 md:grid-cols-[1.05fr_0.85fr] md:gap-6 md:pt-28 md:pb-14 lg:pb-16">
        <div className="max-w-xl">
          <p className="hero-reveal eyebrow">{siteConfig.name}</p>

          <h1 className="hero-reveal mt-4 text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Research. Test.{' '}
            <span className="font-display text-[1.06em] font-normal italic text-signal">
              Understand.
            </span>
          </h1>

          <p className="hero-reveal mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted">
            Explore the live hypothesis scoreboard and run your own risk math — costs and limits
            included, hype excluded.
          </p>

          <div className="hero-reveal mt-7 flex flex-wrap gap-3">
            <a href="#lab" className="btn-primary">
              Open Proofbook Lab
              <ArrowRight size={15} aria-hidden />
            </a>
            <Link to="/tools/monte-carlo" className="btn-secondary">
              Monte Carlo tool
            </Link>
          </div>
        </div>

        <div className="hero-visual relative hidden items-center justify-center md:flex md:justify-end">
          <div
            className="pointer-events-none absolute h-[60%] w-[60%] rounded-full bg-signal/10 blur-3xl"
            aria-hidden
          />
          <div className="relative w-full max-w-[320px] lg:max-w-[360px]">
            <div className="aspect-square w-full">
              <LabOrbitLazy />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
