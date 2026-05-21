import { UtensilsCrossed, Shirt, Wifi, Heart, Home, Wind, House, Monitor } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";

const FASILITAS = [
  [UtensilsCrossed, "Makan Bergizi 3x", "Menu bergizi 3 kali sehari untuk tumbuh kembang santri yang optimal"],
  [Shirt, "Laundry Harian", "Fasilitas cuci tiap hari agar pakaian selalu bersih, rapi, dan siap pakai"],
  [Wifi, "110 CCTV Aktif", "Online & offline di seluruh area pesantren, anti-bullying dan anti-LGBT"],
  [Heart, "Layanan Kesehatan", "Tenaga kesehatan siap memantau kondisi santri setiap saat"],
  [Home, "Asrama Nyaman", "Kamar bersih, rapi, dengan pengecekan rutin sesuai budaya 5R"],
  [Wind, "Kelas Ber-AC", "Ruang belajar nyaman dengan pendingin udara agar santri fokus dan kondusif"],
  [House, "Libur 5 Hari/Bulan", "Santri pulang 5 hari setiap bulan untuk berbakti kepada orang tua"],
  [Monitor, "LMS Digital", "Monitoring nilai, absensi & poin karakter secara real-time"],
];

export default function FasilitasGrid() {
  return (
    <Reveal>
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
          <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> Sarana & Prasarana
        </div>
        <h2 className="mb-7" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,40px)", color: "#284061", lineHeight: "1.15" }}>
          Fasilitas <em className="italic text-amber-500">Lengkap</em>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {FASILITAS.map(([Icon, t, d], k) => (
            <Reveal key={t} delay={k * 50}>
              <div className="group bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                {/* Hover bg tint */}
                <div className="absolute inset-0 bg-linear-to-br from-[#284061]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#284061] to-amber-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#284061] mb-3.5 group-hover:bg-linear-to-br group-hover:from-[#284061] group-hover:to-[#1a2d47] group-hover:text-white group-hover:border-transparent group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#284061]/25 transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-[12.5px] font-bold text-[#284061] mb-1.5">{t}</h4>
                  <p className="text-[11.5px] text-slate-500 leading-[1.55] font-light">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
