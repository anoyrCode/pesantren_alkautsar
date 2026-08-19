import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
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

export default function AppRoutes() {
  return (
    <Suspense fallback={<MemuatAdmin />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/kurikulum" element={<KurikulumPage />} />
          <Route path="/ppdb" element={<PPDBPage />} />
          <Route path="/ppdb/formulir" element={<FormulirPage />} />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/kesantrian" element={<KesantrianPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
