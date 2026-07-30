# AfroRetro Games — Website

Official website for **AfroRetro Games**, a game hire and event entertainment company based in Kampala, Uganda.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Routing | React Router v7 |
| Backend / DB | Supabase (PostgreSQL) |
| Hosting | Static CDN (Netlify / Vercel / Cloudflare Pages) |
| Styling | Custom CSS (no framework) |

## Project Structure

```
src/
├── App.tsx                  # Root routes + WhatsApp FAB
├── main.tsx                 # Entry point
├── index.css                # Base reset
├── App.css                  # Main global styles
├── Improvements.css         # Mobile, drawer, FAB overrides
├── gamesData.ts             # All 20 game definitions
├── eventConfigs.ts          # All 31 event page configs
├── supabase.ts              # Supabase client + DB helpers
├── BookingContext.tsx        # Global booking state
├── Navbar.tsx               # Desktop dropdown + mobile drawer
├── HomePage.tsx
├── AllGamesPage.tsx
├── BookingPage.tsx
├── PackageBookingPage.tsx
├── ContactPage.tsx
├── EventPage.tsx
├── GalleryPage.tsx
└── NotFoundPage.tsx

supabase/
└── schema.sql               # Full database schema (run this in Supabase SQL Editor)

public/
├── games/                   # 20 game images
├── gallery/                 # Event gallery photos
├── clients/                 # Client logo images
├── banner/                  # Hero slider images
├── testimonials/            # Testimonial screenshots
├── afroretro-logo.png
├── footer-banner.png
├── home.png
└── favicon.svg
```

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Zelvin18/afro-retro-games.git
cd afro-retro-games
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set up the database

Open your [Supabase SQL Editor](https://supabase.com/dashboard) and run the contents of `supabase/schema.sql`. This creates both tables with correct indexes and Row Level Security policies.

### 5. Run the dev server

```bash
npm run dev
```

### 6. Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy this folder to any static host.

## Database Tables

See `supabase/schema.sql` for the full schema.

### `bookings`
Stores all booking requests from the website.

| Column | Type | Notes |
|---|---|---|
| `id` | bigint | Auto-generated primary key |
| `created_at` | timestamptz | Auto-set on insert |
| `package_name` | text | null for individual game bookings |
| `games` | jsonb | Array of `{ id, name }` objects |
| `first_name` | text | |
| `last_name` | text | |
| `phone` | text | |
| `email` | text | |
| `event_date` | date | |
| `event_time` | time | |
| `address` | text | |
| `city` | text | |
| `location_type` | text | |
| `occasion` | text | |
| `guests` | text | Optional |
| `notes` | text | Optional |

### `contact_messages`
Stores messages from the Contact page form.

| Column | Type | Notes |
|---|---|---|
| `id` | bigint | Auto-generated primary key |
| `created_at` | timestamptz | Auto-set on insert |
| `name` | text | |
| `email` | text | Optional |
| `phone` | text | Optional |
| `message` | text | |

## Deployment

The site is a static SPA. Deploy the `dist/` folder to:
- **Netlify** — connect the GitHub repo, set build command to `npm run build`, publish directory to `dist`
- **Vercel** — same setup, framework preset: Vite
- **Cloudflare Pages** — same setup

Make sure to set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in your hosting dashboard.

For client-side routing to work (React Router), configure your host to serve `index.html` for all routes:
- Netlify: add a `public/_redirects` file with `/* /index.html 200`
- Vercel: add a `vercel.json` with rewrites
- Cloudflare Pages: handled automatically

## License

© AfroRetro Games. All rights reserved.
