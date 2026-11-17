import { ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  defaultMonteCarloInputs,
  runMonteCarlo,
  type MonteCarloInputs,
} from '../lib/monteCarlo'

function pct(n: number, digits = 1) {
  return `${(n * 100).toFixed(digits)}%`
}

function num(n: number | null, fallback = '—') {
  return n === null ? fallback : Math.round(n).toString()
}

export function MonteCarloPage() {
  const [inputs, setInputs] = useState<MonteCarloInputs>(defaultMonteCarloInputs)
  const [useDailyStop, setUseDailyStop] = useState(true)

  const effective: MonteCarloInputs = useMemo(
    () => ({
      ...inputs,
      dailyLossLimitPct: useDailyStop ? inputs.dailyLossLimitPct : null,
    }),
    [inputs, useDailyStop],
  )

  const summary = useMemo(() => runMonteCarlo(effective), [effective])

  const patch = <K extends keyof MonteCarloInputs>(key: K, value: MonteCarloInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <main className="min-h-[100dvh] border-b border-line pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="container-nq max-w-3xl">
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} aria-hidden />
          All tools
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Monte Carlo pass odds
        </h1>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">
          Fixed-R trades with independent outcomes. Simulates many equity paths to rough pass vs
          max-loss odds for a simple gain target and drawdown ceiling.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <form
            className="panel space-y-5 p-6"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Simulation inputs"
          >
            <label className="block">
              <span className="text-sm font-medium text-ink">Win rate</span>
              <span className="mt-1 block font-mono text-[12px] text-soft">
                {(inputs.winRate * 100).toFixed(1)}%
              </span>
              <input
                type="range"
                min={0.35}
                max={0.75}
                step={0.01}
                value={inputs.winRate}
                onChange={(e) => patch('winRate', Number(e.target.value))}
                className="mt-2 w-full accent-ink"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink">Average win (R)</span>
              <input
                type="number"
                min={0.5}
                max={5}
                step={0.1}
                value={inputs.avgWinR}
                onChange={(e) => patch('avgWinR', Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink">Risk per trade (% of balance)</span>
              <input
                type="number"
                min={0.25}
                max={3}
                step={0.25}
                value={inputs.riskPct}
                onChange={(e) => patch('riskPct', Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-ink">Pass target (+ %)</span>
                <input
                  type="number"
                  min={1}
                  max={30}
                  step={0.5}
                  value={inputs.targetGainPct}
                  onChange={(e) => patch('targetGainPct', Number(e.target.value))}
                  className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-ink">Max drawdown (%)</span>
                <input
                  type="number"
                  min={3}
                  max={25}
                  step={0.5}
                  value={inputs.maxDrawdownPct}
                  onChange={(e) => patch('maxDrawdownPct', Number(e.target.value))}
                  className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={useDailyStop}
                onChange={(e) => setUseDailyStop(e.target.checked)}
                className="h-4 w-4 rounded border-line"
              />
              Enforce daily loss limit
            </label>

            {useDailyStop ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-ink">Daily loss cap (%)</span>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    step={0.5}
                    value={inputs.dailyLossLimitPct ?? 5}
                    onChange={(e) => patch('dailyLossLimitPct', Number(e.target.value))}
                    className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-ink">Trades per day</span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    step={1}
                    value={inputs.tradesPerDay}
                    onChange={(e) => patch('tradesPerDay', Number(e.target.value))}
                    className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm"
                  />
                </label>
              </div>
            ) : null}

            <p className="text-[11px] leading-relaxed text-soft">
              {summary.paths.toLocaleString()} paths · up to {inputs.maxTradesPerPath} trades each.
              Runs in your browser; nothing is sent to a server.
            </p>
          </form>

          <div className="space-y-4">
            <div className="panel p-6">
              <p className="eyebrow">Simulated outcomes</p>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-sm text-muted">Estimated pass rate</dt>
                  <dd className="mt-1 text-4xl font-semibold tracking-tight text-ink tabular-nums">
                    {pct(summary.passRate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Hit max loss / daily stop</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-ink tabular-nums">
                    {pct(summary.failMaxLossRate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Median trades to pass (when passed)</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink tabular-nums">
                    {num(summary.medianTradesToPass)}
                    <span className="ml-2 text-sm font-normal text-soft">
                      IQR {num(summary.p25TradesToPass)}–{num(summary.p75TradesToPass)}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <p className="rounded-xl border border-line bg-surface p-5 text-xs leading-relaxed text-soft">
              This toy model assumes i.i.d. trades, fixed R, and no correlation — real markets violate
              all of that. Use it to sanity-check risk sizing, not to forecast funding challenges or
              live P&amp;L. Not investment advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
