import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import './App.css'

export default function NotFoundPage() {
  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />
      <div className="not-found-section">
        <div className="not-found-inner">
          <div className="not-found-icon">🎮</div>
          <h1>404</h1>
          <h2>Oops — this page went missing</h2>
          <p>Looks like this page packed up and left the party. Let's get you back to the fun.</p>
          <div className="not-found-btns">
            <Link to="/" className="btn-next" style={{ textDecoration: 'none' }}>Back to Home</Link>
            <Link to="/games" className="view-all-games-btn">Browse Games</Link>
            <Link to="/contact" className="view-all-games-btn">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
