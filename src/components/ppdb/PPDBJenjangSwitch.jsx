import { Link } from "react-router-dom";
import { JENJANG } from "../../utils/jenjang";

// Pemilih jenjang di bagian atas kedua halaman PPDB. Dua alamat berbeda (/ppdb
// dan /ppdb/sd), jadi tiap pilihan berupa <Link> asli — bisa ditelusuri mesin
// pencari dan dibuka di tab baru, bukan tombol yang mengubah state.
//
// Tanpa garis tepi, kedalaman dari bayangan: sama seperti kartu hero lainnya.
export default function PPDBJenjangSwitch({ aktif }) {
  return (
    <nav
      aria-label="Pilih jenjang pendaftaran"
      className="inline-flex items-center gap-1 p-1 rounded-full bg-white/85 backdrop-blur shadow-[0_10px_26px_-16px_rgba(26,45,71,.5)]"
    >
      <span className="pl-3.5 pr-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        Jenjang
      </span>
      {Object.values(JENJANG).map((j) => {
        const aktifSekarang = j.kode === aktif;
        return (
          <Link
            key={j.kode}
            to={j.ppdb}
            aria-current={aktifSekarang ? "page" : undefined}
            className={`px-4 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors ${
              aktifSekarang ? "bg-[#1a2d47] text-white" : "text-[#1a2d47] hover:bg-[#1a2d47]/8"
            }`}
          >
            {j.nama}
          </Link>
        );
      })}
    </nav>
  );
}
