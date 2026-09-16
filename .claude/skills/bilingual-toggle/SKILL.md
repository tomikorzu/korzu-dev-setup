---
name: bilingual-toggle
description: Use when a project only needs two languages (EN/ES) with no localized routes — inline t(en, es) pairs and a floating toggle, instead of next-intl/routing-based i18n.
---

# Bilingual toggle (no routing)

For a two-language site that doesn't need `/es` URLs, SEO-indexed locales, or translation
files — just "let the visitor flip the language" — use this project's built-in pattern instead of
pulling in `next-intl` or similar.

## Pieces

- `LanguageProvider` (`src/modules/shared/providers/LanguageProvider.provider.tsx`) — Context
  holding the current `Language` (`EN`/`ES`), persisted to `localStorage`. Already mounted in
  `App.provider.tsx`. Defaults to `EN` until hydrated (`isHydrated`) to avoid an SSR/client
  mismatch, then resolves to the stored or browser language.
- `useTranslations()` (`src/modules/shared/hooks/useTranslations.hook.ts`) — the hook components
  actually use: `const { t, language, toggleLanguage } = useTranslations();` then
  `t("English copy", "Copia en español")` inline, no translation keys or JSON files.
- `ToggleLanguageFab` — a floating button (bottom/side, hides on scroll) that calls
  `toggleLanguage()`. Drop it once near the root of a page/layout.

## Rules

1. **Every piece of user-facing copy goes through `t(en, es)`**, called inline where the text is
   used — don't hardcode a string in one language once this pattern is in the project.
2. **Don't introduce `next-intl`, routed locales, or `messages/*.json`** for a project using this
   pattern — it's the alternative to that, for when routed/SEO-indexed locales aren't needed. If
   a project later needs localized URLs or per-locale SEO, that's a different, bigger decision —
   ask before mixing the two approaches.
3. **`t()` always returns the English string until `isHydrated` is true** — this is intentional
   (matches server-rendered HTML), not a bug to "fix" by reading `language` earlier.
