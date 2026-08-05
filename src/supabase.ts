/**
 * supabase.ts — Now uses the PHP/MySQL backend on Webstar
 * instead of Supabase. The function signatures are unchanged
 * so no other files need to be updated.
 */

const API_BASE = 'https://afroretrogames.com/api'

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
  try {
    const res = await fetch(`${API_BASE}/booking.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok || json.error) {
      console.error('Booking error:', json.error)
      return { error: json.error ?? 'Unknown error' }
    }
    return { error: null }
  } catch (err) {
    console.error('Network error saving booking:', err)
    return { error: 'Network error. Please try again.' }
  }
}

// ── Helper: save contact message ─────────────────────────────
export async function saveContactMessage(data: ContactInsert): Promise<{ error: string | null }> {
  try {
    const res = await fetch(`${API_BASE}/contact.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok || json.error) {
      console.error('Contact error:', json.error)
      return { error: json.error ?? 'Unknown error' }
    }
    return { error: null }
  } catch (err) {
    console.error('Network error saving contact message:', err)
    return { error: 'Network error. Please try again.' }
  }
}
