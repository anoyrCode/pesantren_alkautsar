import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download, Eye, Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { apiFetch, bacaJson, errorRamah, pesanError } from "../../utils/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

const STATUS_BADGE = {
  Diterima: "bg-emerald-100 text-emerald-700",
  Ditolak:  "bg-red-100 text-red-700",
  Menunggu: "bg-amber-100 text-amber-700",
};

function exportCSV(data) {
  if (!data.length) return;

  const headers = [
    "Nomor Pendaftaran", "Nama Lengkap", "Jenis Kelamin",
    "Asal Sekolah", "Nomor HP Ortu", "Status", "Tanggal Daftar",
  ];
  const rows = data.map((d) => [
    d.nomor_pendaftaran,
    d.nama_lengkap,
    d.jenis_kelamin,
    d.sekolah_asal ?? "-",
    d.nomor_hp_ortu,
    d.status ?? "Menunggu",
    new Date(d.created_at).toLocaleDateString("id-ID"),
  ]);

  // Pakai semicolon agar Excel Indonesia membaca kolom dengan benar
  // ﻿ = BOM supaya karakter Indonesia tidak rusak
  const csv = "﻿" + [headers, ...rows]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";"))
    .join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `pendaftar-ppdb-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [search, setSearch]   = useState("");
  const [filterJk, setFilterJk] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    apiFetch("/api/pendaftaran", {
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
        if (json) setData(json.data || []);
      })
      .catch(() => setError("Gagal mengambil data."))
      .finally(() => setLoading(false));
  }, [navigate]);

  async function konfirmasiHapus() {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/pendaftaran/${confirmDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
        return;
      }
      const json = await bacaJson(res);
      if (!res.ok) throw errorRamah(json.error || "Gagal menghapus data.");
      setData((d) => d.filter((x) => x.id !== confirmDelete.id));
      setConfirmDelete(null);
    } catch (err) {
      alert(pesanError(err));
    } finally {
      setDeleting(false);
    }
  }

  async function ubahStatus(id, status) {
    const prev = data;
    setData((d) => d.map((x) => (x.id === id ? { ...x, status } : x)));
    try {
      const res = await apiFetch(`/api/pendaftaran/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ status }),
      });
      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
        return;
      }
      if (!res.ok) throw errorRamah((await bacaJson(res)).error || "Gagal memperbarui status.");
    } catch (err) {
      setData(prev);
      alert(pesanError(err));
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((d) => {
      const matchSearch =
        !q ||
        d.nama_lengkap?.toLowerCase().includes(q) ||
        d.nomor_pendaftaran?.toLowerCase().includes(q);
      const matchJk = !filterJk || d.jenis_kelamin?.trim() === filterJk;
      const matchStatus = !filterStatus || (d.status ?? "Menunggu") === filterStatus;
      return matchSearch && matchJk && matchStatus;
    });
  }, [data, search, filterJk, filterStatus]);

  return (
    <>
      <main className="px-6 py-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Total Pendaftar" value={data.length} color="bg-blue-50 text-blue-700" />
          <StatCard label="Laki-laki" value={data.filter((d) => d.jenis_kelamin?.trim() === "Laki-laki").length} color="bg-sky-50 text-sky-700" />
          <StatCard label="Perempuan" value={data.filter((d) => d.jenis_kelamin?.trim() === "Perempuan").length} color="bg-pink-50 text-pink-700" />
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau nomor pendaftaran..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={filterJk}
            onChange={(e) => setFilterJk(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Semua Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Semua Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Diterima">Diterima</option>
            <option value="Ditolak">Ditolak</option>
          </select>

          <button
            onClick={() => exportCSV(filtered)}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            <Download size={15} />
            Export CSV
          </button>

          <button
            onClick={() => navigate("/admin/santri/baru")}
            className="flex items-center gap-2 bg-[#284061] hover:bg-[#1e3358] text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            <Plus size={15} />
            Tambah Data
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500 text-sm">Memuat data...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-500 text-sm">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-400 text-sm">Tidak ada data ditemukan.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">No</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nomor Pendaftaran</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nama Lengkap</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">L/P</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">No. HP Ortu</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal Daftar</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((d, i) => (
                    <tr key={d.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3 font-mono text-gray-700">{d.nomor_pendaftaran}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{d.nama_lengkap}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${d.jenis_kelamin?.trim() === "Laki-laki" ? "bg-sky-100 text-sky-700" : "bg-pink-100 text-pink-700"}`}>
                          {d.jenis_kelamin?.trim() === "Laki-laki" ? "L" : "P"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{d.nomor_hp_ortu}</td>
                      <td className="px-4 py-3">
                        <div className="relative inline-block">
                          <select
                            value={d.status ?? "Menunggu"}
                            onChange={(e) => ubahStatus(d.id, e.target.value)}
                            className={`appearance-none pl-2.5 pr-6 py-1 rounded-full text-xs font-medium cursor-pointer outline-none ${STATUS_BADGE[d.status ?? "Menunggu"]}`}
                          >
                            <option value="Menunggu">Menunggu</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Ditolak">Ditolak</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(d.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigate(`/admin/santri/${d.id}`)}
                            className="flex items-center gap-1.5 text-xs text-green-700 hover:text-green-900 font-medium transition"
                          >
                            <Eye size={14} />
                            Detail
                          </button>
                          <button
                            onClick={() => navigate(`/admin/santri/${d.id}/edit`)}
                            className="flex items-center gap-1.5 text-xs text-[#284061] hover:text-amber-600 font-medium transition"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirmDelete({ id: d.id, nama: d.nama_lengkap })}
                            className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-medium transition"
                          >
                            <Trash2 size={13} />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-3 text-right">
          Menampilkan {filtered.length} dari {data.length} pendaftar
        </p>
      </main>

      {/* Modal konfirmasi hapus */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => !deleting && setConfirmDelete(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertTriangle size={22} className="text-red-600" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-800 mb-1.5">Hapus data pendaftar?</h3>
            <p className="text-[13.5px] text-gray-500 leading-relaxed mb-6">
              Data <span className="font-semibold text-gray-700">"{confirmDelete.nama}"</span> akan dihapus permanen beserta file terkait. Tindakan ini tidak dapat dibatalkan.
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
    </>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-xl p-4 ${color} bg-opacity-60`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
