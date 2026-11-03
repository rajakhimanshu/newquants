import { lazy, Suspense } from 'react'

const LabOrbit = lazy(() =>
  import('./LabOrbit').then((mod) => ({ default: mod.LabOrbit })),
)

export function LabOrbitLazy() {
  return (
    <Suspense fallback={<div className="h-full w-full bg-transparent" aria-hidden />}>
      <LabOrbit />
    </Suspense>
  )
}
