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

      {/* Sticky Nav */}
      <nav className="sticky top-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-6xl mx-auto">
          <span className="font-bold text-lg tracking-tight">Anthony La Rocca</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs text-[#6C47FF] font-medium animate-pulse">
              Free 30-Min Call
            </span>
            <button
              onClick={() => setShowBooking(true)}
              className="px-4 py-2 bg-[#6C47FF] hover:bg-[#8B6FFF] text-white text-sm font-semibold rounded-full transition-all duration-200"
            >
              Book a Call
            </button>
          </div>
        </div>
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-28 md:pt-28 md:pb-40 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#6C47FF]/30 bg-[#6C47FF]/10 text-[#A0A0B8] text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[#6C47FF] animate-pulse" />
          GTA-based · Available for new clients
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
          Stop running your business.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C47FF] to-[#A78BFA]">
            Start growing it.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-[#A0A0B8] max-w-2xl mb-4 leading-relaxed">
          We build AI automations for GTA small businesses — so the follow-ups get sent, the
          invoices get chased, and the leads don&apos;t go cold. All without adding headcount.
        </p>

        <p className="text-base text-[#A0A0B8]/70 max-w-xl mb-10">
          No technical background needed. No long contracts. You own everything we build.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <button
            onClick={() => setShowBooking(true)}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#6C47FF] hover:bg-[#8B6FFF] text-white text-base font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{ boxShadow: '0 0 32px rgba(108, 71, 255, 0.4)' }}
          >
            Book a Free 30-Min Strategy Call
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
          <button
            onClick={() => {
              document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-6 py-3 border border-white/10 hover:border-white/30 text-[#A0A0B8] hover:text-white text-sm font-medium rounded-full transition-all duration-200"
          >
            See What We&apos;ve Built
          </button>
        </div>

        {/* Urgency signal */}
        <p className="text-sm text-[#A0A0B8]/60 italic">
          We take on 4–6 new clients per month — currently accepting March intakes.
        </p>

        {/* Tools strip */}
        <div className="mt-16 pt-10 border-t border-white/5 w-full">
          <p className="text-xs uppercase tracking-widest text-[#A0A0B8]/40 mb-5">
            Works with the tools you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['Make.com', 'n8n', 'OpenAI', 'Zapier', 'Airtable', 'Notion AI', 'Shopify', 'QuickBooks'].map(
              (tool) => (
                <span
                  key={tool}
                  className="text-sm font-medium text-[#A0A0B8]/40 hover:text-[#A0A0B8] transition-colors duration-150"
                >
                  {tool}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROBLEM / SOLUTION ── */}
      <section className="relative z-10 px-6 py-24 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Problem */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#A0A0B8]/50 mb-4">The Problem</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Running a small business in the GTA is a full-contact sport.
            </h2>
            <div className="space-y-4 text-[#A0A0B8] leading-relaxed">
              <p>
                You&apos;re the salesperson, the admin, the follow-up person, and the one who notices
                when something slips through the cracks.
              </p>
              <p>
                You answer the same questions twice a week. You chase the same invoices every month.
                You manually copy data between tools that should talk to each other.
              </p>
              <p className="text-white/80 font-medium">
                It&apos;s not a discipline problem. It&apos;s a systems problem.
              </p>
              <p>
                The automations that large companies use to run lean operations were out of reach for
                a business your size.
              </p>
              <p className="text-[#6C47FF] font-semibold text-lg">That&apos;s changed.</p>
            </div>
          </div>

          {/* Solution */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#A0A0B8]/50 mb-4">The Solution</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              We build those systems for you — fitted to your business, not a template.
            </h2>
            <div className="space-y-4 text-[#A0A0B8] leading-relaxed">
              <p>
                We sit down with you, map how your business actually runs, and build automations that
                take the repetitive work off your plate.
              </p>
              <p>
                They run in the background. They don&apos;t require you to learn anything new. And
                they start working in weeks, not months.
              </p>
              <p>
                Customer follow-ups. Appointment reminders. Lead qualification. Invoice chasing.
                Inventory alerts. Onboarding sequences.
              </p>
              <div className="mt-6 p-4 rounded-xl border border-[#6C47FF]/20 bg-[#6C47FF]/5">
                <p className="text-white font-medium">
                  The result: hours back every week. Fewer things falling through the cracks. A
                  business that handles more — without you handling more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mid-page soft CTA */}
        <div className="mt-14 text-center">
          <p className="text-[#A0A0B8] mb-4">Want to see what this looks like for your type of business?</p>
          <button
            onClick={() => setShowBooking(true)}
            className="px-6 py-3 border border-white/10 hover:border-[#6C47FF]/50 hover:bg-[#6C47FF]/10 text-[#A0A0B8] hover:text-white text-sm font-medium rounded-full transition-all duration-200"
          >
            Send Us a Question
          </button>
        </div>
      </section>

      {/* ── SECTION 3: AUTHORITY BAR ── */}
      <section className="relative z-10 px-6 py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#A0A0B8] uppercase tracking-widest mb-10">
            Built for the GTA. Proven in the field.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: '60+', label: 'Automations live across GTA small businesses' },
              { stat: '4 sectors', label: 'Trades, retail, hospitality, professional services' },
              { stat: '18 days', label: 'Average time to first automation live' },
              { stat: '100%', label: 'Client ownership — no platform lock-in, ever' },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex flex-col items-center gap-2">
                <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6C47FF] to-[#A78BFA]">
                  {stat}
                </span>
                <span className="text-sm text-[#A0A0B8] leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OFFER FRAMING ── */}
      <section className="relative z-10 px-6 py-24 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            This isn&apos;t software.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C47FF] to-[#A78BFA]">
              It&apos;s a done-for-you system built around your business.
            </span>
          </h2>
          <p className="text-[#A0A0B8] max-w-2xl mx-auto">
            We don&apos;t hand you a login and a tutorial. We understand how your business works,
            then we build it, connect it, test it, and hand it off running.
          </p>
        </div>

        {/* What's included */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: '🗺️', title: 'Discovery', body: 'We map your workflows and identify the highest-impact automation opportunities' },
            { icon: '🔧', title: 'Custom Build', body: 'We connect your tools and build the automations — we handle all the technical work' },
            { icon: '✅', title: 'Launch + QA', body: 'Everything is tested with real data before it goes live' },
            { icon: '📞', title: 'Ongoing Support', body: "We're available for adjustments and expansions as your business grows" },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="p-5 rounded-xl border border-white/8 bg-white/[0.03] hover:border-[#6C47FF]/30 transition-colors duration-200"
            >
              <div className="text-2xl mb-3">{icon}</div>
              <p className="font-semibold text-white mb-2">{title}</p>
              <p className="text-sm text-[#A0A0B8] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Offer Tiers */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#A0A0B8]/60 mb-1">Starter</p>
              <p className="text-sm text-[#A0A0B8] italic mb-3">
                For you if: you have one clear pain point and want to see results fast.
              </p>
            </div>
            <p className="text-[#A0A0B8] text-sm leading-relaxed flex-1">
              Lead follow-up, booking confirmations, invoice reminders — we pick the highest-ROI
              workflow, build it out, and get it live within 2 weeks. Clean and fast.
            </p>
            <button
              onClick={() => setShowBooking(true)}
              className="mt-auto w-full py-2.5 border border-white/10 hover:border-[#6C47FF]/50 hover:bg-[#6C47FF]/10 text-sm text-[#A0A0B8] hover:text-white rounded-full transition-all duration-200"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Growth — highlighted */}
          <div
            className="p-6 rounded-2xl border border-[#6C47FF]/40 bg-[#6C47FF]/5 flex flex-col gap-4 relative"
            style={{ boxShadow: '0 0 40px rgba(108, 71, 255, 0.12)' }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#6C47FF] text-white text-xs font-semibold rounded-full">
              Most Popular
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#A0A0B8]/60 mb-1">Growth</p>
              <p className="text-sm text-[#A0A0B8] italic mb-3">
                For you if: you&apos;re ready to connect your whole operation.
              </p>
            </div>
            <p className="text-[#A0A0B8] text-sm leading-relaxed flex-1">
              We audit your full workflow stack, rank the top 3–5 automation opportunities by
              impact, and build them out over 30–60 days. This is where businesses usually see a
              step-change in how they operate.
            </p>
            <button
              onClick={() => setShowBooking(true)}
              className="mt-auto w-full py-2.5 bg-[#6C47FF] hover:bg-[#8B6FFF] text-white text-sm font-semibold rounded-full transition-all duration-200"
            >
              Find Out Which Is Right for You
            </button>
          </div>

          {/* Ongoing Partner */}
          <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#A0A0B8]/60 mb-1">Ongoing Partner</p>
              <p className="text-sm text-[#A0A0B8] italic mb-3">
                For you if: you want AI built into everything you do going forward.
              </p>
            </div>
            <p className="text-[#A0A0B8] text-sm leading-relaxed flex-1">
              Monthly retainer. We run your automation ops, monitor what&apos;s live, and keep
              building as your business evolves. Your dedicated automation team — without the
              full-time hire.
            </p>
            <button
              onClick={() => setShowBooking(true)}
              className="mt-auto w-full py-2.5 border border-white/10 hover:border-[#6C47FF]/50 hover:bg-[#6C47FF]/10 text-sm text-[#A0A0B8] hover:text-white rounded-full transition-all duration-200"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PROOF BLOCKS ── */}
      <section id="proof" className="relative z-10 px-6 py-24 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real automations. Real GTA businesses.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C47FF] to-[#A78BFA]">
                Real results.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                quote:
                  "We were losing leads because nobody had time to follow up in the first hour. Now it's automatic — the prospect gets a text in under two minutes. Our close rate has gone up and I stopped thinking about it.",
                author: 'Owner, residential HVAC company',
                location: 'Mississauga',
                result: '3× faster lead response. 7 additional bookings in the first month.',
              },
              {
                quote:
                  "Sunday nights used to be me prepping client reminders and intake forms for Monday. That's completely gone now. It just happens — correctly, every time.",
                author: 'Principal, accounting firm',
                location: 'North York',
                result: '4+ hours recovered per week. Zero missed intake follow-ups since launch.',
              },
              {
                quote:
                  'The inventory alert system paid for the entire engagement in the first month. We stopped losing sales from stockouts we didn't see coming.',
                author: 'Owner, specialty retail shop',
                location: 'Etobicoke',
                result: 'Stockout incidents down 70%. No more emergency restocking runs.',
              },
            ].map(({ quote, author, location, result }) => (
              <div
                key={author}
                className="p-6 rounded-2xl border border-white/8 bg-white/[0.03] flex flex-col gap-4"
              >
                <p className="text-[#A0A0B8] text-sm leading-relaxed italic flex-1">
                  &ldquo;{quote}&rdquo;
                </p>
                <div>
                  <p className="text-white text-sm font-medium">{author}</p>
                  <p className="text-[#A0A0B8]/60 text-xs">{location}</p>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-[#6C47FF] text-xs font-medium leading-relaxed">{result}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '📍', label: 'GTA-based', sub: 'Local team, in person when it matters' },
              { icon: '🔑', label: 'You own everything', sub: 'No platform lock-in, ever' },
              { icon: '🔧', label: 'Works with your tools', sub: "We don't force you onto new software" },
              { icon: '⚡', label: 'Live in weeks', sub: 'First automation typically goes live in 2–3 weeks' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="p-4 rounded-xl border border-white/8 bg-white/[0.02] text-center">
                <div className="text-xl mb-2">{icon}</div>
                <p className="text-white text-sm font-medium mb-1">{label}</p>
                <p className="text-[#A0A0B8] text-xs leading-snug">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CTA BLOCK ── */}
      <section className="relative z-10 px-6 py-28 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Ready to get some of your time back?
        </h2>
        <p className="text-[#A0A0B8] max-w-xl mx-auto mb-8 leading-relaxed">
          Book a free 30-minute call. We&apos;ll look at your business, tell you exactly which
          automations would have the biggest impact, and give you a clear picture of what it looks
          like to work with us.
        </p>
        <button
          onClick={() => setShowBooking(true)}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-[#6C47FF] hover:bg-[#8B6FFF] text-white text-base font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mb-4"
          style={{ boxShadow: '0 0 32px rgba(108, 71, 255, 0.4)' }}
        >
          Book Your Free Strategy Call
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
        <p className="text-sm text-[#A0A0B8]/60">
          No sales pitch. No commitment. Just clarity.
        </p>
        <p className="text-sm text-[#A0A0B8]/40 mt-1 italic">
          Spots are limited — we keep our client roster small on purpose.
        </p>
      </section>

      {/* ── SECTION 7: FAQ ── */}
      <section className="relative z-10 px-6 pb-24 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Common questions</h2>
          <p className="text-[#A0A0B8]">
            Still on the fence? That&apos;s what the call is for. Most business owners walk away
            with 3–5 concrete automation ideas — whether they work with us or not.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'What does it cost?',
              a: 'Starter projects begin at $[X]. Growth and Ongoing Partner engagements are scoped after your strategy call — we give you a clear number before anything starts. No surprises.',
            },
            {
              q: 'How long until I see results?',
              a: 'Most clients have their first automation live within 2–3 weeks of kickoff. Simple workflows can be running in days.',
            },
            {
              q: 'Do I need to be technical?',
              a: "Not at all. You describe how your business works — we handle everything else. You'll never write code or manage a system you don't understand.",
            },
            {
              q: 'What tools do you work with?',
              a: "Whatever you're already using — Google Workspace, QuickBooks, Jobber, HubSpot, Mailchimp, Shopify, or just email and spreadsheets. We don't move you to new platforms.",
            },
            {
              q: 'What if I want changes after it\'s built?',
              a: 'You own everything. We provide post-launch support for adjustments, and our Ongoing Partner option covers continuous improvements as your business grows.',
            },
          ].map(({ q, a }) => (
            <FaqItem key={q} question={q} answer={a} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setShowBooking(true)}
            className="px-6 py-3 bg-[#6C47FF]/20 hover:bg-[#6C47FF]/30 text-[#A0A0B8] hover:text-white text-sm font-medium rounded-full transition-all duration-200"
          >
            Let&apos;s Talk
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white mb-1">Anthony La Rocca</p>
            <p className="text-[#A0A0B8]/60 text-sm">Local team. Real results. No lock-in.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowBooking(true)}
              className="px-5 py-2.5 bg-[#6C47FF] hover:bg-[#8B6FFF] text-white text-sm font-semibold rounded-full transition-all duration-200"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      </footer>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </main>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-white font-medium text-sm">{question}</span>
        <svg
          className={`w-4 h-4 text-[#A0A0B8] flex-shrink-0 ml-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-[#A0A0B8] text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
