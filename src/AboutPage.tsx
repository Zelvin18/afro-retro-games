import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import './App.css'

const galleryImages = [
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516617/afroretro/gallery/1.jpg', alt: 'AfroRetro event 1' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516619/afroretro/gallery/2.jpg', alt: 'AfroRetro event 2' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516621/afroretro/gallery/3.jpg', alt: 'AfroRetro event 3' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516622/afroretro/gallery/4.jpg', alt: 'AfroRetro event 4' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516626/afroretro/gallery/5.jpg', alt: 'AfroRetro event 5' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516642/afroretro/gallery/6.jpg', alt: 'AfroRetro event 6' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516646/afroretro/gallery/7.jpg', alt: 'AfroRetro event 7' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516650/afroretro/gallery/8.jpg', alt: 'AfroRetro event 8' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516655/afroretro/gallery/BOA---TGIF-2025-15.jpg', alt: 'BOA TGIF 2025' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516658/afroretro/gallery/BOA---TGIF-2025-30.jpg', alt: 'BOA TGIF 2025' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516662/afroretro/gallery/BOA---TGIF-2025-74.jpg', alt: 'BOA TGIF 2025' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516665/afroretro/gallery/BOA---TGIF-2025-98.jpg', alt: 'BOA TGIF 2025' },
]

export default function AboutPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <img
          src="https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516726/afroretro/home.jpg"
          className="hero-image"
          alt="AfroRetro Games events"
        />
        <div className="hero-overlay" />
        <div className="about-hero-content">
          <p className="hero-kicker">Our Story</p>
          <h1>About AfroRetro Games</h1>
          <p>Where culture and play come together — bringing vibrant game experiences to every corner of Uganda.</p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-page-section">
        <div className="about-page-inner">
          <div className="about-page-grid">
            <div className="about-page-text">
              <p className="about-kicker">Who We Are</p>
              <h2>Culture Meets Play</h2>
              <p>
                AfroRetro Games is where culture and play come together. We create vibrant, interactive
                experiences inspired by the games we grew up with and the joy of shared moments.
              </p>
              <p>
                From high-energy quiz nights to themed game nights and fully curated experiences,
                everything we design is built to bring people closer — through laughter, competition,
                and connection.
              </p>
              <p>
                Beyond events, we offer game hires and customized game setups for private gatherings,
                brands, and organizations looking to create something different. Whether it's an intimate
                hangout or a large-scale experience, we turn ordinary moments into something memorable
                and alive.
              </p>
              <p>
                At our core, AfroRetro is about more than games — it's about community. It's about
                reliving the past, enjoying the present, and creating spaces where people feel free,
                connected, and fully themselves.
              </p>
              <div className="about-page-cta">
                <Link to="/contact" className="about-btn">Get in Touch</Link>
                <Link to="/games" className="view-all-games-btn">Browse Our Games</Link>
              </div>
            </div>

            <div className="about-page-stats">
              <div className="about-stat-card">
                <span className="about-stat-number">20+</span>
                <span className="about-stat-label">Games Available</span>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-number">14+</span>
                <span className="about-stat-label">Corporate Clients</span>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-number">4</span>
                <span className="about-stat-label">Ready-Made Packages</span>
              </div>
              <div className="about-stat-card">
                <span className="about-stat-number">🇺🇬</span>
                <span className="about-stat-label">Based in Kampala</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="about-gallery-section">
        <div className="about-gallery-inner">
          <div className="about-gallery-header">
            <p className="section-kicker">Real Moments</p>
            <h2>Events We've Brought to Life</h2>
            <p>A look at the energy, laughter, and memories we create at every event.</p>
          </div>
          <div className="about-gallery-grid">
            {galleryImages.map((img, i) => (
              <div key={i} className="full-gallery-item">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/gallery" className="gallery-view-more">View Full Gallery</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
