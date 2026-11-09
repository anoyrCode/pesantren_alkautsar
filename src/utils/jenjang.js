// Konfigurasi per jenjang PPDB. Satu-satunya tempat tanggal buka/tutup, alamat
// halaman, dan label jenjang ditulis — hero, timeline, formulir, dan modal
// "belum dibuka" semuanya membaca dari sini, jadi mengganti periode cukup
// satu perubahan.
//
// Tanggal buka juga ada di backend (BUKA_PENDAFTARAN di
// backend/routes/pendaftaran.js). Kalau salah satu diubah, ubah keduanya.
//
// `kode` sama persis dengan nilai kolom `jenjang` di database.

export const JENJANG = {
  MTS_SMA: {
    kode: "MTS_SMA",
    nama: "MTs & SMA",
    ppdb: "/ppdb",
    formulir: "/ppdb/formulir",
    buka: "2026-08-01T00:00:00+07:00",
    tutup: "2026-09-30T23:59:59+07:00",
    bukaTgl: "1 Agustus",
    tutupTgl: "30 September",
    bukaLabel: "1 Agustus 2026",
    periodeLabel: "1 Agustus – 30 September 2026",
    periodeSingkat: "1 Ags – 30 Sep",
    terbuka: "Terbuka untuk lulusan SD/MI dan SMP/MTs.",
    biayaDaftar: "Rp 450.000",
  },
  SD: {
    kode: "SD",
    nama: "SD",
    ppdb: "/ppdb/sd",
    formulir: "/ppdb/sd/formulir",
    buka: "2026-11-15T00:00:00+07:00",
    tutup: "2026-12-31T23:59:59+07:00",
    bukaTgl: "15 November",
    tutupTgl: "31 Desember",
    bukaLabel: "15 November 2026",
    periodeLabel: "15 November – 31 Desember 2026",
    periodeSingkat: "15 Nov – 31 Des",
    terbuka: "Terbuka untuk calon siswa kelas 1 dan siswa pindahan.",
    biayaDaftar: "Rp 300.000",
  },
};

// Kelas 1–6. Nilainya angka-dalam-teks karena itu yang disimpan di database
// (kolom kelas_tujuan & dari_kelas); labelnya dibuat saat ditampilkan.
export const KELAS_SD = ["1", "2", "3", "4", "5", "6"];
export const OPSI_KELAS_SD = KELAS_SD.map((k) => ({ value: k, label: `Kelas ${k}` }));

// Pendaftar SD mengonfirmasi pembayaran ke bagian keuangan lewat WhatsApp,
// terpisah dari nomor Humas.
export const KEUANGAN_SD = {
  nomor: "0812 1618 2992",
  wa: "6281216182992",
  formatDaftar: "PPDB2728_NAMA LENGKAP CALON SANTRI",
  formatUangPangkal: "PPDB2728_REG_NAMA LENGKAP CALON SANTRI",
};

// ── Panel admin ──
// Dashboard pendaftar dipisah per jenjang (satu tab per jenjang), tapi datanya
// tetap satu tabel. Slug ini dipakai di alamat dashboard.
export const SLUG_ADMIN = { MTS_SMA: "mts-sma", SD: "sd" };
export const rutaDashboard = (kode) => `/admin/dashboard/${SLUG_ADMIN[kode] ?? SLUG_ADMIN.MTS_SMA}`;

// Tab dashboard yang terakhir dibuka, supaya "/admin/dashboard" (dan login)
// mendarat di tab yang tadi dipakai, bukan selalu di MTs/SMA. localStorage bisa
// melempar error (mode privat, data situs diblokir), jadi dibungkus.
const KUNCI_TERAKHIR = "admin_dashboard_jenjang";
export function jenjangTerakhir() {
  try {
    const j = localStorage.getItem(KUNCI_TERAKHIR);
    return SLUG_ADMIN[j] ? j : "MTS_SMA";
  } catch {
    return "MTS_SMA";
  }
}
export function simpanJenjangTerakhir(kode) {
  try { localStorage.setItem(KUNCI_TERAKHIR, kode); } catch { /* abaikan */ }
}
