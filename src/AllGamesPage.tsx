import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { games } from './gamesData'
import { useBooking } from './BookingContext'
import './App.css'
import './BookingPage.css'

const outdoorIds = ['bouncing-castles', 'cornhole', 'mini-golf', 'mini-golf-deluxe', 'giant-jenga', 'giant-connect-4', 'ring-toss', 'trampolines', 'face-painting', 'canvas-painting', 'clowns-mascots']
const indoorIds  = ['playstation-sets', 'virtual-reality', 'chess-boards', 'ludo-boards', 'carrom-board', 'tic-tac-toe', 'darts-board', 'table-tennis', 'omweso']

type Filter = 'all' | 'indoor' | 'outdoor'

export default function AllGamesPage() {
  const { selectedGames, addGame, removeGame } = useBooking()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  const isAdded = (id: string) => selectedGames.some((g) => g.id === id)

  const filtered = games.filter(g => {
    const matchesFilter =
      filter === 'all' ? true :
      filter === 'outdoor' ? outdoorIds.includes(g.id) :
      indoorIds.includes(g.id)
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleContinue = () => {
    if (selectedGames.length === 0) return
    navigate(`/book/${selectedGames[0].id}`)
  }

  return (
    <div className="site-shell">
      <div className="top-strip">AfroRetro Games | Indoor & Outdoor Event Specialists</div>
      <Navbar />

      <section className="all-games-section">
        <div className="all-games-inner">
          <div className="all-games-header">
            <h2>Choose Your Games</h2>
            <p>Add as many games as you like — mix and match to build your perfect event.</p>
          </div>

          {/* Filter + Search bar */}
          <div className="games-filter-bar">
            <div className="games-filter-tabs">
              {(['all', 'outdoor', 'indoor'] as Filter[]).map(f => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? '🎮 All Games' : f === 'outdoor' ? '☀️ Outdoor' : '🏠 Indoor'}
                </button>
              ))}
            </div>
            <input
              className="games-search"
              type="search"
              placeholder="Search games..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {selectedGames.length > 0 && (
            <div className="selected-games-chips">
              {selectedGames.map((g) => (
                <div key={g.id} className="game-chip">
                  <img src={g.image} alt={g.name} />
                  {g.name}
                  <button className="chip-remove" onClick={() => removeGame(g.id)} aria-label={`Remove ${g.name}`}>×</button>
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="games-empty">
              <p>No games found for "{search}". <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#5426b5', fontWeight: 700, cursor: 'pointer' }}>Clear search</button></p>
            </div>
          ) : (
            <div className="all-games-grid">
              {filtered.map((game) => {
                const added = isAdded(game.id)
                return (
                  <article key={game.id} className="all-game-card">
                    <div className="game-media">
                      <img src={game.image} alt={game.name} loading="lazy" />
                    </div>
                    <div className="game-body">
                      <h3>{game.name}</h3>
                      <p>{game.description}</p>
                    </div>
                    <div className="game-actions">
                      <button
                        className={`add-game-btn ${added ? 'added' : 'not-added'}`}
                        onClick={() => added ? removeGame(game.id) : addGame(game)}
                      >
                        {added ? '✓ Added' : '+ Add to Booking'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          <div className="all-games-continue">
            <button className="btn-back" onClick={() => navigate(-1)}>← Go Back</button>
            <button
              className="btn-next"
              onClick={handleContinue}
              disabled={selectedGames.length === 0}
              style={{ opacity: selectedGames.length === 0 ? 0.5 : 1 }}
            >
              Continue with {selectedGames.length} Game{selectedGames.length !== 1 ? 's' : ''} →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
