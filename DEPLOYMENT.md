# Deployment Runbook

## 1) Vercel Project

1. Importer le dossier `web` dans Vercel.
2. Ajouter le domaine `farmouladchmicha.com`.
3. Configurer les variables d'environnement de `.env.example`.

## 2) Supabase

1. Creer un projet Supabase.
2. Executer `supabase/schema.sql`.
3. Recuperer URL + Anon Key et les ajouter a Vercel.

## 3) iCal Sync

1. Copier les URLs iCal Airbnb et Booking.
2. Ajouter `AIRBNB_ICAL_URL` et `BOOKING_ICAL_URL`.
3. Verifier `vercel.json` (cron toutes les 15 min).

## 4) IA

1. Ajouter `OPENAI_API_KEY`.
2. Tester `/api/ai/message` et `/api/ai/diagnostic`.

## 5) Validation finale

1. Ouvrir `/admin/login`.
2. Verifier les modules admin.
3. Verifier `sitemap.xml` et `robots.txt`.
4. Lancer un Lighthouse mobile (objectif SEO/perf eleves).
