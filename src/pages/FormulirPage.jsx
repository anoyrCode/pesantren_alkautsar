import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, ChevronDown, Upload } from "lucide-react";
import { GILDA_FONT } from "../utils/constants";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import { GA } from "../utils/analytics";
import { apiFetch } from "../utils/api";

function Field({ label, placeholder, type = "text", value, onChange, required, className = "", maxLength, minLength, pattern, title, inputMode }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[12.5px] font-semibold text-[#284061]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        {maxLength && <span className="text-slate-400 font-normal ml-1">({maxLength} digit)</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        title={title}
        inputMode={inputMode}
        className="px-4 py-3 rounded-xl border-[1.5px] border-slate-200 text-[13px] bg-slate-50 focus:bg-white focus:border-[#284061] focus:ring-2 focus:ring-[#284061]/15 outline-none transition-all placeholder:text-slate-400"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, required, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[12.5px] font-semibold text-[#284061]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          required={required}
          value={value}
          onChange={onChange}
          className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border-[1.5px] border-slate-200 text-[13px] bg-slate-50 focus:bg-white focus:border-[#284061] focus:ring-2 focus:ring-[#284061]/15 outline-none transition-all cursor-pointer"
        >
          <option value="" disabled>Pilih...</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function UploadField({ label, accept, hint, required, onChange }) {
  const [fileName, setFileName] = useState("");
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-semibold text-[#284061]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <label className="relative px-5 py-5 border-2 border-dashed border-slate-200 rounded-xl text-center cursor-pointer bg-slate-50 hover:border-[#284061] hover:bg-white transition-all block">
        <input
          type="file"
          accept={accept}
          required={required}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setFileName(file?.name || "");
            onChange?.(file);
          }}
        />
        <Upload size={22} className="mx-auto mb-2 text-[#284061]/60" />
        <div className="text-[12.5px] font-medium text-[#284061]">
          {fileName || "Klik untuk pilih file"}
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">{hint}</div>
      </label>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-sm">
      <h2 className="text-[16px] font-bold text-[#284061] mb-5 pb-3 border-b border-slate-100" style={GILDA_FONT}>
        {title}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

const PENDIDIKAN = ["Tidak Sekolah", "SD/Sederajat", "SMP/Sederajat", "SMA/SMK/Sederajat", "D3", "S1", "S2", "S3"];
const GAJI = ["< Rp 1.000.000", "Rp 1.000.000 – 3.000.000", "Rp 3.000.000 – 5.000.000", "Rp 5.000.000 – 10.000.000", "> Rp 10.000.000"];
const STATUS_NIKAH = ["Menikah", "Cerai Hidup", "Cerai Mati"];
const STATUS_RUMAH = ["Milik Pribadi", "Sewa", "Kontrak", "Milik Orang Tua"];
const GOL_DARAH = ["A", "B", "AB", "O", "Tidak Diketahui"];

export default function FormulirPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [files, setFiles] = useState({ foto_santri: null, bukti_transfer: null });
  const [hPos, setHPos] = useState({ x: 0, y: 0 });
  const [hPx, setHPx] = useState({ x: 0, y: 0 });

  // Track saat halaman formulir dibuka
  useEffect(() => { GA.formOpen(); }, []);

  const [form, setForm] = useState({
    namaLengkap: "", nomorOrtu: "", emailOrtu: "", jenisKelamin: "",
    tempatLahir: "", nikSantri: "", nomorKK: "", nisn: "",
    hobi: "", citaCita: "", anakKe: "", beratBadan: "", tinggiBadan: "",
    golDarah: "", penyakit: "",
    alamatRumah: "", kelurahan: "", kecamatan: "", kabupaten: "", provinsi: "", statusRumah: "",
    namaAyah: "", nikAyah: "", waAyah: "", pendidikanAyah: "", pekerjaanAyah: "", gajiAyah: "", statusNikahAyah: "",
    namaIbu: "", nikIbu: "", waIbu: "", pendidikanIbu: "", pekerjaanIbu: "", gajiIbu: "", statusNikahIbu: "",
    namaWali: "", waWali: "",
    sekolahAsal: "", alamatSekolah: "", npsn: "",
    setuju: false,
  });

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  function onHeaderMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setHPos({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
    setHPx({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  const submit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!files.foto_santri || !files.bukti_transfer) {
      setErrorMsg("Foto santri dan bukti transfer wajib diupload.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (k !== "setuju") fd.append(k, v); });
      fd.append("foto_santri",    files.foto_santri);
      fd.append("bukti_transfer", files.bukti_transfer);

      const res = await apiFetch("/api/pendaftaran", {
        method: "POST",
        body: fd,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal mengirim pendaftaran.");

      GA.formSubmit(json.data?.nomor_pendaftaran);
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-emerald-600" />
          </div>
          <h1 className="text-[28px] text-[#284061] mb-3" style={GILDA_FONT}>Pendaftaran Diterima!</h1>
          <p className="text-[14px] text-slate-500 leading-relaxed mb-8">
            Terima kasih telah mendaftar. Tim PPDB Pesantren Al Kautsar akan menghubungi Anda dalam 1×24 jam melalui nomor yang telah didaftarkan.
          </p>
          <button
            onClick={() => navigate("/ppdb")}
            className="inline-flex items-center gap-2 bg-linear-to-br from-[#284061] to-[#1a2d47] text-white px-7 py-3 rounded-xl text-[13.5px] font-semibold hover:-translate-y-0.5 transition-all"
          >
            Kembali ke PPDB <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <SEO
      title="Formulir Pendaftaran PPDB"
      description="Isi formulir pendaftaran online Pesantren Al Kautsar. Lengkapi data diri santri, data orang tua/wali, asal sekolah, dan upload dokumen persyaratan secara mudah."
      path="/ppdb/formulir"
    />
    <div className="bg-slate-50 min-h-screen">
      <style>{`@keyframes fU{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>

      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#1a2d47] via-[#284061] to-[#3a5a8c] py-14 lg:py-18" onMouseMove={onHeaderMove}>
        <div className="absolute -right-10 -top-10 pointer-events-none" style={{ transform: `translate3d(${hPos.x * 20}px, ${hPos.y * 15}px, 0)`, transition: "transform 0.12s linear" }}>
          <div className="w-72 h-72 rounded-full border border-white/5 animate-[spin_22s_linear_infinite]" />
        </div>
        <div className="absolute -left-10 -bottom-10 pointer-events-none" style={{ transform: `translate3d(${hPos.x * -14}px, ${hPos.y * -10}px, 0)`, transition: "transform 0.18s linear" }}>
          <div className="w-56 h-56 rounded-full border border-amber-500/10 animate-[spin_30s_linear_infinite_reverse]" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 300px at ${hPx.x}px ${hPx.y}px, rgba(212,140,26,.07), transparent 65%)` }} />
        <div className="relative z-10 w-[min(1180px,92vw)] mx-auto">
          <button
            onClick={() => navigate("/ppdb")}
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-[12.5px] font-medium mb-6 transition-colors animate-[fU_.5s_ease-out_both]"
          >
            <ArrowLeft size={14} /> Kembali ke PPDB
          </button>
          <h1
            className="text-white text-[clamp(28px,4vw,46px)] leading-tight animate-[fU_.6s_.1s_ease-out_both]"
            style={GILDA_FONT}
          >
            Formulir Calon Santri<br />
            <em className="italic text-amber-300">Pesantren Al Kautsar</em>
          </h1>
          <p className="text-white/55 text-[14px] mt-3 max-w-xl font-light animate-[fU_.6s_.2s_ease-out_both]">
            Isi seluruh data dengan benar sesuai dokumen resmi. Tanda <span className="text-red-400">*</span> wajib diisi.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="w-[min(1180px,92vw)] mx-auto py-10">
        <form onSubmit={submit} className="flex flex-col gap-5">

          <Reveal>
            <SectionCard title="1. Data Calon Santri">
              <Field label="Nama Lengkap (sesuai akta)" placeholder="Nama lengkap santri" value={form.namaLengkap} onChange={set("namaLengkap")} required />
              <Field label="Nomor HP Orang Tua" type="tel" placeholder="08xx xxxx xxxx" value={form.nomorOrtu} onChange={set("nomorOrtu")} required />
              <Field label="Email Orang Tua" type="email" placeholder="email@contoh.com" value={form.emailOrtu} onChange={set("emailOrtu")} />
              <SelectField label="Jenis Kelamin" value={form.jenisKelamin} onChange={set("jenisKelamin")} options={["Laki-laki", "Perempuan"]} required />
              <Field label="Tempat Lahir" placeholder="Kota tempat lahir" value={form.tempatLahir} onChange={set("tempatLahir")} required />
              <Field label="NIK Santri" placeholder="16 digit NIK" value={form.nikSantri} onChange={set("nikSantri")} required maxLength={16} minLength={16} pattern="\d{16}" title="NIK harus 16 digit angka" inputMode="numeric" />
              <Field label="Nomor KK" placeholder="16 digit nomor KK" value={form.nomorKK} onChange={set("nomorKK")} required maxLength={16} minLength={16} pattern="\d{16}" title="Nomor KK harus 16 digit angka" inputMode="numeric" />
              <Field label="NISN" placeholder="10 digit NISN" value={form.nisn} onChange={set("nisn")} required maxLength={10} minLength={10} pattern="\d{10}" title="NISN harus 10 digit angka" inputMode="numeric" />
              <Field label="Hobi" placeholder="Hobi santri" value={form.hobi} onChange={set("hobi")} />
              <Field label="Cita-cita" placeholder="Cita-cita santri" value={form.citaCita} onChange={set("citaCita")} />
              <Field label="Anak Ke-" type="number" placeholder="Contoh: 2" value={form.anakKe} onChange={set("anakKe")} />
              <Field label="Berat Badan (kg)" type="number" placeholder="Contoh: 45" value={form.beratBadan} onChange={set("beratBadan")} />
              <Field label="Tinggi Badan (cm)" type="number" placeholder="Contoh: 155" value={form.tinggiBadan} onChange={set("tinggiBadan")} />
              <SelectField label="Golongan Darah" value={form.golDarah} onChange={set("golDarah")} options={GOL_DARAH} />
              <Field label="Penyakit yang Diderita" placeholder="Tulis jika ada, atau tulis 'Tidak Ada'" value={form.penyakit} onChange={set("penyakit")} className="sm:col-span-2" />
            </SectionCard>
          </Reveal>

          <Reveal>
            <SectionCard title="2. Alamat Rumah">
              <Field label="Alamat Lengkap" placeholder="Nama jalan, RT/RW, no. rumah" value={form.alamatRumah} onChange={set("alamatRumah")} required className="sm:col-span-2" />
              <Field label="Kelurahan" placeholder="Kelurahan" value={form.kelurahan} onChange={set("kelurahan")} required />
              <Field label="Kecamatan / Desa" placeholder="Kecamatan atau desa" value={form.kecamatan} onChange={set("kecamatan")} required />
              <Field label="Kabupaten / Kota" placeholder="Kabupaten atau kota" value={form.kabupaten} onChange={set("kabupaten")} required />
              <Field label="Provinsi" placeholder="Provinsi" value={form.provinsi} onChange={set("provinsi")} required />
              <SelectField label="Status Rumah" value={form.statusRumah} onChange={set("statusRumah")} options={STATUS_RUMAH} required className="sm:col-span-2" />
            </SectionCard>
          </Reveal>

          <Reveal>
            <SectionCard title="3. Data Ayah Kandung">
              <Field label="Nama Ayah Kandung" placeholder="Nama lengkap ayah" value={form.namaAyah} onChange={set("namaAyah")} required />
              <Field label="NIK Ayah" placeholder="16 digit NIK" value={form.nikAyah} onChange={set("nikAyah")} required maxLength={16} minLength={16} pattern="\d{16}" title="NIK harus 16 digit angka" inputMode="numeric" />
              <Field label="No. WA Ayah" type="tel" placeholder="08xx xxxx xxxx" value={form.waAyah} onChange={set("waAyah")} required />
              <SelectField label="Pendidikan Terakhir" value={form.pendidikanAyah} onChange={set("pendidikanAyah")} options={PENDIDIKAN} required />
              <Field label="Pekerjaan" placeholder="Pekerjaan ayah" value={form.pekerjaanAyah} onChange={set("pekerjaanAyah")} required />
              <SelectField label="Penghasilan Per Bulan" value={form.gajiAyah} onChange={set("gajiAyah")} options={GAJI} required />
              <SelectField label="Status Pernikahan" value={form.statusNikahAyah} onChange={set("statusNikahAyah")} options={STATUS_NIKAH} required className="sm:col-span-2" />
            </SectionCard>
          </Reveal>

          <Reveal>
            <SectionCard title="4. Data Ibu Kandung">
              <Field label="Nama Ibu Kandung" placeholder="Nama lengkap ibu" value={form.namaIbu} onChange={set("namaIbu")} required />
              <Field label="NIK Ibu" placeholder="16 digit NIK" value={form.nikIbu} onChange={set("nikIbu")} required maxLength={16} minLength={16} pattern="\d{16}" title="NIK harus 16 digit angka" inputMode="numeric" />
              <Field label="No. WA Ibu" type="tel" placeholder="08xx xxxx xxxx" value={form.waIbu} onChange={set("waIbu")} required />
              <SelectField label="Pendidikan Terakhir" value={form.pendidikanIbu} onChange={set("pendidikanIbu")} options={PENDIDIKAN} required />
              <Field label="Pekerjaan" placeholder="Pekerjaan ibu" value={form.pekerjaanIbu} onChange={set("pekerjaanIbu")} required />
              <SelectField label="Penghasilan Per Bulan" value={form.gajiIbu} onChange={set("gajiIbu")} options={GAJI} required />
              <SelectField label="Status Pernikahan" value={form.statusNikahIbu} onChange={set("statusNikahIbu")} options={STATUS_NIKAH} required className="sm:col-span-2" />
            </SectionCard>
          </Reveal>

          <Reveal>
            <SectionCard title="5. Data Wali (jika ada)">
              <Field label="Nama Wali" placeholder="Kosongkan jika tidak ada" value={form.namaWali} onChange={set("namaWali")} />
              <Field label="No. WA Wali" type="tel" placeholder="08xx xxxx xxxx" value={form.waWali} onChange={set("waWali")} />
            </SectionCard>
          </Reveal>

          <Reveal>
            <SectionCard title="6. Data Sekolah Asal">
              <Field label="Nama Sekolah Asal" placeholder="Nama sekolah saat ini" value={form.sekolahAsal} onChange={set("sekolahAsal")} required />
              <Field label="NPSN" placeholder="8 digit NPSN sekolah" value={form.npsn} onChange={set("npsn")} required maxLength={8} minLength={8} pattern="\d{8}" title="NPSN harus 8 digit angka" inputMode="numeric" />
              <Field label="Alamat Sekolah" placeholder="Alamat lengkap sekolah" value={form.alamatSekolah} onChange={set("alamatSekolah")} required className="sm:col-span-2" />
            </SectionCard>
          </Reveal>

          <Reveal>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-sm">
              <h2 className="text-[16px] font-bold text-[#284061] mb-5 pb-3 border-b border-slate-100" style={GILDA_FONT}>
                7. Upload Dokumen
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <UploadField label="Foto Calon Santri" accept="image/*" hint="Format: JPG/PNG · Max 2MB" required onChange={(f) => setFiles((p) => ({ ...p, foto_santri: f }))} />
                <UploadField label="Foto Bukti Transfer Biaya Daftar" accept="image/*,.pdf" hint="Format: JPG/PNG/PDF · Max 5MB" required onChange={(f) => setFiles((p) => ({ ...p, bukti_transfer: f }))} />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer group mb-6">
                <input
                  type="checkbox"
                  required
                  checked={form.setuju}
                  onChange={set("setuju")}
                  className="w-4 h-4 mt-0.5 accent-[#284061] shrink-0"
                />
                <span className="text-[13px] text-slate-500 leading-[1.7] group-hover:text-slate-700 transition-colors">
                  Saya menyatakan bahwa seluruh data yang diisi adalah benar, lengkap, dan dapat dipertanggungjawabkan. Saya bersedia mengikuti seluruh proses seleksi PPDB Pesantren Al Kautsar Sidoarjo.
                </span>
              </label>
              {errorMsg && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-600">
                  {errorMsg}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-linear-to-br from-amber-500 to-amber-600 text-white px-8 py-3.5 rounded-xl text-[13.5px] font-bold shadow-xl shadow-amber-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Mengirim..." : "Kirim Pendaftaran"} {!submitting && <ArrowRight size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/ppdb")}
                  className="inline-flex items-center gap-2 text-slate-500 px-6 py-3.5 border border-slate-200 rounded-xl text-[13.5px] font-semibold hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
              </div>
            </div>
          </Reveal>

        </form>
      </div>
    </div>
    </>
  );
}
