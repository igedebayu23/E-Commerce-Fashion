# Admin Web Agent Guidelines (SvelteKit 2)

## 1. Current State (Source of Truth)
- **Framework**: SvelteKit 2.
- **Routing Hierachy**: Uses **Route Groups** to isolate layouts:
    - **`(dashboard)`**: Contains `analytics`, `categories`, `orders`, and `products`. 
    - **`(auth)`**: Contains `login` and `logout`.
- **Naming Conventions**:
    - **`features/products`**: Domain logic for catalog management uses the `products` name (not catalogue).
- **Styling**: All CSS files are centralized in `src/styles/`. `globals.css` handles base styles, `admin.css` handles dashboard-specific UI.
- **Data Layer**: `src/lib/api/` is modularized into `products.ts`, `orders.ts`, and `analytics.ts`. `DashboardAPI` in `dashboard.ts` orchestrates these for the overview page.
- **Auth Implementation**: Logout is handled via `lib/auth/session.ts` and triggered by the `/logout` route.

## 2. Architectural Mandates
- **Headless First**: No direct database access. Use `DashboardAPI` or domain clients in `+page.server.ts`.
- **Modular Loaders**: loaders should remain thin, delegating complex data logic to the `lib/api` layer.
- **Path Aliases**: Strictly use `@components`, `@features`, `@styles`, `@lib`, and `@/`.
- **Cookie Policy**: SvelteKit 2 requires `path: '/'` for all cookie operations.

## 3. Directory Map
- `routes/(dashboard)/`: Protected UI.
- `routes/(auth)/`: Identity UI.
- `features/`: `analytics`, `products`, `order`.
- `components/`: `atoms`, `molecules`, `organisms`.
- `lib/api/`: Dedicated API clients calling Gateway (:8000).
- `lib/auth/`: Session management.
- `styles/`: Global and local CSS.

---
*Violation of these standards will lead to rejected pull requests.*
