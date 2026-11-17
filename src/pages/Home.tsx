import { About } from '../components/About'
import { Collaboration } from '../components/Collaboration'
import { Hero } from '../components/Hero'
import { LabExplorer } from '../components/lab/LabExplorer'
import { Methodology } from '../components/Methodology'
import { Philosophy } from '../components/Philosophy'
import { Projects } from '../components/Projects'

export function Home() {
  return (
    <main>
      <Hero />
      <LabExplorer />
      <Methodology compact />
      <Projects compact />
      <Philosophy compact />
      <About compact />
      <Collaboration compact />
    </main>
  )
}
