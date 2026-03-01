import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import komponen layout
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// Import Halaman Publik
import Home from '../pages/Home.jsx';
import Struktur from '../pages/Struktur.jsx';
import Tentang from '../pages/Tentang.jsx';
import Program from '../pages/Program.jsx';
import ProgramDetail from '../pages/ProgramDetail.jsx'; // <--- 1. Import halaman detail yang baru dibuat
import Donasi from '../pages/Donasi.jsx';

// Import Halaman Admin
import Login from '../pages/admin/Login.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';

const AppRoutes = () => {
  const location = useLocation();
  
  // Cek apakah ini halaman admin
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    // Wrapper Flexbox untuk memastikan Footer selalu di bawah
    <div className={!isAdminPage ? "flex flex-col min-h-screen" : ""}>
      
      {/* Tampilkan Navbar HANYA jika BUKAN halaman admin */}
      {!isAdminPage && <Navbar />}

      {/* Area Konten */}
      <main className={!isAdminPage ? "flex-grow w-full" : "w-full"}>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<Home />} />
          <Route path="/struktur" element={<Struktur />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/program" element={<Program />} /> 
          <Route path="/program/:id" element={<ProgramDetail />} />
          <Route path="/donasi" element={<Donasi />} />
          
          {/* Rute Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Tampilkan Footer HANYA jika BUKAN halaman admin */}
      {!isAdminPage && <Footer />}
      
    </div>
  );
};

export default AppRoutes;