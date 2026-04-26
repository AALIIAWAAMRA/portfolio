'use client'
import { useEffect, useRef } from 'react'

const EXPERIENCE = [
  {
    role: 'Software Engineer Intern',
    company: 'Cybears®',
    period: 'Feb 2026 – Present',
    type: 'Full-time',
    color: '#00ff88',
    points: [
      'Architecting security-hardened microservices and threat-intelligence data pipelines (MERN, Django, Redis, Docker) for an early IoC detection product.',
      'Designed automated correlation engine aggregating heterogeneous security events, computing confidence scores, and surfacing actionable early-warning indicators.',
      'Applying DevSecOps rigorously: threat modeling each sprint, SAST and container security before every release, TTP-to-feature translation.',
    ],
    stack: ['MERN', 'Django', 'Redis', 'Docker', 'DevSecOps'],
  },
  {
    role: 'Cybersecurity Instructor',
    company: 'GOMYCODE',
    period: 'Dec 2025 – Present',
    type: 'Part-time',
    color: '#22d3ee',
    points: [
      'Own the full offensive security curriculum for 30+ students per cohort — designed from scratch: lesson architecture, custom lab environments, CTF challenges.',
      'Deliver hands-on modules across web exploitation (SQLi, XSS, CSRF, IDOR), network attacks, IAM abuse, crypto protocol weaknesses, malware analysis.',
      'Achieve student pass rate exceeding standard bootcamp benchmarks through adversary-first methodology.',
    ],
    stack: ['Web Exploitation', 'Metasploit', 'Burp Suite', 'Wireshark', 'CTF Design'],
  },
  {
    role: 'System Engineer',
    company: 'I-Car Corporation',
    period: 'Oct – Dec 2025',
    type: 'Part-time',
    color: '#f97316',
    points: [
      'Administered RHEL/Ubuntu server fleet: OS hardening, RAID management, KVM/QEMU virtualization across multi-site infrastructure.',
      'Implemented VLAN segmentation, IPsec/OpenVPN tunnels, NAT, and iptables — systematically eliminating lateral-movement paths.',
      'Monitored traffic at packet level; supported IR with forensic log analysis and event timeline reconstruction.',
    ],
    stack: ['RHEL', 'KVM/QEMU', 'IPsec', 'OpenVPN', 'iptables', 'Wireshark'],
  },
  {
    role: 'Web Developer Intern',
    company: 'Codeva Technologies',
    period: 'Aug – Oct 2025',
    type: 'Remote',
    color: '#a855f7',
    points: [
      'Conducted offensive assessment of production web app against OWASP Top 10 — manually identified SQLi, stored/reflected XSS, and CSRF vulnerabilities.',
      'Drove hardening through parameterized queries, output encoding, anti-CSRF tokens, rate limiting, and server-side validation.',
      'Produced CVSS-scored vulnerability findings with exploitation proof-of-concept and prioritized remediation roadmap.',
    ],
    stack: ['OWASP Top 10', 'SQLi', 'XSS', 'CSRF', 'CVSS', 'Burp Suite'],
  },
]

const EDUCATION = [
  {
    degree: 'Engineering Degree — Computer Science',
    specialization: 'Specialization: Cybersecurity',
    institution: 'University of Batna 2, Algeria',
    period: '2020 – 2026',
    color: '#00ff88',
  },
  {
    degree: 'Cybersecurity & Cloud Bootcamp',
    specialization: 'Network security, AWS, pentesting, IR',
    institution: 'TEK-UP University, Tunisia',
    period: 'Jul 2025',
    color: '#22d3ee',
  },
]

