# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website profil + sistem PPDB (Penerimaan Peserta Didik Baru) untuk **Pesantren Al Kautsar**. Terdiri dari dua bagian terpisah:

- **Frontend** — React + Vite + Tailwind CSS v4 (root directory)
- **Backend** — Node.js + Express (di folder `backend/`)

Keduanya harus dijalankan secara bersamaan saat development.

## Commands

### Frontend (root)
```bash
npm run dev        # dev server di http://localhost:5173
npm run build      # build production ke dist/
npm run lint       # ESLint
npm run preview    # preview build production
```

### Backend (`backend/`)
```bash
cd backend
npm run dev        # nodemon (auto-restart) di http://localhost:3001
npm start          # node biasa (tanpa auto-restart)
```

Tidak ada test suite. Tidak ada database migration script — schema dikelola langsung di Supabase dashboard.

## Architecture

### Frontend → Backend communication
Semua request API melalui `src/utils/api.js` (`apiFetch`). Fungsi ini:
- Menambahkan header `ngrok-skip-browser-warning: true` secara otomatis
- Membaca base URL dari `VITE_API_URL` di `.env` (kosong = pakai Vite proxy)

Saat development, Vite proxy (`vite.config.js`) meneruskan `/api/*` ke `http://localhost:3001`. Jadi **jangan ubah** `VITE_API_URL` saat dev lokal — biarkan kosong.

### Backend API Routes
| Method | Path | Auth | Keterangan |
|--------|------|------|------------|
| POST | `/api/admin/login` | — | Login admin, return JWT |
| POST | `/api/pendaftaran` | — | Submit formulir PPDB (publik) |
| GET | `/api/pendaftaran` | JWT | List semua pendaftar |
| GET | `/api/pendaftaran/:id` | JWT | Detail satu pendaftar |

Auth menggunakan Bearer token JWT di header `Authorization`. Token disimpan di `localStorage("admin_token")` di frontend.

### File Upload
Upload file (foto santri & bukti transfer) menggunakan **Supabase Storage**, bukan disk lokal. Multer dikonfigurasi dengan `memoryStorage()` — file tidak pernah ditulis ke disk. Setelah upload ke Supabase, URL publik permanen disimpan di database PostgreSQL.

- Bucket: `ppdb` (public)
- Folder: `foto_santri/`, `bukti_transfer/`
- Max file size: 5MB
- Format: JPG, PNG, PDF

### Database
PostgreSQL di Supabase (connection pooler, port 6543). Konfigurasi koneksi di `backend/db.js`. Tabel utama: `pendaftaran` — kolom lengkap ada di `backend/routes/pendaftaran.js` (lihat INSERT query).

Nomor pendaftaran format: `PPDB-2027-XXXXX`. `generateNomor()` menggunakan LIKE query untuk mencari nomor terakhir dan increment — **bukan** COUNT, karena COUNT berdasarkan tanggal akan selalu 0 jika data lama.

### Admin Panel
- Route: `/admin/login`, `/admin/dashboard`, `/admin/santri/:id`
- Admin routes tidak pakai `MainLayout` (tidak ada navbar/footer)
- `ProtectedRoute` cek `localStorage("admin_token")`, redirect ke `/admin/login` jika tidak ada
- Kredensial admin disimpan di `backend/.env` (`ADMIN_USERNAME`, `ADMIN_PASSWORD`)

### Warna & Desain
- Primary color: `#284061` (biru tua pesantren) — dipakai di seluruh halaman publik dan formulir
- Admin panel: Tailwind default (green-700 untuk tombol, gray-50 untuk background)

## Environment Variables

### Frontend (`.env` di root)
```
VITE_GA4_ID=        # Google Analytics 4 Measurement ID
VITE_API_URL=       # Kosong saat dev (pakai Vite proxy). Isi URL backend saat deploy terpisah.
```

### Backend (`backend/.env`) — JANGAN COMMIT
```
PORT=3001
DB_HOST=           # Supabase pooler host
DB_PORT=6543
DB_NAME=postgres
DB_USER=           # postgres.xxxxx
DB_PASSWORD=
FRONTEND_URL=      # Comma-separated: http://localhost:5173,https://domain.com
SUPABASE_URL=      # https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=  # Service role key (bukan anon key)
ADMIN_USERNAME=
ADMIN_PASSWORD=
JWT_SECRET=
```

Template ada di `backend/.env.example`.

## Key Files

- `src/utils/api.js` — wrapper fetch, tambahkan header di sini kalau perlu
- `src/utils/analytics.js` + `src/hooks/usePageTracking.js` — Google Analytics 4
- `src/utils/constants.jsx` — konstanta global (font, dll)
- `src/components/common/Reveal.jsx` — animasi scroll (dipakai di banyak section)
- `backend/middleware/auth.js` — JWT middleware untuk GET routes
- `backend/supabase.js` — Supabase client (menggunakan service role key)
