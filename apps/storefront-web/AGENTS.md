# Storefront Web Agent Guidelines (Next.js 15)

## 1. Instruksi dan Panduan

Dokumen ini adalah panduan fundamental untuk semua agen AI dan pengembang yang bekerja pada aplikasi `storefront-web`. 

### Arsitektur: Headless First
- **Zero Direct DB Access**: Dilarang keras mengimpor Prisma, Supabase SDK langsung, atau klien basis data lainnya. Semua data harus diambil melalui API Gateway.
- **Stateless Communication**: Front-end tidak menyimpan *state* bisnis yang persisten. Percayakan logika bisnis pada API Gateway.
- **Authentication**: JWT dikelola secara terpusat oleh Gateway dan disimpan sebagai **httpOnly cookie**. Jangan pernah menyimpan token di `localStorage`.

### Next.js 15 & React
- **App Router**: Gunakan konvensi App Router (`app/`).
- **Data Fetching**: Manfaatkan `async` Server Components. Ingat bahwa pada Next.js 15, `fetch` secara default bersifat `no-store` (tidak di-*cache*). Gunakan `cache: 'force-cache'` hanya untuk data statis yang jarang berubah.
- **Error Handling**: Wajib menyediakan file `error.tsx` dan `not-found.tsx` untuk degradasi tampilan yang anggun.
- **Server Actions**: Letakkan semua Server Actions di dalam `src/lib/actions/`. Mereka harus memanggil klien di `lib/api/`, bukan melakukan akses database langsung.

### Standar UI/UX
- **Editorial Design Language**: Gunakan tipografi yang besar, berani, dan berikan ruang kosong (whitespace) yang luas untuk menciptakan kesan premium dan editorial.
- **Micro-interactions**: Gunakan `framer-motion` untuk transisi halaman yang mulus dan interaksi elemen (hover, tap, animasi gelombang/wave).
- **Feedback Visual**: Berikan umpan balik yang jelas pada setiap aksi pengguna (misalnya, status *loading* pada tombol, pesan error/sukses yang elegan).
- **Aksesibilitas**: Pastikan kontras warna memadai dan navigasi keyboard berfungsi pada elemen interaktif.

### Styling & Imports
- **Sentralisasi CSS**: Seluruh file `.css` dan `.module.css` wajib diletakkan di `src/styles/`. Dilarang menempatkan file gaya di dalam folder komponen atau fitur.
- **Absolute Imports**: Selalu gunakan alias `@/` (contoh: `import { X } from "@/components/atoms/X"`). Hindari *relative import* yang terlalu dalam (`../../../`).

---

## 2. Kondisi Saat Ini (Source of Truth)

Berikut adalah peta struktur sistem pada `storefront-web` saat ini:

- **Framework**: Next.js 15 (App Router).
- **Struktur Direktori Utama**:
  - `src/app/`: File *routing*, layout, dan metadata.
  - `src/features/`: Logika dan komponen spesifik domain bisnis (`auth`, `catalogue`, `checkout`).
  - `src/components/`: Komponen antarmuka yang dapat digunakan ulang.
    - `atoms/`: Elemen UI dasar (tombol, input).
    - `animations/`: Komponen visual/gerak kompleks (Marquee, Wave).
    - `layout/`: Struktur global (Navbar, Footer).
    - `sections/`: Blok halaman penuh (Hero, About).
  - `src/styles/`: Pusat penyimpanan semua *stylesheet*.
  - `src/context/`: Provider React Context (`AuthContext`, `CartContext`, `ProfileDataContext`).
  - `src/lib/api/`: Pusat klien pemanggilan API.

- **Data Layer (`src/lib/api/`)**:
  Berisi klien *fetch* murni yang diarahkan ke API Gateway (Port 8000). Terdiri dari: `account.ts`, `auth.ts`, `cart.ts`, `catalogue.ts`, `orders.ts`, dan `shipping.ts`. Seluruh panggilan di sini sudah diatur untuk mengirimkan *credential* (cookie).

- **Ejaan & Konvensi Nama**:
  Menggunakan standar bahasa Inggris British untuk katalog (**`catalogue`**), yang tercermin pada penamaan rute `/catalogue` dan folder `features/catalogue`.
