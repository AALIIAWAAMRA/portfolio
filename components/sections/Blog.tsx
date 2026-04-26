'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, Download, FileText, Search, Sparkles } from 'lucide-react'

const TOPICS = ['All', 'Network Security', 'SOC & DFIR', 'Web Security', 'Recon & OSINT'] as const

type Topic = (typeof TOPICS)[number]
type ContentTopic = Exclude<Topic, 'All'>

type Report = {
  slug: string
  title: string
  summary: string
  topic: ContentTopic
  date: string
  pages: number
  sizeLabel: string
  bytes: number
  tools: string[]
  highlights: string[]
  href: string
}

const TOPIC_META: Record<ContentTopic, { color: string; soft: string; description: string }> = {
  'Network Security': {
    color: '#22d3ee',
    soft: 'rgba(34,211,238,0.12)',
    description: 'Traffic analysis, IDS/IPS tuning, and adversarial network simulations.',
  },
  'SOC & DFIR': {
    color: '#00ff88',
    soft: 'rgba(0,255,136,0.12)',
    description: 'Wazuh, Velociraptor, SIEM/XDR fundamentals, and incident investigations.',
  },
  'Web Security': {
    color: '#f59e0b',
    soft: 'rgba(245,158,11,0.12)',
    description: 'WAF defenses, OWASP attack patterns, and HTTPS/TLS inspection workflows.',
  },
  'Recon & OSINT': {
    color: '#a855f7',
    soft: 'rgba(168,85,247,0.12)',
    description: 'Passive/active reconnaissance and attack-surface mapping exercises.',
  },
}

