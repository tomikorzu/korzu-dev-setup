---
name: env-validation-zod
description: Use when adding a new environment variable to this backend, or reading process.env anywhere in it.
---

# Env vars: zod, parse-or-throw

`src/env.ts` is the only place `process.env` gets read directly. Everywhere else imports `env`
from it.

## Rules

1. **Add a new var to the zod schema in `src/env.ts`**, not just to `.env.example` — an
   undeclared var isn't validated and won't be typed.
2. **`.env.example` documents every var the schema expects**, with a safe placeholder value —
   keep the two in sync.
3. **`import "dotenv/config"` stays the first line of `src/env.ts`.** Unlike the Frontend
   template (Next.js loads `.env` itself), NestJS doesn't — without this line, `.env` is
   silently ignored and only real process env vars (e.g. from Docker/CI) are seen.
4. **Never read `process.env.X` outside `env.ts`.** If a var is missing, the app should fail
   fast at startup with a clear message — that's what the schema's parse-or-throw already does.
