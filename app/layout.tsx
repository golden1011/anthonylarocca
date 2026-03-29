import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GTA AI Automation \u2014 Anthony La Rocca',
  description:
    'Anthony La Rocca helps local GTA businesses replace manual, repetitive work with custom AI automations \u2014 results in 30 days or less.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
