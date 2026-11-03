import { founder } from './founder'

export const siteConfig = {
  name: 'NewQuants',
  domain: 'https://newquants.xyz',
  tagline: 'Research. Test. Understand.',
  title: 'NewQuants — Independent Quantitative Research',
  description:
    'NewQuants explores quantitative finance, systematic trading research, financial market behaviour, and research engineering through structured experimentation.',
  linkedInUrl: founder.linkedInUrl,
  githubUrl: founder.githubUrl,
  email: founder.email,
}

export function hasLinkedIn(): boolean {
  return Boolean(siteConfig.linkedInUrl)
}

export function hasGitHub(): boolean {
  return Boolean(siteConfig.githubUrl)
}

export function hasEmail(): boolean {
  return Boolean(siteConfig.email)
}
