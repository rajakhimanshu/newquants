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
    id: 'H309',
    slug: 'h309-gbpusd-ny-rollover-fade',
    title: 'Does fading GBPUSD at the NY 17:00 rollover beat the same fade at 14:00?',
    category: 'Systematic Strategies',
    publishedAt: '2026-11-16',
    status: 'In Progress',
    decision: 'PAPER_CANDIDATE',
    question:
      'On GBPUSD M15, does fading the 17:00 America/New_York bar (rollover inventory pressure) beat fading the 14:00 bar on the same days after spread and slippage?',
    hypothesis:
      'NY 17:00 rollover forces GBPUSD inventory adjustments; fading that bar should beat the same fade at 14:00 when roll pressure is lighter.',
    dataset:
      'GBPUSD M15 (Proofbook book: fx_m15). Costs: retail spread + slippage. Locked train/validation; OOS unlocked after lab clear.',
    methodology:
      'Treatment: fade the M15 bar at 17:00 NY when prior range clears a 0.25 ATR gate, 1:1 ATR stop/target, 8-bar horizon, flat by NY close. Baseline: identical fade at 14:00 NY. Frozen clock — no retune of hours or RR.',
    evaluation:
      'Cost-adjusted hit rate and mean R on train, validation, then OOS. Paper only after OOS_PASS and a human paper label. Not live.',
    results:
      'Train 57.5% vs 44.1% (mean R +0.15); validation 61.3% vs 38.1% (mean R +0.24); OOS 59.4% vs 41.4% n=138 (mean R +0.16). Labelled PAPER_CANDIDATE.',
    limitations:
      'Single pair, single clock, frozen 1:1 geometry. Paper is not proof of live expectancy. Sibling clock variants (e.g. H429) are weaker and are not a second edge. Do not retune hours after seeing results.',
    conclusion:
      'PAPER_CANDIDATE. Cleared train/val/OOS on this frozen spec. Forward paper trading only — not an EA, not a live go. Execution work continues outside this public archive.',
    repoUrl: 'https://github.com/rajakhimanshu/quant-research-lab',
  },
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
    repoUrl: 'https://github.com/rajakhimanshu/quant-research-lab',
  },
]

export function getResearchBySlug(slug: string): ResearchEntry | undefined {
  return researchEntries.find((entry) => entry.slug === slug)
}
