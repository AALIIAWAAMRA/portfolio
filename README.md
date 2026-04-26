# Nidhal Boulgamh — Portfolio

A premium cybersecurity portfolio built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Animations:** CSS keyframes + Intersection Observer API
- **Icons:** Lucide React
- **Fonts:** Syne (display) + JetBrains Mono (code)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css        # Design tokens, animations, utilities
│   ├── layout.tsx         # Root layout + metadata
│   └── page.tsx           # Page assembly
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Sticky nav with active section tracking
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx       # Terminal animation + typing roles
│       ├── About.tsx      # Stats + focus areas
│       ├── Skills.tsx     # Interactive categorized toolkit
│       ├── Projects.tsx   # 6 project case studies
│       ├── Experience.tsx # Timeline + education + awards
│       ├── CTF.tsx        # Competitions + lab platforms
│       ├── Blog.tsx       # Write-up cards (future-proof)
│       └── Contact.tsx    # Services + mailto form
└── lib/
    └── utils.ts           # cn() helper
```

## Design System

| Token | Value |
|-------|-------|
| Background | `#080b12` |
| Surface | `#0d1117` |
| Card | `#111827` |
| Accent Green | `#00ff88` |
| Accent Cyan | `#22d3ee` |
| Text Primary | `#f0f6fc` |
| Text Muted | `#8b949e` |
| Border | `#21262d` |

## Customization

- **Personal data** — Edit content directly inside each section component under `components/sections/`
- **Colors** — Change CSS variables in `app/globals.css`
- **Blog posts** — Add new entries to the `BLOG_POSTS` array in `components/sections/Blog.tsx`
- **Projects** — Add new objects to the `PROJECTS` array in `components/sections/Projects.tsx`
- **CTF results** — Add new objects to `CTF_DATA` in `components/sections/CTF.tsx`

## Deployment

Deploy to **Vercel** in one command:

```bash
npx vercel
```

Or push to GitHub and connect the repo on [vercel.com](https://vercel.com) — zero config required.

## Contact

**Nidhal Lahcen Boulgamh**  
nidalhelahessane@gmail.com  
[LinkedIn](https://linkedin.com/in/nidhal-lahcen-8ba0a6296) · [GitHub](https://github.com/AALIIAWAAMRA)
