import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  {
    label: 'Packages',
    sections: [
      { title: 'Starter Spark', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516702/afroretro/games/Cornhole.jpg', slug: 'package/starter-spark', links: [{ label: 'Cornhole', to: '/book/cornhole' }, { label: 'Giant Jenga', to: '/book/giant-jenga' }, { label: 'Ring Toss', to: '/book/ring-toss' }] },
      { title: 'Retro Vibes', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516697/afroretro/games/Carrom-Board.jpg', slug: 'package/retro-vibes', links: [{ label: 'Carrom Board', to: '/book/carrom-board' }, { label: 'Ludo Boards', to: '/book/ludo-boards' }, { label: 'Chess Boards', to: '/book/chess-boards' }] },
      { title: 'Tula Tucheze', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516712/afroretro/games/Mini-Golf-Sets.jpg', slug: 'package/tula-tucheze', text: 'A full spread for bigger groups — variety, energy, and a host included.' },
    ],
  },
  {
    label: 'Party Planning',
    sections: [
      { title: 'Kids Parties', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516693/afroretro/games/Bouncing-Castles.jpg', slug: 'birthday-events', links: [{ label: 'Theme Concepts', to: '/events/theme-concepts' }, { label: 'Live Hosts', to: '/events/live-hosts' }, { label: 'Music & Sound Packages', to: '/events/music-sound' }] },
      { title: 'Family Events', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516708/afroretro/games/Giant-Connect-4.jpg', slug: 'community-festivals', links: [{ label: 'Birthday Events', to: '/events/birthday-events' }, { label: 'Community Festivals', to: '/events/community-festivals' }, { label: 'Seasonal Celebrations', to: '/events/seasonal-celebrations' }] },
      { title: 'Creative Styling', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516695/afroretro/games/Canvas-Painting.jpg', slug: 'theme-concepts', text: 'Colorful layouts, game zones, and immersive décor ideas for any venue.' },
    ],
  },
  {
    label: 'School Events',
    sections: [
      { title: 'School Fun Days', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516702/afroretro/games/Cornhole.jpg', slug: 'sports-day', links: [{ label: 'Sports Day Games', to: '/events/sports-day' }, { label: 'House Competitions', to: '/events/house-competitions' }, { label: 'Reward Day Activities', to: '/events/reward-day' }] },
      { title: 'Educational Play', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516699/afroretro/games/Chess-Boards.jpg', slug: 'stem-booths', links: [{ label: 'Team Challenges', to: '/events/team-challenges' }, { label: 'STEM Game Booths', to: '/events/stem-booths' }, { label: 'Interactive Retro Games', to: '/events/retro-games-school' }] },
      { title: 'Packages', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516711/afroretro/games/Ludo-Boards.jpg', slug: 'quick-service', text: 'School-focused bundles for indoor halls, fields, and mixed activity days.' },
    ],
  },
  {
    label: 'Private Events',
    sections: [
      { title: 'Celebrations', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516708/afroretro/games/Giant-Connect-4.jpg', slug: 'birthdays-private', links: [{ label: 'Birthdays', to: '/events/birthdays-private' }, { label: 'Garden Gatherings', to: '/events/garden-gatherings' }, { label: 'Milestone Events', to: '/events/milestone-events' }] },
      { title: 'Premium Hire', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516715/afroretro/games/Playstation-Sets.jpg', slug: 'game-lounge', links: [{ label: 'Game Lounge Setup', to: '/events/game-lounge' }, { label: 'Interactive Photo Corners', to: '/events/interactive-photo' }] },
      { title: 'Bespoke Design', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516695/afroretro/games/Canvas-Painting.jpg', slug: 'theme-concepts', text: 'Tailored private-event experiences designed around your guest list and theme.' },
    ],
  },
  {
    label: 'Corporate Events',
    sections: [
      { title: 'Team Building', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516717/afroretro/games/Table-Tennis.jpg', slug: 'office-olympics', links: [{ label: 'Office Olympics', to: '/events/office-olympics' }, { label: 'Retro Tournament Nights', to: '/events/retro-tournament' }, { label: 'Problem-Solving Challenges', to: '/events/problem-solving' }] },
      { title: 'Brand Activations', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516724/afroretro/games/Virtual-Reality-set.jpg', slug: 'popup-game-zones', links: [{ label: 'Pop-Up Game Zones', to: '/events/popup-game-zones' }, { label: 'Exhibition Attractions', to: '/events/exhibition-attractions' }, { label: 'Family Day Entertainment', to: '/events/family-day' }] },
      { title: 'Managed Delivery', image: 'https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516709/afroretro/games/Giant-Jenga.jpg', slug: 'quick-service', text: 'Professional event coordination from planning to on-site execution.' },
    ],
  },
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
    setMobileExpanded(null)
  }, [location.pathname])

  // Scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Escape key closes menus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false); setActiveMenu(null) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const currentItem = navItems.find((item) => item.label === activeMenu)

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      <header className="site-header" ref={headerRef} onMouseLeave={() => setActiveMenu(null)}>
        <div className="header-inner">
          <Link to="/" className="logo-link" aria-label="AfroRetro Games home">
            <img src="https://res.cloudinary.com/nzxdstig/image/upload/f_auto,q_auto/v1785516586/afroretro/afroretro-logo.png" className="logo-img" alt="AfroRetro Games logo" />
          </Link>

          <button
            className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(c => !c)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <span /><span /><span />
          </button>

          {/* Desktop nav */}
          <nav className="main-nav desktop-nav" aria-label="Primary">
            {navItems.map((item) => (
              <div key={item.label} className="nav-item">
                <button
                  className="nav-link"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onClick={() => setActiveMenu(c => c === item.label ? null : item.label)}
                >
                  {item.label}
                </button>
              </div>
            ))}
            <Link to="/gallery" className="nav-link static-link">Gallery</Link>
            <Link to="/about" className="nav-link static-link">About Us</Link>
            <Link to="/contact" className="nav-link static-link">Contact Us</Link>
          </nav>
        </div>

        {/* Desktop dropdown */}
        <div
          className={`dropdown-panel ${currentItem ? 'show' : ''}`}
          onMouseEnter={() => { if (currentItem) setActiveMenu(currentItem.label) }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {currentItem?.sections.map((section) => (
            <section key={section.title} className="dropdown-column">
              <Link to={`/${section.slug}`}>
                <img src={section.image} className="dropdown-thumb" alt={section.title} />
              </Link>
              <h3>
                <Link to={`/${section.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {section.title}
                </Link>
              </h3>
              {section.links ? (
                <ul>
                  {section.links.map((link) => (
                    <li key={link.label}><Link to={link.to}>{link.label}</Link></li>
                  ))}
                </ul>
              ) : (
                <p>{section.text}</p>
              )}
            </section>
          ))}
        </div>
      </header>

      {/* Mobile drawer */}
      <nav className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-drawer-header">
          <Link to="/" className="mobile-drawer-home" onClick={() => setMobileOpen(false)}>
            🏠 Home
          </Link>
          <button
            className="mobile-drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className="mobile-drawer-inner">
          {navItems.map((item) => (
            <div key={item.label} className="mobile-nav-group">
              <button
                className="mobile-nav-parent"
                onClick={() => setMobileExpanded(e => e === item.label ? null : item.label)}
                aria-expanded={mobileExpanded === item.label}
              >
                <span>{item.label}</span>
                <span className={`mobile-chevron ${mobileExpanded === item.label ? 'open' : ''}`}>›</span>
              </button>
              {mobileExpanded === item.label && (
                <div className="mobile-nav-children">
                  {item.sections.map(section => (
                    <div key={section.title} className="mobile-nav-section">
                      <Link to={`/${section.slug}`} className="mobile-nav-section-title">
                        {section.title}
                      </Link>
                      {section.links && section.links.map(link => (
                        <Link key={link.label} to={link.to} className="mobile-nav-link">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/gallery" className="mobile-nav-parent static">Gallery</Link>
          <Link to="/about" className="mobile-nav-parent static">About Us</Link>
          <Link to="/contact" className="mobile-nav-parent static">Contact Us</Link>
          <div className="mobile-drawer-cta">
            <Link to="/games" className="btn-next" style={{ textDecoration: 'none', textAlign: 'center' }}>Browse All Games</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
