'use client'
import { useEffect, useRef, useState } from 'react'
import { Mail, Github, Linkedin, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const SERVICES = [
  { icon: '⚔', title: 'Web & API Penetration Testing', desc: 'Full OWASP coverage, manual exploitation, CVSS-scored reports' },
  { icon: '📡', title: 'Network & Infrastructure Assessment', desc: 'MITM, packet-level analysis, lateral movement elimination' },
  { icon: '🔐', title: 'Cryptographic Implementation Audit', desc: 'RSA/AES/ECC implementation review, key management analysis' },
  { icon: '📱', title: 'Mobile Application Security', desc: 'Android/iOS static & dynamic analysis, SSL pinning bypass' },
  { icon: '🧬', title: 'Threat Intelligence & Malware Research', desc: 'APT simulation, honeypot deployment, ML-based classification' },
  { icon: '🎓', title: 'Security Training & Curriculum Design', desc: 'Adversary-first curriculum for teams and bootcamps' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailto = `mailto:nidalhelahessane@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.location.href = mailto
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_80%,rgba(0,255,136,0.04),transparent)]" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-up flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">07 / Contact</span>
          <div className="flex-1 h-px bg-[#21262d] max-w-xs" />
        </div>

        <h2 className="fade-up font-display font-bold text-4xl sm:text-5xl text-[#f0f6fc] mb-4">
          Let&apos;s Break Something<br />
          <span className="gradient-text">Together.</span>
        </h2>
        <p className="fade-up text-[#8b949e] text-[15px] mb-12 max-w-xl">
          Looking for a penetration tester, red team consultant, or security instructor? I&apos;m available for freelance engagements, consulting, and collaborations.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Services + contact info */}
          <div className="flex flex-col gap-8">
            {/* Services */}
            <div>
              <h3 className="fade-up font-mono text-xs text-[#484f58] tracking-widest uppercase mb-5">Services</h3>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map(s => (
                  <div
                    key={s.title}
                    className="fade-up flex items-start gap-3 p-3 rounded-lg border border-[#21262d] bg-[#0d1117] hover:border-[#00ff8830] transition-colors"
                  >
                    <span className="text-base shrink-0">{s.icon}</span>
                    <div>
                      <div className="font-display font-semibold text-[#f0f6fc] text-sm">{s.title}</div>
                      <div className="font-mono text-[11px] text-[#484f58] mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="fade-up">
              <h3 className="font-mono text-xs text-[#484f58] tracking-widest uppercase mb-4">Direct Contact</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Mail, label: 'deafmute000@gmail.com', href: 'mailto:deafmute000@gmail.com' },
                  { icon: Github, label: 'github.com/AALIIAWAAMRA', href: 'https://github.com/AALIIAWAAMRA' },
                  { icon: Linkedin, label: 'linkedin.com', href: 'https://linkedin.com/in/nidhal-lahcen-8ba0a6296' },
          
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#8b949e] hover:text-[#00ff88] transition-colors group"
                  >
                    <div className="w-8 h-8 border border-[#21262d] rounded flex items-center justify-center group-hover:border-[#00ff8840] transition-colors">
                      <Icon size={12} />
                    </div>
                    <span className="font-mono text-xs truncate">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="fade-up">
            <div
              className="p-6 rounded-xl border border-[#21262d] bg-[#0d1117]"
              style={{ boxShadow: '0 0 40px rgba(0,255,136,0.04)' }}
            >
              <h3 className="font-display font-semibold text-[#f0f6fc] mb-5">Send a Message</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] text-[#484f58] tracking-widest uppercase block mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-[#111827] border border-[#21262d] rounded px-3 py-2.5 font-mono text-sm text-[#f0f6fc] placeholder-[#484f58] focus:outline-none focus:border-[#00ff8840] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-[#484f58] tracking-widest uppercase block mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full bg-[#111827] border border-[#21262d] rounded px-3 py-2.5 font-mono text-sm text-[#f0f6fc] placeholder-[#484f58] focus:outline-none focus:border-[#00ff8840] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#484f58] tracking-widest uppercase block mb-1.5">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder="Pentest Engagement / Collaboration"
                    className="w-full bg-[#111827] border border-[#21262d] rounded px-3 py-2.5 font-mono text-sm text-[#f0f6fc] placeholder-[#484f58] focus:outline-none focus:border-[#00ff8840] transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[#484f58] tracking-widest uppercase block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your engagement scope, timeline, and what you need..."
                    className="w-full bg-[#111827] border border-[#21262d] rounded px-3 py-2.5 font-mono text-sm text-[#f0f6fc] placeholder-[#484f58] focus:outline-none focus:border-[#00ff8840] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded font-mono font-semibold text-sm transition-all duration-200 ${
                    sent
                      ? 'bg-[#00ff8820] border border-[#00ff8840] text-[#00ff88]'
                      : 'bg-[#00ff88] text-[#080b12] hover:bg-[#00ff88]/90'
                  }`}
                >
                  {sent ? (
                    <><CheckCircle size={14} /> Message Sent</>
                  ) : (
                    <><Send size={14} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
