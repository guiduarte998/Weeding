# Implementation Roadmap (Fast Path)

## Phase 1 - Weekend MVP

1. Keep static pages and forms as they are
2. Set up Supabase with `supabase/schema.sql`
3. Verify RSVP saves correctly
4. Deploy to Vercel with env vars

## Phase 2 - Real gifts and admin

1. Integrate Stripe or Mercado Pago checkout
2. Mark gifts as `gifted` when payment webhook confirms
3. Add admin login and internal dashboard

## Phase 3 - Polish

1. Replace all placeholder content and photos
2. Add RSVP confirmation emails and reminder emails
3. Add anti-spam (honeypot or captcha)
4. Add LGPD/privacy text and consent checkbox
