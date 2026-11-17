export interface MonteCarloInputs {
  winRate: number
  avgWinR: number
  riskPct: number
  paths: number
  maxTradesPerPath: number
  targetGainPct: number
  maxDrawdownPct: number
  dailyLossLimitPct: number | null
  tradesPerDay: number
}

export interface MonteCarloSummary {
  paths: number
  passRate: number
  failMaxLossRate: number
  medianTradesToPass: number | null
  p25TradesToPass: number | null
  p75TradesToPass: number | null
}

function simulatePath(inputs: MonteCarloInputs): {
  passed: boolean
  failed: boolean
  tradesToPass: number | null
} {
  const {
    winRate,
    avgWinR,
    riskPct,
    maxTradesPerPath,
    targetGainPct,
    maxDrawdownPct,
    dailyLossLimitPct,
    tradesPerDay,
  } = inputs

  let equity = 100
  let peak = 100
  let dayLoss = 0
  let tradesToday = 0

  for (let t = 0; t < maxTradesPerPath; t++) {
    const win = Math.random() < winRate
    const delta = win ? avgWinR * riskPct : -riskPct
    equity += delta
    peak = Math.max(peak, equity)

    const drawdownPct = peak > 0 ? ((peak - equity) / peak) * 100 : 0
    if (drawdownPct >= maxDrawdownPct || equity <= 100 - maxDrawdownPct) {
      return { passed: false, failed: true, tradesToPass: null }
    }

    if (dailyLossLimitPct !== null && dailyLossLimitPct > 0) {
      dayLoss += delta < 0 ? Math.abs(delta) : 0
      tradesToday += 1
      if (dayLoss >= dailyLossLimitPct) {
        return { passed: false, failed: true, tradesToPass: null }
      }
      if (tradesToday >= tradesPerDay) {
        dayLoss = 0
        tradesToday = 0
      }
    }

    if (equity >= 100 + targetGainPct) {
      return { passed: true, failed: false, tradesToPass: t + 1 }
    }
  }

  return { passed: false, failed: false, tradesToPass: null }
}

function median(sorted: number[]): number | null {
  if (!sorted.length) return null
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1]! + sorted[mid]!) / 2
    : sorted[mid]!
}

function percentile(sorted: number[], p: number): number | null {
  if (!sorted.length) return null
  const idx = Math.floor((sorted.length - 1) * p)
  return sorted[idx] ?? null
}

export function runMonteCarlo(inputs: MonteCarloInputs): MonteCarloSummary {
  const clamped: MonteCarloInputs = {
    ...inputs,
    paths: Math.min(5000, Math.max(500, Math.round(inputs.paths))),
    winRate: Math.min(0.99, Math.max(0.01, inputs.winRate)),
    riskPct: Math.max(0.1, inputs.riskPct),
  }

  let passes = 0
  let fails = 0
  const tradesToPass: number[] = []

  for (let i = 0; i < clamped.paths; i++) {
    const result = simulatePath(clamped)
    if (result.passed) {
      passes += 1
      if (result.tradesToPass !== null) tradesToPass.push(result.tradesToPass)
    } else if (result.failed) {
      fails += 1
    }
  }

  tradesToPass.sort((a, b) => a - b)

  return {
    paths: clamped.paths,
    passRate: passes / clamped.paths,
    failMaxLossRate: fails / clamped.paths,
    medianTradesToPass: median(tradesToPass),
    p25TradesToPass: percentile(tradesToPass, 0.25),
    p75TradesToPass: percentile(tradesToPass, 0.75),
  }
}

export const defaultMonteCarloInputs: MonteCarloInputs = {
  winRate: 0.55,
  avgWinR: 1.2,
  riskPct: 1,
  paths: 3000,
  maxTradesPerPath: 500,
  targetGainPct: 10,
  maxDrawdownPct: 10,
  dailyLossLimitPct: 5,
  tradesPerDay: 5,
}
