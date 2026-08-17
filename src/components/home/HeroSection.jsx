import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ARABIC_FONT, GILDA_FONT } from "../../utils/constants";
import useParallax from "../../hooks/useParallax";
import gedung from "../../assets/konten/gedung.jpeg";

// Warna dasar hero. Krem hangat dipilih supaya sedarah dengan warna dinding
// gedung di foto — navy dingin di atas putih bersih membuat keduanya terasa
// seperti dua bahan berbeda yang dipaksa berdampingan.
const KREM = "#F6F2EA";

// Pudaran foto memakai sembilan titik, bukan tiga-empat. Dengan sedikit titik,
// perpindahannya terbaca mata sebagai sapuan bergaris; dengan sembilan, foto
// benar-benar larut ke latar.
const PUDAR_DESKTOP =
  "linear-gradient(100deg, #F6F2EA 0%, #F6F2EA 20%, rgba(246,242,234,.985) 29%, rgba(246,242,234,.94) 37%, rgba(246,242,234,.85) 45%, rgba(246,242,234,.70) 53%, rgba(246,242,234,.50) 62%, rgba(246,242,234,.28) 72%, rgba(246,242,234,.10) 84%, rgba(246,242,234,0) 100%)";

// Di layar sempit teks menumpuk di atas foto, bukan di sampingnya, sehingga
// pudaran mendatar tidak menolong apa pun. Versi tegak ini yang menjaga
// keterbacaan di ponsel.
const PUDAR_MOBILE =
  "linear-gradient(180deg, rgba(246,242,234,.97) 0%, rgba(246,242,234,.93) 38%, rgba(246,242,234,.82) 60%, rgba(246,242,234,.55) 78%, rgba(246,242,234,.28) 100%)";

const KREDENSIAL = [
  ["Kemenag RI", true],
  ["Kemendikdasmen RI", true],
  ["6 tahun sistem pesantren", false],
];

const JP = [
  ["48", "Diniyah & Agama"],
  ["42", "Sains & UTBK"],
  ["14", "Bahasa Inggris"],
];

// Durasi dan jeda sengaja dibuat berbeda-beda (7s / 8.5s / 9.5s). Kalau sama,
// ketiga kartu naik-turun serempak dan justru terlihat digerakkan satu tuas —
// bukan mengapung. Ditulis penuh, bukan dirangkai, supaya terbaca pemindai
// Tailwind saat build.
const PELAT = [
  ["Keamanan", "3 Shift Musyrif", "110 CCTV · Rasio 1:10", "animate-[apungKecil_8.5s_ease-in-out_infinite] [animation-delay:.6s]"],
  ["Super Camp", "UTBK & PTN", "Nasional & Internasional", "animate-[apungKecil_9.5s_ease-in-out_infinite] [animation-delay:1.1s]"],
];

