---
name: template-authoring
description: Use when adding a new template (Backend, Mobile, CMS, ...) or editing an existing one (templates/web) in this CLI repo — how a template is structured, how conditional variants work, and how to wire it into the CLI.
---

# Authoring a template

A template under `templates/<name>/` is a real, complete, independently runnable project — not
a set of snippets. It ships its own `package.json`, lint/test/build config, `CLAUDE.md`, and
`.claude/skills/`, because a scaffolded copy of it *is* someone's actual new project.

## Structure

```
templates/<name>/
  ...                    # the template's normal files, exactly as they'd look in a real project
  package.json           # real, valid, runnable — "name" is a placeholder, rewritten at scaffold time
  CLAUDE.md               # this template's own conventions
  .claude/skills/*        # this template's own skills — ships into the scaffolded project as-is
  _variants/<name>/       # optional overlay(s), copied ONLY when a condition in resolveDependencies.ts says so
    package.json.fragment.json   # deps to merge into the copied package.json, if the variant adds any
    src/... (or wherever the variant's files belong, mirroring the base template's own layout)
```

`_variants/` is skipped by the base copy (`copyTemplateDir`'s default `skipDirs`) — a generator
(`scaffoldStandalone.ts`/`scaffoldMonorepo.ts`) copies the chosen variant explicitly afterward,
overlaying it on top of the base.

## Adding a brand-new template

1. Build it as a real project first (own package.json, own tooling) — get it working standalone
   before wiring it into the CLI at all.
2. Add its own `.gitignore`, `biome.json` (or equivalent), test config, `CLAUDE.md`, and
   `.claude/skills/` — copy the shape from `templates/web`, not its content.
3. Add its own `pnpm-workspace.yaml` (just `packages: ["."]`) at the template's root. Without
   it, `pnpm install` run inside the template gets absorbed into *this repo's* workspace (finds
   the outer `pnpm-workspace.yaml`, runs the outer `prepare` script, etc.) instead of installing
   the template on its own. `copyTemplateDir` already skips this filename by default — it must
   never end up in a scaffolded project.
4. Add the layer to `Layer` and `LAYER_TEMPLATE_DIR` in `src/types.ts`, then add it to
   `AVAILABLE_LAYERS` **only once the template is actually finished** — that array is what makes
   the CLI offer it as a prompt option.
5. Add a `template-<name>` job to `.github/workflows/ci.yml` (copy the `template-web` job,
   change `working-directory`).
6. If the template needs conditional files based on other choices (like `templates/web`'s MobX
   variant, added only when Backend=GraphQL), put them under `_variants/<condition>/` and wire
   the condition into `resolveDependencies.ts` — don't special-case it inside
   `scaffoldStandalone.ts`/`scaffoldMonorepo.ts` beyond the existing `if (needsX)` pattern.

## Tokens and substitution

`copyTemplateDir` strips `.tmpl` from filenames it copies and replaces `{{PROJECT_NAME}}` /
`{{PROJECT_NAME_PASCAL}}` in their contents. Use `.tmpl` for things like a README title or an
app config's `name`/`slug` field. **Don't** use it for `package.json`'s `"name"` field — that one
field gets rewritten by `setPackageName()` after the copy (a targeted JSON edit is more robust
than text substitution for the one file every single scaffold touches).

## pnpm workspace pitfalls when a template needs a different tool ecosystem (e.g. Metro/React Native)

`templates/_monorepo-root/.npmrc` and `pnpm-workspace.yaml` carry non-obvious fixes for running a
React Native/Metro-based template (Mobile) alongside a different React major (Web) in the same
pnpm workspace. If you add another template with its own bundler/toolchain (a second Metro-based
template, or anything with similarly aggressive phantom-dependency assumptions), re-read these
before copying the pattern blindly — they're specific fixes for specific failures, not general
monorepo hygiene:

- **pnpm's `.pnpm/node_modules/` internal hoist slot is a single shared, ambiguous location.**
  When two apps need different major versions of the *same* package (`@types/react` 18 vs 19),
  whichever one pnpm hoists there "wins" and silently leaks into the other app's typecheck —
  usually surfacing as a bizarre structural type error, not a version-mismatch error. Fix:
  `hoist-pattern[]=!<pkg>` in `.npmrc` to exclude just that package from the ambiguous slot, and
  make sure every app that needs it declares it as its own direct dependency (not relying on
  hoisting at all) so pnpm resolves a version-correct copy into that app's own `node_modules`.
- **Jest's/Metro's stock `transformIgnorePatterns` assumes a flat `node_modules/<pkg>/` layout.**
  Under pnpm's real on-disk layout (`node_modules/.pnpm/<pkg>@<version>/node_modules/<pkg>/`), the
  default regex used by `react-native`/`jest-expo` presets can false-positive-match on the `.pnpm/`
  segment and leave RN's own Flow-syntax source untransformed (`SyntaxError: Unexpected identifier`
  in `@react-native/js-polyfills` or similar). Fix: override `transformIgnorePatterns` with the
  same package list but a leading `.*` inside the negative lookahead
  (`"node_modules/(?!.*(react-native|@react-native|expo|...))"`) so it matches regardless of how
  many `node_modules/` segments precede the real package.
- **Packages that phantom-depend on a peer without declaring it** (`@expo/metro-config` importing
  `metro-cache`, `@expo/cli`/`expo-router` importing `react`/`react-dom` for static export) only
  resolve at all via a hoisted copy — excluding them from hoisting breaks them outright with
  "Cannot find module". If the phantom dependency needs to be *version-correct per consuming app*
  (not just present), declare it via `pnpm.packageExtensions` in `pnpm-workspace.yaml` as a
  `peerDependencies` entry on the package that phantom-depends on it — pnpm then resolves it from
  whichever app actually depends on it, instead of from one ambiguous shared copy.
- Diagnose this class of bug by reading the actual resolved path in the stack trace/error (it
  usually names the exact `.pnpm/<pkg>@<version>/` folder), not just the version numbers in
  `package.json` — the declared version and the version actually resolved at runtime can differ
  once hoisting is involved.
- **This isn't unique to React Native.** Adding `templates/cms` (Strapi, which bundles its own
  older `vite` for the admin panel) reproduced the exact same ambiguous-hoist symptom for
  `apps/web`: Vitest's `vite` peer (declared nowhere explicitly — auto-installed by pnpm from the
  peerDependency range) resolved to Strapi's much older `vite` instead of the one Vitest actually
  needs, surfacing as a config type error with no obvious version-mismatch message. Same fix as
  `@types/react`: declare `vite` as an explicit `devDependency` in `templates/web/package.json`
  pinned to a version satisfying Vitest's peer range, removing the ambiguity instead of relying on
  auto-installed peers. **Any time you add a template whose tooling ships its own copy of a
  bundler/runtime that another template also depends on transitively (vite, esbuild, webpack,
  babel, ...), re-run the full monorepo test matrix (`lint`/`typecheck`/`test`/`build` for every
  layer combination that includes the new template) — a phantom/peer collision like this won't
  show up from testing the new template standalone, only from combining it with an existing one.**
