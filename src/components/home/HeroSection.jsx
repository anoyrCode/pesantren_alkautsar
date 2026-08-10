import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { ARABIC_FONT, GILDA_FONT } from "../../utils/constants";
import useParallax from "../../hooks/useParallax";
import gedung from "../../assets/konten/gedung.jpeg";

export default function HeroSection() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [px, setPx] = useState({ x: 0, y: 0 });
  const { ref: sectionRef, y: pY } = useParallax(1);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
    setPx({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#1a2d47]" onMouseMove={onMove}>
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-linear-to-br from-[#1a2d47] via-[#284061] to-[#3a5a8c]" />
      {/* Foto gedung — tampil di seluruh banner tanpa mask apa pun, supaya
          tidak ada bentuk geometris yang kelihatan */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `url(${gedung})`,
          backgroundSize: "cover",
          backgroundPosition: "center 38%",
          filter: "grayscale(1) contrast(1.05)",
          transform: `translateY(${pY * 0.08}px)`,
        }}
      />
      {/* Scrim: lapisan gelap yang memudar kiri→kanan. Menjaga teks tetap
          terbaca tanpa memotong fotonya — jauh lebih halus daripada mask,
          karena yang memudar warnanya, bukan bentuk fotonya. */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(100deg, #16273d 0%, rgba(22,39,61,.92) 34%, rgba(24,42,66,.55) 58%, rgba(26,45,71,.12) 82%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 80% 20%,rgba(192,155,90,.18) 0%,transparent 55%)",
          transform: `translateY(${pY * 0.12}px)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 75%)",
          transform: `translateY(${pY * 0.07}px)`,
        }}
      />

      {/* Cursor glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 380px at ${px.x}px ${px.y}px, rgba(212,140,26,.08), transparent 65%)` }} />

      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 pointer-events-none" style={{ transform: `translate3d(${pos.x * 24}px, ${pos.y * 18 + pY * -0.1}px, 0)`, transition: "transform 0.12s linear" }}>
        <div className="w-120 h-120 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
      </div>
      <div className="absolute -left-16 -bottom-16 pointer-events-none" style={{ transform: `translate3d(${pos.x * -16}px, ${pos.y * -12 + pY * 0.08}px, 0)`, transition: "transform 0.18s linear" }}>
        <div className="w-90 h-90 rounded-full border border-amber-500/10 animate-[spin_28s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 w-[min(1180px,92vw)] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center py-16 lg:py-12">

        {/* ── LEFT: main content ── */}
        <div className="flex-1">
          {/* Location badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 rounded-full pr-4 pl-2 py-1.5 mb-7 backdrop-blur-md animate-[fU_.7s_ease-out]">
            <div className="w-5 h-5 rounded-full bg-amber-500/80 flex items-center justify-center">
              <MapPin size={10} className="text-white" />
            </div>
            <span className="text-[11px] font-semibold text-white/80 tracking-wider uppercase">
              Sidoarjo · 901 Santri · MTs & SMA
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white leading-[1.05] tracking-tight mb-5 animate-[fU_.7s_.08s_ease-out_both]"
            style={{ ...GILDA_FONT, fontSize: "clamp(36px,5.5vw,64px)" }}
          >
            Pesantren<br />
            <span className="text-amber-300">Al Kautsar</span>
            <span className="block text-amber-300/60 mt-1" style={{ fontSize: "clamp(14px,1.8vw,22px)", fontStyle: "normal", letterSpacing: "0.18em" }}>— SIDOARJO</span>
          </h1>

          {/* Credential badges */}
          <div className="flex flex-wrap gap-2 mb-6 animate-[fU_.7s_.12s_ease-out_both]">
            {["Kemenag RI", "Kemendikbud RI", "6 Tahun Sistem Pesantren"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/25 bg-amber-500/10 text-amber-200/80 text-[11px] font-semibold tracking-wide">
                <span className="w-1 h-1 rounded-full bg-amber-400/60 inline-block" />
                {b}
              </span>
            ))}
          </div>

          {/* Tagline — ringkas */}
          <p className="text-[15px] leading-[1.85] font-light text-white/60 max-w-md mb-8 animate-[fU_.7s_.18s_ease-out_both]">
            Lembaga pendidikan Islam bermanhaj Ahlussunnah wal Jama'ah di Sidoarjo — terbingkai dalam sistem kepesantrenan 6 tahun, dengan program Super Camp untuk persiapan perguruan tinggi nasional dan internasional.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10 animate-[fU_.7s_.24s_ease-out_both]">
            <button
              onClick={() => navigate("/ppdb")}
              className="inline-flex items-center gap-2 bg-linear-to-br from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl text-[13.5px] font-semibold shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all hover:cursor-pointer"
            >
              Daftar PPDB <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/tentang")}
              className="inline-flex items-center gap-2 text-white px-6 py-3 border border-white/25 rounded-xl text-[13.5px] font-semibold hover:bg-white/10 hover:border-white/50 transition-all hover:cursor-pointer"
            >
              Tentang Kami
            </button>
          </div>

          {/* Stats row */}
          <div className="flex border-t border-white/10 pt-7 animate-[fU_.7s_.32s_ease-out_both]">
            {[
              ["901", "+", "Santri Aktif"],
              ["6", "th", "MTs – SMA"],
              ["24", "h", "Pengawasan"],
              ["110", "", "CCTV Aktif"],
            ].map(([n, sup, l], i) => (
              <div
                key={i}
                className={`flex-1 ${i > 0 ? "border-l border-white/10 pl-4 sm:pl-5" : ""} ${i < 3 ? "pr-4 sm:pr-5" : ""}`}
              >
                <div className="text-white leading-none mb-1" style={{ ...GILDA_FONT, fontSize: "26px" }}>
                  {n}{sup && <span className="text-amber-300 text-[.55em] align-super">{sup}</span>}
                </div>
                <div className="text-[11px] text-white/40 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: visual panel ── */}
        <div className="hidden lg:flex flex-col animate-[fL_.75s_.22s_ease-out_both] w-100 shrink-0 lg:self-start lg:mt-8">

          {/* Pelat utama — Kurikulum. Isian solid tanpa blur/border/bayangan:
              kedalaman panel ini datang dari tumpang-tindih pelat, bukan efek kaca.
              pb-6.5 sengaja lebih besar dari -mt-5 di bawah, supaya baris total
              tidak tertutup pelat kecil. */}
          <div className="rounded-lg bg-[#152638]/92 px-4.5 pt-4 pb-6.5">
            <div className="text-[9px] font-extrabold tracking-[0.16em] uppercase text-amber-300/75 mb-1.5">
              Kurikulum Terpadu
            </div>
            <div className="text-[17px] text-white leading-tight" style={GILDA_FONT}>Program Akademik</div>

            {/* items-start, bukan items-end: label panjangnya tidak sama, jadi kalau
                salah satu membungkus dua baris, angkanya tetap sebaris. */}
            <div className="flex items-start gap-3.5 mt-4">
              {[
                ["48", "Diniyah & Agama"],
                ["42", "Sains & UTBK"],
                ["14", "Bahasa Inggris"],
              ].map(([n, l]) => (
                <div key={n} className="flex-1">
                  <div className="text-[28px] text-white leading-[0.9]" style={GILDA_FONT}>
                    {n}<span className="text-[11px] font-medium text-white/55">jp</span>
                  </div>
                  <div className="text-[9.5px] text-white/55 leading-tight mt-1.75">{l}</div>
                </div>
              ))}
            </div>

            {/* "104 dari 152", bukan "total 152": tiga angka di atas berjumlah 104.
                Sisanya 48 jp Bahasa Arab Intensif, yang tidak ditampilkan di sini. */}
            <div className="flex items-baseline justify-between mt-3.25 pt-2.5 border-t border-white/8">
              <span className="text-[9.5px] text-white/55">Beban belajar</span>
              <span className="text-[11px] font-semibold text-white/75">104 dari 152 jp / pekan</span>
            </div>
          </div>

          {/* Dua pelat kecil menindih tepi bawah pelat utama. -mt-5 yang bikin
              tumpang-tindih (wrapper sengaja tanpa gap), relative supaya pelat ini
              terlukis di atas pelat utama. */}
          <div className="grid grid-cols-2 gap-2 -mt-5 ml-8">
            {[
              ["Keamanan", "3 Shift Musyrif", "110 CCTV · Rasio 1:10"],
              ["Super Camp", "UTBK & PTN", "Nasional & Internasional"],
            ].map(([tag, title, sub]) => (
              // overflow-hidden wajib: garis bibir memakai inset-x-0, tanpa kliping
              // ujungnya menjulur melewati sudut membulat pelat.
              <div key={tag} className="relative overflow-hidden rounded-lg bg-[#203552]/94 p-3.5">
                {/* bibir tipis di tepi atas — penanda tumpukan, pengganti bayangan */}
                <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
                <div className="text-[9px] font-extrabold tracking-[0.16em] uppercase text-white/60 mb-1.5">{tag}</div>
                <div className="text-[13px] font-semibold text-white leading-tight">{title}</div>
                <div className="text-[10px] font-light text-white/55 mt-0.75">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arabic marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t border-white/5">
        <div className="flex whitespace-nowrap animate-[marq_26s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="inline-flex items-center gap-5 px-6 text-base text-white/7 shrink-0" style={{ ...ARABIC_FONT, direction: "rtl" }}>
              الكوثر — للعلم والإيمان — أهل السنة والجماعة — على منهج السلف الصالح
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fU{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
        @keyframes fL{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:none}}
        @keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      `}</style>
    </section>
  );
}