export default function HeroSection() {
  const navigate = useNavigate();
  // Parallax scroll pada foto saja. Cursor glow dan lingkaran berputar dari
  // desain gelap sengaja tidak dikembalikan: keduanya mengandalkan cahaya di
  // atas latar pekat, dan di atas krem hasilnya jadi noda keruh.
  const { ref: sectionRef, y: pY } = useParallax(1);

  return (
    // -mt-20 menarik hero ke belakang navbar yang fixed (main memberi pt-20),
    // supaya latar kremnya menerus sampai tepi atas layar. Tanpa itu ada pita
    // putih di atas hero.
    <section
      ref={sectionRef}
      className="relative -mt-20 min-h-svh flex items-start overflow-hidden"
      style={{ backgroundColor: KREM }}
    >
      {/* Foto: berwarna penuh, dihangatkan sedikit agar sedarah dengan krem.
          Bergerak lebih lambat dari isi halaman saat digulir (parallax). */}
      <div
        className="absolute -inset-y-8 inset-x-0"
        style={{
          backgroundImage: `url(${gedung})`,
          backgroundSize: "cover",
          backgroundPosition: "center 42%",
          filter: "saturate(.88) contrast(1.02) brightness(1.05)",
          transform: `translateY(${pY * 0.08}px)`,
        }}
      />
      <div className="absolute inset-0 hidden lg:block" style={{ background: PUDAR_DESKTOP }} />
      <div className="absolute inset-0 lg:hidden" style={{ background: PUDAR_MOBILE }} />
      {/* Sapuan hangat di kepala hero: menyatukan langit foto dengan latar */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(246,242,234,.55) 0%, rgba(246,242,234,0) 26%)" }}
      />
      {/* Pudaran tepi bawah. Foto memakai background-size:cover, jadi bagian
          yang tampil paling bawah adalah aspal halaman — kalau dibiarkan, hero
          terpotong mentah menjadi pita gelap tepat di atas ticker. */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(246,242,234,0) 0%, rgba(246,242,234,.45) 46%, rgba(246,242,234,.85) 76%, #F6F2EA 100%)" }}
      />

      {/* items-start, bukan items-center: dengan pemusatan, jarak ke navbar
          ikut berubah mengikuti tinggi isi dan sulit disetel. Di sini pt yang
          menentukan langsung. pb menyisakan ruang untuk marquee di dasar. */}
      <div className="relative z-10 w-[min(1180px,92vw)] mx-auto pt-32 pb-28">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-13 items-start">

          {/* ── KIRI ── */}
          <div className="flex-1 min-w-0">
            {/* "Pesantren" itu kata benda umum, "Al Kautsar" namanya. Menyamakan
                ukurannya membuat keduanya sama-sama tumpul. */}
            <div className="text-[11.5px] font-semibold uppercase tracking-[0.42em] text-slate-500 animate-[fU_.7s_ease-out_both]">
              Pesantren
            </div>
            <h1
              className="text-[#1a2d47] leading-[0.94] tracking-tight mt-3.5 animate-[fU_.7s_.08s_ease-out_both]"
              style={{ ...GILDA_FONT, fontSize: "clamp(46px,8vw,96px)" }}
            >
              Al Kautsar
            </h1>

            <div className="flex items-center gap-3.75 mt-5 animate-[fU_.7s_.14s_ease-out_both]">
              <span className="w-13 h-0.5 rounded-full bg-[#D48C1A]" />
              <span className="text-[12px] font-semibold tracking-[0.34em] text-slate-500">SIDOARJO</span>
            </div>

            {/* Satu baris tenang, bukan tiga pil beraksen. Amber tidak pernah
                dipakai sebagai teks di atas krem — kontrasnya tidak lolos. */}
            <div className="inline-block mt-7.5 pt-3.75 border-t border-[#1a2d47]/10 text-[12.5px] text-slate-600 animate-[fU_.7s_.2s_ease-out_both]">
              {KREDENSIAL.map(([teks, tebal], i) => (
                <span key={teks}>
                  {i > 0 && <span className="mx-2.25 text-[#D48C1A]">·</span>}
                  {tebal ? <b className="font-semibold text-[#1a2d47]">{teks}</b> : teks}
                </span>
              ))}
            </div>

            <p className="text-[15.5px] leading-[1.95] font-light text-slate-600 max-w-lg mt-5.5 animate-[fU_.7s_.26s_ease-out_both]">
              Lembaga pendidikan Islam bermanhaj Ahlussunnah wal Jama'ah — sistem kepesantrenan enam
              tahun, dengan Super Camp untuk persiapan perguruan tinggi nasional dan internasional.
            </p>

            <div className="flex flex-wrap items-center gap-6.5 mt-8.5 animate-[fU_.7s_.32s_ease-out_both]">
              <button
                onClick={() => navigate("/ppdb")}
                className="inline-flex items-center gap-2.25 bg-[#1a2d47] text-white px-7 py-3.75 rounded-xl text-[13.5px] font-semibold shadow-[0_14px_30px_-14px_rgba(26,45,71,.7)] hover:-translate-y-0.5 transition-transform hover:cursor-pointer"
              >
                Daftar PPDB <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate("/tentang")}
                className="text-[13.5px] font-semibold text-[#1a2d47] border-b-[1.5px] border-[#1a2d47]/25 pb-0.75 hover:border-[#1a2d47]/60 transition-colors hover:cursor-pointer"
              >
                Tentang kami
              </button>
            </div>
          </div>

          {/* ── KANAN ── */}
          <div className="hidden lg:block w-109 shrink-0 mt-2.5 animate-[fL_.75s_.22s_ease-out_both]">
            {/* Tanpa garis tepi. Kedalaman datang dari bayangan lembut berjarak
                jauh, yang berperilaku seperti cahaya — bukan outline 1px yang
                membuat kartu terbaca seperti stiker tertempel. */}
            <div className="rounded-2xl bg-[#1a2d47] px-6.5 pt-6 pb-5.25 shadow-[0_30px_60px_-30px_rgba(26,45,71,.55),0_4px_12px_-6px_rgba(26,45,71,.18)] animate-[apung_7s_ease-in-out_infinite]">
              <div className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-amber-400/90">
                Kurikulum Terpadu
              </div>
              <div className="text-[21px] text-white mt-2.25" style={GILDA_FONT}>Program Akademik</div>

              <div className="flex items-start gap-4.5 mt-5.5">
                {JP.map(([n, l]) => (
                  <div key={n} className="flex-1">
                    <div className="text-[34px] text-white leading-[0.88]" style={GILDA_FONT}>
                      {n}<span className="ml-0.75 text-[11.5px] font-medium text-white/50">JP</span>
                    </div>
                    <div className="text-[11px] text-white/60 leading-snug mt-2.5">{l}</div>
                  </div>
                ))}
              </div>

              {/* Tiga angka di atas berjumlah 104. Sisanya 48 JP Bahasa Arab
                  Intensif, yang tidak ditampilkan di panel ini. */}
              <div className="flex items-baseline justify-between mt-4.75 pt-3.75 border-t border-white/13">
                <span className="text-[11.5px] text-white/55">Beban belajar</span>
                <span className="text-[12.5px] font-semibold text-white">104 dari 152 JP / pekan</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.75 mt-3.75">
              {PELAT.map(([tag, judul, sub, anim]) => (
                <div
                  key={tag}
                  className={`rounded-xl bg-white/92 px-4.75 py-4.25 shadow-[0_14px_34px_-20px_rgba(26,45,71,.38)] ${anim}`}
                >
                  <div className="text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-slate-400">{tag}</div>
                  <div className="text-[14.5px] font-bold text-[#1a2d47] mt-2.25">{judul}</div>
                  <div className="text-[11.5px] text-slate-500 mt-1.25">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── AYAT ── panel menyempit & dipusatkan, bukan selebar halaman */}
        <div className="max-w-4xl mx-auto mt-10 lg:mt-12 rounded-2xl bg-white/80 backdrop-blur-md px-6 py-5 sm:px-7 flex items-center gap-5.5 shadow-[0_1px_2px_rgba(26,45,71,.04),0_20px_46px_-28px_rgba(26,45,71,.32)] animate-[fU_.7s_.4s_ease-out_both]">
          <svg
            width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="shrink-0 text-[#1a2d47]/50 hidden sm:block" aria-hidden="true"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>

          <div className="flex-1 min-w-0">
            {/* Potongan QS. Az-Zumar ayat 9 — bukan ayat penuh. */}
            <p
              className="text-[19px] sm:text-[21px] leading-[1.95] text-[#1a2d47]"
              style={{ ...ARABIC_FONT, direction: "rtl" }}
              lang="ar"
            >
              قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ
            </p>
            <p className="text-[12.5px] sm:text-[13px] leading-[1.75] text-slate-600 italic mt-2.5">
              &ldquo;Katakanlah, apakah sama orang-orang yang berilmu dengan orang-orang yang
              tidak berilmu?&rdquo;
            </p>
            <span className="block text-[12px] font-semibold text-[#1a2d47] mt-2">
              — QS. Az-Zumar: 9
            </span>
          </div>
        </div>
      </div>

      {/* Marquee Arab di dasar hero. Di desain gelap dulu warnanya putih 7% —
          praktis tidak terlihat siapa pun. Di sini navy 18% di atas krem:
          tetap tenang, tapi benar-benar terbaca sebagai elemen. */}
      <div
        className="absolute bottom-0 inset-x-0 z-10 py-3.5 border-t border-[#1a2d47]/10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap animate-[marq_26s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-5 px-6 text-base text-[#1a2d47]/18 shrink-0"
              style={{ ...ARABIC_FONT, direction: "rtl" }}
            >
              الكوثر — للعلم والإيمان — أهل السنة والجماعة — على منهج السلف الصالح
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
