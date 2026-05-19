import SectionHeader from "../common/SectionHeader";
import BentoCard from "../common/BentoCard";

export default function BentoSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader
          tag="Keunggulan"
          title="Sistem yang"
          italic="Sungguh Berbeda"
          description="Kami hadir bukan sekadar pesantren biasa — melainkan ekosistem pendidikan Islam terpadu yang komprehensif"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 md:auto-rows-[170px]">
          <BentoCard dark span="md:col-span-4 md:row-span-2" tag="Prioritas Utama" num="48" sub="jp" title="Aqidah Ahlussunnah" body="48 jam per pekan, sistematis dan mendalam sejak dini." emoji="📖" />
          <BentoCard dark span="md:col-span-4" tag="Bahasa Agama" num="48" sub="jp" title="Bahasa Arab Aktif" body="Bahasa pengantar & lingkungan sehari-hari." emoji="🗣️" />
          <BentoCard span="md:col-span-4" tag="Akademik" num="42" sub="jp" title="Math & Sains" body="Pola bimbel terstruktur, siap UTBK & PTN." emoji="🔬" />
          <BentoCard span="md:col-span-8" tag="Inovasi Pembelajaran" title="Discovery Task · Standar Internasional PISA" body="Santri saling bertukar pendapat, guru sebagai fasilitator. Diterapkan untuk Diniyah maupun pelajaran umum dengan evaluasi real-time." emoji="🎯" chips={["PISA", "Diniyah", "Kolaboratif", "Real-Time"]} />
          <BentoCard gold span="md:col-span-4" tag="Digital" title="LMS Al Kautsar" body="Nilai · Absensi · Poin karakter — real-time untuk guru, santri & orang tua." emoji="💻" />
          <BentoCard dark span="md:col-span-6" tag="Keamanan" multiStats={[["24", "jam", "3 Shift"], ["110", "", "CCTV"], ["1:10", "", "Musyrif"]]} body="Anti-bullying · Anti-LGBT · Pengawasan penuh" emoji="🛡️" />
          <BentoCard span="md:col-span-6" tag="Karir & Kapasitas" title="Lebih dari Sekadar PTN" body="Super Camp UTBK · Magang · Wirausaha · Agrobisnis · Manajemen Trainee · Web Design bersama ITS Tekno" emoji="🚀" chips={["UTBK", "Magang", "ITS Tekno"]} />
        </div>
      </div>
    </section>
  );
}