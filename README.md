# NewQuants

Independent quantitative research and technology — **public face** of the Proofbook lab.

**Domain:** [https://newquants.xyz](https://newquants.xyz)  
**Tagline:** Research. Test. Understand.

| | |
|---|---|
| **Lab archive** | [quant-research-lab](https://github.com/rajakhimanshu/quant-research-lab) |
| **Scoreboard (2026-11-17)** | **1803** frozen tests · **1688** REJECT · **1** PAPER_CANDIDATE (H309) · **0** live survivors |
| **Algo build (private)** | [algo-trading-system](https://github.com/rajakhimanshu/algo-trading-system) — paper/ARM, not this site |

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4
- GSAP + Three.js (hero mark)
- Vercel + Cloudflare DNS

## Develop

```bash
npm install
npm run dev
npm run build
```

## Content

| File | Purpose |
|------|---------|
| `src/data/site.ts` | Brand / social URLs |
| `src/data/founder.ts` | Founder profile |
| `src/data/research.ts` | Research archive entries |
| `src/data/projects.ts` | Public projects |
| `src/data/lab.ts` | Lab scoreboard stats |

## Deploy

1. Push to GitHub
2. Import in Vercel (framework: Vite)
3. Add `newquants.xyz` (+ optional `www`)
4. Apply the DNS records Vercel shows in Cloudflare
