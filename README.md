# Wedding Website v1 Starter

Minimal Next.js + Supabase starter focused on shipping fast:

- Home page with banner, event details and gallery placeholders
- RSVP form that writes into Supabase
- Gift registry UI with checkout placeholder endpoint
- SQL schema for events, RSVPs, gifts and gift orders

## Quick start

1. Install dependencies:
   - `npm install`
2. Create `.env.local` from `.env.example` and fill Supabase keys.
3. In Supabase SQL editor, run `supabase/schema.sql`.
4. Start local server:
   - `npm run dev`
5. Open `http://localhost:3000`

## Project structure

- `app/` - Next.js routes and API routes
- `components/` - UI components
- `lib/` - shared utilities (Supabase client)
- `supabase/schema.sql` - exact SQL for database setup
- `docs/` - roadmap and progress trackers

## Next improvements

- Connect real payments (Stripe or Mercado Pago) in `app/api/gifts/checkout/route.ts`
- Add real admin auth and dashboard
- Move events/gifts from hardcoded arrays to DB fetches on pages
- Upload your own photos to Supabase Storage and swap URLs
