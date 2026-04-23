import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { games } from './gamesData'
import type { Game } from './gamesData'
import './App.css'
import './EventPage.css'

export interface EventPageConfig {
  slug: string
  category: string
  title: string
  tagline: string
  description: string
  heroImage: string
  recommendedGameIds: string[]
  highlights: string[]
}

interface Props {
  config: EventPageConfig
}

export default function EventPage({ config }: Props) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [config.slug])

  const recommended: Game[] = config.recommendedGameIds
    .map(id => games.find(g => g.id === id))
    .filter(Boolean) as Game[]

  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />

      {/* Hero */}
      <section className="event-hero">
        <img src={config.heroImage} className="hero-image" alt={config.title} />
        <div className="hero-overlay" />
        <div className="event-hero-content">
          <p className="hero-kicker">{config.category}</p>
          <h1>{config.title}</h1>
          <p>{config.tagline}</p>
          <a href="#booking" className="game-hero-btn" onClick={e => { e.preventDefault(); document.getElementById('event-booking')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Book This Experience ↓
          </a>
        </div>
      </section>

      {/* About */}
      <section className="event-about">
        <div className="event-about-inner">
          <div className="event-about-text">
            <p className="section-kicker">{config.category}</p>
            <h2>{config.title}</h2>
            <p>{config.description}</p>
            <ul className="game-highlights">
              {config.highlights.map(h => <li key={h}>{h}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Recommended Games */}
      {recommended.length > 0 && (
        <section className="event-games-section">
          <div className="event-games-inner">
            <div className="event-games-header">
              <p className="section-kicker">Perfect for This Event</p>
              <h2>Recommended Games</h2>
              <p>Hand-picked games that work brilliantly for {config.title.toLowerCase()}.</p>
            </div>
            <div className="all-games-grid">
              {recommended.map(game => (
                <article key={game.id} className="all-game-card">
                  <div className="game-media">
                    <img src={game.image} alt={game.name} loading="lazy" />
                  </div>
                  <div className="game-body">
                    <h3>{game.name}</h3>
                    <p>{game.description}</p>
                  </div>
                  <div className="game-actions">
                    <Link to={`/book/${game.id}`} className="add-game-btn not-added">Book Now</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking CTA */}
      <section className="event-booking-cta" id="event-booking">
        <div className="event-booking-inner">
          <div className="event-booking-card">
            <p className="section-kicker">Ready to Go?</p>
            <h2>Book Your {config.title}</h2>
            <p>Browse all our games and build your perfect event package — or pick from our ready-made bundles.</p>
            <div className="event-booking-btns">
              <Link to="/games" className="banner-btn-primary">Browse All Games</Link>
              <Link to="/contact" className="banner-btn-outline" style={{ border: '2px solid #5426b5', color: '#5426b5' }}>Get a Custom Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
