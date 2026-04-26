'use client'
import { useState, useEffect } from 'react'
import { Menu, X, Terminal } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Arsenal' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#ctf', label: 'CTFs' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.3 }
    )
    links.forEach(l => {
      const el = document.querySelector(l.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#080b12]/95 backdrop-blur-md border-b border-[#21262d]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 border border-[#00ff88] rounded flex items-center justify-center group-hover:bg-[#00ff8812] transition-colors">
            <Terminal size={14} className="text-[#00ff88]" />
          </div>
          <span className="font-mono text-sm text-[#f0f6fc] group-hover:text-[#00ff88] transition-colors">
            0xAbabil<span className="text-[#00ff88]">@</span>localhost
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`px-3 py-1.5 text-sm font-mono rounded transition-all duration-200 ${
                  active === l.href.slice(1)
                    ? 'text-[#00ff88] bg-[#00ff8810]'
                    : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#ffffff08]'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-1.5 text-sm font-mono border border-[#00ff88] text-[#00ff88] rounded hover:bg-[#00ff8812] transition-all duration-200"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#8b949e] hover:text-[#00ff88] transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d1117] border-t border-[#21262d] px-6 py-4">
          <ul className="flex flex-col gap-2">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm font-mono text-[#8b949e] hover:text-[#00ff88] hover:bg-[#00ff8808] rounded transition-all"
                >
                  <span className="text-[#00ff8860] mr-2">›</span>{l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
