# CareerPilot — Backend

This folder holds the server-side code for CareerPilot (APIs, auth verification,
AI calls, and anything that must NOT run in the browser).

It is intentionally empty for now — drop your backend stack of choice in here
(Spring Boot, Node/Express, Supabase Edge Functions, etc.).

## Why a separate backend?

Some secrets must never ship to the browser:

- Supabase **service_role** key (full database access, bypasses RLS)
- OpenAI API key
- Any third-party API secrets

The frontend only ever uses the **public anon key**. Everything privileged lives
here behind your own endpoints.

## Getting started

1. Copy the env template:

   ```bash
   cp .env.example .env
   ```

2. Fill in the real values (these stay on the server only).

3. Add your framework. A couple of common starting points:

   - **Node + Express**: `npm init -y && npm install express`
   - **Spring Boot**: generate a project at https://start.spring.io
   - **Supabase Edge Functions**: `supabase functions new <name>`

## Suggested structure

```
backend/
├── src/            # your application code
├── .env            # real secrets (gitignored)
└── .env.example    # template, safe to commit
```
