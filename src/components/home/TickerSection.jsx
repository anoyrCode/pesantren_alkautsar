export default function TickerSection() {
  const items = [
    "Aqidah Ahlussunnah wal Jamaah", "901 Santri Aktif", "Discovery Task Berbasis PISA",
    "SIPOS Real-Time", "Kemenag + Kemendikdasmen", "Pengawasan 24 Jam 110 CCTV",
    "Super Camp UTBK", "Sukodono, Sidoarjo 61258",
  ];

  return (
    // Krem satu tingkat lebih dalam dari hero: ticker terbaca sebagai pita
    // penutup hero, bukan section putih baru yang memotong mendadak.
    <div className="bg-[#E7DFD1] border-y border-[#1a2d47]/12 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marq_30s_linear_infinite]">
        {Array.from({ length: 2 }).flatMap((_, k) =>
          items.map((t, i) => (
            <span key={`${k}-${i}`} className="inline-flex items-center gap-3.5 px-6 text-[12.5px] font-medium text-slate-500">
              <span className="w-1 h-1 rounded-full bg-amber-500" /> {t}
            </span>
          ))
        )}
      </div>
    </div>
  );
}