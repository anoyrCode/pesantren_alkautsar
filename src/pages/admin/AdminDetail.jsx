import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileDown } from "lucide-react";
import { apiFetch } from "../../utils/api";
import jsPDF from "jspdf";
import logoSrc from "../../assets/logoPolos.png";

function getToken() {
  return localStorage.getItem("admin_token");
}


async function exportPDF(d) {
  const doc    = new jsPDF({ unit: "mm", format: "a4" });
  const PAGE_W = 210;
  const M      = 12;
  const SPLIT  = 92;
  const L_W    = SPLIT - M - 3;
  const R_W    = PAGE_W - SPLIT - M;

  const C_NAVY   = [40, 64, 97];
  const C_AMBER  = [210, 140, 20];
  const C_GRAY   = [130, 148, 168];
  const C_DARK   = [28, 38, 54];
  const C_DIM    = [160, 185, 210];
  const C_BORDER = [218, 228, 242];
  const C_BG     = [247, 250, 255];

  async function toBase64(src) {
    if (!src) return null;
    if (src.startsWith("data:")) return src;
    try {
      const r    = await fetch(src);
      const blob = await r.blob();
      return new Promise((res) => {
        const reader  = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch { return null; }
  }

  function roundCorners(b64, radiusFrac = 0.09) {
    if (!b64) return Promise.resolve(null);
    return new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        const w = img.width, h = img.height;
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        const ctx = c.getContext("2d");
        const r = Math.round(Math.min(w, h) * radiusFrac);
        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(w - r, 0); ctx.arcTo(w, 0, w, r, r);
        ctx.lineTo(w, h - r); ctx.arcTo(w, h, w - r, h, r);
        ctx.lineTo(r, h);     ctx.arcTo(0, h, 0, h - r, r);
        ctx.lineTo(0, r);     ctx.arcTo(0, 0, r, 0, r);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0);
        res(c.toDataURL("image/png"));
      };
      img.onerror = () => res(b64);
      img.src = b64;
    });
  }

  const [fotoRaw, logoRaw] = await Promise.all([
    toBase64(d.url_foto_santri),
    toBase64(logoSrc),
  ]);
  const fotoB64 = await roundCorners(fotoRaw, 0.08);
  const logoB64 = logoRaw;

  // ── HEADER ──────────────────────────────────────────────
  doc.setFillColor(...C_NAVY);
  doc.rect(0, 0, PAGE_W, 43, "F");
  doc.setFillColor(...C_AMBER);
  doc.rect(0, 42.5, PAGE_W, 0.8, "F");

  if (logoB64) doc.addImage(logoB64, "PNG", M, 6, 0, 30);
  const textX = logoB64 ? M + 32 : M;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("PESANTREN AL KAUTSAR", textX, 17);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(...C_DIM);
  doc.text("Jl. Besuk RT 11 RW 04, Sambungrejo, Sukodono, Sidoarjo 61258", textX, 24);
  doc.setTextColor(220, 170, 80);
  doc.text("Formulir Pendaftaran Peserta Didik Baru (PPDB) 2027/2028", textX, 31);
  if (fotoB64) doc.addImage(fotoB64, "PNG", PAGE_W - M - 22, 10, 20, 26);

  // ── NAME STRIP ──────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 43.3, PAGE_W, 18, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...C_NAVY);
  const nameTxt = (d.nama_lengkap || "-").toUpperCase();
  doc.text(nameTxt, M, 55);
  const nameW = Math.min(doc.getTextWidth(nameTxt), SPLIT - M - 2);
  doc.setFillColor(...C_AMBER);
  doc.rect(M, 57, nameW, 0.7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...C_NAVY);
  doc.text(d.nomor_pendaftaran || "", PAGE_W - M, 51, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(...C_GRAY);
  doc.text(`Terdaftar: ${new Date(d.created_at).toLocaleDateString("id-ID")}`, PAGE_W - M, 57, { align: "right" });
  doc.setDrawColor(...C_BORDER);
  doc.setLineWidth(0.15);
  doc.line(0, 61.3, PAGE_W, 61.3);

  // ── CONTENT BG ──────────────────────────────────────────
  doc.setFillColor(...C_BG);
  doc.rect(0, 61.3, PAGE_W, 228, "F");

  // ── CARD SYSTEM ─────────────────────────────────────────
  const LBL_SZ     = 5.5;
  const VAL_SZ     = 7;
  const HEADER_H   = 7.5;
  const PAD        = 4;
  const COL_GAP    = 3;
  const LBL_Y_OFF  = 4;
  const VAL_Y_GAP  = 1.3;
  const VAL_LINE_H = 3.8;
  const FIELD_BOT  = 2.5;
  const CARD_GAP   = 3.5;

  let yL = 65, yR = 65;

  function drawCard(col, title, fields) {
    const cardX = col === "L" ? M : SPLIT;
    const cardW = col === "L" ? L_W : R_W;
    const y0    = col === "L" ? yL : yR;
    const fW    = (cardW - PAD * 2 - COL_GAP) / 2;

    const valid = fields.filter(f => f.value != null && String(f.value).trim() !== "");
    if (!valid.length) return;

    const rows = [];
    let i = 0;
    while (i < valid.length) {
      const f = valid[i];
      if (f.wide) {
        const nL = doc.splitTextToSize(String(f.value), cardW - PAD * 2 - 1).length;
        rows.push({ f1: f, f2: null, wide: true, h: LBL_Y_OFF + VAL_Y_GAP + nL * VAL_LINE_H + FIELD_BOT });
        i++;
      } else {
        const next = valid[i + 1];
        if (next && !next.wide) {
          const n1 = doc.splitTextToSize(String(f.value), fW - 1).length;
          const n2 = doc.splitTextToSize(String(next.value), fW - 1).length;
          rows.push({ f1: f, f2: next, wide: false, h: LBL_Y_OFF + VAL_Y_GAP + Math.max(n1, n2) * VAL_LINE_H + FIELD_BOT });
          i += 2;
        } else {
          const nL = doc.splitTextToSize(String(f.value), fW - 1).length;
          rows.push({ f1: f, f2: null, wide: false, h: LBL_Y_OFF + VAL_Y_GAP + nL * VAL_LINE_H + FIELD_BOT });
          i++;
        }
      }
    }

    const contentH = rows.reduce((s, r) => s + r.h, 0);
    const cardH    = HEADER_H + contentH + 2.5;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(cardX, y0, cardW, cardH, 2.5, 2.5, "F");
    doc.setDrawColor(...C_BORDER);
    doc.setLineWidth(0.18);
    doc.roundedRect(cardX, y0, cardW, cardH, 2.5, 2.5, "S");

    const barH = HEADER_H - 3;
    doc.setFillColor(...C_AMBER);
    doc.roundedRect(cardX + PAD, y0 + 1.5, 2, barH, 0.6, 0.6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...C_NAVY);
    doc.text(title.toUpperCase(), cardX + PAD + 4.5, y0 + HEADER_H * 0.62);

    doc.setDrawColor(...C_BORDER);
    doc.setLineWidth(0.1);
    doc.line(cardX + 1.5, y0 + HEADER_H, cardX + cardW - 1.5, y0 + HEADER_H);

    let fy = y0 + HEADER_H;
    rows.forEach((row, ri) => {
      const { f1, f2, wide, h } = row;

      function drawField(f, fx, fw) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(LBL_SZ);
        doc.setTextColor(...C_GRAY);
        doc.text(f.label.toUpperCase(), fx, fy + LBL_Y_OFF);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(VAL_SZ);
        doc.setTextColor(...C_DARK);
        const lines = doc.splitTextToSize(String(f.value), fw - 1);
        doc.text(lines, fx, fy + LBL_Y_OFF + VAL_Y_GAP + VAL_LINE_H);
      }

      if (wide) {
        drawField(f1, cardX + PAD, cardW - PAD * 2);
      } else {
        drawField(f1, cardX + PAD, fW);
        if (f2) drawField(f2, cardX + PAD + fW + COL_GAP, fW);
      }

      fy += h;
      if (ri < rows.length - 1) {
        doc.setDrawColor(...C_BORDER);
        doc.setLineWidth(0.07);
        doc.line(cardX + PAD, fy, cardX + cardW - PAD, fy);
      }
    });

    const endY = y0 + cardH + CARD_GAP;
    if (col === "L") yL = endY; else yR = endY;
  }

  const bbTb = [
    d.berat_badan  ? `${d.berat_badan} kg`  : null,
    d.tinggi_badan ? `${d.tinggi_badan} cm` : null,
  ].filter(Boolean).join(" / ");

  // ── LEFT COLUMN ──────────────────────────────────────────
  drawCard("L", "Data Santri", [
    { label: "NIK Santri",        value: d.nik_santri },
    { label: "Nomor KK",          value: d.nomor_kk },
    { label: "NISN",              value: d.nisn },
    { label: "Tempat Lahir",      value: d.tempat_lahir },
    { label: "Jenis Kelamin",     value: d.jenis_kelamin },
    { label: "Gol. Darah",        value: d.golongan_darah },
    { label: "BB / TB",           value: bbTb },
    { label: "Anak ke-",          value: d.anak_ke?.toString() },
    { label: "No. HP Orang Tua",  value: d.nomor_hp_ortu },
    { label: "Email Orang Tua",   value: d.email_ortu },
    { label: "Hobi",              value: d.hobi },
    { label: "Cita-cita",         value: d.cita_cita },
    { label: "Kondisi Kesehatan", value: d.penyakit },
  ]);

  drawCard("L", "Alamat", [
    { label: "Alamat Rumah",  value: d.alamat_rumah, wide: true },
    { label: "Kelurahan",     value: d.kelurahan },
    { label: "Kecamatan",     value: d.kecamatan },
    { label: "Kabupaten",     value: d.kabupaten },
    { label: "Provinsi",      value: d.provinsi },
    { label: "Status Rumah",  value: d.status_rumah },
  ]);

  // ── RIGHT COLUMN ─────────────────────────────────────────
  drawCard("R", "Data Ayah", [
    { label: "Nama",          value: d.nama_ayah },
    { label: "NIK",           value: d.nik_ayah },
    { label: "No. WhatsApp",  value: d.wa_ayah },
    { label: "Pendidikan",    value: d.pendidikan_ayah },
    { label: "Pekerjaan",     value: d.pekerjaan_ayah },
    { label: "Penghasilan",   value: d.gaji_ayah },
    { label: "Status Nikah",  value: d.status_nikah_ayah },
  ]);

  drawCard("R", "Data Ibu", [
    { label: "Nama",          value: d.nama_ibu },
    { label: "NIK",           value: d.nik_ibu },
    { label: "No. WhatsApp",  value: d.wa_ibu },
    { label: "Pendidikan",    value: d.pendidikan_ibu },
    { label: "Pekerjaan",     value: d.pekerjaan_ibu },
    { label: "Penghasilan",   value: d.gaji_ibu },
    { label: "Status Nikah",  value: d.status_nikah_ibu },
  ]);

  if (d.nama_wali || d.wa_wali) {
    drawCard("R", "Data Wali", [
      { label: "Nama",          value: d.nama_wali },
      { label: "No. WhatsApp",  value: d.wa_wali },
    ]);
  }

  drawCard("R", "Asal Sekolah", [
    { label: "Nama Sekolah",   value: d.sekolah_asal },
    { label: "NPSN",           value: d.npsn },
    { label: "Alamat Sekolah", value: d.alamat_sekolah, wide: true },
  ]);

  // ── FOOTER ──────────────────────────────────────────────
  doc.setFillColor(...C_AMBER);
  doc.rect(0, 283.5, PAGE_W, 0.7, "F");
  doc.setFillColor(...C_NAVY);
  doc.rect(0, 284.2, PAGE_W, 12.8, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...C_DIM);
  doc.text(`Dicetak: ${new Date().toLocaleString("id-ID")}`, M, 292);
  doc.text("PPDB 2027/2028 — Pesantren Al Kautsar", PAGE_W / 2, 292, { align: "center" });
  doc.text(d.nomor_pendaftaran || "", PAGE_W - M, 292, { align: "right" });

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4FA]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#284061] border-t-transparent animate-spin" />
        <p className="text-sm text-slate-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Memuat data...</p>
      </div>
    </div>
  );
  if (!d) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4FA]">
      <p className="text-sm text-red-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Data tidak ditemukan.</p>
    </div>
  );

  const stats = [
    d.jenis_kelamin,
    d.golongan_darah ? `Gol. ${d.golongan_darah}` : null,
    d.anak_ke ? `Anak ke-${d.anak_ke}` : null,
    d.berat_badan && d.tinggi_badan ? `${d.berat_badan} kg · ${d.tinggi_badan} cm` : null,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F0F4FA]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#284061] hover:text-amber-600 transition-colors"
          >
            <ArrowLeft size={15} />
            Kembali
          </button>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-[11px] text-slate-400 font-mono tracking-wider">{d.nomor_pendaftaran}</span>
          <button
            onClick={() => exportPDF(d).catch(console.error)}
            className="ml-auto flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-lg bg-[#284061] text-white hover:bg-[#1e3358] active:scale-95 transition-all"
          >
            <FileDown size={14} />
            Export PDF
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <div style={{ background: "linear-gradient(135deg, #18293f 0%, #284061 55%, #2d5480 100%)" }}>
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row gap-7 items-start sm:items-end">
          {/* Photo */}
          {d.url_foto_santri ? (
            <a href={d.url_foto_santri} target="_blank" rel="noreferrer" className="shrink-0 group">
              <img
                src={d.url_foto_santri}
                alt={d.nama_lengkap}
                className="w-28 h-36 object-cover rounded-xl border-2 border-white/20 shadow-2xl group-hover:border-amber-400/70 transition-all duration-300"
              />
            </a>
          ) : (
            <div className="w-28 h-36 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-white/25 text-xs shrink-0">
              Foto
            </div>
          )}

          {/* Identity */}
          <div className="flex-1 pb-1 min-w-0">
            <p className="text-amber-400 text-[10.5px] font-mono tracking-[0.18em] mb-2 uppercase">
              {d.nomor_pendaftaran}
            </p>
            <h1 className="text-white mb-2 leading-tight truncate"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 42px)" }}>
              {d.nama_lengkap}
            </h1>
            <p className="text-white/45 text-[12.5px] mb-5">
              Terdaftar {new Date(d.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            {/* Stat chips */}
            <div className="flex flex-wrap gap-2">
              {stats.map((s, i) => (
                <span key={i} className="text-[11.5px] font-medium text-white/75 bg-white/10 border border-white/12 px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-7">

        {/* Dokumen row */}
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <DocCard label="Foto Santri"    url={d.url_foto_santri} />
          <DocCard label="Bukti Transfer" url={d.url_bukti_transfer} />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* ── Kolom Kiri ── */}
          <div className="space-y-4">
            <InfoCard title="Data Santri">
              <Field label="NIK Santri"     value={d.nik_santri} />
              <Field label="Nomor KK"       value={d.nomor_kk} />
              <Field label="NISN"           value={d.nisn} />
              <Field label="Tempat Lahir"   value={d.tempat_lahir} />
              <Field label="No. HP Orang Tua" value={d.nomor_hp_ortu} />
              <Field label="Email Orang Tua"  value={d.email_ortu} />
              <Field label="Hobi"           value={d.hobi} />
              <Field label="Cita-cita"      value={d.cita_cita} />
              <Field label="Kondisi Kesehatan" value={d.penyakit} />
            </InfoCard>

            <InfoCard title="Alamat">
              <Field label="Alamat Rumah"  value={d.alamat_rumah} wide />
              <Field label="Kelurahan"     value={d.kelurahan} />
              <Field label="Kecamatan"     value={d.kecamatan} />
              <Field label="Kabupaten"     value={d.kabupaten} />
              <Field label="Provinsi"      value={d.provinsi} />
              <Field label="Status Rumah"  value={d.status_rumah} />
            </InfoCard>
          </div>

          {/* ── Kolom Kanan ── */}
          <div className="space-y-4">
            <InfoCard title="Data Ayah">
              <Field label="Nama"          value={d.nama_ayah} />
              <Field label="NIK"           value={d.nik_ayah} />
              <Field label="No. WhatsApp"  value={d.wa_ayah} />
              <Field label="Pendidikan"    value={d.pendidikan_ayah} />
              <Field label="Pekerjaan"     value={d.pekerjaan_ayah} />
              <Field label="Penghasilan"   value={d.gaji_ayah} />
              <Field label="Status Nikah"  value={d.status_nikah_ayah} />
            </InfoCard>

            <InfoCard title="Data Ibu">
              <Field label="Nama"          value={d.nama_ibu} />
              <Field label="NIK"           value={d.nik_ibu} />
              <Field label="No. WhatsApp"  value={d.wa_ibu} />
              <Field label="Pendidikan"    value={d.pendidikan_ibu} />
              <Field label="Pekerjaan"     value={d.pekerjaan_ibu} />
              <Field label="Penghasilan"   value={d.gaji_ibu} />
              <Field label="Status Nikah"  value={d.status_nikah_ibu} />
            </InfoCard>

            {(d.nama_wali || d.wa_wali) && (
              <InfoCard title="Data Wali">
                <Field label="Nama Wali"    value={d.nama_wali} />
                <Field label="No. WhatsApp" value={d.wa_wali} />
              </InfoCard>
            )}

            <InfoCard title="Asal Sekolah">
              <Field label="Nama Sekolah"   value={d.sekolah_asal} />
              <Field label="NPSN"           value={d.npsn} />
              <Field label="Alamat Sekolah" value={d.alamat_sekolah} wide />
            </InfoCard>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-right mt-6 pb-4 font-mono">
          {d.nomor_pendaftaran} · {new Date(d.created_at).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3 border-b border-slate-100">
        <div className="w-0.75 h-4 rounded-full bg-amber-400" />
        <h2 className="text-[11.5px] font-bold text-[#284061] uppercase tracking-widest">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 p-5">
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, wide }) {
  if (!value) return null;
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-[13px] font-medium text-slate-800 leading-snug wrap-break-word">{value}</p>
    </div>
  );
}

function DocCard({ label, url }) {
  if (!url) return null;
  const isImage = /\.(jpg|jpeg|png)$/i.test(url);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100">
        <div className="w-0.75 h-4 rounded-full bg-amber-400" />
        <p className="text-[11.5px] font-bold text-[#284061] uppercase tracking-widest">{label}</p>
      </div>
      {isImage ? (
        <a href={url} target="_blank" rel="noreferrer">
          <img src={url} alt={label} className="w-full h-52 object-cover hover:opacity-95 transition-opacity" />
        </a>
      ) : (
        <a href={url} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 px-4 py-4 text-[13px] font-medium text-[#284061] hover:text-amber-600 transition-colors">
          <ExternalLink size={14} />
          Lihat Dokumen
        </a>
      )}
    </div>
  );
}
