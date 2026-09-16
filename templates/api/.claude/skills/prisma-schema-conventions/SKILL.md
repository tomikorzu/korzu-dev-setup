---
name: prisma-schema-conventions
description: Use when adding or changing a model in prisma/schema.prisma, or writing a migration, in this backend.
---

# Prisma: schema and migrations

## Rules

1. **`prisma/schema.prisma` is the single source of truth for the database shape.** Never
   create a table by hand or via a second tool.
2. **Every schema change goes through `prisma migrate dev --name <what-changed>`**, which
   generates and commits a new migration file. Never hand-edit a file under
   `prisma/migrations/` — including the baseline `20250101000000_init` migration.
3. **Run `prisma generate` after any schema change** so `@prisma/client`'s types match — do
   this before typechecking, it's not automatic on save.
4. **IDs are UUIDs (`@id @default(uuid())`)**, not auto-increment integers — keep new models
   consistent with `Item`.
5. **A service method never returns a raw Prisma error to the caller.** Prisma throws
   typed errors (e.g. `findUniqueOrThrow` on a missing row) — let Nest's default exception
   filter turn that into the right HTTP/GraphQL error rather than swallowing or re-wrapping it
   unless a specific case needs a custom message.
