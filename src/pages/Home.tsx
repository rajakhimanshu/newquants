import { About } from '../components/About'
import { Collaboration } from '../components/Collaboration'
import { Hero } from '../components/Hero'
import { LabStrip } from '../components/LabStrip'
import { Methodology } from '../components/Methodology'
import { Philosophy } from '../components/Philosophy'
import { Projects } from '../components/Projects'
import { ResearchAreas } from '../components/ResearchAreas'
import { ResearchTeaser } from '../components/ResearchTeaser'

export function Home() {
  return (
    <main>
      <Hero />
      <LabStrip />
      <ResearchAreas />
      <Methodology />
      <ResearchTeaser />
      <Projects />
      <Philosophy />
      <About />
      <Collaboration />
    </main>
  )
}
