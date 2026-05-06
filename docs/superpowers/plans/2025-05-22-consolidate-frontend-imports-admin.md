# Consolidate Frontend Imports (admin-web) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update imports in `apps/admin-web/src` to use new aliases and a consolidated directory structure.

**Architecture:** Use SvelteKit aliases (`@components`, `@lib`, `@styles`) to simplify import paths and ensure consistency across the admin-web application.

**Tech Stack:** SvelteKit, TypeScript

---

### Task 1: Update config imports

**Files:**
- Modify: Multiple files in `apps/admin-web/src`

- [ ] **Step 1: Replace `$lib/config` with `@lib/api/config`**

Update all `.svelte` and `.ts` files in `src` that import from `$lib/config`.

Files to update (identified by research):
- `apps/admin-web/src/hooks.server.ts`
- `apps/admin-web/src/routes/+page.server.ts`
- `apps/admin-web/src/routes/analytics/+page.server.ts`
- `apps/admin-web/src/routes/categories/+page.server.ts`
- `apps/admin-web/src/routes/categories/[id]/+page.server.ts`
- `apps/admin-web/src/routes/categories/new/+page.server.ts`
- `apps/admin-web/src/routes/login/+page.server.ts`
- `apps/admin-web/src/routes/orders/+page.server.ts`
- `apps/admin-web/src/routes/orders/[id]/+page.server.ts`
- `apps/admin-web/src/routes/products/+page.server.ts`
- `apps/admin-web/src/routes/products/[id]/+page.server.ts`
- `apps/admin-web/src/routes/products/new/+page.server.ts`
- `apps/admin-web/src/routes/products/new/+page.svelte`

### Task 2: Update UploadImage component imports

**Files:**
- Modify: Multiple files in `apps/admin-web/src`

- [ ] **Step 1: Replace `$lib/components/UploadImage.svelte` with `@components/atoms/UploadImage.svelte`**

Files to update (identified by research):
- `apps/admin-web/src/routes/categories/[id]/+page.svelte`
- `apps/admin-web/src/routes/categories/new/+page.svelte`
- `apps/admin-web/src/routes/products/[id]/+page.svelte`
- `apps/admin-web/src/routes/products/new/+page.svelte`

### Task 3: Update UploadImage.svelte internal imports

**Files:**
- Modify: `apps/admin-web/src/components/atoms/UploadImage.svelte`

- [ ] **Step 1: Update supabase import**

Replace `import { supabase } from '$lib/supabase';` with `import { supabase } from '@lib/api/supabase';`.

### Task 4: Create Supabase placeholder

**Files:**
- Create: `apps/admin-web/src/lib/api/supabase.ts`

- [ ] **Step 1: Create a placeholder for supabase client**

```typescript
// Placeholder for supabase client
// This will be properly implemented later
export const supabase = {} as any;
```

### Task 5: Verification

- [ ] **Step 1: Scan for any remaining `$lib/` imports that should be aliases**
- [ ] **Step 2: Ensure all files still parse correctly (optional if no build tool accessible, but check manually)**
