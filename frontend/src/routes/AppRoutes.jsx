import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import komponen di sini, BUKAN di App.jsx
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// Import Halaman
import Home from '../pages/Home.jsx';
import Struktur from '../pages/Struktur.jsx';
import Tentang from '../pages/Tentang.jsx';
import Program from '../pages/Program.jsx';
import Login from '../pages/admin/Login.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import Donasi from '../pages/Donasi.jsx';

const AppRoutes = () => {
  const location = useLocation();
  
  // Cek apakah ini halaman admin
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    // Wrapper Flexbox dipindah ke sini
    <div className={!isAdminPage ? "flex flex-col min-h-screen" : ""}>
      
      {/* Tampilkan Navbar HANYA jika BUKAN halaman admin */}
      {!isAdminPage && <Navbar />}

      {/* Area Konten */}
      <main className={!isAdminPage ? "flex-grow w-full" : "w-full"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/struktur" element={<Struktur />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/program" element={<Program />} /> 
          <Route path="/donasi" element={<Donasi />} />
          
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