# NewQuants — Site Definition (AI Handoff)

Copy this whole file into another AI when updating **newquants.xyz** or rebuilding parts of the site. Treat it as source of truth for brand, product, content rules, and architecture.

---

## 1. What this is

**NewQuants** is an independent quantitative research lab website — not a prop firm, not a signal service, not a SaaS trading journal clone.

| | |
|--|--|
| **Live URL** | https://newquants.xyz |
| **WWW** | https://www.newquants.xyz → 308 redirect to apex |
| **Vercel alias** | https://newquants-nu.vercel.app |
| **Tagline** | Research. Test. Understand. |
| **Positioning** | Structured experiments on FX + XAUUSD with costs, locked samples, published limitations |

**Core promise:** Evidence over marketing curves. Failures are documented with the same structure as successes.

**Internal research engine:** **Proofbook** (Python lab). The website is the public surface of Proofbook — scoreboard + research notes + free tools.

---

## 2. Brand voice

- Precise, calm, technical — not hype
- Prefer “hypothesis / REJECT / costs / locked train–validation” over “guaranteed edge / profitable strategy”
- Never invent backtest metrics, win rates, or unpublished hypothesis titles
- Disclaimers: informational/educational; past results ≠ future; not investment advice

### Do

- Show honest zeros (paper candidates: 0, live survivors: 0)
- Distinguish **aggregate lab counts** (1803 tested as of 2026-11-17) vs **public write-ups** (currently few notes)
- Link tools as guides, not promises

### Don’t

- Invent 1803 fake hypothesis titles to fill the Lab UI
- Claim live trading performance you don’t have
- Copy TradersCasa / FX Replay as a full product (bar replay journal SaaS is out of scope)
- Use purple-glow AI SaaS aesthetic or generic Inter/Roboto “startup” look

---

## 3. Visual system

Light research-lab aesthetic (not dark mode by default).

### Tokens (`src/index.css` `@theme`)

| Token | Value | Role |
|-------|--------|------|
| `paper` | `#f3f2ee` | Page background |
| `surface` | `#fbfbf9` | Panels / cards |
| `ink` | `#111110` | Primary text / buttons |
| `muted` | `#5c5b57` | Body secondary |
| `soft` | `#8f8e89` | Eyebrows / meta |
| `line` | `#e2e1db` | Borders |
| `signal` | `#1d4ed8` | Accent (italic display word, dots, hover) |

### Typography

- **Sans:** Outfit — UI and headlines
- **Display accent:** Instrument Serif italic — used sparingly (e.g. hero “*Understand.*” in `signal` blue)
- **Mono:** IBM Plex Mono — IDs, stats, filters, lab labels

### UI patterns

- Utility classes: `.container-nq`, `.section-nq`, `.section-nq-compact`, `.panel`, `.btn-primary`, `.btn-secondary`, `.eyebrow`, `.mesh-hero`, `.grid-fade`
- Hero atmosphere: soft blue radial + faint grid + light noise (not heavy glow)
- Nav mark: black rounded square **NQ** + blue corner dot
- Motion: GSAP reveals (`useReveal`); Three.js LabOrbit is **lazy-loaded** (hero only)
- Prefer fewer brochure sections; Lab + Tools should own attention

---

## 4. Product surfaces (what users can do)

### A. Proofbook Lab Explorer (homepage centerpiece)

- Route / anchor: `/#lab`
- File: `src/components/lab/LabExplorer.tsx`
- Data: `src/data/lab.ts` → `labScoreboard`

**Scoreboard (as of 2026-11-17 — update from Proofbook, do not invent):**

| Metric | Value |
|--------|------:|
| Hypotheses tested | 1803 |
| Rejected | 1688 |
| Needs more data | 108 |
| Paper candidates | 1 |
| Live survivors | 0 |

**Behavior:**

1. Filter chips: All / REJECT / Needs data / Paper / Live
2. List **published** research notes that match the filter (`src/data/research.ts`)
3. Empty states use `labBucketEmptyCopy` when no public note exists for that bucket
4. CTA to Monte Carlo tool (“Test your own numbers”)
5. Click note → `/research/:slug`

### B. Research archive

- `/research` — list
- `/research/:slug` — structured note (question, hypothesis, dataset, methodology, evaluation, results, limitations, conclusion, decision)

**Published today:** H1 only (`h1-event-reversal`) — decision **REJECT**. Add new notes only from real Proofbook ledger content.

### C. Free tools

- `/tools` — tools index
- `/tools/monte-carlo` — browser-only Monte Carlo risk / challenge pass-odds simulator  
  - Lib: `src/lib/monteCarlo.ts`  
  - Inputs: win rate, avg win R, risk %, optional daily stop, max DD / target  
  - Outputs: pass rate, hit-max-loss %, median trades-to-target  
  - No backend; no data saved; disclaimer required

### D. Supporting sections (homepage, compact)

