export const ARABIC_FONT = { fontFamily: "'Noto Naskh Arabic', serif" };
export const GILDA_FONT = { fontFamily: "'Gilda Display', serif" };

export const NAV_LINKS = [
  { id: "beranda", path: "/", label: "Beranda" },
  { id: "tentang", path: "/tentang", label: "Tentang" },
  { id: "kurikulum", path: "/kurikulum", label: "Kurikulum" },
  { id: "ppdb", path: "/ppdb", label: "PPDB" },
  { id: "galeri", path: "/galeri", label: "Galeri" },
  { id: "kesantrian", path: "/kesantrian", label: "Kesantrian" },
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

import { BookOpen, Languages, FlaskConical, BedDouble, Users, Utensils, Dumbbell, Trophy, Monitor, GraduationCap, Globe2, Smartphone } from "lucide-react";

export const GALLERY_ITEMS = [
  { c: "pembelajaran", Icon: BookOpen, title: "Pembelajaran Dengan Leveling", cls: "tall", gt: "from-[#1a2d47] to-[#284061]" },
  { c: "pembelajaran", Icon: Languages, title: "Muhadhoroh Bahasa Arab", gt: "from-[#284061] to-[#3a5a8c]" },
  { c: "pembelajaran", Icon: FlaskConical, title: "Pembelajaran dengan Discovery Task", cls: "wide", gt: "from-[#1a2d47] via-[#3a5a8c] to-[#c09b5a]" },
  { c: "asrama", Icon: BedDouble, title: "Kamar Asrama Bersih & Rapi", gt: "from-[#c09b5a] to-[#284061]" },
  { c: "kegiatan", Icon: Users, title: "Sholat Berjamaah Rutin", cls: "tall", gt: "from-[#3a5a8c] to-[#c8d6e8]" },
  { c: "asrama", Icon: Utensils, title: "Makan Bergizi 3x Sehari", gt: "from-[#1a2d47] to-[#c09b5a]" },
  { c: "kegiatan", Icon: Dumbbell, title: "Olahraga Pagi & 5R", gt: "from-[#3a5a8c] to-[#1a2d47]" },
  { c: "prestasi", Icon: Trophy, title: "Santri Berprestasi & Wisuda", cls: "wide", gt: "from-[#1a2d47] to-[#3a5a8c]" },
  { c: "lms", Icon: Monitor, title: "LMS Dashboard Real-Time", gt: "from-[#284061] to-[#c09b5a]" },
  { c: "prestasi", Icon: GraduationCap, title: "Sertifikat ITS Tekno", gt: "from-[#c09b5a] to-[#d4b47a]" },
  { c: "pembelajaran", Icon: Globe2, title: "Kelas Bahasa Inggris", gt: "from-[#3a5a8c] to-[#c09b5a]" },
  { c: "lms", Icon: Smartphone, title: "Input Nilai & Absensi LMS", gt: "from-[#c8d6e8] to-[#284061]" },
];


export const GALLERY_FILTERS = [
  { id: "all", label: "Semua" },
  { id: "pembelajaran", label: "Pembelajaran" },
  { id: "asrama", label: "Asrama" },
  { id: "kegiatan", label: "Kegiatan" },
  { id: "prestasi", label: "Prestasi" },
  { id: "lms", label: "Digital & LMS" },
];

export const FAQS = [
  { q: "Siapa saja yang bisa mendaftar di Pesantren Al Kautsar?", a: "Pendaftaran terbuka untuk siswa-siswi muslim yang akan masuk jenjang MTs (lulusan SD/MI) maupun SMA (lulusan SMP/MTs) dan bersedia mengikuti seluruh program kepesantrenan selama 6 tahun." },
  { q: "Apakah ada biaya pendaftaran?", a: "Biaya pendaftaran sebesar Rp 450.000. Calon santri mengisi formulir online, mengunggah dokumen yang diminta, dan melakukan pembayaran biaya pendaftaran." },
  { q: "Apa saja dokumen yang harus dipersiapkan?", a: "Foto calon santri, Bukti Transfer Regristrasi, Semua dokumen diunggah dalam format JPG atau PDF." },
  { q: "Bagaimana sistem pendidikan di Al Kautsar?", a: "Kami memadukan kurikulum Kemenag dan Kemdikbud dengan sistem kepesantrenan 6 tahun. Pembelajaran menggunakan metode Discovery Task berbasis PISA." },
  { q: "Apakah santri bisa pulang ke rumah?", a: "Ya, santri mendapatkan libur 5 hari setiap bulan untuk berbakti kepada orang tua dan melepas rindu dengan keluarga." },
  { q: "Bagaimana sistem keamanan dan pengawasan santri?", a: "Kami menerapkan 3 shift musyrif 24 jam dengan rasio 1:10, didukung 110 CCTV online & offline. Lingkungan pesantren bebas bullying, anti-LGBT, dan dijaga ketat." },
];

export const TESTIMONIALS = [
  { name: "Bapak Hadi Susanto", role: "Wali Santri MTs Kelas 8", text: "Anak saya sangat berkembang sejak masuk Al Kautsar. Bahasa Arabnya lancar, hafalannya bertambah, dan yang paling penting adabnya semakin baik. Sistem LMS sangat membantu kami memantau perkembangannya dari rumah.", avatar: "👨" },
  { name: "Ibu Siti Rohmah", role: "Wali Santri SMA Kelas 11", text: "Saya percaya dengan manhaj Ahlussunnah yang diterapkan di sini. Putra saya tumbuh menjadi pribadi yang mandiri, disiplin, dan tetap menjaga ibadah dengan baik. Insya Allah siap menghadapi UTBK juga.", avatar: "👩" },
  { name: "Bapak Ahmad Fadli", role: "Alumni & Mahasiswa ITS", text: "6 tahun di Al Kautsar adalah pondasi terbaik. Discovery Task melatih kami berpikir kritis, Super Camp UTBK mengantarkan saya masuk PTN impian, dan yang lebih penting — bekal agama yang kokoh.", avatar: "🎓" },
];
