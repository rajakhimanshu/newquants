import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'

/** Subtle scroll reveal for section roots. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return
      const targets = ref.current.querySelectorAll('.reveal')
      if (!targets.length) return

      gsap.from(targets, {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
        },
      })
    },
    { scope: ref },
  )

  return ref
}
