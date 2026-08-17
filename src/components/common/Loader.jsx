import logo from "../../assets/logo.png";

// Lama loader tampil, dalam milidetik. Diekspor supaya MainLayouts memakai
// angka yang sama — animasi garis di bawah bergantung padanya. Kalau nilai ini
// diubah, garisnya otomatis ikut menyesuaikan.
export const DURASI_LOADER = 1100;

// Latar krem, sama dengan hero — tidak ada kedip gelap→terang saat situs dibuka.
//
// Tanpa progress bar palsu. Versi lama beranimasi 1,5 detik sementara layarnya
// hilang di 1,2 detik, jadi barnya selalu terpotong sekitar 80%. Garis di sini
// tumbuh dari tengah dengan durasi yang sama persis dengan lama loader tampil,
// jadi dia benar-benar menandai sisa waktu.
export default function Loader({ loading }) {
  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#F6F2EA] flex flex-col items-center justify-center gap-7 transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!loading}
    >
      {/* Sapuan hangat samar dari atas — krem polos terasa mati, ini memberinya
          kedalaman tanpa terlihat sebagai elemen tersendiri. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(255,255,255,.75) 0%, rgba(246,242,234,0) 70%)",
        }}
      />

      <img
        src={logo}
        alt="Pesantren Al Kautsar"
        className="relative w-44 sm:w-52 animate-[ldMasuk_.6s_cubic-bezier(0.16,1,0.3,1)_both]"
      />

      <div className="relative w-28 h-0.5 rounded-full bg-[#1a2d47]/10 overflow-hidden">
        <div
          className="h-full w-full rounded-full bg-[#D48C1A] origin-center"
          style={{ animation: `ldGaris ${DURASI_LOADER}ms cubic-bezier(0.33,0,0.2,1) forwards` }}
        />
      </div>
    </div>
  );
}
