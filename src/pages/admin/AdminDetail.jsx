import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileDown } from "lucide-react";
import { apiFetch } from "../../utils/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function getToken() {
  return localStorage.getItem("admin_token");
}

function Field({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-800 wrap-break-word">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-4 border-b pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

function exportPDF(d) {
  const doc      = new jsPDF({ unit: "mm", format: "a4" });
  const PAGE_W   = 210;
  const MARGIN   = 14;
  const C_NAVY   = [40, 64, 97];
  const C_GRAY   = [90, 90, 90];
  const C_LIGHT  = [240, 245, 252];

  // ── Header banner ──
  doc.setFillColor(...C_NAVY);
  doc.rect(0, 0, PAGE_W, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("PESANTREN AL KAUTSAR", MARGIN, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("Formulir Pendaftaran Peserta Didik Baru (PPDB) 2027/2028", MARGIN, 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(d.nomor_pendaftaran, PAGE_W - MARGIN, 16, { align: "right" });

  let y = 36;

  function section(title, rows) {
    const filtered = rows.filter(([, v]) => v != null && String(v).trim() !== "");
    if (!filtered.length) return;
    autoTable(doc, {
      startY: y,
      head: [[{ content: title, colSpan: 2 }]],
      body: filtered,
      theme: "plain",
      margin: { left: MARGIN, right: MARGIN },
      styles: {
        fontSize: 8.5,
        cellPadding: { top: 2.8, bottom: 2.8, left: 3.5, right: 3.5 },
        lineColor: [220, 225, 235],
        lineWidth: 0.15,
        textColor: [30, 30, 30],
      },
      headStyles: {
        fillColor: C_LIGHT,
        textColor: C_NAVY,
        fontStyle: "bold",
        fontSize: 8.5,
        lineColor: C_LIGHT,
      },
      columnStyles: {
        0: { cellWidth: 54, textColor: C_GRAY },
        1: { cellWidth: "auto" },
      },
      alternateRowStyles: { fillColor: [250, 252, 255] },
    });
    y = doc.lastAutoTable.finalY + 5;
  }

  section("DATA SANTRI", [
    ["Nama Lengkap",            d.nama_lengkap],
    ["Jenis Kelamin",           d.jenis_kelamin?.trim()],
    ["Tempat Lahir",            d.tempat_lahir],
    ["NIK",                     d.nik_santri],
    ["Nomor KK",                d.nomor_kk],
    ["NISN",                    d.nisn],
    ["Golongan Darah",          d.golongan_darah],
    ["Berat Badan",             d.berat_badan ? `${d.berat_badan} kg` : null],
    ["Tinggi Badan",            d.tinggi_badan ? `${d.tinggi_badan} cm` : null],
    ["Anak ke-",                d.anak_ke?.toString()],
    ["Hobi",                    d.hobi],
    ["Cita-cita",               d.cita_cita],
    ["Penyakit / Kondisi",      d.penyakit],
    ["No. HP Orang Tua",        d.nomor_hp_ortu],
    ["Email Orang Tua",         d.email_ortu],
  ]);

  section("ALAMAT", [
    ["Alamat Rumah",   d.alamat_rumah],
    ["Kelurahan",      d.kelurahan],
    ["Kecamatan",      d.kecamatan],
    ["Kabupaten/Kota", d.kabupaten],
    ["Provinsi",       d.provinsi],
    ["Status Rumah",   d.status_rumah],
  ]);

  section("DATA AYAH", [
    ["Nama",         d.nama_ayah],
    ["NIK",          d.nik_ayah],
    ["No. WhatsApp", d.wa_ayah],
    ["Pendidikan",   d.pendidikan_ayah],
    ["Pekerjaan",    d.pekerjaan_ayah],
    ["Penghasilan",  d.gaji_ayah],
    ["Status Nikah", d.status_nikah_ayah],
  ]);

  section("DATA IBU", [
    ["Nama",         d.nama_ibu],
    ["NIK",          d.nik_ibu],
    ["No. WhatsApp", d.wa_ibu],
    ["Pendidikan",   d.pendidikan_ibu],
    ["Pekerjaan",    d.pekerjaan_ibu],
    ["Penghasilan",  d.gaji_ibu],
    ["Status Nikah", d.status_nikah_ibu],
  ]);

  if (d.nama_wali || d.wa_wali) {
    section("DATA WALI", [
      ["Nama Wali",    d.nama_wali],
      ["No. WhatsApp", d.wa_wali],
    ]);
  }

  section("ASAL SEKOLAH", [
    ["Nama Sekolah",    d.sekolah_asal],
    ["NPSN",            d.npsn],
    ["Alamat Sekolah",  d.alamat_sekolah],
  ]);

  section("DOKUMEN", [
    ["Foto Santri",    d.url_foto_santri],
    ["Bukti Transfer", d.url_bukti_transfer],
  ]);

  // ── Footer tiap halaman ──
  const total = doc.internal.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setDrawColor(...C_NAVY);
    doc.setLineWidth(0.25);
    doc.line(MARGIN, 285, PAGE_W - MARGIN, 285);
    doc.setFontSize(7.5);
    doc.setTextColor(...C_GRAY);
    doc.setFont("helvetica", "normal");
    doc.text(`Dicetak: ${new Date().toLocaleString("id-ID")}`, MARGIN, 290);
    doc.text(`Halaman ${i} / ${total}`, PAGE_W - MARGIN, 290, { align: "right" });
  }

  doc.save(`${d.nomor_pendaftaran} - ${d.nama_lengkap}.pdf`);
}

export default function AdminDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [d, setD] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/api/pendaftaran/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem("admin_token");
          navigate("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((json) => { if (json) setD(json.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">Memuat...</div>;
  if (!d)      return <div className="min-h-screen flex items-center justify-center text-red-500 text-sm">Data tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={16} />
          Kembali
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-800">{d.nama_lengkap}</h1>
          <p className="text-xs text-gray-500 font-mono">{d.nomor_pendaftaran}</p>
        </div>
        <button
          onClick={() => exportPDF(d)}
          className="ml-auto flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          <FileDown size={15} />
          Export PDF
        </button>
      </header>

      <main className="px-6 py-6 max-w-5xl mx-auto space-y-4">
        {/* Dokumen */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-4 border-b pb-2">
            Dokumen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DocCard label="Foto Santri"    url={d.url_foto_santri} />
            <DocCard label="Bukti Transfer" url={d.url_bukti_transfer} />
          </div>
        </div>

        <Section title="Data Santri">
          <Field label="Nama Lengkap"    value={d.nama_lengkap} />
          <Field label="Jenis Kelamin"   value={d.jenis_kelamin} />
          <Field label="Tempat Lahir"    value={d.tempat_lahir} />
          <Field label="NIK Santri"      value={d.nik_santri} />
          <Field label="Nomor KK"        value={d.nomor_kk} />
          <Field label="NISN"            value={d.nisn} />
          <Field label="Golongan Darah"  value={d.golongan_darah} />
          <Field label="Berat Badan"     value={d.berat_badan ? `${d.berat_badan} kg` : null} />
          <Field label="Tinggi Badan"    value={d.tinggi_badan ? `${d.tinggi_badan} cm` : null} />
          <Field label="Anak ke-"        value={d.anak_ke?.toString()} />
          <Field label="Hobi"            value={d.hobi} />
          <Field label="Cita-cita"       value={d.cita_cita} />
          <Field label="Penyakit"        value={d.penyakit} />
          <Field label="No. HP Ortu"     value={d.nomor_hp_ortu} />
          <Field label="Email Ortu"      value={d.email_ortu} />
        </Section>

        <Section title="Alamat">
          <Field label="Alamat Rumah"  value={d.alamat_rumah} />
          <Field label="Kelurahan"     value={d.kelurahan} />
          <Field label="Kecamatan"     value={d.kecamatan} />
          <Field label="Kabupaten"     value={d.kabupaten} />
          <Field label="Provinsi"      value={d.provinsi} />
          <Field label="Status Rumah"  value={d.status_rumah} />
        </Section>

        <Section title="Data Ayah">
          <Field label="Nama Ayah"    value={d.nama_ayah} />
          <Field label="NIK Ayah"     value={d.nik_ayah} />
          <Field label="No. WA Ayah"  value={d.wa_ayah} />
          <Field label="Pendidikan"   value={d.pendidikan_ayah} />
          <Field label="Pekerjaan"    value={d.pekerjaan_ayah} />
          <Field label="Penghasilan"  value={d.gaji_ayah} />
          <Field label="Status Nikah" value={d.status_nikah_ayah} />
        </Section>

        <Section title="Data Ibu">
          <Field label="Nama Ibu"     value={d.nama_ibu} />
          <Field label="NIK Ibu"      value={d.nik_ibu} />
          <Field label="No. WA Ibu"   value={d.wa_ibu} />
          <Field label="Pendidikan"   value={d.pendidikan_ibu} />
          <Field label="Pekerjaan"    value={d.pekerjaan_ibu} />
          <Field label="Penghasilan"  value={d.gaji_ibu} />
          <Field label="Status Nikah" value={d.status_nikah_ibu} />
        </Section>

        {(d.nama_wali || d.wa_wali) && (
          <Section title="Data Wali">
            <Field label="Nama Wali"   value={d.nama_wali} />
            <Field label="No. WA Wali" value={d.wa_wali} />
          </Section>
        )}

        <Section title="Asal Sekolah">
          <Field label="Nama Sekolah"   value={d.sekolah_asal} />
          <Field label="NPSN"           value={d.npsn} />
          <Field label="Alamat Sekolah" value={d.alamat_sekolah} />
        </Section>

        <p className="text-xs text-gray-400 text-right pb-4">
          Didaftarkan: {new Date(d.created_at).toLocaleString("id-ID")}
        </p>
      </main>
    </div>
  );
}

function DocCard({ label, url }) {
  if (!url) return null;
  const isImage = /\.(jpg|jpeg|png)$/i.test(url);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <p className="text-xs text-gray-500 px-3 pt-3 pb-2 font-medium">{label}</p>
      {isImage ? (
        <a href={url} target="_blank" rel="noreferrer">
          <img src={url} alt={label} className="w-full h-48 object-cover hover:opacity-90 transition" />
        </a>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3 pb-3 text-sm text-green-700 hover:underline"
        >
          <ExternalLink size={14} />
          Lihat Dokumen
        </a>
      )}
    </div>
  );
}
