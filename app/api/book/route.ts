import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { date, time, name, email, note } = body

  if (!date || !time || !name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#13131A;color:#fff;padding:32px;border-radius:12px;border:1px solid rgba(255,255,255,0.1)">
      <h2 style="margin:0 0 4px 0;font-size:20px;font-weight:700;color:#fff">New Call Booking</h2>
      <p style="margin:0 0 24px 0;font-size:13px;color:#A0A0B8">Via anthonylarocca.com</p>

      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px;color:#A0A0B8;width:90px">Name</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;font-weight:500;color:#fff">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px;color:#A0A0B8">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;font-weight:500;color:#fff"><a href="mailto:${email}" style="color:#8B6FFF;text-decoration:none">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px;color:#A0A0B8">Date</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;font-weight:500;color:#fff">${date}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;${note ? 'border-bottom:1px solid rgba(255,255,255,0.06);' : ''}font-size:13px;color:#A0A0B8">Time</td>
          <td style="padding:10px 0;${note ? 'border-bottom:1px solid rgba(255,255,255,0.06);' : ''}font-size:14px;font-weight:500;color:#fff">${time}</td>
        </tr>
        ${
          note
            ? `<tr>
          <td style="padding:10px 0;font-size:13px;color:#A0A0B8;vertical-align:top">Note</td>
          <td style="padding:10px 0;font-size:14px;color:#fff;line-height:1.5">${note.replace(/\n/g, '<br/>')}</td>
        </tr>`
            : ''
        }
      </table>

      <div style="margin-top:24px;padding:12px 16px;background:rgba(108,71,255,0.12);border:1px solid rgba(108,71,255,0.3);border-radius:8px">
        <p style="margin:0;font-size:13px;color:#A0A0B8">Reply directly to this email to reach <strong style="color:#fff">${name}</strong> at <a href="mailto:${email}" style="color:#8B6FFF;text-decoration:none">${email}</a>.</p>
      </div>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Bookings <bookings@anthonylarocca.com>',
      to: ['me@anthonylarocca.com'],
      reply_to: email,
      subject: `New Booking: ${name} — ${date} at ${time}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
