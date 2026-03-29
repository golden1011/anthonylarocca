'use client'

import { useState, useEffect } from 'react'

const FAQS = [
  {
    q: 'Do I need to be technical to work with you?',
    a: "Not at all. You explain how your business works \u2014 we handle everything technical. You'll never need to write code or manage a system you don't understand.",
  },
  {
    q: 'What tools do you work with?',
    a: "We work with the tools you already use \u2014 Google Workspace, QuickBooks, Jobber, HubSpot, Mailchimp, Shopify, or just email and spreadsheets. We don't force you onto new platforms.",
  },
  {
    q: 'How long does it take to see results?',
    a: 'Most clients have their first automation live within 2\u20134 weeks. Some simple workflows can be running in days.',
  },
  {
    q: 'What does it cost?',
    a: "It depends on scope. We'll give you a clear number after the free strategy call \u2014 no surprises. Priced for SMB budgets, not enterprise ones.",
  },
  {
    q: 'What if I want changes after it\u2019s built?',
    a: 'You own everything we build. We provide post-launch support and are available for adjustments. Our monthly partner option covers continuous improvements.',
  },
  {
    q: 'How is this different from an off-the-shelf AI tool?',
    a: 'Off-the-shelf tools are generic. We build around your specific workflows, data, and team. The difference is a suit off the rack versus one made for you.',
  },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [navBg, setNavBg] = useState('rgba(248,249,252,0.95)')

  useEffect(() => {
    const onScroll = () =>
      setNavBg(window.scrollY > 60 ? 'rgba(248,249,252,0.98)' : 'rgba(248,249,252,0.95)')
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i)

  return (
    <>
      <nav style={{ background: navBg }}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">Anthony La Rocca</a>
          <ul className="nav-links">
            <li><a href="#how">How It Works</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#proof">Results</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <a href="#cta" className="btn btn-primary">Book a Free Call</a>
          <button className="hamburger" aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-eyebrow">GTA AI Automation</p>
            <h1 className="hero-headline">
              Your competition is already using AI. Let&apos;s make sure you&apos;re ahead of them.
            </h1>
            <p className="hero-sub">
              Anthony La Rocca and his GTA-based team build custom AI automations for small
              businesses &mdash; so you spend less time on busywork and more time growing.
            </p>
            <p className="hero-supporting">
              No tech team required. No six-figure budget. Just practical systems designed and
              delivered with Anthony&apos;s direct oversight.
            </p>
            <div className="hero-ctas">
              <a href="#cta" className="btn btn-primary btn-large">Book a Free 30-Min Strategy Call</a>
              <a href="#proof" className="btn btn-ghost btn-large">See What We&apos;ve Built</a>
            </div>
            <p className="hero-proof">Trusted by GTA small businesses &mdash; results in 30 days or less</p>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-inner">
              <div className="hero-visual-icon">&#x26A1;</div>
              <div className="hero-visual-text">AI Automation<br />Running 24/7</div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem">
        <div className="section-inner">
          <div className="text-center">
            <p className="section-eyebrow">Sound familiar?</p>
            <h2 className="section-headline">Running a small business in the GTA means doing everything yourself.</h2>
            <p className="section-sub">
              You&apos;re not disorganized &mdash; your business runs on processes that were never built to
              scale. Large companies have full operations teams automating this. You have yourself. Until now.
            </p>
          </div>
          <div className="pain-points fade-up">
            <div className="pain-card">
              <div className="pain-icon">&#x1F501;</div>
              <div className="pain-title">Answering the same questions over and over</div>
              <div className="pain-desc">Customer inquiries, booking confirmations, follow-ups &mdash; you handle them manually every single day.</div>
            </div>
            <div className="pain-card">
              <div className="pain-icon">&#x1F4CB;</div>
              <div className="pain-title">Chasing invoices and cold leads</div>
              <div className="pain-desc">Revenue is slipping through the cracks because follow-up depends on you remembering to do it.</div>
            </div>
            <div className="pain-card">
              <div className="pain-icon">&#x1F527;</div>
              <div className="pain-title">Tools that don&apos;t talk to each other</div>
              <div className="pain-desc">You&apos;re copying data between systems by hand. Every workaround costs you time you don&apos;t have.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="section-inner">
          <div className="text-center">
            <p className="section-eyebrow">The process</p>
            <h2 className="section-headline">We bring enterprise-grade automation to businesses your size.</h2>
            <p className="section-sub">
              We map your repetitive workflows, identify where AI can take over, and build automations
              that run while you focus on growth.
            </p>
          </div>
          <div className="steps fade-up">
            <div className="step-card">
              <div className="step-num">01</div>
              <div className="step-title">Discovery Session</div>
              <div className="step-desc">We map your workflows and identify the highest-ROI automation opportunities specific to your business.</div>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <div className="step-title">Custom Build</div>
              <div className="step-desc">We connect your existing tools and build the automations. No code required from you &mdash; we handle everything technical.</div>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <div className="step-title">Launch + Ongoing Support</div>
              <div className="step-desc">Everything is tested with real data before going live. We stay available for adjustments as your business grows.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="section-inner">
          <div className="text-center">
            <p className="section-eyebrow">What we build</p>
            <h2 className="section-headline">This isn&apos;t software. It&apos;s a done-for-you system built around your business.</h2>
            <p className="section-sub">We work inside your existing tools &mdash; no new platforms, no lock-in.</p>
          </div>
          <div className="services-grid fade-up">
            <div className="service-card">
              <div className="service-icon">&#x1F680;</div>
              <div className="service-name">Starter</div>
              <div className="service-tag">Best for one core workflow</div>
              <div className="service-desc">Perfect for a clear pain point &mdash; lead follow-up, booking confirmations, invoice reminders. Most automations live within 2&ndash;4 weeks.</div>
            </div>
            <div className="service-card">
              <div className="service-icon">&#x1F4C8;</div>
              <div className="service-name">Growth</div>
              <div className="service-tag">Best for connecting your full operation</div>
              <div className="service-desc">We audit your full workflow stack, prioritize the top 3&ndash;5 opportunities, and build them together over 30&ndash;60 days.</div>
            </div>
            <div className="service-card">
              <div className="service-icon">&#x1F91D;</div>
              <div className="service-name">Ongoing Partner</div>
              <div className="service-tag">Best for continuous AI integration</div>
              <div className="service-desc">Monthly retainer. We run your automation ops, monitor performance, and continuously build as your business evolves.</div>
            </div>
            <div className="service-card">
              <div className="service-icon">&#x26A1;</div>
              <div className="service-name">What we automate</div>
              <div className="service-tag">Across every engagement</div>
              <div className="service-desc">Customer follow-ups &middot; Appointment reminders &middot; Lead qualification &middot; Invoice chasing &middot; Inventory alerts &middot; Onboarding sequences</div>
            </div>
          </div>
          <div className="services-cta">
            <a href="#cta" className="btn btn-primary btn-large">Talk to Us About Your Business</a>
          </div>
        </div>
      </section>

      <section id="proof">
        <div className="section-inner">
          <div className="text-center">
            <p className="section-eyebrow">Client results</p>
            <h2 className="section-headline">Real automations. Real GTA businesses. Real time saved.</h2>
          </div>
          <div className="testimonials fade-up">
            <div className="testimonial">
              <div className="stars">&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</div>
              <p className="quote">&ldquo;We were losing leads because nobody had time to follow up within the first hour. Now it&apos;s automatic &mdash; the prospect gets a text in under two minutes, and our close rate has gone up noticeably.&rdquo;</p>
              <div className="attrib">
                <div className="attrib-avatar">H</div>
                <div>
                  <div className="attrib-name">Owner, HVAC Company</div>
                  <div className="attrib-biz">Mississauga, ON</div>
                </div>
              </div>
              <span className="result-badge">3x faster lead response &middot; ~10 more bookings/month</span>
            </div>
            <div className="testimonial">
              <div className="stars">&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</div>
              <p className="quote">&ldquo;I was spending Sunday nights prepping Monday&apos;s client reminders and intake forms. That&apos;s completely gone now. It just happens.&rdquo;</p>
              <div className="attrib">
                <div className="attrib-avatar">A</div>
                <div>
                  <div className="attrib-name">Principal, Accounting Firm</div>
                  <div className="attrib-biz">North York, ON</div>
                </div>
              </div>
              <span className="result-badge">4+ hours saved/week &middot; Zero missed follow-ups</span>
            </div>
            <div className="testimonial">
              <div className="stars">&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</div>
              <p className="quote">&ldquo;The inventory alert system alone paid for the entire engagement in the first month. We stopped losing sales from stockouts we didn&apos;t catch in time.&rdquo;</p>
              <div className="attrib">
                <div className="attrib-avatar">R</div>
                <div>
                  <div className="attrib-name">Owner, Specialty Retail</div>
                  <div className="attrib-biz">Etobicoke, ON</div>
                </div>
              </div>
              <span className="result-badge">~70% fewer stockouts &middot; ROI in first month</span>
            </div>
          </div>
          <div className="trust-strip fade-up">
            <span className="trust-item">GTA-based &mdash; we work with local businesses in person</span>
            <span className="trust-item">No lock-in contracts &mdash; you own everything we build</span>
            <span className="trust-item">Works inside your existing tools</span>
            <span className="trust-item">Results in 30 days or less</span>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="section-inner">
          <div className="about-inner">
            <div className="about-visual">&#x1F464;</div>
            <div>
              <p className="section-eyebrow">About</p>
              <h2 className="section-headline">Founder-led. Local. Accountable.</h2>
              <p className="about-bio">
                Anthony La Rocca is a GTA-based operator focused on practical automation wins for
                small businesses. Every strategy call is grounded in your current process, your
                margins, and what your team can realistically adopt fast.
              </p>
              <p className="about-bio">
                We&apos;re not a SaaS company. We&apos;re a hands-on implementation partner &mdash; sitting
                between cheap DIY tools and expensive enterprise consultants, built for the GTA SMB market.
              </p>
              <a href="#cta" className="btn btn-primary btn-large">Work Directly With Anthony</a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="section-inner">
          <div className="text-center">
            <p className="section-eyebrow">FAQ</p>
            <h2 className="section-headline">Not sure if automation is right for you?</h2>
            <p className="section-sub">
              That&apos;s exactly what the free strategy call is for. Most business owners walk out
              with 3&ndash;5 concrete ideas they can act on immediately.
            </p>
          </div>
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => toggleFaq(i)}
                >
                  {item.q}
                  <span className={`faq-icon${openFaq === i ? ' expanded' : ''}`}>+</span>
                </button>
                {openFaq === i && <div className="faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="section-inner">
          <h2 className="section-headline">Ready to stop doing it manually?</h2>
          <p className="section-sub">
            Book a free 30-minute call. We&apos;ll look at your business together and tell you exactly
            which automations would have the biggest impact.
          </p>
          <a href="mailto:hello@anthonylarocca.ca" className="btn btn-primary">
            Book Your Free Strategy Call
          </a>
          <p className="cta-note">No sales pitch. No commitment. Just a conversation about your business.</p>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-brand">Anthony La Rocca</div>
            <div className="footer-tagline">
              GTA-based AI automation for small businesses.<br />
              Founder-led. Practical. No lock-in.
            </div>
          </div>
          <div>
            <div className="footer-heading">Services</div>
            <ul className="footer-links">
              <li><a href="#how">How It Works</a></li>
              <li><a href="#services">Starter</a></li>
              <li><a href="#services">Growth</a></li>
              <li><a href="#services">Ongoing Partner</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">Company</div>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#proof">Results</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#cta">Book a Call</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Anthony La Rocca. All rights reserved.</span>
          <span>GTA AI Automation</span>
        </div>
      </footer>
    </>
  )
}
