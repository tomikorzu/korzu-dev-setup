---
name: strapi-content-types
description: Use when adding, changing, or removing a Strapi content type in this project (collection types, single types, attributes, relations).
---

# Strapi content types

A content type is defined by its `schema.json` — Strapi's admin UI (Content-Type Builder) can
also generate this, but in this project prefer hand-editing the schema and committing it, so the
shape is reviewable and reproducible from source, matching how `article` is defined.

## Anatomy (mirror `src/api/article/`)

```
src/api/<name>/
  content-types/<name>/schema.json   # attributes, kind (collectionType/singleType), options
  controllers/<name>.ts              # export factories.createCoreController("api::<name>.<name>")
  routes/<name>.ts                   # export factories.createCoreRouter("api::<name>.<name>")
  services/<name>.ts                 # export factories.createCoreService("api::<name>.<name>")
```

The controller/route/service files are one-liners unless you need to override generated
behavior (custom endpoint, extra validation, a computed field) — don't add logic to them
speculatively.

## schema.json conventions

- `info.singularName`/`pluralName` drive the REST path (`/api/<pluralName>`) — keep them
  kebab-case and matching the folder name.
- Turn on `options.draftAndPublish: true` for anything editorial (matches `article`) so content
  can be drafted before going live; leave it off for pure reference/lookup data.
- Use `"type": "uid"` with `targetField` for slugs (see `article.slug`) — Strapi keeps it unique
  and auto-suggests it from the target field in the admin UI, don't hand-roll slug generation.
- Relations go under `attributes` with `"type": "relation"` — always pick REST-facing
  `pluralName`s that read naturally on both sides (`author` on `article`, `articles` on
  `author`), since that's what shows up in the generated API responses.

## After changing a schema

Restart `pnpm dev` — Strapi rebuilds its content-type registry and generated types (under
`types/generated/`, gitignored) on boot, not on file save alone.
