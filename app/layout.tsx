import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '0xAbabil — Penetration Tester & Security Researcher',
  description: 'Offensive security engineer, cryptographer, and red team specialist. Building tools that break things to make them stronger.',
  keywords: ['penetration testing', 'red team', 'cybersecurity', 'malware analysis', 'cryptography', 'reverse engineering'],
  authors: [{ name: '0xAbabil' }],
  openGraph: {
    title: '0xAbabil — Penetration Tester',
    description: 'Offensive security engineer, cryptographer, and red team specialist.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#080b12] text-[#f0f6fc] antialiased">
        {children}
      </body>
    </html>
  )
}
