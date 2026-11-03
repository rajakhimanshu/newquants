# NewQuants

Independent quantitative research and technology.

**Domain:** [https://newquants.xyz](https://newquants.xyz)  
**Tagline:** Research. Test. Understand.

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
