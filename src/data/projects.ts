export type ProjectStatus = 'Exploratory' | 'In Development' | 'Public' | 'Archived'

export interface Project {
  name: string
  description: string
  stack: string[]
  status: ProjectStatus
  repoUrl?: string
  docsUrl?: string
}

/**
 * Only real work. No fictional repositories.
 * Proofbook is the NewQuants research lab (Python) — public repo link added when published.
 */
export const projects: Project[] = [
  {
    name: 'Proofbook',
    description:
      'Retail FX + XAUUSD research lab: frozen hypotheses, cost-adjusted backtests, locked train/validation, and an honest reject ledger. Powers the NewQuants research notes.',
    stack: ['Python', 'MetaTrader5', 'pandas', 'pytest'],
    status: 'Public',
    repoUrl: 'https://github.com/rajakhimanshu/quant-research-lab',
  },
]
