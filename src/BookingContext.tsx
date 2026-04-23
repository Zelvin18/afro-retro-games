import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Game } from './gamesData'

export interface PersonalDetails {
  firstName: string
  lastName: string
  phone: string
  email: string
}

export interface EventDetails {
  date: string
  time: string
  address: string
  city: string
  locationType: string
  occasion: string
  guests: string
  notes: string
}

interface BookingState {
  selectedGames: Game[]
  packageName: string | null
  personal: PersonalDetails
  event: EventDetails
  setSelectedGames: (games: Game[]) => void
  setPackageName: (name: string | null) => void
  addGame: (game: Game) => void
  removeGame: (id: string) => void
  setPersonal: (d: PersonalDetails) => void
  setEvent: (d: EventDetails) => void
  reset: () => void
}

const defaultPersonal: PersonalDetails = { firstName: '', lastName: '', phone: '', email: '' }
const defaultEvent: EventDetails = { date: '', time: '', address: '', city: '', locationType: '', occasion: '', guests: '', notes: '' }

const BookingContext = createContext<BookingState | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedGames, setSelectedGames] = useState<Game[]>([])
  const [packageName, setPackageName] = useState<string | null>(null)
  const [personal, setPersonal] = useState<PersonalDetails>(defaultPersonal)
  const [event, setEvent] = useState<EventDetails>(defaultEvent)

  const addGame = (game: Game) => {
    setSelectedGames((prev) => prev.find((g) => g.id === game.id) ? prev : [...prev, game])
  }

  const removeGame = (id: string) => {
    setSelectedGames((prev) => prev.filter((g) => g.id !== id))
  }

  const reset = () => {
    setSelectedGames([])
    setPackageName(null)
    setPersonal(defaultPersonal)
    setEvent(defaultEvent)
  }

  return (
    <BookingContext.Provider value={{ selectedGames, packageName, personal, event, setSelectedGames, setPackageName, addGame, removeGame, setPersonal, setEvent, reset }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
