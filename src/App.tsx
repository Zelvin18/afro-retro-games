import { Routes, Route, useLocation } from 'react-router-dom'
import { BookingProvider } from './BookingContext'
import { FaWhatsapp } from 'react-icons/fa6'
import HomePage from './HomePage'
import GalleryPage from './GalleryPage'
import BookingPage from './BookingPage'
import AllGamesPage from './AllGamesPage'
import ContactPage from './ContactPage'
import PackageBookingPage from './PackageBookingPage'
import EventPage from './EventPage'
import NotFoundPage from './NotFoundPage'
import { eventConfigs } from './eventConfigs'

function WhatsAppFAB() {
  const { pathname } = useLocation()
  // hide on contact page since it already has WhatsApp
  if (pathname === '/contact') return null
  return (
    <a
      href="https://wa.me/256703239422?text=Hi%20AfroRetro%20Games!%20I%27d%20like%20to%20enquire%20about%20your%20services."
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
      <span className="whatsapp-fab-label">Chat with us</span>
    </a>
  )
}

export default function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/book/:gameId" element={<BookingPage />} />
        <Route path="/package/:packageId" element={<PackageBookingPage />} />
        <Route path="/games" element={<AllGamesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {Object.entries(eventConfigs).map(([slug, config]) => (
          <Route key={slug} path={`/events/${slug}`} element={<EventPage config={config} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <WhatsAppFAB />
    </BookingProvider>
  )
}
