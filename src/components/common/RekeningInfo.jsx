import { useState } from "react";
import { Landmark, Copy, Check } from "lucide-react";

const REKENING = {
  bank: "BSI (Bank Syariah Indonesia)",
  kodeBank: "451",
  nomor: "6006001104",
  atasNama: "Pondok Pesantren Al Kautsar Sidoarjo",
  nominal: "Rp 450.000",
};

function BarisRekening({ label, children }) {
  return (
    <div className="sm:grid sm:grid-cols-[112px_1fr] sm:items-baseline sm:gap-3">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5 sm:mb-0">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function RekeningInfo() {
  const [copied, setCopied] = useState(false);

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
          Transfer Biaya Registrasi
        </h3>
      </div>

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

      <p className="mt-4 pt-3 border-t border-amber-100 text-[12px] text-slate-500 leading-[1.6]">
        Simpan bukti transfer, lalu unggah di kolom di bawah.
      </p>
    </div>
  );
}
