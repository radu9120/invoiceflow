# InvoiceFlow – Architecture Overview

This document summarizes the structure, data flow, and key implementation details of the app to help you navigate and extend it quickly.

## Stack

- Framework: Next.js 15 (App Router, server actions), React 19
- Auth: Clerk (@clerk/nextjs) with route protection via middleware
- Data: Supabase (PostgreSQL + RPC) via @supabase/supabase-js
- UI: Tailwind CSS v4, shadcn/ui primitives, Radix UI, lucide-react icons
- DX/analytics: Turbopack in dev, @vercel/analytics, @vercel/speed-insights, zod for validation, react-hook-form

## Project layout

- `app/` – App Router pages (marketing + authed dashboard flows)
- `components/` – UI and feature components (Business, Clients, Invoices, Dashboard, ModalsForms, ui)
- `lib/` – Supabase client, utilities, and server actions under `lib/actions/*`
- `schemas/` – zod schemas for validation and server action types
- `types/` – Shared TypeScript declarations (`index.d.ts`)
- Root config: `next.config.ts`, `tsconfig.json`, `middleware.ts`, `package.json`

## Routing highlights

- Public marketing: `/` (Hero, Features, Pricing, Testimonials), `/contact`, `/help`, `/privacy-policy`, `/cookies`
- Auth: `/sign-in`, `/sign-up` (Clerk components)
- Protected (via middleware):
  - `/dashboard` – aggregates company stats (BusinessGrid, BusinessAvailability)
  - `/dashboard/business` – single business overview (stats, invoices list, activity)
  - `/dashboard/clients` – client management for a business
  - `/dashboard/invoices` – invoices list with filters/pagination
  - `/dashboard/invoices/new` – invoice creation
  - `/dashboard/invoices/success` – success view
  - `/dashboard/analytics` – analytics (currently dummy data)

Middleware rules: public routes include `/`, auth pages, and webhooks; everything else that matches `matcher` is checked for authentication.

## Data model (inferred)

- Tables: `Businesses`, `Clients`, `Invoices`
- RPC: `get_business_stats(business_id)`, `get_all_dashboard_stats(author_id)`
- Entities:
  - Business: id, name, email, address, phone?, vat?, logo?, author
  - Client: id, name, email, address, phone?, business_id
  - Invoice: id, invoice_number, totals, status, dates, items, bill_to, company_details, notes, etc., business_id, author

See `schemas/invoiceSchema.ts` for exact shapes used by forms.

## Data flow

- Client components (e.g., `InvoiceForm`) call server actions in `lib/actions/*`.
- Server actions create a Supabase client via `createSupabaseClient()` and perform inserts/selects or call RPCs.
- After mutations, some actions log activity (`userActivity.actions.ts`) and/or trigger UI revalidation.

Supabase client: created with anon key and an optional `accessToken` callback using Clerk. Ensure your Supabase RLS/policies align with this auth model.

## Validation

- zod schemas in `schemas/invoiceSchema.ts` validate forms:
  - `companySchema`, `billToSchema`, item schema, and `formSchema` (invoice)
- `react-hook-form` + `@hookform/resolvers/zod` used in client components

## Styling & UI

- Tailwind v4 utility classes
- `components/ui/*` contains shared primitives (button, card, input, select, badge, bounded, etc.)
- Feature components compose these primitives into pages

## Environment

Required variables (typically set in `.env.local`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Clerk secrets per @clerk/nextjs setup (publishable + secret keys)

Images: `next.config.ts` whitelists your Supabase storage host for `next/image`.

## How to run

1. Install Node.js 18+ (or latest LTS) and npm/yarn/pnpm.
2. Install deps: `npm install`
3. Dev server: `npm run dev`
4. Build: `npm run build`; Start: `npm run start`

## Notable quirks and improvements

- searchParams typing: some pages type `searchParams` as a Promise and `await` it. Next.js provides a plain object; the extra `await` works but is unnecessary. Consider normalizing to the standard signature.
- Client redirect: `InvoiceForm` calls `redirect()` (server-only) in a client component. Prefer `useRouter().push()` after awaiting the server action, or move the `redirect()` into the server action.
- Supabase counts: `getInvoices()` expects `count` but does not request it. Use `.select('...', { count: 'exact' })` to enable pagination totals.
- Types: `BusinessType.logo?: url | ""` should be `string | URL | undefined` to avoid TS errors.
- Auth + RLS: If relying on Clerk tokens for Supabase RLS, ensure Supabase is configured to validate those JWTs or perform authorization via explicit filters and permissive policies.
- Analytics page: currently uses mock data; wire it to real aggregates when ready.

## Quick references

- Route protection: `middleware.ts`
- Dashboard composition: `app/dashboard/page.tsx` + `components/Dashboard/*`
- Business view: `app/dashboard/business/page.tsx` + `components/Business/*`
- Invoices: list `app/dashboard/invoices/page.tsx`, new `app/dashboard/invoices/new/page.tsx`, success `.../success/page.tsx`
- Clients: `app/dashboard/clients/page.tsx` + `components/Clients/*`
- Server actions: `lib/actions/*.ts`

---

This file is a living guide—update it as features evolve.
