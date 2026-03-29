'use client'

import { useState } from 'react'
import BookingModal from './components/BookingModal'

export default function Home() {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      {/* Purple glow orb */}
      <div
        className="fixed top-[-20%] left-[50%] translate-x-[-50%] w-[900px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, #6C47FF 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 max-w-6xl mx-auto">
        <span className="font-bold text-lg tracking-tight">Anthony La Rocca</span>
        <button
          onClick={() => setShowBooking(true)}
          className="text-sm text-[#A0A0B8] hover:text-white transition-colors duration-150"
        >
          Book a Call
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 md:pt-24 md:pb-36 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#6C47FF]/30 bg-[#6C47FF]/10 text-[#A0A0B8] text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[#6C47FF] animate-pulse" />
          Available for new clients in the GTA
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
          I Build AI Systems That{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C47FF] to-[#A78BFA]">
            Save You 10+ Hours
          </span>{' '}
          a Week
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-[#A0A0B8] max-w-2xl mb-10 leading-relaxed">
          Hi, I&apos;m Anthony La Rocca. I help local GTA businesses replace manual, repetitive work
          with custom AI automations - so you can focus on growth, not admin.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setShowBooking(true)}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#6C47FF] hover:bg-[#8B6FFF] text-white text-base font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{ boxShadow: '0 0 32px rgba(108, 71, 255, 0.4)' }}
          >
            Book a Call
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <span className="text-sm text-[#A0A0B8]">No commitment. 30-minute intro call.</span>
        </div>

        {/* Social proof strip */}
        <div className="mt-20 pt-10 border-t border-white/5 w-full">
          <p className="text-xs uppercase tracking-widest text-[#A0A0B8]/60 mb-6">
            Tools I use to automate your business
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['Make.com', 'n8n', 'OpenAI', 'Zapier', 'Airtable', 'Notion AI'].map((tool) => (
              <span
                key={tool}
                className="text-sm font-medium text-[#A0A0B8]/50 hover:text-[#A0A0B8] transition-colors duration-150"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </main>
  )
}
