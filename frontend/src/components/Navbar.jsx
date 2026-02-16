import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Heart } from 'lucide-react';
// Import logo dari assets
import logoZamoa from '../assets/images/Yayasan Zamoa.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Fungsi untuk mengecek menu aktif
  const isActive = (path) => location.pathname === path;

  // Menutup mobile menu saat rute berubah
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Daftar Menu agar kodingan lebih rapi
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Program', path: '/program' }, // Menu Baru
    { name: 'Tentang Kami', path: '/tentang' },
    { name: 'Struktur', path: '/struktur' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        
        {/* --- LOGO SECTION --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logoZamoa} 
            alt="Logo Yayasan Zamoa" 
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="text-xl font-black text-[#1B1464] leading-none uppercase tracking-tight">
              Zamoa
            </span>
            <span className="text-[10px] font-bold text-[#006B3F] tracking-[0.2em] uppercase mt-0.5">
              Peduli Bangsa
            </span>
          </div>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative group
                ${isActive(link.path) 
                  ? 'text-[#006B3F] bg-green-50' 
                  : 'text-slate-600 hover:text-[#F15A24] hover:bg-orange-50'
                }`}
            >
              {link.name}
              {/* Dot indikator jika aktif */}
              {isActive(link.path) && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#006B3F] rounded-full"></span>
              )}
            </Link>
          ))}

          <div className="h-8 w-[1px] bg-gray-200 mx-4"></div>

          {/* Tombol Admin */}
          <Link 
            to="/admin/login" 
            className="flex items-center gap-2 bg-[#1B1464] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#F15A24] hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <User size={16} />
            Portal Admin
          </Link>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#1B1464] hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {/* Logic: Render hanya jika isOpen = true */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'}`}>
        <div className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`px-4 py-4 rounded-xl font-bold flex items-center justify-between transition-colors
                ${isActive(link.path) 
                  ? 'bg-green-50 text-[#006B3F]' 
                  : 'text-slate-600 hover:bg-gray-50 hover:text-[#F15A24]'
                }`}
            >
              {link.name}
              {isActive(link.path) && <Heart size={16} className="fill-[#006B3F]" />}
            </Link>
          ))}
          
          <hr className="my-2 border-gray-100" />
          
          <Link 
            to="/admin/login" 
            className="flex items-center justify-center gap-2 bg-[#1B1464] text-white px-4 py-3 rounded-xl font-bold active:scale-95 transition-transform"
          >
            <User size={18} />
            Login Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;