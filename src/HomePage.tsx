import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { games } from './gamesData'
import { FaXTwitter, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'
import './App.css'

const testimonials = [
  '/testimonials/tWhatsAppImage20260423at10.11.34AM.jpeg',
  '/testimonials/tWhatsAppImage20260423at10.11.35AM.jpeg',
  '/testimonials/tWhatsAppImage20260423at10.11.35AM1.jpeg',
  '/testimonials/tWhatsAppImage20260423at10.11.35AM2.jpeg',
  '/testimonials/tWhatsAppImage20260423at10.11.35AM3.jpeg',
  '/testimonials/tWhatsAppImage20260423at10.11.35AM4.jpeg',
  '/testimonials/tWhatsAppImage20260423at10.11.35AM5.jpeg',
  '/testimonials/tWhatsAppImage20260423at10.11.35AM6.jpeg',
]

const faqs = [
  { q: 'What services does AfroRetro Games offer?', a: 'We offer game hire, full event packages, and customized game setups for private gatherings, corporate events, school days, and more. From Giant Jenga to VR sets, we bring the fun to you.' },
  { q: 'Where do you deliver and set up?', a: 'We primarily serve Kampala and surrounding areas including Kira, Wakiso, Entebbe, and Mukono. For larger events, we can discuss delivery further afield — just get in touch.' },
  { q: 'How do I book or get a quote?', a: 'You can book directly through our website by clicking "Book Now" on any game or package, or reach out via WhatsApp or email and we\'ll put together a custom quote for you.' },
  { q: 'Are your games safe and well-maintained?', a: 'Absolutely. All our equipment is regularly inspected, cleaned, and maintained to the highest standard. Safety is a top priority, especially for inflatables and trampolines which are always supervised.' },
  { q: 'What kinds of events can you cater for?', a: 'We cater for birthdays, kids\' parties, corporate team-building days, school fun days, weddings, baby showers, community festivals, brand activations, and much more.' },
  { q: 'Do you offer package deals?', a: 'Yes! We have four curated packages — Starter Spark, Retro Vibes, Tula Tucheze, and Afro Playhouse — each designed for different group sizes and budgets. You can also mix and match individual games.' },
  { q: 'What are your operating hours?', a: 'We operate Monday to Saturday, 9:00 AM to 6:00 PM. For weekend events, we recommend booking at least a week in advance to secure your preferred date.' },
  { q: 'How soon should I book?', a: 'We recommend booking as early as possible, especially for weekends and public holidays. For large events, 2–3 weeks notice is ideal. Last-minute bookings are subject to availability.' },
  { q: 'What payment methods do you accept?', a: 'We accept mobile money (MTN & Airtel), bank transfers, and cash. A deposit is required to confirm your booking, with the balance due on the day of the event.' },
  { q: 'Can I request something not listed on the website?', a: 'Definitely! We love creating custom experiences. If you have a specific game, theme, or setup in mind, reach out and we\'ll do our best to make it happen.' },
]

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-inner">
        <div className="faq-header">
          <p className="section-kicker">Got Questions?</p>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <p>Everything you need to know before booking your experience.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                {faq.q}
                <span className={`faq-chevron ${open === i ? 'open' : ''}`}>▾</span>
              </button>
              <div className={`faq-answer ${open === i ? 'open' : ''}`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const galleryPreview = [
  { src: '/gallery/1.jpg', alt: 'AfroRetro event 1' },
  { src: '/gallery/2.jpg', alt: 'AfroRetro event 2' },
  { src: '/gallery/3.jpg', alt: 'AfroRetro event 3' },
  { src: '/gallery/4.jpg', alt: 'AfroRetro event 4' },
  { src: '/gallery/5.jpg', alt: 'AfroRetro event 5' },
  { src: '/gallery/6.jpg', alt: 'AfroRetro event 6' },
  { src: '/gallery/7.jpg', alt: 'AfroRetro event 7' },
  { src: '/gallery/8.jpg', alt: 'AfroRetro event 8' },
]

const clients = [
  { name: 'Bank of Africa', logo: '/clients/Bank of Africa .png' },
  { name: 'BNI', logo: '/clients/BNI .png' },
  { name: 'Boda Banja', logo: '/clients/Boda Banja.png' },
  { name: 'EACOP', logo: '/clients/EACOP.png' },
  { name: 'Fenon', logo: '/clients/Fenon.png' },
  { name: 'Hotel 360', logo: '/clients/Hotel 360.png' },
  { name: 'KPMG', logo: '/clients/KPMG.png' },
  { name: 'Malembe', logo: '/clients/Malembe.png' },
  { name: 'Ministry of Lands', logo: '/clients/Ministry of lands- Mukono.png' },
  { name: 'Silo15', logo: '/clients/Silo15.png' },
  { name: 'SM&Co', logo: '/clients/SM&Co.png' },
  { name: 'Stanbic Bank', logo: '/clients/Stanbic bank.png' },
  { name: 'Surveyors Institute Uganda', logo: '/clients/Surveyors institute Uganda.png' },
  { name: 'The Villa', logo: '/clients/The Villa .png' },
]

export default function HomePage() {
  const bannerSlides = [
    { src: '/banner/1a.jpg', kicker: 'AfroRetro Games Experiences', heading: 'Where Fun Meets Creativity for Every Event', sub: 'We bring unforgettable indoor and outdoor games to birthdays, school celebrations, private events, and corporate experiences.' },
    { src: '/banner/2a.jpg', kicker: 'Game Hire & Event Packages', heading: 'The Games You Grew Up With — Bigger & Better', sub: 'From Giant Jenga to VR sets, we deliver, set up, and make your event one for the books.' },
    { src: '/banner/3a.png', kicker: 'Culture Meets Play', heading: 'Bringing Communities Together Through Games', sub: 'Rooted in African culture, built for every occasion — AfroRetro is more than games, it\'s connection.' },
  ]
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % bannerSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />

      {/* Hero Slider */}
      <section className="hero-slider" aria-label="Hero banner">
        {bannerSlides.map((s, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
            <img src={s.src} alt={s.heading} />
            <div className="hero-slide-overlay" />
          </div>
        ))}
        <div className="hero-slider-content">
          <p className="hero-kicker">{bannerSlides[slide].kicker}</p>
          <h1>{bannerSlides[slide].heading}</h1>
          <p>{bannerSlides[slide].sub}</p>
          <Link to="/games" className="hero-button">Start Your Event Journey</Link>
        </div>
        <div className="hero-slider-dots">
          {bannerSlides.map((_, i) => (
            <button key={i} className={`hero-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Games */}
      <section className="games-section" aria-labelledby="games-heading">
        <div className="games-inner">
          <div className="games-header">
            <h2 id="games-heading">Explore Our AfroRetro Games</h2>
            <p>
              Choose from indoor and outdoor favorites. Book a specific game — or mix and match to build
              your perfect event.
            </p>
          </div>
          <div className="games-grid">
            {games.map((game) => (
              <article key={game.name} className="game-card">
                <div className="game-media">
                  <img src={game.image} alt={game.name} loading="lazy" />
                </div>
                <div className="game-body">
                  <h3>{game.name}</h3>
                  <p>{game.description}</p>
                </div>
                <div className="game-actions">
                  <Link className="game-button" to={`/book/${game.id}`} aria-label={`Book now for ${game.name}`}>
                    Book Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-preview-section" aria-labelledby="gallery-heading">
        <div className="gallery-preview-inner">
          <div className="gallery-preview-header">
            <h2 id="gallery-heading">Moments Worth Remembering</h2>
            <p>A glimpse into the fun and energy we bring to every event.</p>
          </div>
          <div className="gallery-preview-grid">
            {galleryPreview.map((img, i) => (
              <div key={i} className="gallery-preview-item">
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
          <div className="gallery-preview-cta">
            <Link to="/gallery" className="gallery-view-more">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="clients-section" aria-labelledby="clients-heading">
        <div className="clients-inner">
          <h2 id="clients-heading">Trusted by Great Brands</h2>
          <p>From corporates to community events — here's who's had fun with us.</p>
        </div>
        <div className="marquee-track">
          {[...clients, ...clients].map((client, i) => (
            <div key={i} className="client-logo-card">
              <img src={client.logo} alt={client.name} />
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="about-section" aria-labelledby="about-heading">
        <div className="about-inner">
          <p className="about-kicker">Our Story</p>
          <h2 id="about-heading">About AfroRetro Games</h2>
          <div className="about-content">
            <p>
              Afro Retro Games is where culture and play come together. We create vibrant, interactive
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
              At our core, Afro Retro is about more than games — it's about community. It's about
              reliving the past, enjoying the present, and creating spaces where people feel free,
              connected, and fully themselves.
            </p>
          </div>
          <div className="about-cta">
            <Link to="/contact" className="about-btn">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="packages-section" aria-labelledby="packages-heading">
        <div className="packages-inner">
          <div className="packages-header">
            <p className="section-kicker">Curated for Every Occasion</p>
            <h2 id="packages-heading">Games Packages</h2>
            <p>Pick a ready-made bundle and let us handle the rest — delivery, setup, and all.</p>
          </div>
          <div className="packages-grid">
            {[
              { id: 'starter-spark', name: 'Starter Spark', price: '200,000 UGX', img: '/games/Cornhole.png', games: ['Cornhole', 'Giant Jenga', 'Tic Tac Toe', 'Ring Toss', 'Playing Cards'], desc: 'Perfect for intimate gatherings — fun, simple, and full of energy.' },
              { id: 'retro-vibes', name: 'Retro Vibes', price: '350,000 UGX', img: '/games/Carrom Board.png', games: ['Cornhole', 'Ring Toss', 'Ludo', 'Giant Jenga', 'Carrom Board', 'Chess', '2 Board Games', '1 Host'], desc: 'A curated retro mix with a host to keep the vibes going.' },
              { id: 'tula-tucheze', name: 'Tula Tucheze', price: '450,000 UGX', img: '/games/Mini Golf Sets.png', games: ['Mini Golf', 'Cornhole', 'Ring Toss', 'Chess', 'Carrom Board', 'Ludo', 'Giant Jenga', 'TicTacToe', '2 Board Games', '1 Host'], desc: 'A full spread for bigger groups — variety, energy, and a host.' },
              { id: 'afro-playhouse', name: 'Afro Playhouse', price: '550,000 UGX', img: '/games/Giant Connect 4.png', games: ['Giant Connect 4', 'Cornhole', 'Ring Toss', 'Giant Jenga', 'Tic Tac Toe', 'Chess', 'Ludo', 'Carrom Board', 'Mini Golf', '2 Board Games', '1 Host'], desc: 'The ultimate AfroRetro experience — maximum games, maximum fun.' },
            ].map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-img-wrap">
                  <img src={pkg.img} alt={pkg.name} />
                  <div className="package-img-overlay" />
                  <div className="package-img-label">
                    <h3>{pkg.name}</h3>
                    <span className="package-price-badge">{pkg.price}</span>
                  </div>
                </div>
                <div className="package-body">
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(32,25,66,0.7)', fontWeight: 600 }}>{pkg.desc}</p>
                  <div className="package-games">
                    {pkg.games.map(g => <span key={g} className="pkg-game-tag">{g}</span>)}
                  </div>
                  <Link to={`/package/${pkg.id}`} className="package-book-btn">Book This Package</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Booked */}
      <section className="freq-section" aria-labelledby="freq-heading">
        <div className="freq-inner">
          <div className="freq-header">
            <p className="section-kicker">Client Favourites</p>
            <h2 id="freq-heading">Most Frequently Booked</h2>
            <p>These four never disappoint — our most requested games at every event.</p>
          </div>
          <div className="freq-grid">
            {[
              { id: 'giant-jenga', name: 'Giant Jenga', img: '/games/Giant Jenga.png', catch: 'Pull carefully. Laugh loudly. Repeat.' },
              { id: 'cornhole', name: 'Cornhole', img: '/games/Cornhole.png', catch: 'Easy to learn, impossible to put down.' },
              { id: 'mini-golf', name: 'Mini Golf', img: '/games/Mini Golf Sets.png', catch: 'Putt your way to the best time of the night.' },
              { id: 'bouncing-castles', name: 'Bouncing Castles', img: '/games/Bouncing Castles.png', catch: 'Because everyone deserves to bounce.' },
            ].map(g => (
              <div key={g.id} className="freq-card">
                <div className="freq-img"><img src={g.img} alt={g.name} /></div>
                <div className="freq-body">
                  <h3>{g.name}</h3>
                  <p>{g.catch}</p>
                  <Link to={`/book/${g.id}`} className="freq-book-btn">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Testimonials */}
      <section className="testimonials-section" aria-labelledby="testimonials-heading">
        <div className="testimonials-inner">
          <p className="section-kicker">Real Experiences</p>
          <h2 id="testimonials-heading">What Our Clients Say</h2>
          <p>Don't just take our word for it — here's what people say after experiencing AfroRetro.</p>
        </div>
        <div className="testimonials-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="testimonial-card">
              <img src={t} alt={`Testimonial ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer Banner */}
      <div style={{ padding: '0 16px 3rem' }}>
        <div className="footer-banner">
          <img src="/footer-banner.png" className="banner-bg" alt="AfroRetro event" />
          <div className="footer-banner-overlay" />
          <div className="footer-banner-content">
            <p className="hero-kicker">Your Event Deserves More</p>
            <h2>Make Every Moment Unforgettable</h2>
            <p>Whether you have a full plan or just an idea — our team is ready to bring the fun to your event.</p>
            <div className="footer-banner-btns">
              <Link to="/games" className="banner-btn-primary">Browse Games</Link>
              <Link to="/contact" className="banner-btn-outline">Get in Touch</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/afroretro-logo.png" alt="AfroRetro Games" />
            <p>Where culture and play come together. Bringing vibrant, interactive game experiences to events across Uganda.</p>
            <div className="footer-social-row">
              <a href="https://x.com/afroretro343313?s=21" target="_blank" rel="noreferrer" className="footer-social-icon footer-social-x" aria-label="X"><FaXTwitter /></a>
              <a href="https://www.instagram.com/afroretro_games_hire_ug" target="_blank" rel="noreferrer" className="footer-social-icon footer-social-ig" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.tiktok.com/@afroretro_games_hire_ug" target="_blank" rel="noreferrer" className="footer-social-icon footer-social-tt" aria-label="TikTok"><FaTiktok /></a>
              <a href="https://wa.me/256703239422" target="_blank" rel="noreferrer" className="footer-social-icon footer-social-wa" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/games">All Games</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Packages</h4>
            <ul>
              <li><Link to="/package/starter-spark">Starter Spark</Link></li>
              <li><Link to="/package/retro-vibes">Retro Vibes</Link></li>
              <li><Link to="/package/tula-tucheze">Tula Tucheze</Link></li>
              <li><Link to="/package/afro-playhouse">Afro Playhouse</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+256703239422">+256 703 239 422</a></li>
              <li><a href="mailto:Info.afroretro@gmail.com">Info.afroretro@gmail.com</a></li>
              <li><span>Kira, Kampala, Uganda</span></li>
              <li><span>Mon – Sat: 9AM – 6PM</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-games-grid">
          <h4>Our Games</h4>
          <div className="footer-games-list">
            {games.map(g => (
              <Link key={g.id} to={`/book/${g.id}`}>{g.name}</Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <span>© {new Date().getFullYear()} AfroRetro Games. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
