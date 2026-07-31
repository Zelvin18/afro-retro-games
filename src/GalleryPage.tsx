import Navbar from './Navbar'
import './App.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './GalleryPage.css'

const allImages = [
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516617/afroretro/gallery/1.jpg', alt: 'AfroRetro event moment 1' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516619/afroretro/gallery/2.jpg', alt: 'AfroRetro event moment 2' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516621/afroretro/gallery/3.jpg', alt: 'AfroRetro event moment 3' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516622/afroretro/gallery/4.jpg', alt: 'AfroRetro event moment 4' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516626/afroretro/gallery/5.jpg', alt: 'AfroRetro event moment 5' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516642/afroretro/gallery/6.jpg', alt: 'AfroRetro event moment 6' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516646/afroretro/gallery/7.jpg', alt: 'AfroRetro event moment 7' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516650/afroretro/gallery/8.jpg', alt: 'AfroRetro event moment 8' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516655/afroretro/gallery/BOA---TGIF-2025-15.jpg', alt: 'BOA TGIF 2025' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516658/afroretro/gallery/BOA---TGIF-2025-30.jpg', alt: 'BOA TGIF 2025' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516662/afroretro/gallery/BOA---TGIF-2025-74.jpg', alt: 'BOA TGIF 2025' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516665/afroretro/gallery/BOA---TGIF-2025-98.jpg', alt: 'BOA TGIF 2025' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516670/afroretro/gallery/DSC02023.jpg', alt: 'AfroRetro event' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516672/afroretro/gallery/DSC02029.jpg', alt: 'AfroRetro event' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516674/afroretro/gallery/DSC02057.jpg', alt: 'AfroRetro event' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516678/afroretro/gallery/IMG_5544.jpg', alt: 'AfroRetro event' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516686/afroretro/gallery/IMG_8976.jpg', alt: 'AfroRetro event' },
  { src: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516691/afroretro/gallery/IMG_8978.jpg', alt: 'AfroRetro event' },
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
        <img src="https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516726/afroretro/home.jpg" className="hero-image" alt="Children enjoying outdoor games at an event" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-kicker">AfroRetro Games Experiences</p>
          <h1>Where Fun Meets Creativity for Every Event</h1>
          <p>
            We bring unforgettable indoor and outdoor games to birthdays, school celebrations, private
            events, and corporate experiences.
          </p>
          <Link to="/games" className="hero-button">Start Your Event Journey</Link>
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
