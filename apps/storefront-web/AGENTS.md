# Storefront Web Agent Guidelines (Next.js 15)

## 1. Current State (Source of Truth)
- **Framework**: Next.js 15 (App Router).
- **Core Structure**: The legacy `frontend/` directory has been deleted. All contents are consolidated directly under `src/`.
- **Naming Conventions**:
    - **`features/catalogue`**: Uses the `catalogue` (British) spelling consistently.
    - **`components/animations`**: Legacy `components/features` was renamed here to avoid domain confusion.
- **Styling**: All `.css` and `.module.css` files are centralized in `src/styles/`. Components and features are "style-less" in their local folders.
- **Data Layer**: `src/lib/api/` contains modular, pure fetch clients (`auth.ts`, `cart.ts`, `catalogue.ts`, `account.ts`, `orders.ts`, `shipping.ts`). 
- **Authentication**: JWT is stored only in **httpOnly cookies**. No `localStorage` is used for sensitive data.

## 2. Architectural Mandates
- **Pure Headless**: Never import Prisma or database clients. All data must flow through the API Gateway (Port 8000).
- **Absolute Imports**: Always use the `@/` alias (e.g., `import { X } from "@/components/atoms/X"`).
- **Server Actions**: Located in `src/lib/actions/`. They must delegate business logic to the `lib/api` clients.
- **Credentials**: Every fetch call MUST include `credentials: "include"`.

## 3. Directory Map
- `app/`: Routes, Layouts, Metadata.
- `features/`: Business domain logic (`auth`, `catalogue`, `checkout`).
- `components/`: 
    - `atoms/`: Primitive UI.
    - `animations/`: Motion components (Waves, Sliders).
    - `layout/`: Navbar, Footer.
    - `sections/`: Page building blocks.
- `styles/`: Central CSS repository.
- `context/`: React Context providers.
- `lib/api/`: Pure API Gateway clients.

---
*Architectural integrity is the highest priority.*
