import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Tag, X, GripVertical, AlertTriangle, ImagePlus } from "lucide-react";
import { apiFetch } from "../../utils/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

function authHeaders(extra = {}) {
  return { Authorization: `Bearer ${getToken()}`, ...extra };
}

export default function AdminGaleri() {
  const navigate = useNavigate();
  const [photos, setPhotos]     = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState(null); // photo object or null (= tambah baru)
  const [showKategoriModal, setShowKategoriModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const dragIndex = useRef(null);

  async function load() {
    setLoading(true);
    try {
      const [pRes, kRes] = await Promise.all([
        apiFetch("/api/galeri"),
        apiFetch("/api/galeri/kategori"),
      ]);
      const pJson = await pRes.json();
      const kJson = await kRes.json();
      setPhotos(pJson.data || []);
      setKategori(kJson.data || []);
    } catch {
      setError("Gagal mengambil data galeri.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function checkAuth(res) {
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
      return true;
    }
    return false;
  }

  async function saveOrder(newPhotos) {
    setPhotos(newPhotos);
    const order = newPhotos.map((p, i) => ({ id: p.id, urutan: i + 1 }));
    try {
      const res = await apiFetch("/api/galeri/reorder", {
        method: "PATCH",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ order }),
      });
      if (checkAuth(res)) return;
    } catch {
      alert("Gagal menyimpan urutan.");
    }
  }

  function onDrop(targetIndex) {
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === targetIndex) return;
    const next = [...photos];
    const [moved] = next.splice(from, 1);
    next.splice(targetIndex, 0, moved);
    saveOrder(next);
  }

  async function konfirmasiHapus() {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/galeri/${confirmDelete.id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (checkAuth(res)) return;
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menghapus foto.");
      setPhotos((p) => p.filter((x) => x.id !== confirmDelete.id));
      setConfirmDelete(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Kelola Galeri</h2>
          <p className="text-xs text-gray-500 mt-0.5">{photos.length} foto — seret kartu untuk mengubah urutan tampil</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKategoriModal(true)}
            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            <Tag size={15} />
            Kelola Kategori
          </button>
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-[#284061] hover:bg-[#1e3358] text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            <Plus size={15} />
            Tambah Foto
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500 text-sm">Memuat data...</div>
      ) : error ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-red-500 text-sm">{error}</div>
      ) : photos.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">Belum ada foto. Klik "Tambah Foto" untuk mulai.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((p, i) => (
            <div
              key={p.id}
              draggable
              onDragStart={() => (dragIndex.current = i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <div className="aspect-4/3 relative">
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors" />
                <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={14} />
                </div>
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditing(p); setShowForm(true); }}
                    className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center text-[#284061]"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(p)}
                    className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center text-red-600"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-[12.5px] font-medium text-gray-700 truncate">{p.caption}</p>
                {p.kategori && (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-slate-100 text-slate-600">
                    {p.kategori}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <FotoFormModal
          photo={editing}
          kategori={kategori}
          onClose={() => setShowForm(false)}
          onSaved={(saved, isNew) => {
            setPhotos((prev) => isNew ? [...prev, saved] : prev.map((p) => (p.id === saved.id ? { ...p, ...saved } : p)));
            setShowForm(false);
            load();
          }}
          checkAuth={checkAuth}
        />
      )}

      {showKategoriModal && (
        <KategoriModal
          kategori={kategori}
          onClose={() => setShowKategoriModal(false)}
          onChange={setKategori}
          checkAuth={checkAuth}
        />
      )}

      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => !deleting && setConfirmDelete(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertTriangle size={22} className="text-red-600" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-800 mb-1.5">Hapus foto ini?</h3>
            <p className="text-[13.5px] text-gray-500 leading-relaxed mb-6">
              Foto <span className="font-semibold text-gray-700">"{confirmDelete.caption}"</span> akan dihapus permanen dari galeri. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={konfirmasiHapus}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-60"
              >
                {deleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FotoFormModal({ photo, kategori, onClose, onSaved, checkAuth }) {
  const isNew = !photo;
  const [caption, setCaption]   = useState(photo?.caption || "");
  const [kategoriId, setKategoriId] = useState(photo?.kategori_id || "");
  const [file, setFile]         = useState(null);
  const [saving, setSaving]     = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!caption.trim()) { setErrorMsg("Caption wajib diisi."); return; }
    if (isNew && !file)  { setErrorMsg("Foto wajib diupload."); return; }

    setSaving(true);
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.append("caption", caption.trim());
      fd.append("kategoriId", kategoriId || "");
      if (file) fd.append("foto", file);

      const url    = isNew ? "/api/galeri" : `/api/galeri/${photo.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await apiFetch(url, { method, headers: authHeaders(), body: fd });
      if (checkAuth(res)) return;
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan foto.");

      onSaved(json.data, isNew);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-bold text-gray-800">{isNew ? "Tambah Foto" : "Edit Foto"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="relative border-2 border-dashed border-gray-200 rounded-xl text-center cursor-pointer bg-gray-50 hover:border-[#284061] hover:bg-white transition-all block overflow-hidden">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file ? (
              <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-40 object-cover" />
            ) : photo?.url ? (
              <img src={photo.url} alt={photo.caption} className="w-full h-40 object-cover opacity-70" />
            ) : (
              <div className="py-8">
                <ImagePlus size={22} className="mx-auto mb-2 text-[#284061]/60" />
                <div className="text-[12.5px] font-medium text-[#284061]">Klik untuk pilih foto</div>
              </div>
            )}
          </label>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-[#284061]">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Deskripsi singkat foto"
              className="px-4 py-2.5 rounded-xl border-[1.5px] border-slate-200 text-[13px] bg-slate-50 focus:bg-white focus:border-[#284061] focus:ring-2 focus:ring-[#284061]/15 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-[#284061]">Kategori</label>
            <select
              value={kategoriId}
              onChange={(e) => setKategoriId(e.target.value)}
              className="px-4 py-2.5 rounded-xl border-[1.5px] border-slate-200 text-[13px] bg-slate-50 focus:bg-white focus:border-[#284061] focus:ring-2 focus:ring-[#284061]/15 outline-none transition-all cursor-pointer"
            >
              <option value="">Tanpa Kategori</option>
              {kategori.map((k) => (
                <option key={k.id} value={k.id}>{k.nama}</option>
              ))}
            </select>
          </div>

          {errorMsg && (
            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-600">{errorMsg}</div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="bg-linear-to-br from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl text-[13.5px] font-bold shadow-lg shadow-amber-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : isNew ? "Tambah Foto" : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}

function KategoriModal({ kategori, onClose, onChange, checkAuth }) {
  const [nama, setNama]     = useState("");
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function tambah(e) {
    e.preventDefault();
    if (!nama.trim()) return;
    setErrorMsg("");
    try {
      const res = await apiFetch("/api/galeri/kategori", {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ nama: nama.trim() }),
      });
      if (checkAuth(res)) return;
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menambah kategori.");
      onChange((k) => [...k, json.data]);
      setNama("");
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  async function simpanRename(id) {
    if (!editNama.trim()) return;
    setErrorMsg("");
    try {
      const res = await apiFetch(`/api/galeri/kategori/${id}`, {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ nama: editNama.trim() }),
      });
      if (checkAuth(res)) return;
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal memperbarui kategori.");
      onChange((k) => k.map((x) => (x.id === id ? json.data : x)));
      setEditId(null);
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  async function hapus(id) {
    setErrorMsg("");
    try {
      const res = await apiFetch(`/api/galeri/kategori/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (checkAuth(res)) return;
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menghapus kategori.");
      onChange((k) => k.filter((x) => x.id !== id));
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-gray-800">Kelola Kategori</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>

        <div className="flex flex-col gap-2 mb-4 max-h-64 overflow-y-auto">
          {kategori.length === 0 && (
            <p className="text-[12.5px] text-gray-400 text-center py-4">Belum ada kategori.</p>
          )}
          {kategori.map((k) => (
            <div key={k.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              {editId === k.id ? (
                <>
                  <input
                    autoFocus
                    value={editNama}
                    onChange={(e) => setEditNama(e.target.value)}
                    className="flex-1 px-2 py-1 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-[#284061]"
                  />
                  <button onClick={() => simpanRename(k.id)} className="text-[12px] font-semibold text-emerald-600">Simpan</button>
                  <button onClick={() => setEditId(null)} className="text-[12px] text-gray-400">Batal</button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-[13px] text-gray-700">{k.nama}</span>
                  <button onClick={() => { setEditId(k.id); setEditNama(k.nama); }} className="text-gray-400 hover:text-[#284061]">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => hapus(k.id)} className="text-gray-400 hover:text-red-600">
                    <Trash2 size={13} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {errorMsg && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-[12.5px] text-red-600">{errorMsg}</div>
        )}

        <form onSubmit={tambah} className="flex gap-2">
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama kategori baru"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-[13px] outline-none focus:border-[#284061]"
          />
          <button type="submit" className="px-3 py-2 rounded-lg bg-[#284061] text-white text-[12.5px] font-semibold hover:bg-[#1e3358] transition">
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
}
