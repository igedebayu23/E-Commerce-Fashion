# Admin Web Agent Guidelines (SvelteKit 2)

## 1. Instruksi dan Panduan

Dokumen ini adalah panduan fundamental untuk semua agen AI dan pengembang yang bekerja pada aplikasi `admin-web`.

### Arsitektur: Headless First
- **Zero Direct DB Access**: Dilarang mengimpor klien basis data (Prisma) di frontend. Semua data wajib diambil dari API Gateway atau layanan internal (via URL Gateway).
- **Modular Data Fetching**: Jaga agar fungsi `load` di `+page.server.ts` tetap tipis. Delegasikan logika pemanggilan data yang kompleks ke lapisan klien API di `src/lib/api/`.

### SvelteKit 2
- **Route Groups**: Gunakan grup rute berpusat layout seperti `(dashboard)` dan `(auth)` untuk memisahkan area publik dan privat tanpa mempengaruhi struktur URL.
- **Cookies**: Saat mengatur atau menghapus cookie di SvelteKit 2, selalu tentukan secara eksplisit parameter `path: '/'`.
- **State Management**: Gunakan Svelte 5 Runes (`$state`, `$derived`, `$effect`, `$props`) sebagai standar reaktivitas baru.

### Standar UI/UX
- **Kepadatan Data (Data Density)**: Antarmuka admin harus mampu menyajikan informasi yang padat namun tetap rapi dan mudah dibaca (misal, tabel transaksi).
- **Konsistensi Komponen**: Gunakan komponen standar seperti `InsightCard` untuk metrik dan `StatusPill` untuk label status transaksi.
- **Visual Hierarchy**: Gunakan tipografi yang kuat (ukuran, ketebalan) untuk membedakan angka metrik utama, label, dan informasi pendukung.
- **Minimalist Analytics**: Tampilkan diagram dan grafik yang bersih, terfokus pada tren utama (misalnya `SalesVelocityChart`).

### Struktur & Alias
- Patuhi pola *Atomic Design* untuk komponen UI (`atoms`, `molecules`, `organisms`).
- Kelompokkan logika bisnis ke dalam folder `features/`.
- **Sentralisasi CSS**: Letakkan semua file gaya di `src/styles/`.
- **Path Aliases**: Selalu gunakan alias resmi SvelteKit yang telah dikonfigurasi: `@components`, `@features`, `@styles`, `@lib`, dan `@/`.

---

## 2. Kondisi Saat Ini (Source of Truth)

Berikut adalah gambaran sistem pada `admin-web` saat ini:

- **Framework**: SvelteKit 2 (dengan dukungan fitur Svelte 5).
- **Hierarki Rute (`src/routes/`)**:
  - `(auth)/`: Menangani alur identitas (`login`, `logout`).
  - `(dashboard)/`: Rute yang dilindungi. Mencakup `analytics`, `categories`, `orders`, dan `products`.
- **Struktur Komponen & Fitur**:
  - `src/features/`: Logika domain bisnis (`analytics`, `customer`, `order`, `products`). *Catatan: Berbeda dengan storefront, admin menggunakan ejaan `products`.*
  - `src/components/`: Antarmuka modular (termasuk `StatusPill.svelte` di `atoms`, `InsightCard.svelte` di `molecules`).
- **Data Layer (`src/lib/api/`)**:
  Klien API modular yang berkomunikasi dengan API Gateway. Berisi: `analytics.ts`, `config.ts`, `dashboard.ts` (orkestrator), `orders.ts`, `products.ts`, dan *placeholder* `supabase.ts`.
- **Manajemen Sesi**:
  Logika logout ditangani di `lib/auth/session.ts` dan tereksekusi pada *endpoint* `/api/logout/auth-logout.handler.ts` (yang di-mount di rute `(auth)/logout`).
- **Styling**: Tersentralisasi di `src/styles/` dengan pembagian utama `globals.css` (reset & utilitas) dan `admin.css` (gaya spesifik dashboard).
