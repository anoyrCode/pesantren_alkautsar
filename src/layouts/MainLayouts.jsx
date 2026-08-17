import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronRight, MapPin, Phone, MessageCircle } from "lucide-react";

const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.95A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);


import { NAV_LINKS } from "../utils/constants";
import Loader, { DURASI_LOADER } from "../components/common/Loader";
import logo from "../assets/logo.png";
import logoPolos from "../assets/logoPolos.png";

export default function MainLayout() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Loader biasa
  useEffect(() => {
    // Angkanya diambil dari Loader supaya animasi garis di sana selesai tepat
    // saat layar ini menghilang. Ubah di satu tempat, keduanya ikut.
    const t = setTimeout(() => setLoading(false), DURASI_LOADER);
    return () => clearTimeout(t);
  }, []);

  // Scroll ke atas kalo pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // deteksi nav scroll
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile
  useEffect(() => {
    const onResize = () => window.innerWidth > 768 && setMobileOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Escape menutup menu — panel ini menutupi seluruh layar, jadi harus ada
  // jalan keluar lewat papan ketik, bukan cuma tombol X.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = (path) => location.pathname === path;

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden antialiased" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Loader loading={loading} />

      {/* ─── NAVBAR ─── */}
      {/* Pil mengambang. Tekstur dot grid dan garis bawah dihapus: keduanya
          membuat navbar terbaca sebagai pita yang menempel di tepi layar,
          sedangkan pil ini justru harus terasa melayang di atas isi halaman.
          Kedalamannya dari bayangan lembut, bukan garis. */}
      <nav
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-1000 w-[min(1180px,94vw)] h-15 rounded-full flex items-center justify-between pl-5 pr-2.5 md:pl-6 transition-all duration-300 ${
          navSolid || mobileOpen
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_2px_rgba(26,45,71,.05),0_14px_36px_-14px_rgba(26,45,71,.22)]"
            : "bg-white/78 backdrop-blur-xl shadow-[0_1px_2px_rgba(26,45,71,.04),0_12px_32px_-12px_rgba(26,45,71,.16)]"
        }`}
      >
<Link to="/" className="flex items-center gap-3 cursor-pointer group shrink-0 relative z-10">
          <img src={logo} width={160} alt="Al Kautsar" />
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-slate-100/60 border border-slate-200/80 rounded-full p-1 backdrop-blur-sm relative z-10">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.path)}
              className={`px-4 lg:px-5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 hover:cursor-pointer ${
                isActive(l.path)
                  ? "bg-[#284061] text-white shadow-md shadow-[#284061]/25"
                  : "text-slate-700 hover:text-[#284061] hover:bg-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 shrink-0 relative z-10">
          <button
            onClick={() => handleNav("/ppdb")}
            className="hidden md:inline-flex items-center gap-1.5 bg-[#284061] hover:bg-[#1a2d47] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold shadow-lg shadow-[#284061]/25 hover:-translate-y-0.5 transition-all"
          >
            Daftar PPDB <ArrowRight size={14} />
          </button>
          {/* Bulat, mengikuti bentuk pil. Kedua ikon dirender bersamaan lalu
              disilangkan opacity + putaran — kalau ditukar dengan ternary,
              pergantiannya patah karena tidak ada yang bisa ditransisikan. */}
          <button
            className="md:hidden w-10 h-10 grid place-items-center rounded-full bg-[#1a2d47]/6 text-[#1a2d47] active:scale-90 transition-transform duration-200"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            <Menu
              size={18}
              className={`col-start-1 row-start-1 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
            />
            <X
              size={18}
              className={`col-start-1 row-start-1 transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
            />
          </button>
        </div>
      </nav>


      {/* ─── MENU MOBILE ─── */}
      {/* Latar gelap. Selain memberi tahu bahwa halaman sedang tidak aktif, ini
          yang menutup celah 8px antara dasar pil (72px) dan pangkal panel —
          versi lama membiarkan seiris isi halaman mengintip di sana. */}
      <div
        className={`md:hidden fixed inset-0 z-998 bg-[#1a2d47]/35 backdrop-blur-xs transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Panel selebar dan sebentuk pil di atasnya, turun dari pangkalnya.
          Lembar putih persegi selebar layar yang lama bertabrakan dengan pil
          yang mengambang, dan tingginya selalu penuh — menyisakan ruang kosong
          besar di bawah tombol terakhir. Panel ini memeluk isinya. */}
      <div
        id="menu-mobile"
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        // -translate-x-1/2 ada di daftar tetap, bukan di kedua cabang: sumbu X
        // dan Y memakai custom property terpisah di Tailwind v4, jadi keduanya
        // menyusun properti `translate` yang sama tanpa saling menimpa.
        className={`md:hidden fixed top-19 left-1/2 -translate-x-1/2 z-999 w-[min(1180px,94vw)] max-h-[calc(100svh-6.5rem)] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-xl p-3 origin-top shadow-[0_2px_4px_rgba(26,45,71,.06),0_28px_64px_-24px_rgba(26,45,71,.4)] transition-[opacity,translate,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((l, i) => (
          <button
            key={l.id}
            onClick={() => handleNav(l.path)}
            // Muncul berurutan, bukan serempak — mata jadi punya arah baca.
            // Jedanya nol saat menutup supaya panelnya tidak terasa berat.
            style={{ transitionDelay: mobileOpen ? `${70 + i * 45}ms` : "0ms" }}
            className={`group w-full flex items-center gap-3.5 text-left px-4 py-3.5 rounded-2xl transition-[opacity,translate,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            } ${
              isActive(l.path) ? "bg-[#284061] text-white" : "text-[#1a2d47] active:bg-[#1a2d47]/6"
            }`}
          >
            <span className={`text-[11px] font-semibold tabular-nums tracking-wider ${isActive(l.path) ? "text-white/45" : "text-[#1a2d47]/30"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15.5px] font-medium">{l.label}</span>
            <ChevronRight
              size={16}
              className={`ml-auto transition-transform duration-200 group-active:translate-x-1 ${isActive(l.path) ? "text-white/55" : "text-[#1a2d47]/25"}`}
            />
          </button>
        ))}

        <div className="h-px bg-[#1a2d47]/8 mx-4 my-2.5" />

        <button
          onClick={() => handleNav("/ppdb")}
          style={{ transitionDelay: mobileOpen ? `${70 + NAV_LINKS.length * 45}ms` : "0ms" }}
          className={`w-full bg-[#284061] active:bg-[#1a2d47] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_24px_-12px_rgba(40,64,97,.7)] transition-[opacity,translate,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Daftar PPDB <ArrowRight size={16} />
        </button>
      </div>

      {/* ─── PAGE OUTLET ─── */}
      {/* pt-20 memberi ruang untuk pil yang mengambang (top-3 + tinggi 60px).
          Hero beranda menariknya kembali dengan -mt-20 supaya latarnya menerus
          sampai tepi atas layar. */}
      <main className="pt-20">
        <Outlet />
      </main>
      {/* ─── FOOTER ─── */}
      <footer className="bg-linear-to-br from-[#1a2d47] to-[#0f1f33] pt-16 lg:pt-20">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.2fr] gap-10 lg:gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logoPolos} width={28} alt="" />
                <span className="text-sm font-bold text-white">Pesantren Al Kautsar</span>
              </div>
              <p className="text-[13px] text-white/40 leading-[1.75] max-w-xs mb-5 font-light">
                Lembaga Pendidikan Islam di Sidoarjo — bermanhaj Ahlussunnah wal Jamaah, memadukan Kemenag dan Kemendikdasmen dalam sistem kepesantrenan 6 tahun.
              </p>

              <div className="flex gap-2">

                <a href="https://www.facebook.com/share/18pHZcpQzX/" className="w-9 h-9 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center hover:bg-amber-500 hover:border-transparent hover:-translate-y-0.5 transition-all cursor-pointer text-white/70 hover:text-white">
                    <FacebookIcon size={15} />
                </a>
                <a href="https://www.instagram.com/pesantrenalkautsarsidoarjo?igsh=bzNsYXNneTFyeXk3" className="w-9 h-9 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center hover:bg-amber-500 hover:border-transparent hover:-translate-y-0.5 transition-all cursor-pointer text-white/70 hover:text-white">
                    <InstagramIcon size={15} />
                </a>
                <a href="https://m.youtube.com/@pesantrenalkautsarsidoarjo" className="w-9 h-9 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center hover:bg-amber-500 hover:border-transparent hover:-translate-y-0.5 transition-all cursor-pointer text-white/70 hover:text-white">
                    <YoutubeIcon size={15} />
                </a>
                <a className="w-9 h-9 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center hover:bg-amber-500 hover:border-transparent hover:-translate-y-0.5 transition-all cursor-pointer text-white/70 hover:text-white">
                    <MessageCircle size={15} />
                </a>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-white/30 mb-4">Navigasi</div>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <button onClick={() => handleNav(l.path)} className="text-[13px] text-white/45 hover:text-amber-300 transition-colors text-left">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-white/30 mb-4">Program</div>
              <ul className="space-y-2.5">
                {["Aqidah Ahlussunnah", "Bahasa Arab Aktif", "Discovery Task PISA", "Super Camp UTBK", "SIPOS Al Kautsar", "ITS Tekno Web Design"].map((p) => (
                  <li key={p}>
                    <a className="text-[13px] text-white/45 hover:text-amber-300 transition-colors cursor-pointer">{p}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-white/30 mb-4">Kontak</div>
              {[
                [MapPin, "Jl. Besuk RT 11 RW 04 Sambungrejo, Sukodono, Sidoarjo 61258", null],
                [Phone, "Humas Putra : 0822-4169-6699", "https://wa.me/6282241696699"],
                [Phone, "Humas Putri : 0851-8607-7077", "https://wa.me/6285186077077"],
              ].map(([Icon, t, href], i) => (
                <div key={i} className="flex gap-2.5 items-start mb-3">
                  <Icon size={14} className="text-white/50 mt-0.5 shrink-0" />
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group">
                      <MessageCircle size={12} className="shrink-0" />
                      {t}
                      <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded-full leading-none group-hover:bg-emerald-500/30 transition-colors">WA</span>
                    </a>
                  ) : (
                    <span className="text-[12.5px] text-white/45 leading-[1.55] font-light">{t}</span>
                  )}
                </div>
              ))}
            </div>
          </div>


          <div className="h-px bg-white/6" />
          <div className="flex justify-between items-center py-5 flex-wrap gap-3">
            <span className="text-[12px] text-white/25">© 2026 Pesantren Al Kautsar Sidoarjo. Hak cipta dilindungi.</span>
            <div className="flex gap-5">
              <a className="text-[12px] text-white/25 hover:text-amber-300 transition-colors cursor-pointer">Kebijakan Privasi</a>
              <a className="text-[12px] text-white/25 hover:text-amber-300 transition-colors cursor-pointer">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}