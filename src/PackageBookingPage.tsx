import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from './Navbar'
import { games } from './gamesData'
import { useBooking } from './BookingContext'
import { saveBooking } from './supabase'
import './App.css'
import './BookingPage.css'

const packageData: Record<string, { name: string; price: string; color: string; gameIds: string[]; description: string }> = {
  'starter-spark': {
    name: 'Starter Spark',
    price: '200,000 UGX',
    color: '#e53e3e',
    description: 'The perfect entry-level package — fun, simple, and great for intimate gatherings.',
    gameIds: ['cornhole', 'giant-jenga', 'tic-tac-toe', 'ring-toss'],
  },
  'retro-vibes': {
    name: 'Retro Vibes',
    price: '350,000 UGX',
    color: '#d4a017',
    description: 'A curated mix of classics with a host to keep the energy going all event long.',
    gameIds: ['cornhole', 'ring-toss', 'ludo-boards', 'giant-jenga', 'carrom-board', 'chess-boards'],
  },
  'tula-tucheze': {
    name: 'Tula Tucheze',
    price: '450,000 UGX',
    color: '#e53e3e',
    description: 'A full spread of games for bigger groups — with a host and board game variety.',
    gameIds: ['mini-golf', 'cornhole', 'ring-toss', 'chess-boards', 'carrom-board', 'ludo-boards', 'giant-jenga', 'tic-tac-toe'],
  },
  'afro-playhouse': {
    name: 'Afro Playhouse',
    price: '550,000 UGX',
    color: '#d4a017',
    description: 'The ultimate AfroRetro experience — maximum games, maximum fun, with a host included.',
    gameIds: ['giant-connect-4', 'cornhole', 'ring-toss', 'giant-jenga', 'tic-tac-toe', 'chess-boards', 'ludo-boards', 'carrom-board', 'mini-golf'],
  },
}

const locationTypes = ['Private Indoor','Private Outdoor','Public Indoor','Public Outdoor','House Indoor','House Outdoor','Office Indoor','Office Outdoor','Hall Indoor','Hall Outdoor','Street Party','School Grounds','Community Centre','Hotel Venue','Garden / Backyard','Rooftop']
const occasions = ['Adult Party','Kids Party','Mixed Party','Street Party','School Event','Corporate Event','Wedding','Baby Shower','Bridal Shower','Birthday Celebration','Graduation Party','Team Building Day','Community Festival','Charity Event','Religious Celebration','Sports Day','Family Reunion']
const STEPS = ['Your Details', 'Event Details', 'Review & Confirm']

