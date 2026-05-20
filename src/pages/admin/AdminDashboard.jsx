import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LogOut, Download, Eye } from "lucide-react";
import { apiFetch } from "../../utils/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

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

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((d) => {
      const matchSearch =
        !q ||
        d.nama_lengkap?.toLowerCase().includes(q) ||
        d.nomor_pendaftaran?.toLowerCase().includes(q);
      const matchJk = !filterJk || d.jenis_kelamin?.trim() === filterJk;
      return matchSearch && matchJk;
    });
  }, [data, search, filterJk]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Dashboard Admin PPDB</h1>
          <p className="text-xs text-gray-500 mt-0.5">Pesantren Al Kautsar</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </header>

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

          <button
            onClick={() => exportCSV(filtered)}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            <Download size={15} />
            Export CSV
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
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(d.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/admin/santri/${d.id}`)}
                          className="flex items-center gap-1.5 text-xs text-green-700 hover:text-green-900 font-medium transition"
                        >
                          <Eye size={14} />
                          Detail
                        </button>
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
    </div>
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
