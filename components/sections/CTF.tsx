'use client'
import { useEffect, useRef } from 'react'
import { Flag, Target, Trophy, Cpu } from 'lucide-react'

const CTF_DATA = [
  {
    title: '3rd Place — Devs for Devs Hackathon',
    event: 'Devs for Devs',
    date: '2024',
    category: 'Software Development',
    result: '🥉 3rd Place',
    color: '#f97316',
    description: 'Competitive hackathon blending software engineering under pressure with creative problem solving. Demonstrated ability to architect and ship under strict time constraints.',
    tags: ['Hackathon', 'Full-Stack', 'Competitive'],
  },
  {
    title: '2nd Place — Online CTF',
    event: 'Shell Arena CTF',
    date: '2026',
    category: 'Cybersecurity',
    result: '🏆 2nd Place',
    color: '#00ff88',
    description: 'Competitive cybersecurity CTF in Linux Git, Curl , bash automation. Demonstrated multi-domain attack competency.',
    tags: ['CTF', 'git', 'Curl', 'servises', 'bash'],
  },
]

// const LAB_PLATFORMS = [
//   { name: 'TryHackMe', icon: '🎯', desc: 'Active learning paths in red team ops, OSCP prep, malware analysis', color: '#00ff88' },
//   { name: 'HackTheBox', icon: '⚔', desc: 'Realistic machine exploitation — web, binary, Active Directory', color: '#22d3ee' },
//   { name: 'Binary Castle Club', icon: '🏰', desc: 'Designed and ran internal CTF competitions for 50+ university members', color: '#a855f7' },
//   { name: 'Custom Honeypot Labs', icon: '🕷', desc: 'Live malware capture with Venus-Trap — real-world attack data', color: '#f97316' },
// ]

const DOMAINS = [
  { name: 'Web Exploitation', icon: Target, pct: 95 },
  { name: 'Cryptography', icon: Cpu, pct: 90 },
  { name: 'Reverse Engineering', icon: Flag, pct: 85 },
  { name: 'Binary Explotation', icon: Trophy, pct: 80 },
]

export default function CTF() {
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
    <section id="ctf" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_30%,rgba(0,255,136,0.03),transparent)]" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">05 / CTFs & Labs</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] mb-4">
          Competitions & <span className="gradient-text">Lab Work</span>
        </h2>
        <p className="fade-up text-[#8b949e] text-[15px] mb-12 max-w-xl">
          CTFs aren&apos;t just competitions — they&apos;re the calibration mechanism that keeps offensive skills sharp against real adversarial thinking.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — CTF results */}
          <div>
            <h3 className="fade-up font-mono text-xs text-[#484f58] tracking-widest uppercase mb-6">Competition Results</h3>
            <div className="flex flex-col gap-4">
              {CTF_DATA.map(ctf => (
                <div
                  key={ctf.title}
                  className="fade-up card-glow p-5 rounded-xl border border-[#21262d] bg-[#0d1117] transition-all duration-300"
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = ctf.color + '40'
                    el.style.boxShadow = `0 0 20px ${ctf.color}08`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = '#21262d'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded"
                          style={{ background: ctf.color + '15', color: ctf.color, border: `1px solid ${ctf.color}30` }}
                        >
                          {ctf.category}
                        </span>
                        <span className="font-mono text-xs text-[#484f58]">{ctf.date}</span>
                      </div>
                      <h4 className="font-display font-semibold text-[#f0f6fc]">{ctf.event}</h4>
                    </div>
                    <span className="font-mono text-sm font-bold shrink-0" style={{ color: ctf.color }}>{ctf.result}</span>
                  </div>

                  <p className="text-[#8b949e] text-[13px] leading-relaxed mb-3">{ctf.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {ctf.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] text-[#484f58] px-1.5 py-0.5 bg-[#111827] rounded border border-[#21262d]">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Domain proficiency */}
            <div className="fade-up mt-8">
              <h3 className="font-mono text-xs text-[#484f58] tracking-widest uppercase mb-5">Domain Proficiency</h3>
              <div className="flex flex-col gap-4">
                {DOMAINS.map(({ name, icon: Icon, pct }) => (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon size={12} className="text-[#484f58]" />
                        <span className="font-mono text-xs text-[#8b949e]">{name}</span>
                      </div>
                      <span className="font-mono text-xs text-[#484f58]">{pct}%</span>
                    </div>
                    <div className="h-1 bg-[#21262d] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #00ff88, #22d3ee)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Lab platforms */}
          <div>
            <h3 className="fade-up font-mono text-xs text-[#484f58] tracking-widest uppercase mb-6">Practice Environments</h3>
            {/* <div className="flex flex-col gap-4">
              {LAB_PLATFORMS.map(lab => (
                <div
                  key={lab.name}
                  className="fade-up card-glow p-5 rounded-xl border border-[#21262d] bg-[#0d1117] flex gap-4 transition-all duration-300"
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = lab.color + '40'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = '#21262d'
                  }}
                >
                  <span className="text-2xl shrink-0">{lab.icon}</span>
                  <div>
                    <div className="font-display font-semibold text-[#f0f6fc] text-sm mb-1">{lab.name}</div>
                    <div className="text-[#8b949e] text-[13px] leading-relaxed">{lab.desc}</div>
                  </div>
                </div>
              ))}
            </div> */}

            {/* Active status */}
            <div className="fade-up mt-6 p-5 rounded-xl border border-[#00ff8830] bg-[#00ff8808]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">Currently Active</span>
              </div>
              <p className="text-[#8b949e] text-[13px] leading-relaxed">
                Regularly participating in CTF competitions and maintaining lab environments for continuous skill calibration and new technique research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
