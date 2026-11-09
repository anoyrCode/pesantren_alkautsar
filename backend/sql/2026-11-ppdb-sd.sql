-- PPDB jenjang SD — perubahan tabel `pendaftaran`.
--
-- Jalankan SEKALI di Supabase → SQL Editor, SEBELUM backend versi baru
-- di-deploy. Backend baru memakai kolom-kolom di bawah di setiap INSERT/UPDATE
-- dan di daftar pendaftar, jadi tanpa ini formulir pendaftaran dan dashboard
-- admin akan gagal dengan error 500.
--
-- Aman dijalankan ulang (IF NOT EXISTS / DROP ... IF EXISTS), dan baris lama
-- tidak berubah: semuanya otomatis bertanda jenjang 'MTS_SMA'.

BEGIN;

ALTER TABLE pendaftaran
  ADD COLUMN IF NOT EXISTS jenjang         VARCHAR(10) NOT NULL DEFAULT 'MTS_SMA',
  ADD COLUMN IF NOT EXISTS tanggal_lahir   DATE,
  ADD COLUMN IF NOT EXISTS kelas_tujuan    VARCHAR(10),
  ADD COLUMN IF NOT EXISTS dari_kelas      VARCHAR(10),
  -- Data wali yang lebih lengkap (formulir SD). nama_wali & wa_wali sudah ada.
  ADD COLUMN IF NOT EXISTS alamat_wali     TEXT,
  ADD COLUMN IF NOT EXISTS jk_wali         VARCHAR(20),
  ADD COLUMN IF NOT EXISTS pendidikan_wali VARCHAR(30),
  ADD COLUMN IF NOT EXISTS pekerjaan_wali  VARCHAR(100),
  ADD COLUMN IF NOT EXISTS gaji_wali       VARCHAR(50);

ALTER TABLE pendaftaran DROP CONSTRAINT IF EXISTS pendaftaran_jenjang_chk;
ALTER TABLE pendaftaran
  ADD CONSTRAINT pendaftaran_jenjang_chk CHECK (jenjang IN ('MTS_SMA', 'SD'));

-- Di formulir SD isian-isian ini boleh kosong: calon siswa kelas 1 umumnya belum
-- punya NISN, dan data sekolah asal hanya diisi siswa pindahan. Perintah DROP
-- NOT NULL tidak error kalau kolomnya memang sudah boleh kosong.
ALTER TABLE pendaftaran ALTER COLUMN nisn           DROP NOT NULL;
ALTER TABLE pendaftaran ALTER COLUMN sekolah_asal   DROP NOT NULL;
ALTER TABLE pendaftaran ALTER COLUMN npsn           DROP NOT NULL;
ALTER TABLE pendaftaran ALTER COLUMN alamat_sekolah DROP NOT NULL;

COMMIT;

-- Cek hasilnya (opsional):
--   SELECT jenjang, COUNT(*) FROM pendaftaran GROUP BY jenjang;
--   -- semua baris lama harus muncul sebagai MTS_SMA