export default function PackageBookingPage() {
  const { packageId } = useParams<{ packageId: string }>()
  const pkg = packageData[packageId ?? '']
  const { personal, setPersonal, event, setEvent, setSelectedGames, setPackageName, reset } = useBooking()

  const [step, setStep] = useState(0)
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  useEffect(() => {
    if (pkg) {
      const pkgGames = pkg.gameIds.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games
      setSelectedGames(pkgGames)
      setPackageName(pkg.name)
    }
  }, [packageId])

  const scrollToBooking = () => document.getElementById('pkg-booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const validateStep0 = () => {
    const e: Record<string, string> = {}
    if (!personal.firstName.trim()) e.firstName = 'Required'
    if (!personal.lastName.trim()) e.lastName = 'Required'
    if (!personal.phone.trim()) e.phone = 'Required'
    if (!personal.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(personal.email)) e.email = 'Invalid email'
    setErrors(e); return Object.keys(e).length === 0
  }

  const validateStep1 = () => {
    const e: Record<string, string> = {}
    if (!event.date) e.date = 'Required'
    if (!event.time) e.time = 'Required'
    if (!event.address.trim()) e.address = 'Required'
    if (!event.city.trim()) e.city = 'Required'
    if (!event.locationType) e.locationType = 'Required'
    if (!event.occasion) e.occasion = 'Required'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return
    if (step === 1 && !validateStep1()) return
    setErrors({}); setStep(s => s + 1)
    scrollToBooking()
  }

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!consent) return
    setSubmitting(true)
    setSubmitError(null)

    const { error } = await saveBooking({
      package_name: pkg.name,
      games: pkgGames.map(g => ({ id: g.id, name: g.name })),
      first_name: personal.firstName,
      last_name: personal.lastName,
      phone: personal.phone,
      email: personal.email,
      event_date: event.date,
      event_time: event.time,
      address: event.address,
      city: event.city,
      location_type: event.locationType,
      occasion: event.occasion,
      guests: event.guests,
      notes: event.notes,
    })

    setSubmitting(false)

    if (error) {
      setSubmitError('Something went wrong saving your booking. Please try again or contact us directly on WhatsApp.')
      return
    }

    reset()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (!pkg) return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />
      <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <h2>Package not found</h2>
        <Link to="/" className="btn-next" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>Back to Home</Link>
      </div>
    </div>
  )

  const pkgGames = pkg.gameIds.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games

  if (submitted) return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />
      <div className="confirmation-section">
        <div className="confirmation-icon">🎉</div>
        <h2>Booking Submitted!</h2>
        <p>Your <strong>{pkg.name}</strong> package booking has been received. Our team will reach out via email or phone to confirm everything.</p>
        <p style={{ fontSize: '0.9rem', color: 'rgba(32,25,66,0.5)' }}>Keep an eye on <strong>{personal.email || 'your inbox'}</strong> — we'll be in touch soon.</p>
        <Link to="/" className="btn-next" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>Back to Home</Link>
      </div>
    </div>
  )

  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />

      <section className="game-hero-section">
        <img src="/home.png" className="hero-image" alt="Package booking" />
        <div className="hero-overlay" />
        <div className="game-hero-content">
          <p className="hero-kicker">AfroRetro Games — Package Booking</p>
          <h1>{pkg.name}</h1>
          <p>{pkg.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'linear-gradient(90deg,#ff9500,#ff6a00)', color: '#fff', borderRadius: '999px', padding: '0.4rem 1rem', fontWeight: 800, fontSize: '1rem' }}>{pkg.price}</span>
            <button className="game-hero-btn" onClick={scrollToBooking}>Book This Package ↓</button>
          </div>
        </div>
      </section>

      {/* Package Games */}
      <div style={{ width: 'min(1280px, calc(100vw - 32px))', margin: '3rem auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(1.4rem,2vw,1.9rem)', color: '#1d1443' }}>What's Included in {pkg.name}</h2>
        <div className="games-grid">
          {pkgGames.map(g => (
            <article key={g.id} className="game-card">
              <div className="game-media"><img src={g.image} alt={g.name} /></div>
              <div className="game-body"><h3>{g.name}</h3><p>{g.description}</p></div>
            </article>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <section className="booking-section" id="pkg-booking" style={{ scrollMarginTop: '80px' }}>
        <h2>Book the {pkg.name} Package</h2>
        <p>Fill in your details below and we'll get everything ready for your event.</p>

        <div className="progress-steps">
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="step-item">
                <div className={`step-circle ${i === step ? 'active' : i < step ? 'done' : ''}`}>{i < step ? '✓' : i + 1}</div>
                <span className={`step-label ${i === step ? 'active' : i < step ? 'done' : ''}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`step-connector ${i < step ? 'done' : ''}`} />}
            </div>
          ))}
        </div>

        <div className="booking-card">
          {step === 0 && (
            <>
              <h3>Your Details</h3>
              <p>Tell us a bit about yourself so we can get in touch.</p>
              <div className="form-row">
                <div className="form-field">
                  <label>First Name</label>
                  <input type="text" placeholder="e.g. Sarah" value={personal.firstName} onChange={e => setPersonal({ ...personal, firstName: e.target.value })} />
                  {errors.firstName && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.firstName}</span>}
                </div>
                <div className="form-field">
                  <label>Last Name</label>
                  <input type="text" placeholder="e.g. Nakato" value={personal.lastName} onChange={e => setPersonal({ ...personal, lastName: e.target.value })} />
                  {errors.lastName && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+256 700 000 000" value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} />
                  {errors.phone && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.phone}</span>}
                </div>
                <div className="form-field">
                  <label>Email Address</label>
                  <input type="email" placeholder="sarah@email.com" value={personal.email} onChange={e => setPersonal({ ...personal, email: e.target.value })} />
                  {errors.email && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.email}</span>}
                </div>
              </div>
              <div className="form-actions"><button className="btn-next" onClick={handleNext}>Next: Event Details →</button></div>
            </>
          )}

          {step === 1 && (
            <>
              <h3>Event Details</h3>
              <p>Help us understand your event so we can prepare everything perfectly.</p>
              <div className="form-row">
                <div className="form-field">
                  <label>Event Date</label>
                  <input type="date" value={event.date} onChange={e => setEvent({ ...event, date: e.target.value })} />
                  {errors.date && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.date}</span>}
                </div>
                <div className="form-field">
                  <label>Event Time</label>
                  <input type="time" value={event.time} onChange={e => setEvent({ ...event, time: e.target.value })} />
                  {errors.time && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.time}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Street Address</label>
                  <input type="text" placeholder="e.g. 14 Kampala Road" value={event.address} onChange={e => setEvent({ ...event, address: e.target.value })} />
                  {errors.address && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.address}</span>}
                </div>
                <div className="form-field">
                  <label>City / Town</label>
                  <input type="text" placeholder="e.g. Kampala" value={event.city} onChange={e => setEvent({ ...event, city: e.target.value })} />
                  {errors.city && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.city}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Venue Type</label>
                  <select value={event.locationType} onChange={e => setEvent({ ...event, locationType: e.target.value })}>
                    <option value="">Select venue type...</option>
                    {locationTypes.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.locationType && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.locationType}</span>}
                </div>
                <div className="form-field">
                  <label>Event Occasion</label>
                  <select value={event.occasion} onChange={e => setEvent({ ...event, occasion: e.target.value })}>
                    <option value="">Select occasion...</option>
                    {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.occasion && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.occasion}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Number of Guests</label>
                  <input type="number" min="1" placeholder="e.g. 50" value={event.guests} onChange={e => setEvent({ ...event, guests: e.target.value })} />
                </div>
                <div className="form-field" />
              </div>
              <div className="form-row single">
                <div className="form-field">
                  <label>Additional Details <span style={{ fontWeight: 500, color: 'rgba(32,25,66,0.45)' }}>(optional)</span></label>
                  <textarea placeholder="Theme, special requests, anything else..." value={event.notes} onChange={e => setEvent({ ...event, notes: e.target.value })} />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-back" onClick={() => { setStep(0); scrollToBooking() }}>← Back</button>
                <button className="btn-next" onClick={handleNext}>Review Booking →</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Review Your Booking</h3>
              <p>Everything look good? Confirm below to submit your request.</p>
              <div className="preview-block">
                <h4>Package Selected</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1d1443' }}>{pkg.name}</span>
                  <span className="package-price-badge">{pkg.price}</span>
                </div>
                <div className="package-games" style={{ marginTop: '0.8rem' }}>
                  {pkgGames.map(g => <span key={g.id} className="pkg-game-tag">{g.name}</span>)}
                </div>
              </div>
              <div className="preview-block">
                <h4>Your Details</h4>
                <div className="preview-grid">
                  <div className="preview-field"><span>Full Name</span><span>{personal.firstName} {personal.lastName}</span></div>
                  <div className="preview-field"><span>Phone</span><span>{personal.phone}</span></div>
                  <div className="preview-field"><span>Email</span><span>{personal.email}</span></div>
                </div>
              </div>
              <div className="preview-block">
                <h4>Event Details</h4>
                <div className="preview-grid">
                  <div className="preview-field"><span>Date</span><span>{event.date}</span></div>
                  <div className="preview-field"><span>Time</span><span>{event.time}</span></div>
                  <div className="preview-field"><span>Address</span><span>{event.address}, {event.city}</span></div>
                  <div className="preview-field"><span>Venue Type</span><span>{event.locationType}</span></div>
                  <div className="preview-field"><span>Occasion</span><span>{event.occasion}</span></div>
                  <div className="preview-field"><span>Guests</span><span>{event.guests || '—'}</span></div>
                  {event.notes && <div className="preview-field" style={{ gridColumn: '1/-1' }}><span>Notes</span><span>{event.notes}</span></div>}
                </div>
              </div>
              <div className="consent-row">
                <input type="checkbox" id="pkg-consent" checked={consent} onChange={e => setConsent(e.target.checked)} />
                <label htmlFor="pkg-consent">I confirm all details are correct and agree to be contacted by AfroRetro Games regarding this booking.</label>
              </div>
              {submitError && (
                <p style={{ color: '#e53e3e', fontSize: '0.88rem', fontWeight: 600, marginTop: '0.8rem', textAlign: 'center' }}>
                  {submitError}
                </p>
              )}
              <div className="form-actions">
                <button className="btn-back" onClick={() => { setStep(1); scrollToBooking() }}>← Back</button>
                <button className="btn-next" onClick={handleSubmit} disabled={!consent || submitting} style={{ opacity: consent && !submitting ? 1 : 0.5 }}>
                  {submitting ? 'Submitting...' : 'Submit Booking 🎉'}
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
