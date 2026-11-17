import { ArrowUpRight, FlaskConical } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  labBucketEmptyCopy,
  labFilterChips,
  labMarquee,
  labScoreboard,
  type LabDecisionFilter,
  decisionMatchesFilter,
} from '../../data/lab'
import { researchEntries } from '../../data/research'
import { useReveal } from '../../hooks/useReveal'

export function LabExplorer() {
  const ref = useReveal<HTMLElement>()
  const [filter, setFilter] = useState<LabDecisionFilter>('all')
  const loop = [...labMarquee, ...labMarquee]

  const matchingNotes = useMemo(
    () => researchEntries.filter((e) => decisionMatchesFilter(e.decision, filter)),
    [filter],
  )

  const activeChip = labFilterChips.find((c) => c.id === filter)
  const emptyCopy =
    filter !== 'all' ? labBucketEmptyCopy[filter] : null

  return (
    <section
      ref={ref}
      id="lab"
      className="border-b border-line bg-surface"
      aria-label="Proofbook Lab explorer"
    >
      <div className="container-nq section-nq-compact">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Proofbook Lab</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Hypothesis scoreboard
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted">
              Real aggregate counts from the internal ledger. Filter by decision, open published
              notes — we do not list 1803 invented titles.
            </p>
            <p className="mt-2 font-mono text-[11px] text-soft">
              As of {labScoreboard.asOfDate} · {labScoreboard.totalTested} hypotheses tested
            </p>
          </div>
          <Link
            to="/tools/monte-carlo"
            className="btn-secondary shrink-0 self-start md:self-auto"
          >
            <FlaskConical size={15} aria-hidden />
            Test your own numbers
          </Link>
        </div>

        <div className="reveal mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="panel col-span-2 flex flex-col justify-center px-5 py-5 sm:col-span-1 lg:col-span-1">
            <p className="font-mono text-[11px] tracking-wide text-soft uppercase">
              Tested
            </p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-ink tabular-nums">
              {labScoreboard.totalTested}
            </p>
          </div>
          {labScoreboard.buckets.map((bucket) => (
            <button
              key={bucket.id}
              type="button"
              onClick={() => setFilter(bucket.id)}
              className={`panel text-left px-5 py-5 transition ${
                filter === bucket.id
                  ? 'ring-2 ring-signal/30 border-signal/20'
                  : 'hover:border-ink/15'
              }`}
            >
              <p className="font-mono text-[11px] tracking-wide text-soft uppercase">
                {bucket.shortLabel}
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-ink tabular-nums md:text-[2rem]">
                {bucket.count}
              </p>
            </button>
          ))}
        </div>

        <div className="reveal mt-6 flex flex-wrap gap-2">
          {labFilterChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilter(chip.id)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
                filter === chip.id
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line bg-paper text-muted hover:border-ink/25 hover:text-ink'
              }`}
            >
              {chip.label}
              {chip.count !== undefined ? (
                <span className="ml-1.5 font-mono text-[11px] opacity-80">{chip.count}</span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="reveal mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-sm font-semibold text-ink">
              Published notes
              {activeChip && filter !== 'all' ? (
                <span className="ml-2 font-normal text-muted">· {activeChip.label}</span>
              ) : null}
            </h3>
            <Link to="/research" className="text-[13px] text-muted hover:text-ink">
              Full archive
            </Link>
          </div>

          {matchingNotes.length > 0 ? (
            <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-panel)]">
              {matchingNotes.map((entry) => (
                <li key={entry.id}>
                  <Link
                    to={`/research/${entry.slug}`}
                    className="flex flex-col gap-3 px-5 py-5 transition hover:bg-[#f7f7f4] sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[12px] text-soft">
                        <span className="font-mono text-ink">{entry.id}</span>
                        <span className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[11px] text-ink">
                          {entry.decision}
                        </span>
                        <span>{entry.publishedAt}</span>
                      </div>
                      <h4 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                        {entry.title}
                      </h4>
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                        {entry.question}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink">
                      Read note
                      <ArrowUpRight size={14} aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="panel mt-4 px-5 py-6 text-sm leading-relaxed text-muted">
              {emptyCopy ?? (
                <>
                  One published note today (H1, REJECT). Use filters to see bucket counts vs public
                  write-ups.
                </>
              )}
            </div>
          )}
        </div>

        <ul className="reveal mt-8 space-y-2 border-t border-line pt-6">
          {labScoreboard.footnotes.map((note) => (
            <li key={note} className="text-xs leading-relaxed text-soft">
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line">
        <div className="container-nq overflow-hidden py-3.5">
          <div className="marquee-track" aria-hidden>
            {loop.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex items-center gap-2.5 text-[12px] tracking-wide text-soft whitespace-nowrap"
              >
                <span className="h-1 w-1 rounded-full bg-signal/70" />
                {item}
              </span>
            ))}
          </div>
          <p className="sr-only">
            Proofbook scoreboard as of {labScoreboard.asOfDate}. No live survivor. OOS sealed until
            train and validation clear.
          </p>
        </div>
      </div>
    </section>
  )
}
