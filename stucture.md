app/
  globals.css       ← design system, animations, fonts
  layout.tsx        ← metadata + root layout
  page.tsx          ← section assembly
components/
  layout/
    Navbar.tsx      ← sticky nav, active section tracking
    Footer.tsx
  sections/
    Hero.tsx        ← terminal animation + typing roles
    About.tsx       ← stats cards + focus areas
    Skills.tsx      ← interactive categorized toolkit (8 categories, ~100 tools)
    Projects.tsx    ← 6 case studies (Venus-Trap, Predicta, KeySploit…)
    Experience.tsx  ← timeline + education + awards + languages
    CTF.tsx         ← competitions + lab platforms
    Blog.tsx        ← write-up cards, future-proof structure
    Contact.tsx     ← services grid + mailto form
lib/
  utils.ts          ← cn() helper
README.md           ← setup + customization guide