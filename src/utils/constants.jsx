export const ARABIC_FONT = { fontFamily: "'Noto Naskh Arabic', serif" };
export const GILDA_FONT = { fontFamily: "'Gilda Display', serif" };

export const NAV_LINKS = [
  { id: "beranda", path: "/", label: "Beranda" },
  { id: "tentang", path: "/tentang", label: "Tentang" },
  { id: "kurikulum", path: "/kurikulum", label: "Kurikulum" },
  { id: "kesantrian", path: "/kesantrian", label: "Kesantrian" },
  { id: "galeri", path: "/galeri", label: "Galeri" },
  { id: "ppdb", path: "/ppdb", label: "PPDB" },
];

export const MTS_SUBJECTS = [
  ["Aqidah Akhlaq", 18], ["Al Quran Hadits", 12], ["Fiqih", 4], ["Bahasa Arab", 4],
  ["SKI", 2], ["PPKN", 2], ["IPS", 2], ["IPA", 4], ["Matematika", 4],
  ["Bahasa Indonesia", 2], ["Bahasa Inggris", 3], ["Seni Budaya", 3],
  ["TIK", 2], ["Mutun Tauhid", 6], ["Mutun Hadits", 6],
];

export const SMA_SUBJECTS = [
  ["Aqidah Manhaj", 18], ["Ushul Tafsir", 2], ["Ushul Fiqh", 2], ["Mustholah Hadits", 2],
  ["Balaghoh", 2], ["Qowaid Fiqhiyah", 2], ["Ushul Da'wah", 2], ["Ushul Bida'", 2],
  ["Firoq", 2], ["Tafsir", 2], ["Fiqih", 2], ["Hadits", 2], ["Adab", 2],
  ["Nahwu", 2], ["Shorof", 2], ["Ta'bir", 2], ["Kitabah", 2], ["Faroid", 2],
  ["Matematika Umum", 2], ["Matematika Peminatan", 2], ["Bahasa Inggris", 2],
  ["Fisika", 2], ["Kimia", 2], ["Biologi", 2], ["TIK", 2], ["PPKN", 2], ["Sejarah", 2],
];

// Dipakai formulir publik & form admin. Harus sama persis dengan ENUM.penghasilan
// di backend/routes/pendaftaran.js — kalau berbeda, submit ditolak sebagai tidak valid.
// Perhatikan pemisah rentang memakai en dash (–), bukan tanda hubung.
export const GAJI = [
  "Tidak Berpenghasilan",
  "< Rp 1.000.000",
  "Rp 1.000.000 – 3.000.000",
  "Rp 3.000.000 – 5.000.000",
  "Rp 5.000.000 – 10.000.000",
  "Rp 10.000.000 – 15.000.000",
  "Rp 15.000.000 – 30.000.000",
  "> Rp 30.000.000",
];

export const FAQS = [
  { q: "Siapa saja yang bisa mendaftar di Pesantren Al Kautsar?", a: "Pendaftaran terbuka untuk siswa-siswi muslim yang akan masuk jenjang MTs (lulusan SD/MI) maupun SMA (lulusan SMP/MTs) dan bersedia mengikuti seluruh program kepesantrenan selama 6 tahun." },
  { q: "Apakah ada biaya pendaftaran?", a: "Biaya pendaftaran sebesar Rp 450.000. Calon santri mengisi formulir online, mengunggah dokumen yang diminta, dan melakukan pembayaran biaya pendaftaran." },
  { q: "Apa saja dokumen yang harus dipersiapkan?", a: "Bukti Transfer Registrasi, diunggah dalam format JPG, PNG, atau PDF." },
  { q: "Bagaimana sistem pendidikan di Al Kautsar?", a: "Kami memadukan kurikulum Kemenag dan Kemendikdasmen dengan sistem kepesantrenan 6 tahun. Pembelajaran menggunakan metode Discovery Task berbasis PISA." },
  { q: "Apakah santri bisa pulang ke rumah?", a: "Ya, santri mendapatkan libur 5 hari setiap bulan untuk berbakti kepada orang tua dan melepas rindu dengan keluarga." },
  { q: "Bagaimana sistem keamanan dan pengawasan santri?", a: "Kami menerapkan 3 shift musyrif 24 jam dengan rasio 1:10, didukung 110 CCTV online & offline. Lingkungan pesantren bebas bullying, anti-LGBT, dan dijaga ketat." },
];

