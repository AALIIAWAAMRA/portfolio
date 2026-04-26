'use client'
import { useEffect, useRef, useState } from 'react'
import { Clock, ArrowRight, ArrowUpRight, BookOpen, TrendingUp, Search } from 'lucide-react'

const CATEGORIES = ['All', 'Cryptography', 'Web Security', 'Malware Analysis', 'Threat Intelligence', 'Reverse Engineering']

const BLOG_POSTS = [
  {
    slug: 'padding-oracle-practical',
    title: 'Padding Oracle Attacks: From Theory to Shell',
    excerpt:
      'A hands-on walkthrough of exploiting CBC mode padding oracle vulnerabilities in real applications — decrypting ciphertext and forging tokens without ever touching the key.',
    category: 'Cryptography',
    date: 'Apr 2026',
    readTime: '12 min read',
    color: '#a855f7',
    tags: ['AES-CBC', 'Padding Oracle', 'Crypto Exploit', 'Web'],
    featured: true,
    draft: true,
    cover: 'crypto',
  },
  {
    slug: 'jwt-full-attack-surface',
    title: 'The JWT Attack Surface: None Algorithm, Key Confusion & Injection',
    excerpt:
      'Mapping every exploitable edge of JSON Web Tokens — from the classic alg:none bypass to RS256/HS256 key confusion, kid injection, and JWK embedding attacks.',
    category: 'Web Security',
    date: 'Apr 2026',
    readTime: '10 min read',
    color: '#22d3ee',
    tags: ['JWT', 'Auth Bypass', 'API Security', 'PortSwigger'],
    featured: true,
    draft: true,
    cover: 'web',
  },
  {
    slug: 'venus-trap-honeypot',
    title: 'Building Venus-Trap: Live Threat Intel from Real Malware',
    excerpt:
      'How I engineered a production honeypot that captures live attack payloads, fingerprints attackers with p0f, streams real-time alerts over XMPP, and feeds a public threat-intel feed.',
    category: 'Threat Intelligence',
    date: 'Mar 2026',
    readTime: '15 min read',
    color: '#00ff88',
    tags: ['Honeypot', 'Dionaea', 'Threat Intel', 'Python'],
    featured: false,
    draft: true,
    cover: 'threat',
  },
  {
    slug: 'predicta-malware-ml',
    title: 'ML-Powered Malware Classification: Architecting Predicta',
    excerpt:
      'Deep dive into building a hybrid static/behavioral malware classification pipeline — PE header extraction, API call sequences, and a TensorFlow ensemble that identifies APT families at scale.',
    category: 'Malware Analysis',
    date: 'Mar 2026',
    readTime: '18 min read',
    color: '#f97316',
    tags: ['ML/DL', 'Malware', 'APT', 'TensorFlow', 'PE Analysis'],
    featured: false,
    draft: true,
    cover: 'malware',
  },
  {
    slug: 'rsa-weak-keys',
    title: 'RSA Implementation Flaws: Weak Keys, Small Exponents & Wiener',
    excerpt:
      "Practical cryptanalysis of real-world RSA deployments — Wieners attack on small private exponents, Hastad's broadcast attack, common modulus vulnerabilities, and how KeySploit automates them.'",
    category: 'Cryptography',
    date: 'Feb 2026',
    readTime: '14 min read',
    color: '#a855f7',
    tags: ['RSA', 'Cryptanalysis', 'Number Theory', 'KeySploit'],
    featured: false,
    draft: true,
    cover: 'crypto',
  },
  {
    slug: 'x86-re-basics',
    title: 'x86 Reverse Engineering: Reading Assembly Like Source Code',
    excerpt:
      'A practitioner\'s guide to reading compiled x86/x64 assembly — recognizing control flow patterns, identifying function prologues, and reversing obfuscated binaries without symbols.',
    category: 'Reverse Engineering',
    date: 'Feb 2026',
    readTime: '20 min read',
    color: '#3b82f6',
    tags: ['x86 ASM', 'Binary Analysis', 'IDA', 'Ghidra'],
    featured: false,
    draft: true,
    cover: 'reverse',
  },
]

