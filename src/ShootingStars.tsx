import { useEffect, useState } from 'react'
import './ShootingStars.css'

export default function ShootingStars() {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const update = () => setPaused(document.visibilityState !== 'visible')
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return <div className={`shooting-stars${paused ? ' is-paused' : ''}`} aria-hidden="true">
    <span className="shooting-star" />
    <span className="shooting-star" />
    <span className="shooting-star" />
  </div>
}
