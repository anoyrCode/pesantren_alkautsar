import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { apiFetch, bacaJson, errorRamah, pesanError } from "../../utils/api";
import kompresGambar from "../../utils/kompresGambar";
import { JENJANG, rutaDashboard } from "../../utils/jenjang";
import SantriForm, { EMPTY_FORM } from "../../components/admin/SantriForm";

function getToken() {
  return localStorage.getItem("admin_token");
}

// Sama seperti di FormulirPage.jsx — diselaraskan dengan MAKS_UKURAN_BUKTI di
// backend/routes/pendaftaran.js, mengikuti batas proxy di depan backend.
const MAKS_UKURAN_BUKTI = 1_000_000; // ~977 KiB

function mapDbToForm(d) {
  return {
    namaLengkap: d.nama_lengkap || "", nomorOrtu: d.nomor_hp_ortu || "", emailOrtu: d.email_ortu || "", jenisKelamin: d.jenis_kelamin?.trim() || "",
    tempatLahir: d.tempat_lahir || "", nikSantri: d.nik_santri?.trim() || "", nomorKK: d.nomor_kk?.trim() || "", nisn: d.nisn?.trim() || "",
    hobi: d.hobi || "", citaCita: d.cita_cita || "", anakKe: d.anak_ke ?? "", beratBadan: d.berat_badan ?? "", tinggiBadan: d.tinggi_badan ?? "",
    golDarah: d.golongan_darah || "", penyakit: d.penyakit || "",
    alamatRumah: d.alamat_rumah || "", kelurahan: d.kelurahan || "", kecamatan: d.kecamatan || "", kabupaten: d.kabupaten || "", provinsi: d.provinsi || "", statusRumah: d.status_rumah || "",
    namaAyah: d.nama_ayah || "", nikAyah: d.nik_ayah?.trim() || "", waAyah: d.wa_ayah || "", pendidikanAyah: d.pendidikan_ayah || "", pekerjaanAyah: d.pekerjaan_ayah || "", gajiAyah: d.gaji_ayah || "", statusNikahAyah: d.status_nikah_ayah || "",
    namaIbu: d.nama_ibu || "", nikIbu: d.nik_ibu?.trim() || "", waIbu: d.wa_ibu || "", pendidikanIbu: d.pendidikan_ibu || "", pekerjaanIbu: d.pekerjaan_ibu || "", gajiIbu: d.gaji_ibu || "", statusNikahIbu: d.status_nikah_ibu || "",
    namaWali: d.nama_wali || "", waWali: d.wa_wali || "",
    sekolahAsal: d.sekolah_asal || "", alamatSekolah: d.alamat_sekolah || "", npsn: d.npsn?.trim() || "",
    status: d.status || "Menunggu",
    jenjang: d.jenjang || "MTS_SMA",
    // tanggal_lahir tiba sebagai "YYYY-MM-DD" (diatur di backend), cocok langsung
    // dengan <input type="date">.
    tanggalLahir: d.tanggal_lahir ? String(d.tanggal_lahir).slice(0, 10) : "",
    kelasTujuan: d.kelas_tujuan || "", dariKelas: d.dari_kelas || "",
    alamatWali: d.alamat_wali || "", jkWali: d.jk_wali || "", pendidikanWali: d.pendidikan_wali || "",
    pekerjaanWali: d.pekerjaan_wali || "", gajiWali: d.gaji_wali || "",
  };
}

export default function AdminSantriForm() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const mode     = id ? "edit" : "add";

  // /admin/santri/baru?jenjang=SD — jenjang ditentukan oleh tab dashboard yang
  // membuka form ini, bukan dipilih lagi di sini. Tanpa parameter (alamat diketik
  // langsung) jatuh ke MTs/SMA; jenjangnya selalu tertulis di bilah atas form.
  const [searchParams] = useSearchParams();
  const jenjangAwal = ["MTS_SMA", "SD"].includes(searchParams.get("jenjang")) ? searchParams.get("jenjang") : "MTS_SMA";

  const [form, setForm]         = useState({ ...EMPTY_FORM, jenjang: jenjangAwal });
  const [files, setFiles]       = useState({ bukti_transfer: null });
  const [currentUrls, setCurrentUrls] = useState({});
  const [loading, setLoading]   = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (mode !== "edit") return;
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
      .then((json) => {
        if (!json) return;
        setForm(mapDbToForm(json.data));
        setCurrentUrls({ bukti: json.data.url_bukti_transfer });
      })
      .catch(() => setErrorMsg("Gagal memuat data."))
      .finally(() => setLoading(false));
  }, [id, mode, navigate]);

  function onFile(key, file) {
    setFiles((f) => ({ ...f, [key]: file }));
  }

  async function submit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);
    try {
      let buktiTransfer = null;
      if (files.bukti_transfer) {
        buktiTransfer = await kompresGambar(files.bukti_transfer);
        if (buktiTransfer.size > MAKS_UKURAN_BUKTI) {
          throw errorRamah(
            `Ukuran bukti transfer masih ${(buktiTransfer.size / 1_000_000).toFixed(1)} MB, melebihi batas 1 MB. ` +
            "Coba screenshot ulang dengan area yang lebih kecil, atau potong (crop) gambarnya."
          );
        }
      }

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ""));
      if (buktiTransfer) fd.append("bukti_transfer", buktiTransfer);

      const url    = mode === "edit" ? `/api/pendaftaran/${id}` : "/api/pendaftaran/admin";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await apiFetch(url, {
        method,
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
        return;
      }

      const json = await bacaJson(res);
      if (!res.ok) throw errorRamah(json.error || "Gagal menyimpan data.");

      navigate(mode === "edit" ? `/admin/santri/${id}` : rutaDashboard(form.jenjang));
    } catch (err) {
      setErrorMsg(pesanError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#284061] border-t-transparent animate-spin" />
        <p className="text-sm text-slate-400">Memuat data...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-sm">
        <div className="w-[min(1180px,92vw)] mx-auto h-14 flex items-center gap-3">
          <button
            onClick={() => navigate(mode === "edit" ? `/admin/santri/${id}` : rutaDashboard(form.jenjang))}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#284061] hover:text-amber-600 transition-colors"
          >
            <ArrowLeft size={15} /> Kembali
          </button>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-[13px] font-bold text-[#284061]">
            {mode === "edit" ? "Edit Data Pendaftar" : "Tambah Data Pendaftar"}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold ${form.jenjang === "SD" ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-600"}`}>
            {JENJANG[form.jenjang]?.nama}
          </span>
        </div>
      </div>

      <div className="w-[min(1180px,92vw)] mx-auto py-8">
        <SantriForm
          mode={mode}
          form={form}
          setForm={setForm}
          onFile={onFile}
          currentUrls={currentUrls}
          onSubmit={submit}
          submitting={submitting}
          errorMsg={errorMsg}
        />
      </div>
    </div>
  );
}
