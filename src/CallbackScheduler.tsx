import { useState } from 'react'
import { CalendarDays, ArrowUpRight } from 'lucide-react'
import { googleBookingUrl, googleEmbedUrl } from './bookingConfig'
import './CallbackScheduler.css'

export default function CallbackScheduler() {
  const [open, setOpen] = useState(false)
  if (!googleBookingUrl) return null
  const embedUrl = googleEmbedUrl()

  return <section className="callback-scheduler" aria-labelledby="callback-title">
    <div className="callback-heading"><CalendarDays size={22} aria-hidden="true" /><h3 id="callback-title">Schedule a callback</h3></div>
    <p>Choose an available time to talk about your project.</p>
    {embedUrl && <button type="button" className="button button-outline" aria-expanded={open} aria-controls="callback-calendar" onClick={() => setOpen(!open)}>
      {open ? 'Hide available times' : 'Choose a date & time'}
    </button>}
    {embedUrl && open && <div id="callback-calendar" className="callback-calendar">
      <iframe src={embedUrl} title="Book a callback with NightOwls through Google Calendar" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
    </div>}
    <a className="callback-external" href={googleBookingUrl} target="_blank" rel="noopener noreferrer">Open booking page in a new tab <ArrowUpRight size={15} aria-hidden="true" /></a>
    <p className="callback-note">Complete your booking in Google Calendar to confirm the call. Preparing an inquiry alone does not reserve a time.</p>
  </section>
}
