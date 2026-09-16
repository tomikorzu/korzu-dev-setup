---
name: strapi-env-config
description: Use when setting up this Strapi project's local environment, adding a new env var, or working with config/*.ts files.
---

# Strapi env config

`config/*.ts` files (`server.ts`, `database.ts`, `admin.ts`, `api.ts`, `middlewares.ts`,
`plugins.ts`) are Strapi's own config layer — each exports a function receiving `{ env }`, a
helper for reading `process.env` with typed defaults (`env("KEY", default)`,
`env.int(...)`, `env.bool(...)`, `env.array(...)`). Read `.env` through this helper, not
`process.env` directly, so every var gets a documented default and the right type coercion.

## The five required secrets

`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` are
real cryptographic material — Strapi uses them to sign sessions, tokens, and encrypt data at
rest. **Never commit real values** (`.env.example` ships them blank on purpose) and **never
reuse the same values across two projects** — a leaked or shared key lets someone forge admin
sessions or API tokens for every project that shares it.

Generate each one freshly:

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

`APP_KEYS` is the only one that takes multiple comma-separated values (generate it 2–4 times and
join with commas) — the rest are single values.

## Adding a new env var

1. Add it to `.env.example` with a comment, blank or with a safe non-secret default.
2. Read it in the relevant `config/*.ts` file via the `env` helper, with an explicit default for
   anything non-secret (see `config/database.ts`'s `DATABASE_*` vars for the pattern).
3. Document it in this project's `CLAUDE.md` if a future developer would need to know it exists
   to run the project locally.
