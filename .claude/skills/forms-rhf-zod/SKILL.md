---
name: forms-rhf-zod
description: Use when building or editing any form in this project — login/signup, settings, search, anything with validation. Enforces react-hook-form + zod as the only form pattern, wired through existing shared input components.
---

# Forms: react-hook-form + zod

`react-hook-form`, `zod`, and `@hookform/resolvers` are dependencies. This is the only form
pattern in the project — no ad-hoc `useState` per field, no manual validation.

## Pattern

1. **Schema first.** Define the shape and validation with `zod`, colocated with the form or in
   `src/modules/shared/schemas` if reused across features:
   ```ts
   const loginSchema = z.object({
     email: z.email(),
     password: z.string().min(8),
   });
   type LoginValues = z.infer<typeof loginSchema>;
   ```
2. **`useForm` + `zodResolver`.**
   ```tsx
   const { control, handleSubmit, formState: { errors } } = useForm<LoginValues>({
     resolver: zodResolver(loginSchema),
     defaultValues: { email: "", password: "" },
   });
   ```
3. **Wire existing shared inputs with `Controller`** — don't rewrite `PasswordInput`,
   `SearchInput`, `TagInput`, etc. They already expose a plain `value`/`onChange` contract, so
   `Controller` is a thin adapter, not a rewrite:
   ```tsx
   <Controller
     name="password"
     control={control}
     render={({ field, fieldState }) => (
       <PasswordInput
         value={field.value}
         onChange={field.onChange}
         error={fieldState.error?.message}
       />
     )}
   />
   ```
4. **Submit** with `handleSubmit(onSubmit)`, `onSubmit` receives already-validated, typed values
   — no re-validation in the handler.

## Rules

- One schema per form, one `useForm`. Don't split a single form's validation across multiple
  local `useState` + manual checks.
- Reuse a schema/type across a form and its submit mutation (see `tanstack-query-data` skill)
  instead of duplicating the shape.
- Error messages come from the schema (`z.string().min(8, "At least 8 characters")`), not
  hardcoded in the component.
- New reusable form inputs still follow `mui-variants-no-sx`: props/variants, not `sx`.
