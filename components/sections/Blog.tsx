'use client'
import { useEffect, useRef } from 'react'
import { Clock, ArrowRight, Rss } from 'lucide-react'

const BLOG_POSTS = [
  {
    slug: 'padding-oracle-practical',
    title: 'Padding Oracle Attacks: From Theory to Shell',
    excerpt: 'A hands-on walkthrough of exploiting CBC mode padding oracle vulnerabilities in real applications — bypassing encryption without the key.',
    category: 'Cryptography',
    date: 'Coming Soon',
    readTime: '12 min',
    color: '#a855f7',
    tags: ['AES', 'CBC', 'Crypto', 'Exploit'],
    draft: true,
  },
  {
    slug: 'jwt-attack-surface',
    title: 'The JWT Attack Surface: None Algorithm, Key Confusion & More',
    excerpt: 'Mapping the full attack surface of JSON Web Tokens — from the classic "alg: none" bypass to RS256/HS256 key confusion and JWT cracking.',
    category: 'Web Security',
    date: 'Coming Soon',
    readTime: '10 min',
    color: '#22d3ee',
    tags: ['JWT', 'Auth Bypass', 'Web', 'API Security'],
    draft: true,
  },
  {
    slug: 'honeypot-threat-intel',
    title: 'Building Venus-Trap: Threat Intel from Live Malware',
    excerpt: 'How I built a production honeypot platform that captures live malware, fingerprints attackers, and feeds a threat-intelligence community — lessons from real-world adversary traffic.',
    category: 'Threat Intelligence',
    date: 'Coming Soon',
    readTime: '15 min',
    color: '#00ff88',
    tags: ['Honeypot', 'Malware', 'Threat Intel', 'Dionaea'],
    draft: true,
  },
  {
    slug: 'malware-classification-ml',
    title: 'ML-Powered Malware Classification: Building Predicta',
    excerpt: 'Architecting a hybrid static/behavioral malware classification pipeline — from PE header extraction to TensorFlow ensemble models for APT family identification.',
    category: 'Malware Analysis',
    date: 'Coming Soon',
    readTime: '18 min',
    color: '#f97316',
    tags: ['ML', 'Malware', 'APT', 'TensorFlow'],
    draft: true,
  },
]

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="blog" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_60%,rgba(168,85,247,0.03),transparent)]" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">06 / Blog</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] mb-4">
              Write-Ups &<br />
              <span className="gradient-text">Research Notes</span>
            </h2>
            <p className="fade-up text-[#8b949e] text-[15px] max-w-lg">
              Deep technical write-ups on offensive techniques, tool internals, and vulnerability research — drafted for practitioners, not marketers.
            </p>
          </div>
          <div className="fade-up flex items-center gap-2 text-[#484f58]">
            <Rss size={14} />
            <span className="font-mono text-xs">Posts coming soon</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.slug}
              className="fade-up card-glow group rounded-xl border border-[#21262d] bg-[#0d1117] p-6 flex flex-col gap-4 transition-all duration-300 cursor-default"
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = post.color + '40'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = '#21262d'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded"
                  style={{ background: post.color + '15', color: post.color, border: `1px solid ${post.color}30` }}
                >
                  {post.category}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#484f58]">
                    <Clock size={10} />
                    <span className="font-mono text-[10px]">{post.readTime}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#484f58]">{post.date}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display font-semibold text-[#f0f6fc] leading-snug group-hover:text-white transition-colors">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[#8b949e] text-[13px] leading-relaxed flex-1">{post.excerpt}</p>

              {/* Tags + CTA */}
              <div className="flex items-end justify-between gap-2 pt-3 border-t border-[#21262d]">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] text-[#484f58] px-1.5 py-0.5 bg-[#111827] rounded border border-[#21262d]">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 font-mono text-xs text-[#484f58] shrink-0">
                  <span>Draft</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe / Notify CTA */}
        <div className="fade-up mt-10 p-6 rounded-xl border border-[#21262d] bg-[#0d1117] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-display font-semibold text-[#f0f6fc] mb-1">Want to know when posts go live?</div>
            <div className="font-mono text-xs text-[#484f58]">Technical write-ups on offensive security, malware, and crypto — no fluff.</div>
          </div>
          <a
            href="mailto:nidalhelahessane@gmail.com?subject=Subscribe to your blog"
            className="shrink-0 px-5 py-2 border border-[#00ff8840] text-[#00ff88] font-mono text-sm rounded hover:bg-[#00ff8810] transition-all"
          >
            Notify me →
          </a>
        </div>
      </div>
    </section>
  )
}
