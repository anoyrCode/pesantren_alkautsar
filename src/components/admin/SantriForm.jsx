import { useState } from "react";
import { ChevronDown, Upload, ExternalLink } from "lucide-react";
import RekeningInfo from "../common/RekeningInfo";

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

function UploadField({ label, accept, hint, currentUrl, onChange }) {
  const [fileName, setFileName] = useState("");
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-semibold text-[#284061]">{label}</label>
      <label className="relative px-5 py-5 border-2 border-dashed border-slate-200 rounded-xl text-center cursor-pointer bg-slate-50 hover:border-[#284061] hover:bg-white transition-all block">
        <input
          type="file"
          accept={accept}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setFileName(file?.name || "");
            onChange?.(file);
          }}
        />
        <Upload size={22} className="mx-auto mb-2 text-[#284061]/60" />
        <div className="text-[12.5px] font-medium text-[#284061]">
          {fileName || "Klik untuk ganti file"}
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">{hint}</div>
      </label>
      {currentUrl && (
        <a href={currentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[11.5px] text-[#284061] font-medium hover:text-amber-600 transition-colors">
          <ExternalLink size={12} /> Lihat file saat ini
        </a>
      )}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-sm">
      <h2 className="text-[16px] font-bold text-[#284061] mb-5 pb-3 border-b border-slate-100">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

const PENDIDIKAN   = ["Tidak Sekolah", "SD/Sederajat", "SMP/Sederajat", "SMA/SMK/Sederajat", "D3", "S1", "S2", "S3"];
const GAJI         = ["< Rp 1.000.000", "Rp 1.000.000 – 3.000.000", "Rp 3.000.000 – 5.000.000", "Rp 5.000.000 – 10.000.000", "> Rp 10.000.000"];
const STATUS_NIKAH = ["Menikah", "Cerai Hidup", "Cerai Mati"];
const STATUS_RUMAH = ["Milik Pribadi", "Sewa", "Kontrak", "Milik Orang Tua"];
const GOL_DARAH    = ["A", "B", "AB", "O", "Tidak Diketahui"];
const STATUS_DAFTAR = ["Menunggu", "Diterima", "Ditolak"];

export const EMPTY_FORM = {
  namaLengkap: "", nomorOrtu: "", emailOrtu: "", jenisKelamin: "",
  tempatLahir: "", nikSantri: "", nomorKK: "", nisn: "",
  hobi: "", citaCita: "", anakKe: "", beratBadan: "", tinggiBadan: "",
  golDarah: "", penyakit: "",
  alamatRumah: "", kelurahan: "", kecamatan: "", kabupaten: "", provinsi: "", statusRumah: "",
  namaAyah: "", nikAyah: "", waAyah: "", pendidikanAyah: "", pekerjaanAyah: "", gajiAyah: "", statusNikahAyah: "",
  namaIbu: "", nikIbu: "", waIbu: "", pendidikanIbu: "", pekerjaanIbu: "", gajiIbu: "", statusNikahIbu: "",
  namaWali: "", waWali: "",
  sekolahAsal: "", alamatSekolah: "", npsn: "",
  status: "Menunggu",
};

export default function SantriForm({ mode, form, setForm, onFile, currentUrls, onSubmit, submitting, errorMsg }) {
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
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

      <SectionCard title="2. Alamat Rumah">
        <Field label="Alamat Lengkap" placeholder="Nama jalan, RT/RW, no. rumah" value={form.alamatRumah} onChange={set("alamatRumah")} required className="sm:col-span-2" />
        <Field label="Kelurahan" placeholder="Kelurahan" value={form.kelurahan} onChange={set("kelurahan")} required />
        <Field label="Kecamatan / Desa" placeholder="Kecamatan atau desa" value={form.kecamatan} onChange={set("kecamatan")} required />
        <Field label="Kabupaten / Kota" placeholder="Kabupaten atau kota" value={form.kabupaten} onChange={set("kabupaten")} required />
        <Field label="Provinsi" placeholder="Provinsi" value={form.provinsi} onChange={set("provinsi")} required />
        <SelectField label="Status Rumah" value={form.statusRumah} onChange={set("statusRumah")} options={STATUS_RUMAH} required className="sm:col-span-2" />
      </SectionCard>

      <SectionCard title="3. Data Ayah Kandung">
        <Field label="Nama Ayah Kandung" placeholder="Nama lengkap ayah" value={form.namaAyah} onChange={set("namaAyah")} required />
        <Field label="NIK Ayah" placeholder="16 digit NIK" value={form.nikAyah} onChange={set("nikAyah")} required maxLength={16} minLength={16} pattern="\d{16}" title="NIK harus 16 digit angka" inputMode="numeric" />
        <Field label="No. WA Ayah" type="tel" placeholder="08xx xxxx xxxx" value={form.waAyah} onChange={set("waAyah")} required />
        <SelectField label="Pendidikan Terakhir" value={form.pendidikanAyah} onChange={set("pendidikanAyah")} options={PENDIDIKAN} required />
        <Field label="Pekerjaan" placeholder="Pekerjaan ayah" value={form.pekerjaanAyah} onChange={set("pekerjaanAyah")} required />
        <SelectField label="Penghasilan Per Bulan" value={form.gajiAyah} onChange={set("gajiAyah")} options={GAJI} required />
        <SelectField label="Status Pernikahan" value={form.statusNikahAyah} onChange={set("statusNikahAyah")} options={STATUS_NIKAH} required className="sm:col-span-2" />
      </SectionCard>

      <SectionCard title="4. Data Ibu Kandung">
        <Field label="Nama Ibu Kandung" placeholder="Nama lengkap ibu" value={form.namaIbu} onChange={set("namaIbu")} required />
        <Field label="NIK Ibu" placeholder="16 digit NIK" value={form.nikIbu} onChange={set("nikIbu")} required maxLength={16} minLength={16} pattern="\d{16}" title="NIK harus 16 digit angka" inputMode="numeric" />
        <Field label="No. WA Ibu" type="tel" placeholder="08xx xxxx xxxx" value={form.waIbu} onChange={set("waIbu")} required />
        <SelectField label="Pendidikan Terakhir" value={form.pendidikanIbu} onChange={set("pendidikanIbu")} options={PENDIDIKAN} required />
        <Field label="Pekerjaan" placeholder="Pekerjaan ibu" value={form.pekerjaanIbu} onChange={set("pekerjaanIbu")} required />
        <SelectField label="Penghasilan Per Bulan" value={form.gajiIbu} onChange={set("gajiIbu")} options={GAJI} required />
        <SelectField label="Status Pernikahan" value={form.statusNikahIbu} onChange={set("statusNikahIbu")} options={STATUS_NIKAH} required className="sm:col-span-2" />
      </SectionCard>

      <SectionCard title="5. Data Wali (jika ada)">
        <Field label="Nama Wali" placeholder="Kosongkan jika tidak ada" value={form.namaWali} onChange={set("namaWali")} />
        <Field label="No. WA Wali" type="tel" placeholder="08xx xxxx xxxx" value={form.waWali} onChange={set("waWali")} />
      </SectionCard>

      <SectionCard title="6. Data Sekolah Asal">
        <Field label="Nama Sekolah Asal" placeholder="Nama sekolah saat ini" value={form.sekolahAsal} onChange={set("sekolahAsal")} required />
        <Field label="NPSN" placeholder="8 digit NPSN sekolah" value={form.npsn} onChange={set("npsn")} required maxLength={8} minLength={8} pattern="\d{8}" title="NPSN harus 8 digit angka" inputMode="numeric" />
        <Field label="Alamat Sekolah" placeholder="Alamat lengkap sekolah" value={form.alamatSekolah} onChange={set("alamatSekolah")} required className="sm:col-span-2" />
      </SectionCard>

      <SectionCard title="7. Status Pendaftaran">
        <SelectField label="Status" value={form.status} onChange={set("status")} options={STATUS_DAFTAR} className="sm:col-span-2" />
      </SectionCard>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-sm">
        <h2 className="text-[16px] font-bold text-[#284061] mb-5 pb-3 border-b border-slate-100">8. Dokumen</h2>
        <p className="text-[12px] text-slate-400 mb-4">Opsional — kosongkan jika belum ada file, sistem akan memakai gambar placeholder sementara.</p>
        <RekeningInfo />
        <div className="grid sm:grid-cols-2 gap-4">
          <UploadField label="Foto Calon Santri" accept="image/*" hint="Format: JPG/PNG · Max 5MB" currentUrl={currentUrls?.foto} onChange={(f) => onFile("foto_santri", f)} />
          <UploadField label="Foto Bukti Transfer Biaya Daftar" accept="image/*,.pdf" hint="Format: JPG/PNG/PDF · Max 5MB" currentUrl={currentUrls?.bukti} onChange={(f) => onFile("bukti_transfer", f)} />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 lg:p-8 shadow-sm">
        {errorMsg && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-600">
            {errorMsg}
          </div>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-linear-to-br from-amber-500 to-amber-600 text-white px-8 py-3.5 rounded-xl text-[13.5px] font-bold shadow-xl shadow-amber-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Menyimpan..." : mode === "edit" ? "Simpan Perubahan" : "Tambah Data"}
        </button>
      </div>
    </form>
  );
}
