export type ResearchStatus = 'Planned' | 'In Progress' | 'Completed' | 'Archived'

export interface ResearchEntry {
  id: string
  title: string
  category: string
  publishedAt: string
  status: ResearchStatus
  decision: string
  question: string
  hypothesis: string
  dataset: string
  methodology: string
  evaluation: string
  results: string
  limitations: string
  conclusion: string
  slug: string
  repoUrl?: string
}

/**
 * Published research from the Proofbook lab (FX majors + XAUUSD).
 * Source: research/ledger.yaml — do not invent metrics.
 */
export const researchEntries: ResearchEntry[] = [
  {
    id: 'H1',
    slug: 'h1-event-reversal',
    title: 'Does a high-impact news filter improve large-bar fades?',
    category: 'Systematic Strategies',
    publishedAt: '2026-09-03',
    status: 'Completed',
    decision: 'REJECT',
    question:
      'When an H1 bar expands beyond 2.5 ATR, does restricting entries to high-impact news windows improve a fade versus the same large-bar fade with no news filter?',
    hypothesis:
      'High-impact news overshoots. Fading a large bar inside a news window should beat fading the same 2.5 ATR bar outside news.',
    dataset:
      'FX majors, H1 bars (Proofbook book: fx_h1). Costs applied as spread + slippage from lab config. Train/validation locked; OOS not unlocked (non-survivor).',
    methodology:
      'Treatment: fade large H1 bars (≥ 2.5 ATR) that occur in a high-impact news window, with a fixed 40% retrace exit rule. Baseline: identical large-bar fade with no news window filter. Same stop/target geometry on both arms. Frozen spec — no post-hoc retune of ATR multiple or retrace.',
    evaluation:
      'Cost-adjusted hit rate and expectancy on locked train vs validation. Reject if the news filter does not beat the unfiltered large-bar baseline, or if train/val gates fail.',
    results:
      'Train hit rate 67.8% (news filter) vs 72.0% (unfiltered large bar). The news filter underperformed the baseline.',
    limitations:
      'Single frozen geometry (2.5 ATR / 40% retrace). News calendar coverage and broker timing can differ from live execution. Result is not a claim about all event strategies — only this exact fade rule.',
    conclusion:
      'REJECT. Filtering large-bar fades to high-impact news made the rule worse than the unfiltered large bar. Spec closed — do not retune 2.5 ATR or 40% retrace to chase a better number.',
  },
]

export function getResearchBySlug(slug: string): ResearchEntry | undefined {
  return researchEntries.find((entry) => entry.slug === slug)
}
