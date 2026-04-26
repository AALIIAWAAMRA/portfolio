'use client'
import { useEffect, useRef } from 'react'

// const STATS = [
//   { value: '2+', label: 'Years in Security' },
//   { value: '20+', label: 'Students Mentored' },
//   { value: '3', label: 'Tools Built from Scratch' },
// ]

const FOCUS = [
  { icon: '⚔', title: 'Offensive Security', desc: 'Full kill-chain penetration testing across web, mobile, network, and infrastructure targets.' },
  { icon: '🔐', title: 'Cryptography & RE', desc: 'Breaking real-world cryptographic implementations — RSA, AES, ECC — and reversing binaries at the assembly level.' },
  { icon: '🧬', title: 'Malware & APT Research', desc: 'Designing C2 implants, deploying honeypot infrastructure, and classifying APT malware families with ML/DL pipelines.' },
  { icon: '🎓', title: 'Security Education', desc: 'Running adversary-first curricula for 30+ students per cohort — full attack chains, not sanitized theory.' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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
    <section id="about" ref={sectionRef} className="py-32 relative">
      {/* Subtle separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[#21262d]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">01 / About</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div className="flex flex-col gap-6">
            <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] leading-tight">
              I think in{' '}
              <span className="gradient-text">attack chains,</span>
              <br />not checklists.
            </h2>

            <div className="space-y-4 text-[#8b949e] text-[15px] leading-relaxed">
              <p className="fade-up">
                I&apos;m a Cybersecurity Engineering graduate from the University of Batna 2, Algeria — specializing in offensive
                security, cryptanalysis, and adversary simulation. My work lives at the intersection of deep technical research
                and real-world threat modeling.
              </p>
              <p className="fade-up">
                At <span className="text-[#f0f6fc]">Cybears®</span>, I architect threat-intelligence pipelines that surface
                early-warning indicators and reduce analyst mean time to detection. At <span className="text-[#f0f6fc]">GOMYCODE</span>,
                I design and deliver the full offensive security curriculum — from recon through post-exploitation — for cohorts
                of 30+ students.
              </p>
              <p className="fade-up">
                My toolchain spans Metasploit, Burp Suite, Frida, MobSF, Wireshark, and custom Python/C exploits.
                I&apos;ve built production honeypot infrastructure, an ML/DL malware classifier, a cryptographic exploitation
                framework, and a PKI/VPN stack — all from scratch.
              </p>
            </div>

            <div className="fade-up pt-2">
              <a
                href="mailto:deafmute000@gmail.com"
                className="inline-flex items-center gap-2 font-mono text-sm text-[#00ff88] hover:gap-3 transition-all duration-200"
              >
                deafmute000@gmail.com →
              </a>
            </div>
          </div>

          {/* Right: stats + focus areas */}
          <div className="flex flex-col gap-8">
            {/* Stats */}
            <div className="fade-up grid grid-cols-2 gap-4">
              {/* {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="card-glow p-5 rounded-lg border border-[#21262d] bg-[#0d1117] hover:border-[#00ff8830] transition-colors"
                >
                  <div className="font-display font-bold text-3xl gradient-text">{value}</div>
                  <div className="font-mono text-xs text-[#484f58] mt-1">{label}</div>
                </div>
              ))} */}
            </div>

            {/* Focus areas */}
            <div className="flex flex-col gap-3">
              {FOCUS.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="fade-up card-glow p-4 rounded-lg border border-[#21262d] bg-[#0d1117] flex gap-4 hover:border-[#00ff8830] transition-colors group"
                >
                  <span className="text-xl mt-0.5 shrink-0">{icon}</span>
                  <div>
                    <div className="font-display font-semibold text-[#f0f6fc] text-sm group-hover:text-[#00ff88] transition-colors">{title}</div>
                    <div className="font-mono text-xs text-[#484f58] mt-1 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
