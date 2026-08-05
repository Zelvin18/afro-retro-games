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

// ── Format booking details as readable email text ─────────────
function formatBookingEmail(data: BookingInsert): string {
  const gameList = data.games.map(g => g.name).join(', ')
  return `
New Booking Request — AfroRetro Games
======================================

${data.package_name ? `Package: ${data.package_name}` : ''}
Games: ${gameList}

CUSTOMER DETAILS
----------------
Name:   ${data.first_name} ${data.last_name}
Phone:  ${data.phone}
Email:  ${data.email}

EVENT DETAILS
-------------
Date:         ${data.event_date}
Time:         ${data.event_time}
Address:      ${data.address}, ${data.city}
Venue Type:   ${data.location_type}
Occasion:     ${data.occasion}
Guests:       ${data.guests || 'Not specified'}
Notes:        ${data.notes || 'None'}

======================================
Reply to this email or WhatsApp +256 703 239 422 to confirm.
  `.trim()
}

// ── Helper: save booking + send email notification ────────────
export async function saveBooking(data: BookingInsert): Promise<{ error: string | null }> {
  // 1. Save to database
  const { error } = await supabase.from('bookings').insert([data])
  if (error) {
    console.error('Supabase booking error:', error.message)
    return { error: error.message }
  }

  // 2. Send email notification via Supabase Edge Function
  try {
    await supabase.functions.invoke('send-booking-email', {
      body: {
        to: 'info@afroretrogames.com',
        subject: `New Booking: ${data.first_name} ${data.last_name} — ${data.event_date}`,
        text: formatBookingEmail(data),
        replyTo: data.email,
      },
    })
  } catch (emailErr) {
    // Email notification failure should not block the booking confirmation
    console.warn('Email notification failed (booking still saved):', emailErr)
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

  // Send email notification
  try {
    await supabase.functions.invoke('send-booking-email', {
      body: {
        to: 'info@afroretrogames.com',
        subject: `New Contact Message from ${data.name}`,
        text: `New message via afroretrogames.com\n\nName: ${data.name}\nEmail: ${data.email || 'Not provided'}\nPhone: ${data.phone || 'Not provided'}\n\nMessage:\n${data.message}`,
        replyTo: data.email || '',
      },
    })
  } catch (emailErr) {
    console.warn('Email notification failed:', emailErr)
  }

  return { error: null }
}
