'use client'
import { useEffect, useRef, useState } from 'react'

const CATEGORIES = [
  {
    id: 'web',
    label: 'Web Exploitation',
    color: '#00ff88',
    icon: '🌐',
    tools: ['Burp Suite', 'SQLmap', 'OWASP ZAP', 'Nikto', 'Gobuster', 'Dirb', 'SQLi (manual)', 'XSS', 'CSRF', 'IDOR', 'SSRF', 'XXE', 'JWT Attacks', 'Session Hijacking', 'REST Security', 'GraphQL Security'],
  },
  {
    id: 'network',
    label: 'Network & Infrastructure',
    color: '#22d3ee',
    icon: '📡',
    tools: ['Nmap', 'Wireshark', 'Scapy', 'Netcat', 'tcpreplay', 'Snort IDS/IPS', 'MITM', 'PCAP Analysis', 'OpenVPN', 'IPsec', 'VLAN', 'iptables', 'Port Scanning', 'Packet Crafting'],
  },
  {
    id: 'malware',
    label: 'Malware & APT',
    color: '#f97316',
    icon: '🧬',
    tools: ['Dionaea Honeypot', 'XMPP Alerting', 'p0f OS Fingerprinting', 'C2 Architecture', 'Evasion Techniques', 'VirusTotal', 'ANY.RUN', 'Custom Implants', 'SHA-256 Triage', 'MITRE ATT&CK'],
  },
  {
    id: 'crypto',
    label: 'Cryptography & RE',
    color: '#a855f7',
    icon: '🔐',
    tools: ['RSA Attacks', 'AES Mode Weaknesses', 'ECC Invalid-Curve', 'Padding Oracle', 'Side-Channel', 'x86/x64 ASM', 'Binary Analysis', 'OpenSSL', 'PKI / CA', 'Diffie-Hellman', 'Cryptanalysis', 'Key Management'],
  },
  {
    id: 'mobile',
    label: 'Mobile Security',
    color: '#eab308',
    icon: '📱',
    tools: ['MobSF', 'Frida', 'Apktool', 'ADB', 'Jadx', 'SSL Pinning Bypass', 'OWASP MASTG', 'OWASP MASVS', 'APK Reverse Engineering', 'Android Traffic Interception'],
  },
  {
    id: 'scripting',
    label: 'Scripting & Automation',
    color: '#3b82f6',
    icon: '⚡',
    tools: ['Python (advanced)', 'Bash', 'C (systems)', 'JavaScript/TypeScript', 'x86 Assembly', 'Custom Exploit Scripts', 'ML/DL Pipelines', 'Security Tool Development', 'Metasploit Framework'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevSecOps',
    color: '#06b6d4',
    icon: '☁',
    tools: ['AWS (EC2, S3, IAM)', 'Docker', 'Redis', 'KVM/QEMU', 'SAST Integration', 'Container Security', 'CI/CD Security', 'Threat Modeling', 'DevSecOps'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Standards',
    color: '#84cc16',
    icon: '📋',
    tools: ['PTES', 'OSSTMM', 'OWASP WSTG', 'MITRE ATT&CK', 'NIST CSF', 'CVSS/CVE', 'BloodHound', 'CrackMapExec', 'Responder', 'Hashcat', 'John the Ripper', 'Hydra'],
  },
]

export default function Skills() {
  const [active, setActive] = useState('web')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
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

  const activeCategory = CATEGORIES.find(c => c.id === active)!

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,255,136,0.03),transparent)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Label */}
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">02 / Arsenal</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] mb-4">
          Full-Spectrum Attack Surface
        </h2>
        <p className="fade-up text-[#8b949e] text-[15px] mb-12 max-w-xl">
          Every tool earned in the field. Click a category to explore the full toolkit.
        </p>

        {/* Category tabs */}
        <div className="fade-up flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border transition-all duration-200 ${
                active === cat.id
                  ? 'bg-[#0d1117] border-current text-current'
                  : 'border-[#21262d] text-[#484f58] hover:text-[#8b949e] hover:border-[#484f58]'
              }`}
              style={{ color: active === cat.id ? cat.color : undefined, borderColor: active === cat.id ? cat.color + '60' : undefined }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools display */}
        <div
          key={active}
          className="p-6 rounded-xl border border-[#21262d] bg-[#0d1117]"
          style={{ borderColor: activeCategory.color + '30', boxShadow: `0 0 30px ${activeCategory.color}08` }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{activeCategory.icon}</span>
            <h3 className="font-display font-semibold text-[#f0f6fc]">{activeCategory.label}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeCategory.tools.map(tool => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded font-mono text-xs border transition-all duration-200 hover:scale-105"
                style={{
                  background: activeCategory.color + '10',
                  border: `1px solid ${activeCategory.color}25`,
                  color: activeCategory.color,
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* All tools mini overview */}
        <div className="fade-up mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="p-3 rounded-lg border border-[#21262d] bg-[#0d1117] cursor-pointer hover:border-[#21262d]/60 transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{cat.icon}</span>
                <span className="font-mono text-xs text-[#484f58] group-hover:text-[#8b949e] transition-colors truncate">{cat.label}</span>
              </div>
              <div className="font-mono text-xs" style={{ color: cat.color }}>
                {cat.tools.length} tools
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
