import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import HomePage from "../pages/HomePage";
import TentangPage from "../pages/TentangPage";
import KurikulumPage from "../pages/KurikulumPage";
import PPDBPage from "../pages/PPDBPages";
import FormulirPage from "../pages/FormulirPage";
import GaleriPage from "../pages/GaleriPage";
import KesantrianPage from "../pages/KesantrianPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import { jenjangTerakhir, rutaDashboard } from "../utils/jenjang";

/**
 * Panel admin dimuat terpisah.
 *
 * Sebelumnya semuanya masuk satu bundel, jadi setiap orang tua yang membuka
 * halaman PPDB ikut mengunduh jspdf, html2canvas, dan dompurify (~380 KB)
 * yang hanya dipakai tombol ekspor PDF di AdminDetail. Halaman publik tetap
 * diimpor langsung — itu yang dibuka pengunjung, jadi tidak perlu ditunda.
 */
const AdminLayout     = lazy(() => import("../layouts/AdminLayout"));
const AdminLogin      = lazy(() => import("../pages/admin/AdminLogin"));
const AdminDashboard  = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminDetail     = lazy(() => import("../pages/admin/AdminDetail"));
const AdminSantriForm = lazy(() => import("../pages/admin/AdminSantriForm"));
const AdminGaleri     = lazy(() => import("../pages/admin/AdminGaleri"));
const AdminStatistik  = lazy(() => import("../pages/admin/AdminStatistik"));

// Tampil sekejap saat berkas admin diunduh. Sengaja polos: yang melihatnya
// hanya pengelola, dan hanya sekali per sesi.
function MemuatAdmin() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-400 text-sm">
      Memuat…
    </div>
  );
}

// "/admin/dashboard" tanpa jenjang diteruskan ke tab yang terakhir dibuka. Alamat
// lama ini tetap dipertahankan karena dipakai login, tombol Kembali, dan bookmark.
function DashboardAwal() {
  return <Navigate to={rutaDashboard(jenjangTerakhir())} replace />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<MemuatAdmin />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/kurikulum" element={<KurikulumPage />} />
          {/* `key` memaksa komponen dibuat ulang saat berpindah jenjang. Tanpa itu
              React memakai ulang instance yang sama (tipe komponennya sama), dan
              state seperti FAQ yang sedang terbuka ikut terbawa ke jenjang lain. */}
          <Route path="/ppdb" element={<PPDBPage key="mts-sma" />} />
          <Route path="/ppdb/formulir" element={<FormulirPage key="mts-sma" />} />
          <Route path="/ppdb/sd" element={<PPDBPage key="sd" jenjang="SD" />} />
          <Route path="/ppdb/sd/formulir" element={<FormulirPage key="sd" jenjang="SD" />} />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/kesantrian" element={<KesantrianPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<DashboardAwal />} />
          {/* `key` membuat dashboard dibuat ulang tiap pindah tab, jadi pencarian
              dan filter satu jenjang tidak terbawa ke jenjang lain. */}
          <Route path="/admin/dashboard/mts-sma" element={<AdminDashboard key="mts-sma" jenjang="MTS_SMA" />} />
          <Route path="/admin/dashboard/sd" element={<AdminDashboard key="sd" jenjang="SD" />} />
          <Route path="/admin/galeri" element={<AdminGaleri />} />
          <Route path="/admin/statistik" element={<AdminStatistik />} />
        </Route>

        <Route
          path="/admin/santri/baru"
          element={<ProtectedRoute><AdminSantriForm /></ProtectedRoute>}
        />
        <Route
          path="/admin/santri/:id"
          element={<ProtectedRoute><AdminDetail /></ProtectedRoute>}
        />
        <Route
          path="/admin/santri/:id/edit"
          element={<ProtectedRoute><AdminSantriForm /></ProtectedRoute>}
        />

        {/* Halaman 404 sungguhan, bukan pengalihan ke beranda. Pengalihan
            membuat setiap URL ngawur membalas 200 dengan isi beranda — Google
            menandainya "Soft 404" dan jatah crawl terbuang untuk halaman yang
            tidak ada. Dibungkus MainLayout supaya navbar & footer ikut tampil:
            pengunjung yang tersesat langsung punya jalan keluar. */}
        <Route element={<MainLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
