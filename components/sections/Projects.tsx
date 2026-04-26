'use client'
import { useEffect, useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'

const PROJECTS = [
  {
    name: 'Venus-Trap',
    subtitle: 'Advanced Honeypot Platform',
    description: 'Production-grade deception infrastructure for live malware capture and threat-intelligence sharing. Captures real-world attack patterns, fingerprints attacker OSes, and feeds a live threat-intel community.',
    stack: ['Python', 'Dionaea', 'XMPP', 'Grafana', 'Kibana', 'tcpreplay', 'p0f'],
    highlights: ['Live malware capture & SHA-256 triage', 'Real-time XMPP pub/sub alerting', 'Grafana/Kibana attack dashboards', 'Geographic attacker attribution'],
    github: 'https://github.com/AALIIAWAAMRA/Venus-Trap',
    color: '#00ff88',
    tag: 'Threat Intelligence',
  },
  {
    name: 'Predicta',
    subtitle: 'Intelligent Malware Detection System',
    description: 'Hybrid ML/DL pipeline for polymorphic, zero-day, and APT malware classification. Combines static PE analysis with behavioral signals to automate analyst triage at scale.',
    stack: ['Python', 'scikit-learn', 'TensorFlow', 'Keras', 'Static Analysis', 'Behavioral Analysis'],
    highlights: ['Hybrid static + behavioral feature extraction', 'Multi-family APT classification', 'Automated threat scoring', 'False-positive suppression'],
    github: 'https://github.com/AALIIAWAAMRA/Predicta',
    color: '#f97316',
    tag: 'ML Security',
  },
  {
    name: 'KeySploit',
    subtitle: 'Cryptographic Exploitation Framework',
    description: 'Practical cryptanalysis platform for pentesters. Attack modules targeting real RSA, AES, and ECC implementation flaws — including side-channel timing demonstrations.',
    stack: ['Python', 'Cryptography', 'Cryptanalysis', 'x86 Assembly'],
    highlights: ['RSA weak key & small-exponent attacks', 'AES padding oracle & mode weaknesses', 'ECC invalid-curve attacks', 'Side-channel timing demonstrations'],
    github: 'https://github.com/AALIIAWAAMRA/KeySploit',
    color: '#a855f7',
    tag: 'Cryptanalysis',
  },
  {
    name: 'Network Attack Simulator',
    subtitle: 'Live Attack Simulation Environment',
    description: 'Safe, instrumented environment for simulating real network attacks — generating PCAP datasets for custom Snort rule development and IDS/IPS training.',
    stack: ['Python', 'NetworkX', 'Matplotlib', 'Scapy', 'Wireshark'],
    highlights: ['Live DoS, MITM, brute-force simulation', 'Real-time countermeasure metrics', 'Network topology visualization', 'Custom Snort rule generation'],
    github: 'https://github.com/AALIIAWAAMRA/networek_attack_simullation',
    color: '#22d3ee',
    tag: 'Network Security',
  },
  {
    name: 'StratoCore Compiler',
    subtitle: 'Security-Hardened Embedded Compiler',
    description: 'A compiler for embedded systems with integrated memory protection, secure boot validation, and runtime integrity verification — directly relevant to IoT firmware pentesting.',
    stack: ['C', 'Compiler Design', 'Embedded Systems', 'Assembly'],
    highlights: ['Memory protection primitives', 'Secure boot chain validation', 'Runtime integrity checks', 'IoT firmware security'],
    github: 'https://github.com/AALIIAWAAMRA/StratoCore',
    color: '#3b82f6',
    tag: 'Embedded Security',
  },
  {
    name: 'PKI & VPN Infrastructure',
    subtitle: 'Full Certificate Authority Stack',
    description: 'Full PKI implementation — certificate issuance, renewal, and revocation — paired with OpenVPN mutual-auth tunnels. Built to understand exactly how PKI misconfigurations become pentest targets.',
    stack: ['OpenSSL', 'OpenVPN', 'Cryptography', 'PKI'],
    highlights: ['Full CA lifecycle management', 'Certificate-based mutual auth', 'Encrypted tunnel establishment', 'Misconfiguration research'],
    github: 'https://github.com/AALIIAWAAMRA',
    color: '#84cc16',
    tag: 'Infrastructure',
  },
]

export default function Projects() {
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
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">03 / Projects</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] mb-4">
          Built from Scratch.
          <br />
          <span className="gradient-text">Deployed in Production.</span>
        </h2>
        <p className="fade-up text-[#8b949e] text-[15px] mb-12 max-w-xl">
          Every project is a working system — not a proof-of-concept. Each one solves a real offensive security problem.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="fade-up card-glow group rounded-xl border border-[#21262d] bg-[#0d1117] p-6 flex flex-col gap-4 hover:border-current transition-all duration-300"
              style={{ '--hover-color': project.color } as React.CSSProperties}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = project.color + '40'
                el.style.boxShadow = `0 0 30px ${project.color}08`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = '#21262d'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded"
                      style={{ background: project.color + '15', color: project.color, border: `1px solid ${project.color}30` }}
                    >
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#f0f6fc] group-hover:text-white transition-colors">
                    {project.name}
                  </h3>
                  <p className="font-mono text-xs text-[#484f58] mt-0.5">{project.subtitle}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-[#21262d] rounded text-[#484f58] hover:text-[#f0f6fc] hover:border-[#484f58] transition-all shrink-0"
                >
                  <Github size={13} />
                </a>
              </div>

              {/* Description */}
              <p className="text-[#8b949e] text-[13px] leading-relaxed">{project.description}</p>

              {/* Highlights */}
              <ul className="space-y-1">
                {project.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 font-mono text-xs text-[#484f58]">
                    <span style={{ color: project.color }} className="mt-0.5 shrink-0">▸</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-[#21262d]">
                {project.stack.map(t => (
                  <span key={t} className="font-mono text-[10px] text-[#484f58] px-1.5 py-0.5 bg-[#111827] rounded border border-[#21262d]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extra projects */}
        <div className="fade-up mt-8 grid sm:grid-cols-2 gap-4">
          {[
            { name: 'Database Security Platform', url: 'https://database-mastry.vercel.app', desc: 'SQL injection prevention & hardening — interactive security training.', stack: 'HTML · CSS · JS · MySQL' },
            { name: 'Cryptography Learning Platform', url: 'https://binary-bastion.vercel.app', desc: 'Applied crypto training — RSA, ECC, DH, protocol vulnerability demos.', stack: 'HTML · CSS · JavaScript' },
          ].map(p => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-glow p-5 rounded-xl border border-[#21262d] bg-[#0d1117] hover:border-[#00ff8840] transition-all group flex items-start gap-4"
            >
              <ExternalLink size={14} className="text-[#484f58] group-hover:text-[#00ff88] transition-colors shrink-0 mt-0.5" />
              <div>
                <div className="font-display font-semibold text-[#f0f6fc] text-sm group-hover:text-[#00ff88] transition-colors">{p.name}</div>
                <div className="font-mono text-xs text-[#484f58] mt-1">{p.desc}</div>
                <div className="font-mono text-[10px] text-[#22d3ee] mt-2">{p.stack}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