const REPORTS: Report[] = [
  {
    slug: 'snort-ids-ips-lab',
    title: 'Snort IDS/IPS Lab: Rules, Detection, and Inline Blocking',
    summary:
      'Hands-on Snort workflow covering sniffer/logger/IDS modes, custom rules, and practical alert validation against scans and web attack patterns.',
    topic: 'Network Security',
    date: 'Dec 2025',
    pages: 12,
    sizeLabel: '2.1 MB',
    bytes: 2163200,
    tools: ['Snort 3', 'Nmap', 'curl', 'Metasploitable'],
    highlights: [
      'Compared Snort operation modes and log outputs',
      'Wrote custom ICMP, /admin, and Telnet rules',
      'Validated IDS alerts and IPS drop behavior',
    ],
    href: '/blog/snort-ids-ips-lab.pdf',
  },
  {
    slug: 'network-attacks-lab-report',
    title: 'Network Attack Labs: ARP MITM, SYN Flood, and TCP Hijacking',
    summary:
      'Multi-part network security report documenting reconnaissance, ARP spoofing, SYN flooding, and TCP session hijacking with verification and defense steps.',
    topic: 'Network Security',
    date: 'Apr 2026',
    pages: 16,
    sizeLabel: '756 KB',
    bytes: 773871,
    tools: ['nmap', 'arpspoof', 'tcpdump', 'Wireshark'],
    highlights: [
      'Executed and analyzed ARP spoofing MITM flows',
      'Studied SYN backlog pressure and flood impact',
      'Reviewed static ARP and DAI defensive controls',
    ],
    href: '/blog/network-attacks-lab-report.pdf',
  },
  {
    slug: 'lab4-edr-incident-investigation',
    title: 'EDR + SIEM Incident Investigation with Velociraptor and Wazuh',
    summary:
      'SOC-focused investigation lab combining endpoint telemetry and SIEM alerting to reconstruct attacker activity and map behaviors to MITRE ATT&CK.',
    topic: 'SOC & DFIR',
    date: 'Apr 2026',
    pages: 20,
    sizeLabel: '3.9 MB',
    bytes: 3994893,
    tools: ['Velociraptor', 'Wazuh', 'MITRE ATT&CK'],
    highlights: [
      'Investigated suspicious endpoint behavior with artifacts',
      'Correlated Wazuh alerts with attacker timeline evidence',
      'Mapped brute force and script activity to ATT&CK techniques',
    ],
    href: '/blog/lab4-edr-incident-investigation.pdf',
  },
  {
    slug: 'siem-fundamentals-part-1',
    title: 'SIEM Fundamentals, XDR Comparison, and Wazuh Architecture',
    summary:
      'Foundational SIEM study covering log/event/alert correlation, SIEM vs XDR roles, Wazuh component architecture, and installation flow.',
    topic: 'SOC & DFIR',
    date: 'Apr 2026',
    pages: 12,
    sizeLabel: '1.3 MB',
    bytes: 1285424,
    tools: ['SIEM', 'XDR', 'Wazuh', 'Docker'],
    highlights: [
      'Clarified SIEM detection vs prevention concepts',
      'Explained Wazuh agent-manager-indexer-dashboard flow',
      'Documented practical deployment sequence',
    ],
    href: '/blog/siem-fundamentals-part-1.pdf',
  },
  {
    slug: 'lab1-siem-xdr-wazuh-installation',
    title: 'Lab 1 Blueprint: SIEM/XDR Wazuh Installation',
    summary:
      'Structured assignment template for SIEM/XDR fundamentals and Wazuh setup, with required validation steps for agents, events, and dashboard alerts.',
    topic: 'SOC & DFIR',
    date: 'Feb 2026',
    pages: 1,
    sizeLabel: '84 KB',
    bytes: 85683,
    tools: ['Wazuh', 'SIEM', 'XDR'],
    highlights: [
      'Defines SIEM and XDR baseline questions',
      'Covers architecture and data-flow checkpoints',
      'Includes installation and validation requirements',
    ],
    href: '/blog/lab1-siem-xdr-wazuh-installation.pdf',
  },
  {
    slug: 'lab5-web-security-waf-owasp-dvwa',
    title: 'Web Security Lab: WAF, OWASP Top 10, and DVWA Attacks',
    summary:
      'Applied web security lab focused on WAF behavior, OWASP-driven attack mapping, and practical SQLi/XSS testing against DVWA security levels.',
    topic: 'Web Security',
    date: 'Apr 2026',
    pages: 8,
    sizeLabel: '571 KB',
    bytes: 583791,
    tools: ['DVWA', 'OWASP Top 10', 'WAF', 'SQLi/XSS'],
    highlights: [
      'Contrasted NGFW and WAF responsibilities',
      'Mapped DVWA findings to OWASP categories',
      'Discussed bypass and mitigation approaches',
    ],
    href: '/blog/lab5-web-security-waf-owasp-dvwa.pdf',
  },
  {
    slug: 'tls-inspection-report',
    title: 'TLS Inspection Report: mitmproxy Credential and File Analysis',
    summary:
      'End-to-end HTTPS interception exercise covering proxy setup, root certificate trust, credential capture visibility, and suspicious file triage with VirusTotal.',
    topic: 'Web Security',
    date: 'Apr 2026',
    pages: 22,
    sizeLabel: '1.7 MB',
    bytes: 1768399,
    tools: ['mitmproxy', 'Firefox', 'VirusTotal', 'TLS'],
    highlights: [
      'Configured proxy and certificate trust chain correctly',
      'Verified why decrypted credentials become observable',
      'Extracted and analyzed downloaded suspicious content',
    ],
    href: '/blog/tls-inspection-report.pdf',
  },
  {
    slug: 'os-security-recon-password-attacks',
    title: 'OS Security Practical Work 3: Reconnaissance and Password Attacks',
    summary:
      'Recon-focused report documenting passive and active information gathering, infrastructure inference from scans, and password-attack planning decisions.',
    topic: 'Recon & OSINT',
    date: 'Apr 2026',
    pages: 11,
    sizeLabel: '1.7 MB',
    bytes: 1705441,
    tools: ['whois/nslookup', 'Nmap', 'theHarvester', 'Hydra'],
    highlights: [
      'Collected domain, subdomain, and mail service intelligence',
      'Compared scan behavior under direct and proxied traffic',
      'Built initial infrastructure hypothesis from evidence',
    ],
    href: '/blog/os-security-recon-password-attacks.pdf',
  },
]

