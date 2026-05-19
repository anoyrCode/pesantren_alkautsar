import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import HomePage from "../pages/HomePage";
import TentangPage from "../pages/TentangPage";
import KurikulumPage from "../pages/KurikulumPage";
import PPDBPage from "../pages/PPDBPages";
import FormulirPage from "../pages/FormulirPage";
import GaleriPage from "../pages/GaleriPage";
import KesantrianPage from "../pages/KesantrianPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tentang" element={<TentangPage />} />
        <Route path="/kurikulum" element={<KurikulumPage />} />
        <Route path="/ppdb" element={<PPDBPage />} />
        <Route path="/ppdb/formulir" element={<FormulirPage />} />
        <Route path="/galeri" element={<GaleriPage />} />
        <Route path="/kesantrian" element={<KesantrianPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

