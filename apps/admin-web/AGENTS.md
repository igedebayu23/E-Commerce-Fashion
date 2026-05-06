# Admin Web Agent Guidelines

This document serves as the foundational mandate for all AI agents working on the `admin-web` application.

## 1. Architectural Philosophy: Headless First
The admin dashboard is a **purely decoupled "Head"**. 
- **Zero Direct DB Access**: Never import Prisma or any database client. All data must come from the API Gateway or internal service URLs (in server-side contexts).
- **Stateless Backend Communication**: Rely on the API Gateway for business logic.
- **Secure Auth**: Authentication is managed via sessions/cookies. Always use `fetch` with appropriate credentials.

## 2. Directory Structure
Maintain the following standardized structure within `src/`:

- **`routes/`**: SvelteKit File-based Routing.
- **`features/`**: Domain-driven modules (e.g., `products`, `order`, `customer`). Contains logic and complex components related to that domain.
- **`components/`**: UI building blocks.
    - **`atoms/`**: Primitive, generic UI elements (e.g., `UploadImage.svelte`).
    - **`molecules/`**: Compound UI elements.
    - **`organisms/`**: Complex UI structures.
    - **`layout/`**: Global UI structures.
- **`styles/`**: Centralized CSS files. No `.css` files allowed inside `components/` or `features/`.
- **`lib/`**: Shared utilities.
    - **`api/`**: API clients and configuration.
    - **`auth/`**: Authentication logic.
    - **`utils/`**: General helper functions.
- **`types/`**: Shared TypeScript definitions.

## 3. Styling Mandates
- **Centralization**: All style files must be in `src/styles/`.
- **Imports**: Always use the `@styles/` alias.

## 4. Import Conventions
- Use aliases for all internal imports:
    - `@/` -> `src/`
    - `@components/` -> `src/components/`
    - `@features/` -> `src/features/`
    - `@styles/` -> `src/styles/`
    - `@lib/` -> `src/lib/`

## 5. Security
- **No SDK Bypasses**: Do not use direct Supabase/Firebase/Database SDKs in the frontend. Everything must be routed through the API layer.

---
*Failure to follow these rules constitutes an architectural violation.*