export default function Experience() {
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
    <section id="experience" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_20%_50%,rgba(34,211,238,0.03),transparent)]" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">04 / Experience</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">
          {/* Timeline */}
          <div>
            <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] mb-12">
              In the Field
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff88] via-[#21262d] to-transparent" />

              <div className="flex flex-col gap-10 pl-8">
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className="fade-up relative">
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-8 top-1.5 w-3 h-3 rounded-full border-2"
                      style={{ borderColor: exp.color, background: '#080b12', boxShadow: `0 0 8px ${exp.color}60` }}
                    />

                    <div
                      className="card-glow p-5 rounded-xl border border-[#21262d] bg-[#0d1117] transition-all duration-300 hover:border-current"
                      onMouseEnter={e => {
                        const el = e.currentTarget
                        el.style.borderColor = exp.color + '40'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget
                        el.style.borderColor = '#21262d'
                      }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-display font-semibold text-[#f0f6fc]">{exp.role}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-sm" style={{ color: exp.color }}>{exp.company}</span>
                            <span className="font-mono text-xs text-[#484f58] px-1.5 py-0.5 border border-[#21262d] rounded">{exp.type}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-[#484f58] whitespace-nowrap">{exp.period}</span>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.points.map((p, j) => (
                          <li key={j} className="text-[#8b949e] text-[13px] leading-relaxed flex gap-2">
                            <span style={{ color: exp.color }} className="shrink-0 mt-0.5 text-xs">▸</span>
                            {p}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#21262d]">
                        {exp.stack.map(s => (
                          <span key={s} className="font-mono text-[10px] text-[#484f58] px-1.5 py-0.5 bg-[#111827] rounded border border-[#21262d]">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Education + Volunteer + Awards */}
          <div className="flex flex-col gap-8">
            {/* Education */}
            <div className="fade-up">
              <h3 className="font-display font-semibold text-[#f0f6fc] mb-4">Education</h3>
              <div className="flex flex-col gap-3">
                {EDUCATION.map((edu, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-[#21262d] bg-[#0d1117]"
                    style={{ borderLeft: `2px solid ${edu.color}` }}
                  >
                    <div className="font-display font-semibold text-[#f0f6fc] text-sm">{edu.degree}</div>
                    <div className="font-mono text-xs text-[#484f58] mt-0.5">{edu.specialization}</div>
                    <div className="font-mono text-xs mt-2" style={{ color: edu.color }}>{edu.institution}</div>
                    <div className="font-mono text-[10px] text-[#484f58] mt-1">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer */}
            <div className="fade-up">
              <h3 className="font-display font-semibold text-[#f0f6fc] mb-4">Open Source / Community</h3>
              <div
                className="p-4 rounded-xl border border-[#21262d] bg-[#0d1117]"
                style={{ borderLeft: '2px solid #00ff88' }}
              >
                <div className="font-display font-semibold text-[#f0f6fc] text-sm">President & Co-Founder</div>
                <div className="font-mono text-xs text-[#00ff88] mt-0.5">Binary Castle Scientific Club</div>
                <div className="font-mono text-[10px] text-[#484f58] mt-1 mb-3">2023 – 2025</div>
                <ul className="space-y-1">
                  {[
                    "Founded the university\u2019s cybersecurity research club \u2014 50+ active members",
                    'Ran 10+ technical workshops: malware analysis, pentest, IDS/IPS, packet analysis',
                    'Organized CTF competitions and live honeypot deployment sessions',
                  ].map(p => (
                    <li key={p} className="flex gap-2 text-[#8b949e] text-[12px] leading-relaxed">
                      <span className="text-[#00ff88] shrink-0 mt-0.5 text-xs">▸</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Awards */}
            {/* <div className="fade-up">
              <h3 className="font-display font-semibold text-[#f0f6fc] mb-4">Awards</h3>
              <div className="flex flex-col gap-2">
                {[
                  { title: '3rd Place', event: 'Devs for Devs Hackathon', icon: '🥉' },
                  { title: '5th Place', event: 'Online CTF Competition', icon: '🏆' },
                ].map(a => (
                  <div key={a.title} className="flex items-center gap-3 p-3 rounded-lg border border-[#21262d] bg-[#0d1117]">
                    <span className="text-xl">{a.icon}</span>
                    <div>
                      <div className="font-mono text-xs text-[#00ff88]">{a.title}</div>
                      <div className="font-mono text-[10px] text-[#484f58]">{a.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Languages */}
            {/* <div className="fade-up">
              <h3 className="font-display font-semibold text-[#f0f6fc] mb-4">Languages</h3>
              <div className="flex flex-col gap-2">
                {[
                  { lang: 'Arabic', level: 'Native', pct: 100 },
                  { lang: 'English', level: 'C1 Advanced', pct: 85 },
                  { lang: 'French', level: 'B2 Upper-Intermediate', pct: 70 },
                ].map(l => (
                  <div key={l.lang} className="space-y-1">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-[#f0f6fc]">{l.lang}</span>
                      <span className="text-[#484f58]">{l.level}</span>
                    </div>
                    <div className="h-1 bg-[#21262d] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${l.pct}%`, background: 'linear-gradient(90deg, #00ff88, #22d3ee)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
