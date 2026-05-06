# API Gateway Agent Guidelines (Express BFF)

## 1. Instruksi dan Panduan

Dokumen ini adalah mandat fundamental untuk pengembangan pada `api-gateway`. Gateway ini bertindak sebagai penjaga gerbang tunggal dan pengatur lalu lintas ke seluruh ekosistem *backend*.

### Arsitektur: Backend for Frontend (BFF)
- **Separation of Concerns**: Gateway harus memisahkan jalur endpoint untuk *storefront* (konsumen) dan *admin* (manajemen) secara eksplisit.
- **Single Point of Entry**: Semua permintaan dari klien eksternal wajib masuk melalui port Gateway (8000). Jangan pernah mengekspos layanan internal langsung ke internet.
- **Proxy Configuration**: Selalu gunakan fungsi pabrik (`factory function`) `proxyOptions` yang ada di `proxies/common.proxy.ts` untuk memastikan penerusan header (termasuk JWT dan Internal Key) konsisten ke layanan hilir (*downstream services*).

### Keamanan & Validasi
- **Autentikasi Terpusat**: Gunakan middleware `authenticateJWT` untuk melindungi rute yang sensitif. Gateway bertanggung jawab untuk memverifikasi token dan meneruskan data pengguna (via header `x-user-id` dan `x-user-role`) ke backend.
- **Internal Service Mesh**: Lindungi jalur komunikasi antar-layanan internal (tanpa sesi pengguna) dengan memvalidasi header `x-internal-key` terhadap variabel `INTERNAL_SERVICE_KEY`.
- **Validasi Payload**: Lakukan validasi ketat pada *body*, *query*, dan parameter permintaan menggunakan skema `Joi`. Import skema standar ini dari paket bersama `@novure/contracts`.

### Manajemen Rute
- Gunakan `express.Router()` secara modular. Hindari penumpukan logika rute di `index.ts` atau `app.ts`.
- Terapkan *path rewriting* di tingkat proxy (misalnya, mengubah `/api/admin/auth` menjadi rute internal layanan admin) agar *endpoint* eksternal tetap rapi.

---

## 2. Kondisi Saat Ini (Source of Truth)

Berikut adalah implementasi sistem pada `api-gateway` saat ini:

- **Versi Layanan**: API Gateway v2.1.0 (Modular BFF Architecture).
- **Core Setup (`src/app.ts`)**: Konfigurasi inti Express, pengaturan CORS yang terikat pada `ALLOWED_ORIGINS`, *parser body*, dan *health check* menyeluruh (mem-ping semua layanan hilir).
- **Hierarki Rute (`src/routes/`)**:
  - `storefront/`: Memiliki sub-rute `auth.routes.ts`, `cart.routes.ts`, `catalog.routes.ts`, dan `checkout.routes.ts`.
  - `admin/`: Memiliki sub-rute `management.routes.ts`, `orders.routes.ts`, `products.routes.ts`, dan `users.routes.ts`.
- **Konfigurasi Proxy (`src/proxies/`)**:
  - `common.proxy.ts`: Konfigurasi dasar untuk *request fixing* dan penerusan *cookie/header*.
  - `commerce.proxy.ts`, `admin.proxy.ts`, `geography.proxy.ts`: Definisi proxy spesifik untuk tiap target layanan. Menyertakan mekanisme perombakan jalur (*path rewriting*) cerdas (contoh: `adminAuthProxy` yang merutekan login admin ke `/api/admin/management/auth` di `admin-service`).
- **Middleware Terpusat (`src/middlewares/`)**:
  - Berisi `auth.ts` (menangani otentikasi JWT dan pengecekan kunci internal) serta `validate.ts` (middleware validasi Joi).
- **Konfigurasi Lingkungan (`config/env.ts`)**: Semua variabel lingkungan dikonsolidasikan dan diekspor dengan tipe yang aman dari file ini.
