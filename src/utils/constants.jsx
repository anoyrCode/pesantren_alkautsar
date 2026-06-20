import imgDiscovery1    from "../assets/fotogaleri/discovery-task-1.JPG";
import imgDiscovery2    from "../assets/fotogaleri/discovery-task-2.JPG";
import imgDiscovery3    from "../assets/fotogaleri/discovery-task-3.JPG";
import imgDiscovery4    from "../assets/fotogaleri/discovery-task-4.JPG";
import imgKantin1       from "../assets/fotogaleri/kantin-1.JPG";
import imgKantin2       from "../assets/fotogaleri/kantin-2.JPG";
import imgLapangan1     from "../assets/fotogaleri/lapangan-1.JPG";
import imgLapangan2     from "../assets/fotogaleri/lapangan-2.JPG";
import imgKolam1        from "../assets/fotogaleri/kolam-renang-1.JPG";
import imgKolam2        from "../assets/fotogaleri/kolam-renang-2.JPG";
import imgKolam3        from "../assets/fotogaleri/kolam-renang-3.JPG";
import imgBasket        from "../assets/fotogaleri/basket.JPG";
import imgFutsal        from "../assets/fotogaleri/futsal.JPG";
import imgDauroh1       from "../assets/fotogaleri/dauroh-1.JPG";
import imgDauroh2       from "../assets/fotogaleri/dauroh-2.JPG";
import imgDauroh3       from "../assets/fotogaleri/dauroh-3.JPG";
import imgCeramah       from "../assets/fotogaleri/ceramah-idul-adha.JPG";
import imgCeramah2      from "../assets/fotogaleri/ceramah-idul-adha-2.JPG";
import imgPenyembelihan3 from "../assets/fotogaleri/penyembelihan-3.JPG";
import imgPenyembelihan4 from "../assets/fotogaleri/penyembelihan-4.JPG";
import imgPenyembelihan5 from "../assets/fotogaleri/penyembelihan-5.JPG";

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

export const GALLERY_ITEMS = [
  { src: imgDiscovery1,    alt: "Pembelajaran Discovery Task 1",  category: "pembelajaran" },
  { src: imgDiscovery2,    alt: "Pembelajaran Discovery Task 2",  category: "pembelajaran" },
  { src: imgDiscovery3,    alt: "Pembelajaran Discovery Task 3",  category: "pembelajaran" },
  { src: imgDiscovery4,    alt: "Pembelajaran Discovery Task 4",  category: "pembelajaran" },
  { src: imgKantin1,       alt: "Kantin Pesantren 1",             category: "fasilitas" },
  { src: imgKantin2,       alt: "Kantin Pesantren 2",             category: "fasilitas" },
  { src: imgLapangan1,     alt: "Lapangan Olahraga 1",            category: "fasilitas" },
  { src: imgLapangan2,     alt: "Lapangan Olahraga 2",            category: "fasilitas" },
  { src: imgKolam1,        alt: "Kolam Renang 1",                 category: "fasilitas" },
  { src: imgKolam2,        alt: "Kolam Renang 2",                 category: "fasilitas" },
  { src: imgKolam3,        alt: "Kolam Renang 3",                 category: "fasilitas" },
  { src: imgBasket,        alt: "Lapangan Basket",                category: "kegiatan" },
  { src: imgFutsal,        alt: "Lapangan Futsal",                category: "kegiatan" },
  { src: imgDauroh1,       alt: "Kegiatan Dauroh 1",              category: "kajian" },
  { src: imgDauroh2,       alt: "Kegiatan Dauroh 2",              category: "kajian" },
  { src: imgDauroh3,       alt: "Kegiatan Dauroh 3",              category: "kajian" },
  { src: imgCeramah,       alt: "Ceramah Idul Adha",              category: "kajian" },
  { src: imgCeramah2,      alt: "Ceramah Idul Adha 2",            category: "kajian" },
  { src: imgPenyembelihan3, alt: "Penyembelihan Qurban 3",        category: "kegiatan" },
  { src: imgPenyembelihan4, alt: "Penyembelihan Qurban 4",        category: "kegiatan" },
  { src: imgPenyembelihan5, alt: "Penyembelihan Qurban 5",        category: "kegiatan" },
];

export const GALLERY_FILTERS = [
  { id: "all",          label: "Semua" },
  { id: "pembelajaran", label: "Pembelajaran" },
  { id: "fasilitas",    label: "Fasilitas" },
  { id: "kajian",       label: "Kajian" },
  { id: "kegiatan",     label: "Kegiatan" },
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
