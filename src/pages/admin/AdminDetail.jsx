import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { apiFetch } from "../../utils/api";

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

export default function AdminDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const [d, setD]  = useState(null);
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
      </header>

      <main className="px-6 py-6 max-w-5xl mx-auto space-y-4">
        {/* Dokumen */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-4 border-b pb-2">
            Dokumen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DocCard label="Foto Santri" url={d.url_foto_santri} />
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
          <Field label="Nama Ayah"       value={d.nama_ayah} />
          <Field label="NIK Ayah"        value={d.nik_ayah} />
          <Field label="No. WA Ayah"     value={d.wa_ayah} />
          <Field label="Pendidikan"      value={d.pendidikan_ayah} />
          <Field label="Pekerjaan"       value={d.pekerjaan_ayah} />
          <Field label="Penghasilan"     value={d.gaji_ayah} />
          <Field label="Status Nikah"    value={d.status_nikah_ayah} />
        </Section>

        <Section title="Data Ibu">
          <Field label="Nama Ibu"        value={d.nama_ibu} />
          <Field label="NIK Ibu"         value={d.nik_ibu} />
          <Field label="No. WA Ibu"      value={d.wa_ibu} />
          <Field label="Pendidikan"      value={d.pendidikan_ibu} />
          <Field label="Pekerjaan"       value={d.pekerjaan_ibu} />
          <Field label="Penghasilan"     value={d.gaji_ibu} />
          <Field label="Status Nikah"    value={d.status_nikah_ibu} />
        </Section>

        {(d.nama_wali || d.wa_wali) && (
          <Section title="Data Wali">
            <Field label="Nama Wali"   value={d.nama_wali} />
            <Field label="No. WA Wali" value={d.wa_wali} />
          </Section>
        )}

        <Section title="Asal Sekolah">
          <Field label="Nama Sekolah"    value={d.sekolah_asal} />
          <Field label="NPSN"            value={d.npsn} />
          <Field label="Alamat Sekolah"  value={d.alamat_sekolah} />
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
