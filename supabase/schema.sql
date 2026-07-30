-- ═══════════════════════════════════════════════════════════════
-- AfroRetro Games — Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up all tables,
-- indexes, and Row Level Security policies from scratch.
-- ═══════════════════════════════════════════════════════════════


-- ────────────────────────────────────────────────────────────────
-- TABLE: bookings
-- Stores all game and package booking requests submitted via
-- the website booking form.
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.bookings (
  id              bigint        GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at      timestamptz   NOT NULL DEFAULT now(),

  -- Package (null when booking individual games only)
  package_name    text,

  -- JSON array of booked games: [{ "id": "giant-jenga", "name": "Giant Jenga" }]
  games           jsonb         NOT NULL DEFAULT '[]'::jsonb,

  -- Customer details
  first_name      text          NOT NULL,
  last_name       text          NOT NULL,
  phone           text          NOT NULL,
  email           text          NOT NULL,

  -- Event details
  event_date      date          NOT NULL,
  event_time      time          NOT NULL,
  address         text          NOT NULL,
  city            text          NOT NULL,
  location_type   text          NOT NULL,
  occasion        text          NOT NULL,
  guests          text,
  notes           text
);

-- Indexes for the most common admin queries
CREATE INDEX IF NOT EXISTS bookings_created_at_idx  ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_event_date_idx  ON public.bookings (event_date);
CREATE INDEX IF NOT EXISTS bookings_email_idx       ON public.bookings (email);

-- Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users (website visitors) to INSERT only
CREATE POLICY "Allow public insert on bookings"
  ON public.bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (you, via the Supabase dashboard or admin app) can SELECT
CREATE POLICY "Allow authenticated select on bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (true);


-- ────────────────────────────────────────────────────────────────
-- TABLE: contact_messages
-- Stores messages submitted via the Contact page form.
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at  timestamptz NOT NULL DEFAULT now(),

  name        text        NOT NULL,
  email       text,
  phone       text,
  message     text        NOT NULL
);

-- Index for admin queries
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON public.contact_messages (created_at DESC);

-- Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT only
CREATE POLICY "Allow public insert on contact_messages"
  ON public.contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can SELECT
CREATE POLICY "Allow authenticated select on contact_messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (true);


-- ═══════════════════════════════════════════════════════════════
-- VERIFICATION — run these after setup to confirm tables exist:
--
--   SELECT * FROM public.bookings LIMIT 5;
--   SELECT * FROM public.contact_messages LIMIT 5;
--
-- ═══════════════════════════════════════════════════════════════