function ReportCard({ report, visible, delay }: { report: Report; visible: boolean; delay: number }) {
  const accent = TOPIC_META[report.topic]

  return (
    <article
      className={`fade-up group relative overflow-hidden rounded-2xl border border-[#21262d] bg-[#0d1117] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#484f58] ${
        visible ? 'visible' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 85% 0%, ${accent.soft}, transparent 55%)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide"
            style={{ color: accent.color, background: `${accent.color}1A`, border: `1px solid ${accent.color}44` }}
          >
            {report.topic}
          </span>
          <span className="font-mono text-[10px] text-[#484f58]">{report.date}</span>
          <span className="ml-auto font-mono text-[10px] text-[#484f58]">{report.pages} pages</span>
        </div>

        <h3 className="mb-2 font-display text-xl font-bold leading-snug text-[#f0f6fc] transition-colors group-hover:text-white">
          {report.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-[#8b949e]">{report.summary}</p>

        <ul className="mb-4 space-y-1.5 border-l border-[#21262d] pl-3">
          {report.highlights.map(item => (
            <li key={item} className="text-xs leading-relaxed text-[#8b949e]">
              {item}
            </li>
          ))}
        </ul>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {report.tools.map(tool => (
            <span key={tool} className="rounded border border-[#21262d] bg-[#111827] px-2 py-0.5 font-mono text-[10px] text-[#8b949e]">
              {tool}
            </span>
          ))}
          <span className="rounded border border-[#21262d] bg-[#111827] px-2 py-0.5 font-mono text-[10px] text-[#484f58]">
            {report.sizeLabel}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[#21262d] pt-4">
          <a
            href={report.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#21262d] px-3 py-1.5 font-mono text-xs text-[#f0f6fc] transition-colors hover:border-[#484f58]"
          >
            Open report
            <ArrowUpRight size={12} />
          </a>
          <a
            href={report.href}
            download
            className="inline-flex items-center gap-1.5 rounded-md border border-[#21262d] px-3 py-1.5 font-mono text-xs text-[#8b949e] transition-colors hover:border-[#484f58] hover:text-[#f0f6fc]"
          >
            Download
            <Download size={12} />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Blog() {
  const [activeTopic, setActiveTopic] = useState<Topic>('All')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const topicCounts = useMemo(() => {
    return REPORTS.reduce(
      (acc, report) => {
        acc[report.topic] += 1
        return acc
      },
      {
        'Network Security': 0,
        'SOC & DFIR': 0,
        'Web Security': 0,
        'Recon & OSINT': 0,
      } as Record<ContentTopic, number>
    )
  }, [])

  const filteredReports = useMemo(() => {
    const search = query.trim().toLowerCase()

    return REPORTS.filter(report => {
      const topicMatch = activeTopic === 'All' || report.topic === activeTopic
      const searchSpace = `${report.title} ${report.summary} ${report.tools.join(' ')} ${report.highlights.join(' ')}`.toLowerCase()
      const searchMatch = search.length === 0 || searchSpace.includes(search)
      return topicMatch && searchMatch
    })
  }, [activeTopic, query])

  const groupedReports = useMemo(() => {
    const groups = (activeTopic === 'All' ? TOPICS.slice(1) : [activeTopic]) as ContentTopic[]
    return groups
      .map(topic => ({
        topic,
        reports: filteredReports.filter(report => report.topic === topic),
      }))
      .filter(group => group.reports.length > 0)
  }, [activeTopic, filteredReports])

  const totalPages = useMemo(() => REPORTS.reduce((sum, report) => sum + report.pages, 0), [])
  const totalSizeMb = useMemo(
    () => (REPORTS.reduce((sum, report) => sum + report.bytes, 0) / (1024 * 1024)).toFixed(1),
    []
  )

  return (
    <section id="blog" ref={sectionRef} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_65%,rgba(0,255,136,0.045),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_85%_25%,rgba(34,211,238,0.05),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className={`fade-up mb-16 flex items-center gap-3 ${visible ? 'visible' : ''}`}>
          <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">06 / Blog</span>
          <div className="h-px max-w-xs flex-1 bg-[#21262d]" />
        </div>

        <div className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className={`fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: '50ms' }}>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight text-[#f0f6fc] sm:text-5xl">
              Real Lab Reports.
              <br />
              <span className="gradient-text">Organized by Topic.</span>
            </h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-[#8b949e]">
              This section now uses real content extracted from your <span className="text-[#f0f6fc]">New Folder</span>
              {' '}documents. Every card opens the original PDF with zero placeholder text.
            </p>
          </div>

          <div className={`fade-up grid grid-cols-3 gap-3 ${visible ? 'visible' : ''}`} style={{ transitionDelay: '110ms' }}>
            {[
              { label: 'Reports', value: REPORTS.length.toString(), icon: FileText },
              { label: 'Pages', value: totalPages.toString(), icon: BookOpen },
              { label: 'Archive', value: `${totalSizeMb} MB`, icon: Sparkles },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-[#21262d] bg-[#0d1117] p-3 text-center">
                <item.icon size={14} className="mx-auto mb-2 text-[#8b949e]" />
                <div className="font-display text-2xl font-bold text-[#f0f6fc]">{item.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#484f58]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`fade-up mb-10 rounded-2xl border border-[#21262d] bg-[#0d1117] p-4 sm:p-5 ${visible ? 'visible' : ''}`} style={{ transitionDelay: '160ms' }}>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-sm">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" />
              <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search by report, tool, or technique..."
                className="w-full rounded-lg border border-[#21262d] bg-[#080b12] py-2 pl-8 pr-3 font-mono text-xs text-[#f0f6fc] placeholder-[#484f58] transition-colors focus:border-[#00ff8840] focus:outline-none"
              />
            </div>
            <div className="font-mono text-[11px] text-[#484f58]">
              {filteredReports.length} result{filteredReports.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {TOPICS.map(topic => {
              const isActive = activeTopic === topic
              const meta = topic === 'All' ? { color: '#00ff88' } : TOPIC_META[topic]
              const count = topic === 'All' ? REPORTS.length : topicCounts[topic]

              return (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className="rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-all duration-200"
                  style={
                    isActive
                      ? {
                          color: meta.color,
                          borderColor: `${meta.color}66`,
                          background: `${meta.color}1A`,
                        }
                      : {
                          color: '#8b949e',
                          borderColor: '#21262d',
                          background: '#080b12',
                        }
                  }
                >
                  {topic} <span className="text-[#484f58]">({count})</span>
                </button>
              )
            })}
          </div>
        </div>

        {groupedReports.length > 0 && (
          <div className="space-y-12">
            {groupedReports.map((group, groupIndex) => {
              const meta = TOPIC_META[group.topic]
              return (
                <div key={group.topic} className={`fade-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${220 + groupIndex * 70}ms` }}>
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
                        <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: meta.color }}>
                          {group.topic}
                        </span>
                      </div>
                      <p className="text-sm text-[#8b949e]">{meta.description}</p>
                    </div>
                    <div className="rounded-full border border-[#21262d] bg-[#0d1117] px-3 py-1 font-mono text-[11px] text-[#8b949e]">
                      {group.reports.length} report{group.reports.length > 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {group.reports.map((report, index) => (
                      <ReportCard
                        key={report.slug}
                        report={report}
                        visible={visible}
                        delay={280 + groupIndex * 90 + index * 60}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {filteredReports.length === 0 && (
          <div className={`fade-up rounded-2xl border border-[#21262d] bg-[#0d1117] py-16 text-center ${visible ? 'visible' : ''}`}>
            <p className="font-mono text-sm text-[#8b949e]">No reports match &quot;{query}&quot; in this topic.</p>
            <button
              onClick={() => {
                setQuery('')
                setActiveTopic('All')
              }}
              className="mt-3 font-mono text-xs text-[#00ff88] hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