// FAQ jenjang SD — disusun dari panduan pendaftaran resmi TA 2027/2028. SD ini
// pulang-pergi (tanpa asrama), jadi jangan menyalin jawaban FAQS di atas yang
// bicara soal asrama, libur 5 hari sebulan, atau musyrif.
export const FAQS_SD = [
  { q: "Siapa saja yang bisa mendaftar di jenjang SD?", a: "Pendaftaran terbuka untuk calon siswa muslim yang akan masuk kelas 1 SD, serta siswa pindahan. Usia calon siswa kelas 1 harus 7 tahun dan terendah 6 tahun, sesuai ketentuan pada bagian persyaratan di halaman ini." },
  { q: "Berapa biaya pendaftaran dan biaya lainnya?", a: "Biaya pendaftaran Rp 300.000. Bagi yang dinyatakan lulus, uang pangkal Rp 6.500.000 (biaya pendidikan selama 6 tahun, sudah termasuk SPP bulan Juli 2027) dan SPP Rp 700.000 per bulan." },
  { q: "Apa yang sudah termasuk dalam SPP bulanan?", a: "SPP bulanan sudah mencakup makan siang, listrik dan air, serta pendampingan dan pengawasan selama kegiatan belajar mengajar di sekolah." },
  { q: "Dokumen apa yang harus disiapkan?", a: "Yang diunggah ke website hanya bukti transfer biaya pendaftaran. Fotokopi akta kelahiran, kartu keluarga, dan rapor (bagi siswa pindahan) dibawa ke pondok saat tes seleksi, tidak dikirim lewat website." },
  { q: "Bagaimana proses seleksinya?", a: "Calon siswa mengikuti observasi dan wawancara, sedangkan calon wali santri mengikuti sesi wawancara. Jadwal diinformasikan bertahap lewat WhatsApp, dan hasil seleksi diumumkan pada 5 Januari 2027." },
  { q: "Kapan uang pangkal harus dibayar?", a: "Setelah dinyatakan lulus seleksi, uang pangkal dibayar paling lambat 5 Maret 2027. Konfirmasi pembayaran dikirim ke WhatsApp keuangan beserta bukti transfer." },
  { q: "Apakah ada syarat kesehatan?", a: "Calon siswa harus sehat dan tidak memiliki riwayat penyakit berat, menular, atau berbahaya seperti jantung, TBC, hepatitis, epilepsi, dan asma. Dibuktikan dengan surat keterangan sehat dari dokter dan hasil cek laboratorium HBsAg, yang diserahkan setelah calon siswa dinyatakan lulus." },
];

export const TESTIMONIALS = [
  { name: "Bapak Hadi Susanto", role: "Wali Santri MTs Kelas 8", text: "Anak saya sangat berkembang sejak masuk Al Kautsar. Bahasa Arabnya lancar, hafalannya bertambah, dan yang paling penting adabnya semakin baik. Sistem SIPOS sangat membantu kami memantau perkembangannya dari rumah.", avatar: "👨" },
  { name: "Ibu Siti Rohmah", role: "Wali Santri SMA Kelas 11", text: "Saya percaya dengan manhaj Ahlussunnah yang diterapkan di sini. Putra saya tumbuh menjadi pribadi yang mandiri, disiplin, dan tetap menjaga ibadah dengan baik. Insya Allah siap menghadapi UTBK juga.", avatar: "👩" },
  { name: "Bapak Ahmad Fadli", role: "Alumni & Mahasiswa ITS", text: "6 tahun di Al Kautsar adalah pondasi terbaik. Discovery Task melatih kami berpikir kritis, Super Camp UTBK mengantarkan saya masuk PTN impian, dan yang lebih penting — bekal agama yang kokoh.", avatar: "🎓" },
];
