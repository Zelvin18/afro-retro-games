import Navbar from './Navbar'
import './App.css'
import { useEffect } from 'react'
import './GalleryPage.css'

const allImages = [
  { src: '/gallery/1.jpg', alt: 'AfroRetro event moment 1' },
  { src: '/gallery/2.jpg', alt: 'AfroRetro event moment 2' },
  { src: '/gallery/3.jpg', alt: 'AfroRetro event moment 3' },
  { src: '/gallery/4.jpg', alt: 'AfroRetro event moment 4' },
  { src: '/gallery/5.jpg', alt: 'AfroRetro event moment 5' },
  { src: '/gallery/6.jpg', alt: 'AfroRetro event moment 6' },
  { src: '/gallery/7.jpg', alt: 'AfroRetro event moment 7' },
  { src: '/gallery/8.jpg', alt: 'AfroRetro event moment 8' },
  { src: '/gallery/BOA - TGIF 2025-15.jpg', alt: 'BOA TGIF 2025' },
  { src: '/gallery/BOA - TGIF 2025-30.jpg', alt: 'BOA TGIF 2025' },
  { src: '/gallery/BOA - TGIF 2025-74.jpg', alt: 'BOA TGIF 2025' },
  { src: '/gallery/BOA - TGIF 2025-98.jpg', alt: 'BOA TGIF 2025' },
  { src: '/gallery/DSC02023.JPG', alt: 'AfroRetro event' },
  { src: '/gallery/DSC02029.JPG', alt: 'AfroRetro event' },
  { src: '/gallery/DSC02057.JPG', alt: 'AfroRetro event' },
  { src: '/gallery/IMG_5544.jpg', alt: 'AfroRetro event' },
  { src: '/gallery/IMG_8976.jpg', alt: 'AfroRetro event' },
  { src: '/gallery/IMG_8978.jpg', alt: 'AfroRetro event' },
]

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />

      {/* Hero */}
      <section className="hero-section">
        <img src="/home.png" className="hero-image" alt="Children enjoying outdoor games at an event" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">AfroRetro Games Experiences</p>
          <h1>Where Fun Meets Creativity for Every Event</h1>
          <p>
            We bring unforgettable indoor and outdoor games to birthdays, school celebrations, private
            events, and corporate experiences.
          </p>
          <a href="/" className="hero-button">Start Your Event Journey</a>
        </div>
      </section>

      {/* Full Gallery */}
      <section className="full-gallery-section">
        <div className="full-gallery-inner">
          <div className="full-gallery-header">
            <h2>Our Gallery</h2>
            <p>A look at the fun, energy, and memories we've created at events across the board.</p>
          </div>
          <div className="full-gallery-grid">
            {allImages.map((img, i) => (
              <div key={i} className="full-gallery-item">
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
