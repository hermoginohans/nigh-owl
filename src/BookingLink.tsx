import { CalendarDays } from 'lucide-react'
import type { ReactNode } from 'react'
import { callBookingUrl, bookingProvider } from './bookingConfig'

export default function BookingLink({ className = 'button button-outline', fallback = null }: { className?: string; fallback?: ReactNode }) {
  if (!callBookingUrl) return fallback
  return <a className={className} href={callBookingUrl} target="_blank" rel="noopener noreferrer" aria-label={`Schedule a call on ${bookingProvider} (opens in a new tab)`}>
    Schedule a Call <CalendarDays size={18} aria-hidden="true" />
  </a>
}
