# Deployment Runbook

## 1) Vercel Project

1. Importer le dossier `web` dans Vercel.
2. Ajouter le domaine `farmouladchmicha.com`.
3. Configurer les variables d'environnement de `.env.example`.

## 2) Variables d'environnement requises

Côté Vercel (Project Settings → Environment Variables) :

- `ADMIN_EMAIL` — email admin pour le back-office.
- `ADMIN_PASSWORD` — mot de passe admin (rotation régulière conseillée).
- `ADMIN_SESSION_SECRET` — secret aléatoire ≥ 32 caractères pour signer le cookie de session admin (HMAC-SHA256). Générer avec `openssl rand -hex 32`.
- `CRON_SECRET` — token aléatoire (≥ 32 chars) que Vercel Cron envoie en `Authorization: Bearer …` pour appeler `/api/ical-sync`. **Sans retour ligne ni espaces** en trop (valeur trim côté app). Obligatoire en production pour que le cron passe le middleware.
- `AIRBNB_ICAL_URL` / `BOOKING_ICAL_URL` — flux iCal des plateformes.
- `OPENAI_API_KEY` — pour l'assistant IA.
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — branchement Supabase (optionnel, fallback données locales).
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (optionnels) — relais des leads `/api/contact` par email.

**Notes sécurité:** cookie admin prod = `__Host-oc_admin_session` (HTTPS, `Secure`, `HttpOnly`) ; ancien nom `oc_admin_session` encore accepté le temps de se reconnecter. Login : vérif mot de passe en temps comparable + délai minimum de réponse. En-têtes (`Permissions-Policy`, `X-Frame-Options`, etc.) dans `next.config.ts`.

## 3) Supabase

1. Créer un projet Supabase.
2. Exécuter `supabase/schema.sql`.
3. Récupérer URL + Anon Key et les ajouter à Vercel.

## 4) iCal Sync

1. Copier les URLs iCal Airbnb et Booking dans `AIRBNB_ICAL_URL` / `BOOKING_ICAL_URL`.
2. Vérifier `vercel.json` — cron quotidien `0 8 * * *` (08:00 UTC) sur `/api/ical-sync`.
3. Vercel Cron envoie automatiquement `Authorization: Bearer $CRON_SECRET` ; le middleware autorise cet appel sans cookie admin.

## 5) IA

1. Ajouter `OPENAI_API_KEY`.
2. Tester `/api/ai/message` et `/api/ai/diagnostic` (depuis l'admin connecté).

## 6) Validation finale

1. Ouvrir `/admin/login` puis se connecter.
2. Vérifier les modules admin et le calendrier mensuel.
3. Vérifier `sitemap.xml` et `robots.txt`.
4. Soumettre un lead de test via le formulaire `/contact` et vérifier la réception (logs Vercel ou inbox `CONTACT_TO_EMAIL`).
5. Lancer un Lighthouse mobile (objectif SEO/perf élevés).
