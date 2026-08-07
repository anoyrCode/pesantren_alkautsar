import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { GA } from "../../utils/analytics";

const NOMOR_WA = "62895329572147";
const PESAN_AWAL = "Assalamu'alaikum, saya butuh bantuan mengisi formulir pendaftaran PPDB Al Kautsar.";

// Logo resmi WhatsApp (path dari simple-icons, dipakai inline supaya tidak
// nambah dependency baru hanya untuk satu ikon merek).
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.148-.669.149-.198.297-.767.966-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function WhatsAppHelp() {
  const [buka, setBuka] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!buka) return;
    function tutupJikaDiluar(e) {
      if (ref.current && !ref.current.contains(e.target)) setBuka(false);
    }
    function tutupJikaEsc(e) {
      if (e.key === "Escape") setBuka(false);
    }
    document.addEventListener("mousedown", tutupJikaDiluar);
    window.addEventListener("keydown", tutupJikaEsc);
    return () => {
      document.removeEventListener("mousedown", tutupJikaDiluar);
      window.removeEventListener("keydown", tutupJikaEsc);
    };
  }, [buka]);

  function chat() {
    GA.whatsappClick();
    window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(PESAN_AWAL)}`, "_blank", "noopener,noreferrer");
    setBuka(false);
  }

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <style>{`
        @keyframes wahU{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
        @keyframes wahPing{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.9);opacity:0}}
      `}</style>

      {buka && (
        <div
          role="dialog"
          aria-label="Bantuan WhatsApp"
          className="w-72 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-slate-100 overflow-hidden"
          style={{ animation: "wahU .25s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <div className="bg-linear-to-br from-emerald-500 to-emerald-600 px-4 py-3.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0">
                <WhatsAppIcon size={18} />
              </div>
              <div>
                <p className="text-[13.5px] font-bold text-white leading-tight">Admin PPDB</p>
                <p className="text-[11px] text-white/75 leading-tight flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" /> Online
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Tutup"
              onClick={() => setBuka(false)}
              className="text-white/70 hover:text-white transition-colors shrink-0"
            >
              <X size={17} />
            </button>
          </div>

          <div className="p-4">
            <p className="text-[12.5px] text-slate-500 leading-relaxed mb-3.5">
              Ada kendala saat mengisi formulir? Chat admin kami langsung, kami bantu sampai selesai.
            </p>
            <button
              type="button"
              onClick={chat}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-[12.5px] font-semibold transition-colors"
            >
              <WhatsAppIcon size={15} /> Chat via WhatsApp
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setBuka((v) => !v)}
        aria-label={buka ? "Tutup bantuan WhatsApp" : "Butuh bantuan? Chat via WhatsApp"}
        aria-expanded={buka}
        className="group relative inline-flex items-center gap-2.5 bg-linear-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white pl-3.5 pr-4 py-3 rounded-full shadow-xl shadow-emerald-900/25 transition-all hover:-translate-y-0.5"
      >
        {!buka && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 pointer-events-none" style={{ animation: "wahPing 2.2s cubic-bezier(0,0,0.2,1) infinite" }} />
        )}
        <span className="relative w-6 h-6 shrink-0 flex items-center justify-center">
          {buka ? <X size={20} /> : <WhatsAppIcon size={20} />}
        </span>
        <span className="relative text-[13px] font-bold whitespace-nowrap">
          {buka ? "Tutup" : "Butuh Bantuan?"}
        </span>
      </button>
    </div>
  );
}
