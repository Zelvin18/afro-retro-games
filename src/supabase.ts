import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(url, key)

// ── Types matching the DB schema ──────────────────────────────

export interface BookingInsert {
  package_name?: string | null
  games: { id: string; name: string }[]
  first_name: string
  last_name: string
  phone: string
  email: string
  event_date: string
  event_time: string
  address: string
  city: string
  location_type: string
  occasion: string
  guests?: string
  notes?: string
}

export interface ContactInsert {
  name: string
  email?: string
  phone?: string
  message: string
}

// ── Helper: save booking ──────────────────────────────────────
export async function saveBooking(data: BookingInsert): Promise<{ error: string | null }> {
  const { error } = await supabase.from('bookings').insert([data])
  if (error) {
    console.error('Supabase booking error:', error.message)
    return { error: error.message }
  }
  return { error: null }
}

// ── Helper: save contact message ─────────────────────────────
export async function saveContactMessage(data: ContactInsert): Promise<{ error: string | null }> {
  const { error } = await supabase.from('contact_messages').insert([data])
  if (error) {
    console.error('Supabase contact error:', error.message)
    return { error: error.message }
  }
  return { error: null }
}
