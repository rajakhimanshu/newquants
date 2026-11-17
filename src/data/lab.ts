/** Aggregate Proofbook lab stats — from HYPOTHESIS_SCOREBOARD.md as of 2026-11-17 */

export type LabDecisionFilter =
  | 'all'
  | 'REJECT'
  | 'NEEDS_DATA'
  | 'PAPER'
  | 'LIVE'

export interface LabScoreboardBucket {
  id: Exclude<LabDecisionFilter, 'all'>
  label: string
  shortLabel: string
  count: number
  /** Maps to `ResearchEntry.decision` when notes are published */
  researchDecisions: string[]
}

export interface LabScoreboard {
  asOfDate: string
  totalTested: number
  buckets: LabScoreboardBucket[]
  footnotes: string[]
}

export const labScoreboard: LabScoreboard = {
  asOfDate: '2026-11-17',
  totalTested: 1803,
  buckets: [
    {
      id: 'REJECT',
      label: 'Rejected',
      shortLabel: 'REJECT',
      count: 1688,
      researchDecisions: ['REJECT'],
    },
    {
      id: 'NEEDS_DATA',
      label: 'Needs more data',
      shortLabel: 'Needs data',
      count: 108,
      researchDecisions: ['NEEDS DATA', 'NEEDS_MORE_DATA'],
    },
    {
      id: 'PAPER',
      label: 'Paper candidates',
      shortLabel: 'Paper',
      count: 1,
      researchDecisions: ['PAPER', 'PAPER_CANDIDATE'],
    },
    {
      id: 'LIVE',
      label: 'Live survivors',
      shortLabel: 'Live',
      count: 0,
      researchDecisions: ['LIVE', 'SURVIVOR'],
    },
  ],
  footnotes: [
    'Scoreboard reflects Proofbook ledger counts from quant-research-lab — not every hypothesis has a public write-up.',
    'OOS stays sealed until a candidate clears locked train and validation.',
    'One FX paper candidate (H309 GBPUSD NY 17:00 fade) — paper only, not live. No live survivors.',
    'Retail algo execution for that paper rule lives in a separate private build repo — not this site.',
  ],
}

/** @deprecated Prefer labScoreboard — kept for any legacy imports */
export const labStats = [
  { label: 'Hypotheses tested', value: String(labScoreboard.totalTested) },
  ...labScoreboard.buckets.map((b) => ({ label: b.label, value: String(b.count) })),
]

export const labMarquee = [
  'FX majors + XAUUSD',
  'Spread + slippage costs',
  'Locked train / validation',
  'OOS sealed until survivor',
  'No grid · no martingale',
  'REJECT is closed',
  'Evidence before claims',
  '1803 frozen tests',
  '0 live survivors',
  'Python research lab',
]

export const labFilterChips: { id: LabDecisionFilter; label: string; count?: number }[] = [
  { id: 'all', label: 'All tested', count: labScoreboard.totalTested },
  ...labScoreboard.buckets.map((b) => ({
    id: b.id,
    label: b.shortLabel,
    count: b.count,
  })),
]

export const labBucketEmptyCopy: Record<Exclude<LabDecisionFilter, 'all'>, string> = {
  REJECT:
    'Most rejected specs stay internal. Filter shows published REJECT notes only — more may ship over time.',
  NEEDS_DATA:
    'More than a hundred hypotheses are still collecting evidence. No public note in this bucket yet.',
  PAPER:
    'One paper candidate exists in the lab (H309). A public write-up ships when the note is ready — paper is not live.',
  LIVE: 'No live survivors yet. OOS remains sealed until train and validation clear.',
}

export function normalizeResearchDecision(decision: string): string {
  return decision.trim().toUpperCase().replace(/\s+/g, '_')
}

export function decisionMatchesFilter(decision: string, filter: LabDecisionFilter): boolean {
  if (filter === 'all') return true
  const bucket = labScoreboard.buckets.find((b) => b.id === filter)
  if (!bucket) return false
  const normalized = normalizeResearchDecision(decision)
  return bucket.researchDecisions.some(
    (d) => normalizeResearchDecision(d) === normalized,
  )
}

export function bucketForResearchDecision(
  decision: string,
): LabScoreboardBucket | undefined {
  const normalized = normalizeResearchDecision(decision)
  return labScoreboard.buckets.find((b) =>
    b.researchDecisions.some((d) => normalizeResearchDecision(d) === normalized),
  )
}
