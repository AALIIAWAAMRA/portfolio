'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, Radar, ShieldAlert, Swords } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'web',
    label: 'Web Exploitation',
    color: '#00ff88',
    icon: '🌐',
    focus: 'App-layer attack chains, auth bypass, and logic flaws.',
    proficiency: 95,
    tools: ['Burp Suite', 'SQLmap', 'OWASP ZAP', 'Nikto', 'Gobuster', 'Dirb', 'SQLi (manual)', 'XSS', 'CSRF', 'IDOR', 'SSRF', 'XXE', 'JWT Attacks', 'Session Hijacking', 'REST Security', 'GraphQL Security'],
  },
  {
    id: 'network',
    label: 'Network & Infrastructure',
    color: '#22d3ee',
    icon: '📡',
    focus: 'Recon to packet-level control and detection engineering.',
    proficiency: 92,
    tools: ['Nmap', 'Wireshark', 'Scapy', 'Netcat', 'tcpreplay', 'Snort IDS/IPS', 'MITM', 'PCAP Analysis', 'OpenVPN', 'IPsec', 'VLAN', 'iptables', 'Port Scanning', 'Packet Crafting'],
  },
  {
    id: 'malware',
    label: 'Malware & APT',
    color: '#f97316',
    icon: '🧬',
    focus: 'Threat simulation, triage workflows, and intrusion telemetry.',
    proficiency: 90,
    tools: ['Dionaea Honeypot', 'XMPP Alerting', 'p0f OS Fingerprinting', 'C2 Architecture', 'Evasion Techniques', 'VirusTotal', 'ANY.RUN', 'Custom Implants', 'SHA-256 Triage', 'MITRE ATT&CK'],
  },
  {
    id: 'crypto',
    label: 'Cryptography & RE',
    color: '#a855f7',
    icon: '🔐',
    focus: 'Protocol weakness analysis and binary-level reverse engineering.',
    proficiency: 88,
    tools: ['RSA Attacks', 'AES Mode Weaknesses', 'ECC Invalid-Curve', 'Padding Oracle', 'Side-Channel', 'x86/x64 ASM', 'Binary Analysis', 'OpenSSL', 'PKI / CA', 'Diffie-Hellman', 'Cryptanalysis', 'Key Management'],
  },
  {
    id: 'mobile',
    label: 'Mobile Security',
    color: '#eab308',
    icon: '📱',
    focus: 'Android app analysis, runtime hooks, and traffic interception.',
    proficiency: 84,
    tools: ['MobSF', 'Frida', 'Apktool', 'ADB', 'Jadx', 'SSL Pinning Bypass', 'OWASP MASTG', 'OWASP MASVS', 'APK Reverse Engineering', 'Android Traffic Interception'],
  },
  {
    id: 'scripting',
    label: 'Scripting & Automation',
    color: '#3b82f6',
    icon: '⚡',
    focus: 'Automation-first offensive tooling and exploit workflow scripts.',
    proficiency: 93,
    tools: ['Python (advanced)', 'Bash', 'C (systems)', 'JavaScript/TypeScript', 'x86 Assembly', 'Custom Exploit Scripts', 'ML/DL Pipelines', 'Security Tool Development', 'Metasploit Framework'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevSecOps',
    color: '#06b6d4',
    icon: '☁',
    focus: 'Cloud attack surface hardening and secure deployment pipelines.',
    proficiency: 82,
    tools: ['AWS (EC2, S3, IAM)', 'Docker', 'Redis', 'KVM/QEMU', 'SAST Integration', 'Container Security', 'CI/CD Security', 'Threat Modeling', 'DevSecOps'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Standards',
    color: '#84cc16',
    icon: '📋',
    focus: 'Methodologies and attack mapping for real-world engagements.',
    proficiency: 89,
    tools: ['PTES', 'OSSTMM', 'OWASP WSTG', 'MITRE ATT&CK', 'NIST CSF', 'CVSS/CVE', 'BloodHound', 'CrackMapExec', 'Responder', 'Hashcat', 'John the Ripper', 'Hydra'],
  },
]

export default function Skills() {
  const [active, setActive] = useState('web')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 60)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const activeCategory = useMemo(() => CATEGORIES.find(c => c.id === active) ?? CATEGORIES[0], [active])
  const totalTools = useMemo(() => CATEGORIES.reduce((sum, category) => sum + category.tools.length, 0), [])

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,255,136,0.05),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_90%_20%,rgba(34,211,238,0.07),transparent)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="skills-matrix-line absolute top-[-40%] h-28 w-px"
            style={{
              left: `${4 + i * 7}%`,
              animationDelay: `${i * 0.55}s`,
              animationDuration: `${7 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full border border-[#00ff8830] skills-orbit" />
      <div className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full border border-[#22d3ee24] skills-orbit-rev" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full border border-[#00ff8820] skills-orbit-rev" />
      <div className="pointer-events-none absolute -right-16 bottom-20 h-56 w-56 rounded-full border border-[#22d3ee22] skills-orbit" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Label */}
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">02 / Arsenal</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] mb-4 leading-tight">
              Full-Spectrum Attack Surface
              <br />
              <span className="gradient-text">Game-Mode Hacker Loadout</span>
            </h2>
            <p className="fade-up text-[#8b949e] text-[15px] max-w-xl leading-relaxed">
              Interactive offensive stack with tactical categories, live-motion UI, and tool-level highlights.
              Click any category to switch loadouts instantly.
            </p>
          </div>

          <div className="fade-up grid grid-cols-3 gap-3">
            {[
              { label: 'Categories', value: CATEGORIES.length.toString(), icon: Radar },
              { label: 'Tools', value: totalTools.toString(), icon: Swords },
              { label: 'Status', value: 'Armed', icon: ShieldAlert },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-[#21262d] bg-[#0d1117]/90 backdrop-blur-sm p-3 text-center">
                <Icon size={14} className="mx-auto mb-2 text-[#8b949e]" />
                <div className="font-display text-2xl text-[#f0f6fc] leading-none">{value}</div>
                <div className="font-mono text-[10px] text-[#484f58] mt-1 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="fade-up flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`group relative overflow-hidden flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border transition-all duration-300 ${
                active === cat.id
                  ? 'bg-[#0d1117] text-current -translate-y-0.5'
                  : 'border-[#21262d] text-[#484f58] hover:text-[#8b949e] hover:border-[#484f58]'
              }`}
              style={{
                color: active === cat.id ? cat.color : undefined,
                borderColor: active === cat.id ? `${cat.color}70` : undefined,
                boxShadow: active === cat.id ? `0 0 16px ${cat.color}2A` : undefined,
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(120deg, ${cat.color}18, transparent 60%)` }}
              />
              <span>{cat.icon}</span>
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Tools display */}
        <div
          key={active}
          className="relative p-6 rounded-2xl border border-[#21262d] bg-[#0d1117]/95 backdrop-blur-sm overflow-hidden skills-panel-scan"
          style={{ borderColor: `${activeCategory.color}42`, boxShadow: `0 0 30px ${activeCategory.color}14` }}
        >
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl" style={{ background: `${activeCategory.color}22` }} />
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(transparent 31px, rgba(255,255,255,0.04) 32px), linear-gradient(90deg, transparent 31px, rgba(255,255,255,0.035) 32px)', backgroundSize: '32px 32px' }} />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{activeCategory.icon}</span>
                  <h3 className="font-display font-semibold text-[#f0f6fc] text-xl">{activeCategory.label}</h3>
                </div>
                <p className="text-sm text-[#8b949e] max-w-2xl">{activeCategory.focus}</p>
              </div>

              <div className="min-w-[180px]">
                <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#8b949e]">
                  <span>Specialization Score</span>
                  <span style={{ color: activeCategory.color }}>{activeCategory.proficiency}%</span>
                </div>
                <div className="h-2 rounded-full border border-[#21262d] bg-[#080b12] overflow-hidden skills-progress">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: `${activeCategory.proficiency}%`,
                      background: `linear-gradient(90deg, ${activeCategory.color}99, ${activeCategory.color})`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
              {activeCategory.tools.map((tool, index) => (
                <div
                  key={tool}
                  className="skills-chip-enter group flex items-center gap-2 rounded-lg border px-2.5 py-2 font-mono text-xs transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: `${activeCategory.color}2F`,
                    background: `linear-gradient(140deg, ${activeCategory.color}15, #0d1117 55%)`,
                    color: activeCategory.color,
                    animationDelay: `${index * 22}ms`,
                  }}
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[10px] text-[#8b949e] border-[#21262d] bg-[#080b12] group-hover:text-[#f0f6fc] transition-colors">
                    {index + 1}
                  </span>
                  <span className="truncate">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All tools mini overview */}
        <div className="fade-up mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`relative overflow-hidden p-3 rounded-lg border border-[#21262d] bg-[#0d1117] cursor-pointer transition-all duration-300 group ${
                active === cat.id ? '-translate-y-0.5' : 'hover:-translate-y-0.5'
              }`}
              style={{
                borderColor: active === cat.id ? `${cat.color}6A` : undefined,
                boxShadow: active === cat.id ? `0 0 16px ${cat.color}20` : undefined,
                transitionDelay: `${i * 30}ms`,
                opacity: isVisible ? 1 : 0.75,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(120deg, ${cat.color}15, transparent 55%)` }}
              />
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{cat.icon}</span>
                <span className="font-mono text-xs text-[#484f58] group-hover:text-[#8b949e] transition-colors truncate">{cat.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs" style={{ color: cat.color }}>
                  {cat.tools.length} tools
                </div>
                <Activity size={12} style={{ color: cat.color }} className="opacity-70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
