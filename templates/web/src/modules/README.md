# Modules

- `shared/` — anything reusable across features: `components`, `hooks`, `utils`, `constants`,
  `types`, `providers`. Check here before writing something new.
- Everything else (e.g. `Home/`) is a feature module: composes shared pieces into a screen, holds
  logic specific to that feature only.

## Naming conventions

- Components: `<Name>/<Name>.component.tsx`
- Hooks: `use<Name>.ts`
- Utils: `<name>.util.ts`
- Providers: `<Name>.provider.tsx`
- Constants: `<Name>.constant.ts`

## Rules

- If it's generic (not tied to one feature's business logic), it belongs in `shared/`, not in a
  feature module.
- New MUI components follow the theme system — props/variants over `sx`, tokens over hardcoded
  values. See `.claude/skills/` (`reuse-shared-components`, `mui-variants-no-sx`,
  `theme-tokens-no-hardcoded-colors`).