const COVER_PATTERNS: Record<string, string> = {
  crypto: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse"><text x="4" y="20" font-family="monospace" font-size="11" fill="rgba(168,85,247,0.18)">01</text></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
  web: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="40" height="20" patternUnits="userSpaceOnUse"><text x="2" y="14" font-family="monospace" font-size="10" fill="rgba(34,211,238,0.15)">&lt;/&gt;</text></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
  threat: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="14" cy="14" r="1.5" fill="rgba(0,255,136,0.2)"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
  malware: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="32" height="16" patternUnits="userSpaceOnUse"><text x="2" y="12" font-family="monospace" font-size="9" fill="rgba(249,115,22,0.18)">0xFF</text></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
  reverse: `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="36" height="18" patternUnits="userSpaceOnUse"><text x="2" y="13" font-family="monospace" font-size="9" fill="rgba(59,130,246,0.18)">ASM</text></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>`,
}

function CoverPattern({ type, color }: { type: string; color: string }) {
  return (
    <div
      className="w-full h-full"
      style={{
        background: `linear-gradient(135deg, ${color}18, ${color}06)`,
      }}
    >
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: COVER_PATTERNS[type] ?? COVER_PATTERNS.crypto }}
      />
    </div>
  )
}

function FeaturedCard({ post }: { post: (typeof BLOG_POSTS)[0] }) {
  return (
    <div
      className="group relative rounded-2xl border border-[#21262d] bg-[#0d1117] overflow-hidden transition-all duration-300 cursor-default"
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = post.color + '50'
        el.style.boxShadow = `0 0 40px ${post.color}08, 0 20px 40px rgba(0,0,0,0.3)`
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = '#21262d'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden">
        <CoverPattern type={post.cover} color={post.color} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
        {/* Featured badge */}
        <div className="absolute top-3 left-3">
          <span
            className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded-full"
            style={{ background: post.color + '20', border: `1px solid ${post.color}40`, color: post.color }}
          >
            <TrendingUp size={9} /> Featured
          </span>
        </div>
        {/* Draft badge */}
        {post.draft && (
          <div className="absolute top-3 right-3">
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#21262d] text-[#484f58] border border-[#21262d]">
              Draft
            </span>
          </div>
        )}
        {/* Category + read time */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded"
            style={{ background: post.color + '18', color: post.color, border: `1px solid ${post.color}30` }}
          >
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-[#484f58]">
            <Clock size={10} />
            <span className="font-mono text-[10px]">{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="font-mono text-[10px] text-[#484f58] mb-2">{post.date}</div>
        <h3 className="font-display font-bold text-[#f0f6fc] text-lg leading-snug mb-3 group-hover:text-white transition-colors">
          {post.title}
        </h3>
        <p className="text-[#8b949e] text-[13px] leading-relaxed mb-4">{post.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#21262d] text-[#484f58] bg-[#111827]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read link */}
        <div
          className="flex items-center gap-1.5 font-mono text-xs transition-all duration-200"
          style={{ color: post.color }}
        >
          <span>Read article</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}

function PostRow({ post }: { post: (typeof BLOG_POSTS)[0] }) {
  return (
    <div
      className="group flex gap-4 p-4 rounded-xl border border-[#21262d] bg-[#0d1117] transition-all duration-300 cursor-default"
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = post.color + '40'
        el.style.background = '#0d1117'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = '#21262d'
      }}
    >
      {/* Micro cover */}
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#21262d]">
        <CoverPattern type={post.cover} color={post.color} />
      </div>

      {/* Meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="font-mono text-[9px] px-1.5 py-0.5 rounded"
            style={{ background: post.color + '15', color: post.color, border: `1px solid ${post.color}28` }}
          >
            {post.category}
          </span>
          <span className="font-mono text-[10px] text-[#484f58]">{post.date}</span>
          <span className="font-mono text-[10px] text-[#484f58] ml-auto flex items-center gap-1">
            <Clock size={9} /> {post.readTime}
          </span>
        </div>
        <h4 className="font-display font-semibold text-[#f0f6fc] text-sm leading-snug mb-1 group-hover:text-white transition-colors line-clamp-1">
          {post.title}
        </h4>
        <p className="text-[#484f58] text-[12px] leading-relaxed line-clamp-1">{post.excerpt}</p>
      </div>

      {/* Arrow */}
      <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: post.color }}>
        <ArrowRight size={14} />
      </div>
    </div>
  )
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 70)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = BLOG_POSTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  const featured = filtered.filter(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  return (
    <section id="blog" ref={sectionRef} className="py-32 relative">
      {/* BG accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_60%,rgba(168,85,247,0.03),transparent)]" />

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* ── Section label ── */}
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">06 / Blog</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] mb-4 leading-tight">
              Write-Ups &amp;{' '}
              <span className="gradient-text">Research</span>
            </h2>
            <p className="fade-up text-[#8b949e] text-[15px] max-w-lg leading-relaxed">
              Deep technical breakdowns of offensive techniques, cryptanalysis, and tool internals.
              Written for practitioners — zero fluff, full PoC.
            </p>
          </div>

          {/* Stats strip */}
          <div className="fade-up flex gap-6 shrink-0">
            {[
              { label: 'Articles', value: BLOG_POSTS.length.toString() },
              { label: 'Topics', value: '6' },
              { label: 'Status', value: 'In Progress' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-xl gradient-text">{s.value}</div>
                <div className="font-mono text-[10px] text-[#484f58] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="fade-up flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#21262d] rounded-lg pl-8 pr-3 py-2 font-mono text-xs text-[#f0f6fc] placeholder-[#484f58] focus:outline-none focus:border-[#00ff8840] transition-colors"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[10px] px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-[#00ff8840] text-[#00ff88] bg-[#00ff8810]'
                    : 'border-[#21262d] text-[#484f58] hover:text-[#8b949e] hover:border-[#484f58]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Featured posts grid ── */}
        {featured.length > 0 && (
          <div className="mb-8">
            <div className="fade-up flex items-center gap-3 mb-5">
              <TrendingUp size={12} className="text-[#484f58]" />
              <span className="font-mono text-[10px] text-[#484f58] tracking-widest uppercase">Featured</span>
            </div>
            <div className={`grid gap-5 ${featured.length === 1 ? 'grid-cols-1 max-w-lg' : 'sm:grid-cols-2'}`}>
              {featured.map(post => (
                <div key={post.slug} className="fade-up">
                  <FeaturedCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── All other posts ── */}
        {rest.length > 0 && (
          <div>
            <div className="fade-up flex items-center gap-3 mb-5">
              <BookOpen size={12} className="text-[#484f58]" />
              <span className="font-mono text-[10px] text-[#484f58] tracking-widest uppercase">All Articles</span>
            </div>
            <div className="flex flex-col gap-3">
              {rest.map(post => (
                <div key={post.slug} className="fade-up">
                  <PostRow post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="fade-up text-center py-20 border border-[#21262d] rounded-2xl bg-[#0d1117]">
            <div className="font-mono text-[#484f58] text-sm mb-2">No articles match &quot;{search}&quot;</div>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All') }}
              className="font-mono text-xs text-[#00ff88] hover:underline mt-1"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── Subscribe banner ── */}
        <div className="fade-up mt-14 relative overflow-hidden rounded-2xl border border-[#21262d] bg-[#0d1117] p-8">
          {/* BG pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,255,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,0.04) 1px,transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#00ff8806] to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">Posts dropping soon</span>
              </div>
              <h3 className="font-display font-bold text-xl text-[#f0f6fc] mb-1">
                Get notified when I publish
              </h3>
              <p className="text-[#8b949e] text-sm leading-relaxed max-w-md">
                Offensive security write-ups, crypto exploit breakdowns, and malware analysis — directly to your inbox.
                No newsletters, no fluff.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="mailto:nidalhelahessane@gmail.com?subject=Blog Notifications"
                className="px-5 py-2.5 bg-[#00ff88] text-[#080b12] font-mono font-semibold text-sm rounded-lg hover:bg-[#00ff88]/90 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Notify me
                <ArrowUpRight size={13} />
              </a>
              <a
                href="https://github.com/AALIIAWAAMRA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-[#21262d] text-[#8b949e] font-mono text-sm rounded-lg hover:border-[#484f58] hover:text-[#f0f6fc] transition-all whitespace-nowrap"
              >
                GitHub →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}