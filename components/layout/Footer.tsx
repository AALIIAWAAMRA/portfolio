import { Terminal, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#21262d] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 border border-[#00ff88] rounded flex items-center justify-center">
              <Terminal size={12} className="text-[#00ff88]" />
            </div>
            <span className="font-mono text-sm text-[#484f58]">
              0xAbabil<span className="text-[#00ff88]">@</span>localhost
            </span>
          </div>

          {/* Center */}
          <p className="font-mono text-xs text-[#484f58] text-center">
            &copy; {new Date().getFullYear()} 0xABABIL — Built to break things securely.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/AALIIAWAAMRA' },
              { icon: Linkedin, href: 'https://linkedin.com/in/0xAbabil' },
              { icon: Mail, href: 'deafmute000@gmail.com' },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 border border-[#21262d] rounded flex items-center justify-center text-[#484f58] hover:text-[#00ff88] hover:border-[#00ff8840] transition-all"
              >
                <Icon size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
