'use client'

import { useState } from 'react'

const TIME_SLOTS = ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type Step = 'calendar' | 'time' | 'form' | 'success'

interface BookingModalProps {
  onClose: () => void
}

export default function BookingModal({ onClose }: BookingModalProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<Step>('calendar')
  const [form, setForm] = useState({ name: '', email: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()

  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = Array(firstDow).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const isSelectable = (date: Date) => date.getDay() !== 0 && date >= today

  const handleDateClick = (date: Date) => {
    if (!isSelectable(date)) return
    setSelectedDate(date)
    setSelectedTime(null)
    setStep('time')
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
    setStep('form')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          time: `${selectedTime} EDT`,
          name: form.name,
          email: form.email,
          note: form.note,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Booking failed. Please try again.')
      }

      setStep('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-md bg-[#13131A] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Book a Call</h2>
            <p className="text-sm text-[#A0A0B8]">30 minutes - No commitment - Mon-Sat, 4-9 PM EDT</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 mt-0.5 text-[#A0A0B8] hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === 'calendar' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setViewMonth(new Date(year, month - 1, 1))}
                className="p-1 text-[#A0A0B8] hover:text-white transition-colors"
                aria-label="Previous month"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-medium text-white text-sm">
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                onClick={() => setViewMonth(new Date(year, month + 1, 1))}
                className="p-1 text-[#A0A0B8] hover:text-white transition-colors"
                aria-label="Next month"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
              {DAY_LABELS.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-[#A0A0B8] py-1.5">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((date, idx) => {
                if (!date) return <div key={`e-${idx}`} />

                const selectable = isSelectable(date)
                const isToday = date.getTime() === today.getTime()

                return (
                  <button
                    key={date.getDate()}
                    onClick={() => handleDateClick(date)}
                    disabled={!selectable}
                    className={[
                      'aspect-square rounded-lg text-sm font-medium transition-all duration-100',
                      selectable
                        ? 'text-white hover:bg-[#6C47FF]/25 hover:text-white cursor-pointer'
                        : 'text-white/20 cursor-not-allowed',
                      isToday ? 'ring-1 ring-[#6C47FF]/60' : '',
                    ].join(' ')}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 'time' && selectedDate && (
          <div>
            <button
              onClick={() => setStep('calendar')}
              className="flex items-center gap-1 text-sm text-[#A0A0B8] hover:text-white transition-colors mb-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <p className="text-sm text-[#A0A0B8] mb-4">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <div className="flex flex-col gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#6C47FF]/50 hover:bg-[#6C47FF]/10 text-white text-sm font-medium transition-all duration-150 text-left flex items-center justify-between"
                >
                  <span>{time}</span>
                  <span className="text-[#A0A0B8] text-xs">EDT - 30 min</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'form' && selectedDate && selectedTime && (
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={() => setStep('time')}
              className="flex items-center gap-1 text-sm text-[#A0A0B8] hover:text-white transition-colors mb-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="bg-[#0A0A0F]/60 rounded-xl p-3 mb-5 flex items-center gap-3 border border-white/5">
              <div className="w-9 h-9 rounded-lg bg-[#6C47FF]/20 flex items-center justify-center text-[#6C47FF] flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  - {selectedTime} EDT
                </p>
                <p className="text-xs text-[#A0A0B8]">30 minutes with Anthony La Rocca</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm text-[#A0A0B8] mb-1.5">
                  Your Name <span className="text-[#6C47FF]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-[#0A0A0F]/60 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#6C47FF]/60 transition-colors"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A0A0B8] mb-1.5">
                  Your Email <span className="text-[#6C47FF]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-[#0A0A0F]/60 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#6C47FF]/60 transition-colors"
                  placeholder="jane@yourco.com"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A0A0B8] mb-1.5">
                  What would you like to automate? <span className="text-white/30">(optional)</span>
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-[#0A0A0F]/60 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#6C47FF]/60 transition-colors resize-none"
                  placeholder="We manually process 50 invoices a week and it takes 6 hours..."
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-3 p-3 bg-red-400/10 rounded-xl border border-red-400/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-[#6C47FF] hover:bg-[#8B6FFF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ boxShadow: '0 0 24px rgba(108, 71, 255, 0.3)' }}
            >
              {loading ? 'Sending...' : 'Confirm Booking'}
            </button>
          </form>
        )}

        {step === 'success' && selectedDate && selectedTime && (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#6C47FF]/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-[#6C47FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">You&apos;re booked!</h3>
            <p className="text-sm text-[#A0A0B8] mb-1">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}{' '}
              at {selectedTime} EDT
            </p>
            <p className="text-sm text-[#A0A0B8] mb-8">Anthony will reach out to confirm via email.</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#6C47FF]/20 hover:bg-[#6C47FF]/30 text-[#A0A0B8] hover:text-white rounded-full text-sm transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}