import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  {
    label: 'Party Hire',
    sections: [
      { title: 'Outdoor Games', image: '/games/Bouncing Castles.png', slug: 'outdoor-games', links: [{ label: 'Bouncing Castles', to: '/book/bouncing-castles' }, { label: 'Cornhole', to: '/book/cornhole' }, { label: 'Mini Golf Sets', to: '/book/mini-golf' }] },
      { title: 'Indoor Games', image: '/games/Playstation Sets.png', slug: 'indoor-games', links: [{ label: 'Ludo Boards', to: '/book/ludo-boards' }, { label: 'Virtual Reality Set', to: '/book/virtual-reality' }, { label: 'PlayStation Sets', to: '/book/playstation-sets' }] },
      { title: 'Quick Service', image: '/games/Giant Jenga.png', slug: 'quick-service', text: 'Flexible daily and weekend hire plans with full setup support.' },
    ],
  },
  {
    label: 'Party Planning',
    sections: [
      { title: 'Kids Parties', image: '/games/Bouncing Castles.png', slug: 'birthday-events', links: [{ label: 'Theme Concepts', to: '/events/theme-concepts' }, { label: 'Live Hosts', to: '/events/live-hosts' }, { label: 'Music & Sound Packages', to: '/events/music-sound' }] },
      { title: 'Family Events', image: '/games/Giant Connect 4.png', slug: 'community-festivals', links: [{ label: 'Birthday Events', to: '/events/birthday-events' }, { label: 'Community Festivals', to: '/events/community-festivals' }, { label: 'Seasonal Celebrations', to: '/events/seasonal-celebrations' }] },
      { title: 'Creative Styling', image: '/games/Canvas Painting.png', slug: 'theme-concepts', text: 'Colorful layouts, game zones, and immersive décor ideas for any venue.' },
    ],
  },
  {
    label: 'School Events',
    sections: [
      { title: 'School Fun Days', image: '/games/Cornhole.png', slug: 'sports-day', links: [{ label: 'Sports Day Games', to: '/events/sports-day' }, { label: 'House Competitions', to: '/events/house-competitions' }, { label: 'Reward Day Activities', to: '/events/reward-day' }] },
      { title: 'Educational Play', image: '/games/Chess Boards.png', slug: 'stem-booths', links: [{ label: 'Team Challenges', to: '/events/team-challenges' }, { label: 'STEM Game Booths', to: '/events/stem-booths' }, { label: 'Interactive Retro Games', to: '/events/retro-games-school' }] },
      { title: 'Packages', image: '/games/Ludo Boards.png', slug: 'quick-service', text: 'School-focused bundles for indoor halls, fields, and mixed activity days.' },
    ],
  },
  {
    label: 'Private Events',
    sections: [
      { title: 'Celebrations', image: '/games/Giant Connect 4.png', slug: 'birthdays-private', links: [{ label: 'Birthdays', to: '/events/birthdays-private' }, { label: 'Garden Gatherings', to: '/events/garden-gatherings' }, { label: 'Milestone Events', to: '/events/milestone-events' }] },
      { title: 'Premium Hire', image: '/games/Playstation Sets.png', slug: 'game-lounge', links: [{ label: 'Game Lounge Setup', to: '/events/game-lounge' }, { label: 'Interactive Photo Corners', to: '/events/interactive-photo' }] },
      { title: 'Bespoke Design', image: '/games/Canvas Painting.png', slug: 'theme-concepts', text: 'Tailored private-event experiences designed around your guest list and theme.' },
    ],
  },
  {
    label: 'Corporate Events',
    sections: [
      { title: 'Team Building', image: '/games/Table Tennis.png', slug: 'office-olympics', links: [{ label: 'Office Olympics', to: '/events/office-olympics' }, { label: 'Retro Tournament Nights', to: '/events/retro-tournament' }, { label: 'Problem-Solving Challenges', to: '/events/problem-solving' }] },
      { title: 'Brand Activations', image: '/games/Virtual Reality set.png', slug: 'popup-game-zones', links: [{ label: 'Pop-Up Game Zones', to: '/events/popup-game-zones' }, { label: 'Exhibition Attractions', to: '/events/exhibition-attractions' }, { label: 'Family Day Entertainment', to: '/events/family-day' }] },
      { title: 'Managed Delivery', image: '/games/Giant Jenga.png', slug: 'quick-service', text: 'Professional event coordination from planning to on-site execution.' },
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
            <img src="/afroretro-logo.png" className="logo-img" alt="AfroRetro Games logo" />
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
              <Link to={`/events/${section.slug}`}>
                <img src={section.image} className="dropdown-thumb" alt={section.title} />
              </Link>
              <h3>
                <Link to={`/events/${section.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                      <Link to={`/events/${section.slug}`} className="mobile-nav-section-title">
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
          <Link to="/contact" className="mobile-nav-parent static">Contact Us</Link>
          <div className="mobile-drawer-cta">
            <Link to="/games" className="btn-next" style={{ textDecoration: 'none', textAlign: 'center' }}>Browse All Games</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
