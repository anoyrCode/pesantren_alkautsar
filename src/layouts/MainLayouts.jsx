import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { Menu, X, ArrowRight, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

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
import Loader from "../components/common/Loader";
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
    const t = setTimeout(() => setLoading(false), 1200);
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

  const isActive = (path) => location.pathname === path;

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden antialiased" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Loader loading={loading} />

      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-16 flex items-center justify-between transition-all duration-300 px-5 md:px-10 lg:px-16 border-b-2 border-black/10 overflow-hidden ${
          navSolid || mobileOpen ? "bg-white/35 backdrop-blur-xl shadow-sm border-b border-slate-100" : "bg-white/70 backdrop-blur-sm"
        }`}
      >
        {/* Subtle dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(40,64,97,0.045) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
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
          <button
            className="md:hidden p-2.5 rounded-xl bg-slate-100"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>


      {/* ─── MOBILE DRAWER ─── */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bottom-0 z-999 bg-white px-6 py-4 pb-8 flex flex-col gap-1 overflow-y-auto transition-transform duration-300 border-t border-slate-100 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {NAV_LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => handleNav(l.path)}
            className={`text-left px-4 py-3.5 rounded-2xl text-base font-medium transition-colors ${
              isActive(l.path) ? "bg-[#284061] text-white" : "text-slate-900 hover:bg-slate-100"
            }`}
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => handleNav("/ppdb")}
          className="mt-3 bg-[#284061] text-white font-bold py-4 rounded-2xl text-center shadow-lg flex items-center justify-center gap-2"
        >
          Daftar PPDB <ArrowRight size={16} />
        </button>
      </div>

      {/* ─── PAGE OUTLET ─── */}
      <main className="pt-16">
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
                Lembaga Pendidikan Islam di Sidoarjo — bermanhaj Ahlussunnah wal Jamaah, memadukan Kemenag dan Kemdikbud dalam sistem kepesantrenan 6 tahun.
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
                {["Aqidah Ahlussunnah", "Bahasa Arab Aktif", "Discovery Task PISA", "Super Camp UTBK", "LMS Al Kautsar", "ITS Tekno Web Design"].map((p) => (
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