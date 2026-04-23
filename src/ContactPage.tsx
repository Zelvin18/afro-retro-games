import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { FaXTwitter, FaInstagram, FaTiktok, FaWhatsapp, FaPhone, FaEnvelope, FaLocationDot, FaClock } from 'react-icons/fa6'
import { saveContactMessage } from './supabase'
import './App.css'
import './ContactPage.css'

export default function ContactPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    // Save to Supabase (fire and don't block WhatsApp redirect)
    await saveContactMessage({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    })

    setSending(false)

    // Redirect to WhatsApp regardless
    const text = encodeURIComponent(
      `Hi AfroRetro Games! 👋\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    )
    window.open(`https://wa.me/256703239422?text=${text}`, '_blank')
  }

  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />

      {/* Hero */}
      <section className="contact-hero">
        <img src="/home.png" className="hero-image" alt="Contact AfroRetro" />
        <div className="hero-overlay" />
        <div className="contact-hero-content">
          <p className="hero-kicker">We'd Love to Hear From You</p>
          <h1>Get in Touch</h1>
          <p>Have a question, want to book, or just want to say hi? We're here for it.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-inner">

          {/* Info Cards */}
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-card-icon location-icon"><FaLocationDot /></div>
              <h3>Location</h3>
              <p>Kira, Kampala</p>
              <p>Uganda</p>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon phone-icon"><FaPhone /></div>
              <h3>Call / WhatsApp</h3>
              <a href="tel:+256703239422">+256 703 239 422</a>
              <a href="https://wa.me/256703239422" target="_blank" rel="noreferrer" className="wa-link">
                Chat on WhatsApp →
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon email-icon"><FaEnvelope /></div>
              <h3>Email</h3>
              <a href="mailto:Info.afroretro@gmail.com">Info.afroretro@gmail.com</a>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon clock-icon"><FaClock /></div>
              <h3>Office Hours</h3>
              <p>Monday – Saturday</p>
              <p>9:00 AM – 6:00 PM</p>
            </div>
          </div>

          {/* Social */}
          <div className="contact-socials">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://x.com/afroretro343313?s=21" target="_blank" rel="noreferrer" className="social-link x-link">
                <span className="social-icon x-icon"><FaXTwitter /></span>
                <div>
                  <strong>X (Twitter)</strong>
                  <span>@AfroRetro</span>
                </div>
              </a>
              <a href="https://www.instagram.com/afroretro_games_hire_ug?igsh=cXM1ZGdzdzM3eGsy&utm_source=qr" target="_blank" rel="noreferrer" className="social-link ig-link">
                <span className="social-icon ig-icon"><FaInstagram /></span>
                <div>
                  <strong>Instagram</strong>
                  <span>@afroretro_games_hire_ug</span>
                </div>
              </a>
              <a href="https://www.tiktok.com/@afroretro_games_hire_ug?_r=1&_t=ZS-95lwOnLEJ08" target="_blank" rel="noreferrer" className="social-link tt-link">
                <span className="social-icon tt-icon"><FaTiktok /></span>
                <div>
                  <strong>TikTok</strong>
                  <span>@afroretro_games_hire_ug</span>
                </div>
              </a>
              <a href="https://wa.me/256703239422" target="_blank" rel="noreferrer" className="social-link wa-social-link">
                <span className="social-icon wa-icon-social"><FaWhatsapp /></span>
                <div>
                  <strong>WhatsApp</strong>
                  <span>+256 703 239 422</span>
                </div>
              </a>
            </div>
          </div>

          {/* Message Form */}
          <div className="contact-form-wrap">
            <div className="contact-form-header">
              <h3>Send Us a Message</h3>
              <p>Fill in the form and we'll receive it straight on WhatsApp.</p>
            </div>
            <form className="contact-form" onSubmit={handleWhatsApp}>
              <div className="cf-row">
                <div className="cf-field">
                  <label htmlFor="cf-name">Your Name</label>
                  <input id="cf-name" type="text" placeholder="e.g. Sarah Nakato" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-email">Email Address</label>
                  <input id="cf-email" type="email" placeholder="e.g. sarah@email.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="cf-row single">
                <div className="cf-field">
                  <label htmlFor="cf-phone">Phone Number</label>
                  <input id="cf-phone" type="tel" placeholder="e.g. +256 700 000 000"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="cf-row single">
                <div className="cf-field">
                  <label htmlFor="cf-message">Your Message</label>
                  <textarea id="cf-message" rows={5} placeholder="Tell us about your event, what games you're interested in, or anything else..." required
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="cf-submit" disabled={sending}>
                <span>{sending ? 'Sending...' : 'Send via WhatsApp'}</span>
                <FaWhatsapp style={{ fontSize: '1.2rem' }} />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}
