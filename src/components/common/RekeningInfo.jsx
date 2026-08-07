import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Landmark, QrCode, Copy, Check, ZoomIn, X } from "lucide-react";
import qrisSrc from "../../assets/format_qris/qris.jpeg";

const REKENING = {
  bank: "BSI (Bank Syariah Indonesia)",
  kodeBank: "451",
  nomor: "6006001104",
  atasNama: "Pondok Pesantren Al Kautsar Sidoarjo",
  nominal: "Rp 450.000",
};

const QRIS = {
  merchant: "PONPES AL KAUTSAR SDA",
  nmid: "ID1026564531329",
};

function BarisRekening({ label, children }) {
  return (
    <div className="sm:grid sm:grid-cols-[112px_1fr] sm:items-baseline sm:gap-3">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5 sm:mb-0">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function TabButton({ active, onClick, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12.5px] font-bold transition-all ${
        active ? "bg-white text-[#284061] shadow-sm" : "text-slate-500 hover:text-[#284061]"
      }`}
    >
      {icon} {children}
    </button>
  );
}

// Gambar QRIS resmi ditampilkan utuh apa adanya — sengaja tidak dipotong/diproses,
// karena crop yang meleset sedikit saja bisa merusak kotak posisi QR dan membuat
// kode gagal dipindai.
function QrisLightbox({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="QRIS ukuran penuh"
      className="fixed inset-0 z-[1001] bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <img
        src={qrisSrc}
        alt={`QRIS ${QRIS.merchant}`}
        className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
      >
        <X size={18} />
      </button>
    </div>,
    document.body
  );
}

export default function RekeningInfo() {
  const [tab, setTab] = useState("qris");
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(false);

  async function salin() {
    try {
      await navigator.clipboard.writeText(REKENING.nomor);
    } catch {
      // Fallback: browser lawas / halaman non-HTTPS tidak punya Clipboard API
      const ta = document.createElement("textarea");
      ta.value = REKENING.nomor;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mb-6 rounded-xl border border-amber-100 bg-amber-50/60 p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-white border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
          <Landmark size={15} />
        </div>
        <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-[#284061]">
          Pembayaran Biaya Registrasi
        </h3>
      </div>

      <div className="flex gap-1 p-1 mb-4 rounded-xl bg-amber-100/60">
        <TabButton active={tab === "qris"} onClick={() => setTab("qris")} icon={<QrCode size={14} />}>
          QRIS
        </TabButton>
        <TabButton active={tab === "bank"} onClick={() => setTab("bank")} icon={<Landmark size={14} />}>
          Transfer Bank
        </TabButton>
      </div>

      {tab === "qris" ? (
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="group relative w-full max-w-[240px] rounded-xl border border-amber-100 bg-white p-3 shadow-sm"
          >
            <img src={qrisSrc} alt={`QRIS ${QRIS.merchant}`} className="w-full h-auto rounded-lg" />
            <span className="absolute inset-3 rounded-lg bg-[#284061]/0 group-hover:bg-[#284061]/5 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#284061] text-white text-[11px] font-semibold">
                <ZoomIn size={12} /> Perbesar
              </span>
            </span>
          </button>

          <dl className="mt-3 flex flex-col items-center gap-0.5 text-center">
            <dt className="sr-only">Nama Merchant</dt>
            <dd className="text-[13px] font-bold text-[#284061]">{QRIS.merchant}</dd>
            <dd className="text-[11px] text-slate-500 font-mono">NMID {QRIS.nmid}</dd>
            <dd className="mt-1.5 text-[13px] font-bold text-[#284061]">{REKENING.nominal}</dd>
          </dl>
        </div>
      ) : (
        <dl className="flex flex-col gap-3">
          <BarisRekening label="Bank">
            <span className="text-[13px] font-semibold text-[#284061]">{REKENING.bank}</span>
            <span className="text-[12px] text-slate-500"> · Kode {REKENING.kodeBank}</span>
          </BarisRekening>
          <BarisRekening label="No. Rekening">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[16px] font-bold tracking-wider text-[#284061] wrap-break-word">
                {REKENING.nomor}
              </span>
              <button
                type="button"
                onClick={salin}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-200 bg-white text-[11.5px] font-semibold text-amber-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all"
              >
                {copied ? <><Check size={12} /> Tersalin</> : <><Copy size={12} /> Salin</>}
              </button>
            </div>
          </BarisRekening>
          <BarisRekening label="Atas Nama">
            <span className="text-[13px] font-semibold text-[#284061]">{REKENING.atasNama}</span>
          </BarisRekening>
          <BarisRekening label="Nominal">
            <span className="text-[13px] font-bold text-[#284061]">{REKENING.nominal}</span>
          </BarisRekening>
        </dl>
      )}

      <p className="mt-4 pt-3 border-t border-amber-100 text-[12px] text-slate-500 leading-[1.6]">
        Simpan bukti {tab === "qris" ? "pembayaran" : "transfer"}, lalu unggah di kolom di bawah.
      </p>

      {zoom && <QrisLightbox onClose={() => setZoom(false)} />}
    </div>
  );
}
