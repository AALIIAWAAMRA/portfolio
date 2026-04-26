'use client'
import { useEffect, useState, useRef } from 'react'
import { ArrowDown, Github, Linkedin, Mail, Shield, Terminal } from 'lucide-react'

const ROLES = [
  'Penetration Tester',
  'Exploit Developer',
  'Reverse Engineer',
]

const TERMINAL_LINES = [
  { delay: 0,    text: '$ whoami',                              type: 'cmd' },
  { delay: 600,  text: '0xABABIIL',                       type: 'out' },
  { delay: 900,  text: '$ cat /etc/roles',                      type: 'cmd' },
  { delay: 1500, text: '[ pentest | exploit devloper | RE ]',   type: 'out' },
  { delay: 1800, text: '$ ls projects/',                        type: 'cmd' },
  { delay: 2400, text: 'Venus-Trap  Predicta  KeySploit  +3',   type: 'out' },
  { delay: 2700, text: '$ ./engage_threat_actor.sh',            type: 'cmd' },
  { delay: 3400, text: '[ ✓ ] Target profiled. Attack surface mapped.', type: 'success' },
]

function TerminalLine({ text, type, visible }: { text: string; type: string; visible: boolean }) {
  const color = type === 'cmd' ? '#f0f6fc' : type === 'success' ? '#00ff88' : '#8b949e'
  const prefix = type === 'cmd' ? '' : type === 'success' ? '' : '  '
  return (
    <div
      className="font-mono text-sm leading-relaxed transition-all duration-300"
      style={{
        color,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {prefix}{type === 'cmd' && <span className="text-[#00ff88] mr-1">›</span>}{text}
    </div>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleText, setRoleText] = useState('')
  const [typing, setTyping] = useState(true)
  const [visibleLines, setVisibleLines] = useState<boolean[]>(new Array(TERMINAL_LINES.length).fill(false))
  const roleRef = useRef(0)

  // Terminal lines animation
  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, line.delay)
    })
  }, [])

  // Role typing animation
  useEffect(() => {
    const role = ROLES[roleIndex]
    let i = 0
    setRoleText('')
    setTyping(true)

    const typeInterval = setInterval(() => {
      if (i < role.length) {
        setRoleText(role.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setTyping(false)
          const deleteInterval = setInterval(() => {
            setRoleText(prev => {
              if (prev.length === 0) {
                clearInterval(deleteInterval)
                roleRef.current = (roleRef.current + 1) % ROLES.length
                setRoleIndex(roleRef.current)
                return ''
              }
              return prev.slice(0, -1)
            })
          }, 40)
        }, 2000)
      }
    }, 70)
    return () => clearInterval(typeInterval)
  }, [roleIndex])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,255,136,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(34,211,238,0.04),transparent)]" />

      {/* Floating orb */}
      <div
        className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full opacity-[0.04] blur-3xl"
        style={{ background: '#00ff88', animation: 'float 8s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-1/4 left-[5%] w-48 h-48 rounded-full opacity-[0.04] blur-3xl"
        style={{ background: '#22d3ee', animation: 'float 10s ease-in-out infinite reverse' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* Left — Identity */}
          <div className="flex flex-col gap-6">
            {/* Status badge */}
            <div className="flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="font-mono text-xs text-[#8b949e] tracking-widest uppercase">
                Available for Red Team Engagements
              </span>
            </div>

            {/* Name */}
            <div>
              <h1
                className="font-display font-bold text-5xl sm:text-6xl xl:text-7xl leading-[0.9] tracking-tight glitch-text"
                data-text="Nidhal"
              >
                <span className="block text-[#f0f6fc]"></span>
                <span className="block gradient-text">0xABABIL</span>
              </h1>
            </div>

            {/* Typing role */}
            <div className="h-8 flex items-center">
              <span className="font-mono text-lg text-[#22d3ee]">
                {roleText}
                <span
                  className="inline-block w-0.5 h-5 bg-[#22d3ee] ml-0.5 align-middle"
                  style={{ animation: 'blink 1s step-end infinite' }}
                />
              </span>
            </div>

            {/* Bio */}
            <p className="text-[#8b949e] leading-relaxed max-w-lg text-[15px]">
              I build offensive tools, break cryptographic implementations, and simulate advanced threat actors.
              Engineering threat-intelligence infrastructure at <span className="text-[#f0f6fc]">Cybears®</span> and
              teaching adversary-first security to the next generation.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['PTES', 'MITRE ATT&CK', 'OWASP', 'OSINT', 'DFIR', 'PKI'].map(tag => (
                <span key={tag} className="badge-green">{tag}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#contact"
                className="px-6 py-2.5 bg-[#00ff88] text-[#080b12] font-mono font-semibold text-sm rounded hover:bg-[#00ff88]/90 transition-all duration-200 flex items-center gap-2"
              >
                <Shield size={14} /> Engage
              </a>
              <a
                href="#projects"
                className="px-6 py-2.5 border border-[#21262d] text-[#8b949e] font-mono text-sm rounded hover:border-[#00ff8840] hover:text-[#f0f6fc] transition-all duration-200"
              >
                View Arsenal →
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: Github, href: 'https://github.com/AALIIAWAAMRA', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/nidhal-lahcen-8ba0a6296', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:nidalhelahessane@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#21262d] rounded flex items-center justify-center text-[#484f58] hover:text-[#00ff88] hover:border-[#00ff8840] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Terminal */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Terminal window */}
              <div
                className="rounded-lg border border-[#21262d] overflow-hidden"
                style={{ background: 'rgba(13,17,23,0.95)', boxShadow: '0 0 0 1px #21262d, 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,136,0.04)' }}
              >
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#21262d] bg-[#0d1117]">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="flex-1 text-center font-mono text-xs text-[#484f58]">
                    bash — 0xAbabil@localhost: ~/red-team
                  </span>
                </div>

                {/* Terminal body */}
                <div className="p-5 min-h-[280px] relative scanlines">
                  <div className="flex flex-col gap-2">
                    {TERMINAL_LINES.map((line, i) => (
                      <TerminalLine key={i} text={line.text} type={line.type} visible={visibleLines[i]} />
                    ))}
                    {visibleLines[TERMINAL_LINES.length - 1] && (
                      <div className="font-mono text-sm text-[#f0f6fc] mt-1">
                        <span className="text-[#00ff88] mr-1">›</span>
                        <span className="inline-block w-2 h-4 bg-[#00ff88] animate-pulse align-middle ml-0.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative glow under terminal */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-xl opacity-20" style={{ background: '#00ff88' }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-8 mt-8">
          <a href="#about" className="flex flex-col items-center gap-2 text-[#484f58] hover:text-[#00ff88] transition-colors group">
            <span className="font-mono text-xs tracking-widest">SCROLL</span>
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
