import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Shell() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
      }
      return
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
