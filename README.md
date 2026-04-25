# Oulad Chmicha V2

Site public + back-office operations IA (mobile-first) pour Laurent.

**UI de reference (hero v12)** : voir `design-reference/` (capture + `VERSION.txt`). Toute modification visible du hero doit etre validee contre cette reference.

## Modules

- Site public SEO: landing, hebergements, activites, contact.
- Back-office: reservations, calendrier unifie, facturation, clients, operations, templates.
- IA: generation de reponses + diagnostic photo (avec verification humaine obligatoire).
- Sync iCal Airbnb/Booking via cron Vercel.

## Demarrage local

1. Copier `.env.example` vers `.env.local`
2. Remplir les variables (admin, OpenAI, Supabase, iCal)
3. Installer et lancer:

```bash
npm install
npm run dev
```

## Auth admin

- URL: `/admin/login`
- Variables requises: `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Protection par `middleware.ts` sur `/admin/*`

## Supabase

- Schema SQL: `supabase/schema.sql`
- Executer le SQL dans l'editeur Supabase
- Connecter les variables `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Cron de sync calendriers

- Configure dans `vercel.json`
- Endpoint: `/api/ical-sync`
- Variables: `AIRBNB_ICAL_URL`, `BOOKING_ICAL_URL`

## Notes IA

- `OPENAI_API_KEY` active les endpoints `/api/ai/message`, `/api/ai/diagnostic`, `/api/ai-generate`
- Le diagnostic image est une assistance: decision finale toujours humaine.
