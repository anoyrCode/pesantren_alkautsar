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
          {/* Angka yang sudah tampil di panel hero (48 Diniyah, 42 Sains, 110 CCTV,
              rasio 1:10) sengaja tidak diulang di sini — cukup judul dan
              penjelasannya. Yang tetap memakai angka hanya Bahasa Arab, justru
              karena 48 jp itulah satu-satunya pilar yang TIDAK muncul di hero. */}
          <BentoCard dark span="md:col-span-4 md:row-span-2" tag="Prioritas Utama" title="Aqidah Ahlussunnah" body="48 jam per pekan, sistematis dan mendalam sejak dini — porsi terbesar dalam seluruh kurikulum." />
          <BentoCard dark span="md:col-span-4" tag="Bahasa Agama" num="48" sub="jp" title="Bahasa Arab Aktif" body="Bahasa pengantar & lingkungan sehari-hari." />
          <BentoCard span="md:col-span-4" tag="Akademik" title="Math & Sains" body="Pola bimbel terstruktur, siap UTBK & PTN." />
          <BentoCard span="md:col-span-8" tag="Inovasi Pembelajaran" title="Discovery Task · Standar Internasional PISA" body="Santri saling bertukar pendapat, guru sebagai fasilitator. Diterapkan untuk Diniyah maupun pelajaran umum dengan evaluasi real-time." />
          <BentoCard span="md:col-span-4" tag="Digital" title="SIPOS Al Kautsar" body="Poin positif & negatif · Rekam medis santri — real-time untuk admin, staf & orang tua." />
          <BentoCard dark span="md:col-span-6" tag="Keamanan" title="Pengawasan Penuh 24 Jam" body="Tiga shift musyrif bergantian, didukung CCTV online & offline. Anti-bullying · Anti-LGBT." />
          <BentoCard span="md:col-span-6" tag="Karir & Kapasitas" title="Lebih dari Sekadar PTN" body="Super Camp UTBK · Magang · Wirausaha · Agrobisnis · Manajemen Trainee · Web Design bersama ITS Tekno" />
        </div>
      </div>
    </section>
  );
}