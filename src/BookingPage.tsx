import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from './Navbar'
import { games, getGameById } from './gamesData'
import { useBooking } from './BookingContext'
import { saveBooking } from './supabase'
import './App.css'
import './BookingPage.css'

const locationTypes = [
  'Private Indoor', 'Private Outdoor',
  'Public Indoor', 'Public Outdoor',
  'House Indoor', 'House Outdoor',
  'Office Indoor', 'Office Outdoor',
  'Hall Indoor', 'Hall Outdoor',
  'Street Party', 'School Grounds',
  'Community Centre', 'Hotel Venue',
  'Garden / Backyard', 'Rooftop',
]

const occasions = [
  'Adult Party', 'Kids Party', 'Mixed Party',
  'Street Party', 'School Event', 'Corporate Event',
  'Wedding', 'Baby Shower', 'Bridal Shower',
  'Birthday Celebration', 'Graduation Party',
  'Team Building Day', 'Community Festival',
  'Charity Event', 'Religious Celebration',
  'Sports Day', 'Family Reunion',
]

const STEPS = ['Your Details', 'Event Details', 'Review & Confirm']

export default function BookingPage() {
  const { gameId } = useParams<{ gameId: string }>()
  const game = getGameById(gameId ?? '')

  const { selectedGames, addGame, removeGame, personal, setPersonal, event, setEvent, reset } = useBooking()

  const [step, setStep] = useState(0)
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  // Auto-add the current game when page loads
  useEffect(() => {
    if (game) addGame(game)
  }, [game?.id])

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const isAdded = (id: string) => selectedGames.some((g) => g.id === id)

  const validateStep0 = () => {
    const e: Record<string, string> = {}
    if (!personal.firstName.trim()) e.firstName = 'First name is required'
    if (!personal.lastName.trim()) e.lastName = 'Last name is required'
    if (!personal.phone.trim()) e.phone = 'Phone number is required'
    if (!personal.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(personal.email)) e.email = 'Enter a valid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep1 = () => {
    const e: Record<string, string> = {}
    if (!event.date) e.date = 'Event date is required'
    if (!event.time) e.time = 'Event time is required'
    if (!event.address.trim()) e.address = 'Address is required'
    if (!event.city.trim()) e.city = 'City is required'
    if (!event.locationType) e.locationType = 'Please select a location type'
    if (!event.occasion) e.occasion = 'Please select an occasion'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return
    if (step === 1 && !validateStep1()) return
    setErrors({})
    setStep((s) => s + 1)
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!consent) return
    setSubmitting(true)
    setSubmitError(null)

    const { error } = await saveBooking({
      package_name: null,
      games: selectedGames.map(g => ({ id: g.id, name: g.name })),
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

  if (!game) {
    return (
      <div className="site-shell">
        <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
        <Navbar />
        <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
          <h2>Game not found</h2>
          <Link to="/" className="btn-next" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>Back to Home</Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="site-shell">
        <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
        <Navbar />
        <div className="confirmation-section">
          <div className="confirmation-icon">🎉</div>
          <h2>Booking Submitted!</h2>
          <p>
            Thank you! Your booking request has been received. Our team will reach out to you via email or phone call shortly to confirm all the details.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(32,25,66,0.5)' }}>
            Keep an eye on <strong>{personal.email || 'your inbox'}</strong> — we'll be in touch soon.
          </p>
          <Link to="/" className="btn-next" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>Back to Home</Link>
        </div>
      </div>
    )
  }

  const otherGames = games.filter((g) => g.id !== game.id)

  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />

      {/* Hero */}
      <section className="game-hero-section">
        <img src="/home.png" className="hero-image" alt="Event background" />
        <div className="hero-overlay" />
        <div className="game-hero-content">
          <p className="hero-kicker">AfroRetro Games — Book Now</p>
          <h1>{game.name}</h1>
          <p>{game.tagline}</p>
          <button className="game-hero-btn" onClick={scrollToBooking}>
            Start Your Booking ↓
          </button>
        </div>
      </section>

      {/* Game Detail */}
      <div className="game-detail-section">
        <div className="game-detail-image">
          <img src={game.image} alt={game.name} />
        </div>
        <div className="game-detail-info">
          <h2>{game.name}</h2>
          <p className="tagline">{game.description}</p>
          <ul className="game-highlights">
            {game.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      </div>

      {/* Add More Games */}
      <section className="add-more-section">
        <div className="add-more-inner">
          <div className="add-more-header">
            <div>
              <h2>Make It a Full Experience</h2>
              <p>Add more games to your booking and create an event no one will forget.</p>
            </div>
          </div>
          <div className="games-scroll-row">
            {otherGames.map((g) => {
              const added = isAdded(g.id)
              return (
                <div key={g.id} className="scroll-game-card">
                  <img src={g.image} alt={g.name} loading="lazy" />
                  <div className="scroll-game-card-body">
                    <h4>{g.name}</h4>
                    <button
                      className={`scroll-add-btn ${added ? 'added' : 'not-added'}`}
                      onClick={() => added ? removeGame(g.id) : addGame(g)}
                    >
                      {added ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="add-more-cta">
            <Link to="/games" className="view-all-games-btn">View All Games</Link>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-section" id="booking-section">
        <h2>Complete Your Booking</h2>
        <p>Just a few quick steps and your event is locked in.</p>

        {/* Progress */}
        <div className="progress-steps">
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="step-item">
                <div className={`step-circle ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`step-label ${i === step ? 'active' : i < step ? 'done' : ''}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`step-connector ${i < step ? 'done' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Selected Games */}
        {selectedGames.length > 0 && (
          <div className="selected-games-chips">
            {selectedGames.map((g) => (
              <div key={g.id} className="game-chip">
                <img src={g.image} alt={g.name} />
                {g.name}
                {g.id !== game.id && (
                  <button className="chip-remove" onClick={() => removeGame(g.id)} aria-label={`Remove ${g.name}`}>×</button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="booking-card">
          {/* Step 0 — Personal Details */}
          {step === 0 && (
            <>
              <h3>Your Details</h3>
              <p>Tell us a bit about yourself so we can get in touch.</p>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" type="text" placeholder="e.g. Sarah" value={personal.firstName}
                    onChange={(e) => setPersonal({ ...personal, firstName: e.target.value })} />
                  {errors.firstName && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.firstName}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" type="text" placeholder="e.g. Nakato" value={personal.lastName}
                    onChange={(e) => setPersonal({ ...personal, lastName: e.target.value })} />
                  {errors.lastName && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" placeholder="e.g. +256 700 000 000" value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} />
                  {errors.phone && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.phone}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" placeholder="e.g. sarah@email.com" value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })} />
                  {errors.email && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.email}</span>}
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-next" onClick={handleNext}>Next: Event Details →</button>
              </div>
            </>
          )}

          {/* Step 1 — Event Details */}
          {step === 1 && (
            <>
              <h3>Event Details</h3>
              <p>Help us understand your event so we can prepare everything perfectly.</p>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="date">Event Date</label>
                  <input id="date" type="date" value={event.date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })} />
                  {errors.date && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.date}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="time">Event Time</label>
                  <input id="time" type="time" value={event.time}
                    onChange={(e) => setEvent({ ...event, time: e.target.value })} />
                  {errors.time && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.time}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="address">Street Address</label>
                  <input id="address" type="text" placeholder="e.g. 14 Kampala Road" value={event.address}
                    onChange={(e) => setEvent({ ...event, address: e.target.value })} />
                  {errors.address && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.address}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="city">City / Town</label>
                  <input id="city" type="text" placeholder="e.g. Kampala" value={event.city}
                    onChange={(e) => setEvent({ ...event, city: e.target.value })} />
                  {errors.city && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.city}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="locationType">Venue Type</label>
                  <select id="locationType" value={event.locationType}
                    onChange={(e) => setEvent({ ...event, locationType: e.target.value })}>
                    <option value="">Select venue type...</option>
                    {locationTypes.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.locationType && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.locationType}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="occasion">Event Occasion</label>
                  <select id="occasion" value={event.occasion}
                    onChange={(e) => setEvent({ ...event, occasion: e.target.value })}>
                    <option value="">Select occasion...</option>
                    {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.occasion && <span style={{ color: '#e53e3e', fontSize: '0.8rem' }}>{errors.occasion}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="guests">Number of Guests</label>
                  <input id="guests" type="number" min="1" placeholder="e.g. 50" value={event.guests}
                    onChange={(e) => setEvent({ ...event, guests: e.target.value })} />
                </div>
                <div className="form-field" />
              </div>
              <div className="form-row single">
                <div className="form-field">
                  <label htmlFor="notes">Additional Details <span style={{ fontWeight: 500, color: 'rgba(32,25,66,0.45)' }}>(optional)</span></label>
                  <textarea id="notes" placeholder="Anything else we should know about your event — theme, number of guests, special requests..." value={event.notes}
                    onChange={(e) => setEvent({ ...event, notes: e.target.value })} />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-back" onClick={() => { setStep(0); document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>← Back</button>
                <button className="btn-next" onClick={handleNext}>Review Booking →</button>
              </div>
            </>
          )}

          {/* Step 2 — Preview */}
          {step === 2 && (
            <>
              <h3>Review Your Booking</h3>
              <p>Everything look good? Confirm below to submit your request.</p>

              <div className="preview-block">
                <h4>Games Selected</h4>
                <div className="preview-games-list">
                  {selectedGames.map((g) => (
                    <div key={g.id} className="game-chip">
                      <img src={g.image} alt={g.name} />
                      {g.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="preview-block">
                <h4>Your Details</h4>
                <div className="preview-grid">
                  <div className="preview-field">
                    <span>Full Name</span>
                    <span>{personal.firstName} {personal.lastName}</span>
                  </div>
                  <div className="preview-field">
                    <span>Phone</span>
                    <span>{personal.phone}</span>
                  </div>
                  <div className="preview-field">
                    <span>Email</span>
                    <span>{personal.email}</span>
                  </div>
                </div>
              </div>

              <div className="preview-block">
                <h4>Event Details</h4>
                <div className="preview-grid">
                  <div className="preview-field">
                    <span>Date</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="preview-field">
                    <span>Time</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="preview-field">
                    <span>Address</span>
                    <span>{event.address}, {event.city}</span>
                  </div>
                  <div className="preview-field">
                    <span>Venue Type</span>
                    <span>{event.locationType}</span>
                  </div>
                  <div className="preview-field">
                    <span>Occasion</span>
                    <span>{event.occasion}</span>
                  </div>
                  <div className="preview-field">
                    <span>Number of Guests</span>
                    <span>{event.guests || '—'}</span>
                  </div>
                  {event.notes && (
                    <div className="preview-field" style={{ gridColumn: '1 / -1' }}>
                      <span>Additional Notes</span>
                      <span>{event.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="consent-row">
                <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <label htmlFor="consent">
                  I confirm that all the details above are correct and I agree to be contacted by AfroRetro Games regarding this booking request.
                </label>
              </div>

              {submitError && (
                <p style={{ color: '#e53e3e', fontSize: '0.88rem', fontWeight: 600, marginTop: '0.8rem', textAlign: 'center' }}>
                  {submitError}
                </p>
              )}

              <div className="form-actions">
                <button className="btn-back" onClick={() => { setStep(1); document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>← Back</button>
                <button
                  className="btn-next"
                  onClick={handleSubmit}
                  disabled={!consent || submitting}
                  style={{ opacity: consent && !submitting ? 1 : 0.5 }}
                >
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
