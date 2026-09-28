function bookingPage(value: string | undefined, provider: 'google' | 'calendly') {
  if (!value?.trim()) return null
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || url.username || url.password) return null
    if (provider === 'calendly') {
      return url.hostname === 'calendly.com' && url.pathname !== '/' ? url.href : null
    }
    const fullPage = url.hostname === 'calendar.google.com' && /^\/calendar\/(?:u\/\d+\/)?appointments\//.test(url.pathname)
    const shortPage = url.hostname === 'calendar.app.google' && url.pathname !== '/'
    return fullPage || shortPage ? url.href : null
  } catch {
    return null
  }
}

export const googleBookingUrl = bookingPage(import.meta.env.VITE_GOOGLE_BOOKING_URL, 'google')
export const callBookingUrl = googleBookingUrl ?? bookingPage(import.meta.env.VITE_CALENDLY_URL, 'calendly')
export const bookingProvider = googleBookingUrl ? 'Google Calendar' : 'Calendly'

export function googleEmbedUrl() {
  if (!googleBookingUrl) return null
  const url = new URL(googleBookingUrl)
  // Short links can redirect outside an iframe. Use the direct booking page for embedding.
  if (url.hostname !== 'calendar.google.com') return null
  url.searchParams.set('gv', 'true')
  return url.href
}