Hero → LabExplorer → Methodology → Projects → Philosophy → About → Collaboration (contact)

Legacy / unused on home (still in repo): `ResearchAreas`, `ResearchTeaser`, `LabStrip` — prefer LabExplorer over re-adding brochure spam.

---

## 5. Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/research` | Research archive |
| `/research/:slug` | Research note |
| `/tools` | Tools index |
| `/tools/monte-carlo` | Monte Carlo tool |
| `*` | Redirect → `/` |

Shell: Navbar + Outlet + Footer + Vercel Analytics + Speed Insights (`src/components/layout/Shell.tsx`).

---

## 6. Content data files (edit these to update site content)

| File | Purpose |
|------|---------|
| `src/data/site.ts` | Brand name, domain, SEO description, social URLs |
| `src/data/founder.ts` | Founder profile, milestones, links |
| `src/data/lab.ts` | Scoreboard aggregates, filters, empty copy, marquee |
| `src/data/research.ts` | Published research notes (**do not invent metrics**) |
| `src/data/projects.ts` | Public projects (Proofbook, etc.) |

---

## 7. Tech stack

- **App:** React 19 + Vite 8 + TypeScript + React Router 7
- **CSS:** Tailwind CSS v4 (`@import 'tailwindcss'` + `@theme` in `src/index.css`)
- **Motion / 3D:** GSAP + `@gsap/react`; Three.js (LabOrbit lazy)
- **Icons:** lucide-react
- **Hosting:** Vercel (framework: Vite, SPA rewrite in `vercel.json`)
- **DNS:** Cloudflare (`newquants.xyz` zone) → Vercel DNS targets
- **Analytics:** `@vercel/analytics` + `@vercel/speed-insights`
- **Lint:** oxlint

### Build / deploy

```bash
npm install
npm run dev
npm run build
vercel --prod   # if CLI linked
```

`vercel.json`: SPA rewrite to `index.html`; long-cache `/assets/*`; security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`).

Vite splits chunks: `three`, `gsap`, `react-vendor`.

---

## 8. Architecture map

```
src/
  App.tsx                 # routes
  main.tsx
  index.css               # design tokens + utilities
  pages/
    Home.tsx
    ResearchPage.tsx
    ResearchNotePage.tsx
    ToolsPage.tsx
    MonteCarloPage.tsx
  components/
    layout/               # Navbar, Footer, Shell
    lab/LabExplorer.tsx   # product surface
    Hero.tsx
    Methodology.tsx, Projects.tsx, Philosophy.tsx, About.tsx, Collaboration.tsx
    graphics/             # LabOrbit (lazy), ParticleField, SignalField
  data/                   # all public content
  lib/monteCarlo.ts       # simulation logic
  hooks/useReveal.ts
```

---

## 9. Non-negotiable rules for any AI updating this site

1. **Honesty first** — no fake stats, fake notes, or inflated survivor counts.
2. **Lab aggregates ≠ public notes** — UI must keep that distinction clear.
3. **Minimal diffs** — change only what’s needed; don’t refactor unrelated files.
4. **Product > brochure** — prefer improving Lab/Tools over adding more marketing sections.
5. **Out of scope unless explicitly requested:** auth, payments, broker sync, TradingView bar replay, dark-mode redesign, inventing unpublished hypotheses.
6. When adding a research note: mirror the full `ResearchEntry` fields; source from real Proofbook results; update `labScoreboard` only from real scoreboard exports.

---

## 10. Suggested update prompts (paste with this file)

**Add a research note:**  
“Using SITE_DEFINITION.md, add a new entry to `src/data/research.ts` from this Proofbook ledger excerpt: [paste]. Wire it so LabExplorer filters show it. Do not invent numbers.”

**Refresh scoreboard:**  
“Update `labScoreboard` in `src/data/lab.ts` from this scoreboard dump: [paste]. Keep footnotes honest about public vs internal.”

**New calculator:**  
“Add a free tool under `/tools/...` matching existing Tools/MonteCarlo patterns, browser-only, with disclaimer, linked from Lab + nav + footer.”

**Visual polish only:**  
“Improve LabExplorer / Tools UI using existing tokens in `index.css`. Do not change brand colors to purple/dark SaaS. Keep Outfit + Instrument Serif accent.”

---

## 11. Current founder (public)

- Name / role from `src/data/founder.ts` (Himanshu Rajak, Founder)
- Personal site: himanshurajak.in
- Contact: LinkedIn + GitHub + email from founder data

---

## 12. Success criteria for changes

- Homepage: filter Lab → open a matching note in ≤2 clicks (when notes exist)
- `/tools/monte-carlo`: changing risk % updates odds live without reload
- `npm run build` passes
- No invented Proofbook metrics
- Live domain still serves SPA routes (`/research`, `/tools`) via Vercel rewrite

---

*Last aligned with repo state: Lab + Monte Carlo product surfaces shipped; site live on newquants.xyz.*
