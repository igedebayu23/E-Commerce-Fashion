# API Gateway Agent Guidelines (Express BFF)

## 1. Current State (Source of Truth)
- **Pattern**: **Backend for Frontend (BFF)**.
- **Framework**: Express (targeting Node.js 20+).
- **Routing**: Fully modular hierarchy under `src/routes/`:
    - **`storefront/`**: Endpoints optimized for the consumer app.
    - **`admin/`**: Endpoints optimized for the dashboard.
- **Proxying**: Leverages `http-proxy-middleware` v3. Proxy rules are separated into `src/proxies/` (e.g., `commerce.proxy.ts`, `admin.proxy.ts`).
- **Security Protocols**:
    - **JWT**: Centralized verification in `middlewares/auth.ts`.
    - **Internal Mesh**: Uses `x-internal-key` and `INTERNAL_SERVICE_KEY` for secure service-to-service communication via the gateway.
    - **Validation**: Enforces `Joi` schemas imported from the shared `@novure/contracts` package.

## 2. Structural Mandates
- **Proxy Consistency**: All proxy configurations MUST use the `proxyOptions` factory in `proxies/common.proxy.ts` to ensure consistent cookie and header forwarding.
- **Path Rewriting**: Handle path translations (e.g., `/api/admin/auth` -> `/api/admin/management/auth`) within the proxy definition, not the route handler.
- **Configuration**: Environment variables must be accessed via `config/env.ts`, never `process.env` directly.
- **Envelope Standard**: All responses must follow the `ApiResponse` schema defined in OpenAPI.

## 3. Directory Map
- `config/`: Environment (`env.ts`).
- `src/app.ts`: Express core setup.
- `src/routes/`: Modular BFF endpoint definitions.
- `src/middlewares/`: Auth, Validation, CORS, Error Handling.
- `src/proxies/`: Proxy rules for downstream services.
- `src/utils/`: Helper functions.

---
*The Gateway is the single point of entry and enforcement.*
