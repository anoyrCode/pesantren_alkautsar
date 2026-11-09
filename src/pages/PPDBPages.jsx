import SEO from "../components/common/SEO";
import PPDBHero from "../components/ppdb/PPDBHero";
import PPDBTimeline from "../components/ppdb/PPDBTimeline";
import PPDBDokumen from "../components/ppdb/PPDBDokumen";
import PPDBBiaya from "../components/ppdb/PPDBBiaya";
import PPDBTestimoni from "../components/ppdb/PPDBTestimoni";
import PPDBFaq from "../components/ppdb/PPDBFaq";
import CTABlock from "../components/common/CTABlock";
import { JENJANG } from "../utils/jenjang";

// Satu halaman untuk dua jenjang: /ppdb (MTs & SMA) dan /ppdb/sd. Tanggal,
// biaya, dan isi tiap bagian dipilih dari prop `jenjang`.
const SEO_JENJANG = {
  MTS_SMA: {
    title: "PPDB MTs & SMA 2027/2028 — Pendaftaran Santri Baru",
    description: "Penerimaan Peserta Didik Baru (PPDB) jenjang MTs dan SMA Pesantren Al Kautsar. Informasi lengkap jadwal pendaftaran, persyaratan dokumen, biaya, dan alur seleksi masuk pesantren.",
  },
  SD: {
    title: "PPDB SD 2027/2028 — Pendaftaran Santri Baru Jenjang SD",
    description: "Penerimaan Peserta Didik Baru (PPDB) jenjang SD Pesantren Al Kautsar Sidoarjo. Informasi jadwal pendaftaran, persyaratan, biaya pendidikan, dan alur seleksi untuk calon siswa kelas 1 dan siswa pindahan.",
  },
};

export default function PPDBPage({ jenjang = "MTS_SMA" }) {
  const cfg = JENJANG[jenjang];
  const sd = jenjang === "SD";

  return (
    <>
      <SEO
        title={SEO_JENJANG[jenjang].title}
        description={SEO_JENJANG[jenjang].description}
        path={cfg.ppdb}
      />
      <PPDBHero jenjang={jenjang} />
      <PPDBTimeline jenjang={jenjang} />
      <PPDBDokumen jenjang={jenjang} />
      <PPDBBiaya jenjang={jenjang} />
      {/* Bagian keunggulan ini menjual kehidupan berasrama (musyrif 24 jam, dll),
          jadi tidak ditampilkan di halaman SD yang pulang-pergi. */}
      {!sd && <PPDBTestimoni />}
      <PPDBFaq jenjang={jenjang} />
      <CTABlock
        title="Pendaftaran Dibuka"
        emTitle="Tahun Ajaran 2027/2028"
        sub={`Lengkapi formulir dan unggah dokumen yang diminta. Pendaftaran ${sd ? "SD " : ""}dibuka ${cfg.periodeLabel.replace(" – ", " sampai ")}.`}
        to={cfg.formulir}
        secondaryHref="https://wa.me/6282241696699"
        primaryLabel="Isi Formulir"
        secondaryLabel="Hubungi Admin"
      />
    </>
  );
}
