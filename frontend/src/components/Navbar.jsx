import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Heart, LayoutDashboard, HandHeart } from 'lucide-react';
import axios from 'axios';
import logoZamoa from '../assets/images/Yayasan Zamoa.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true
        });
        
        if (response.status === 200) {
          setIsAdminLoggedIn(true);
        }
      } catch (error) {
        setIsAdminLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Daftar Menu (Tambahkan Donasi di sini)
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/tentang' },
    { name: 'Program', path: '/program' },
    { name: 'Struktur', path: '/struktur' },
    // Menu Donasi ditambahkan di bawah, tapi kita akan pisahkan render-nya agar style-nya beda
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
          {/* Loop Menu Biasa */}
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative group
                ${isActive(link.path) 
                  ? 'text-[#006B3F] bg-green-50' 
                  : 'text-slate-600 hover:text-[#006B3F] hover:bg-green-50/50'
                }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#006B3F] rounded-full"></span>
              )}
            </Link>
          ))}

          {/* Tombol Donasi Khusus (Desktop) */}
          <Link 
            to="/donasi"
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ml-2 border-2
              ${isActive('/donasi')
                ? 'bg-[#F15A24] text-white border-[#F15A24] shadow-md shadow-orange-200'
                : 'bg-white text-[#F15A24] border-[#F15A24] hover:bg-[#F15A24] hover:text-white'
              }`}
          >
            <HandHeart size={16} />
            Mulai Donasi
          </Link>

          <div className="h-8 w-[1px] bg-gray-200 mx-4"></div>

          {/* Tombol Admin Dinamis (Desktop) */}
          <Link 
            to={isAdminLoggedIn ? "/admin/dashboard" : "/admin/login"} 
            className={`flex items-center gap-2 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 shadow-md
              ${isAdminLoggedIn 
                ? 'bg-[#1B1464] hover:bg-blue-900 hover:shadow-blue-200' 
                : 'bg-gray-800 hover:bg-black hover:shadow-gray-300'}`}
          >
            {isAdminLoggedIn ? <LayoutDashboard size={16} /> : <User size={16} />}
            {isAdminLoggedIn ? "Dashboard" : "Portal Admin"}
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
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'}`}>
        <div className="flex flex-col p-4 gap-2">
          
          {/* Loop Menu Biasa (Mobile) */}
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`px-4 py-4 rounded-xl font-bold flex items-center justify-between transition-colors
                ${isActive(link.path) 
                  ? 'bg-green-50 text-[#006B3F]' 
                  : 'text-slate-600 hover:bg-gray-50 hover:text-[#006B3F]'
                }`}
            >
              {link.name}
              {isActive(link.path) && <Heart size={16} className="fill-[#006B3F]" />}
            </Link>
          ))}

          {/* Tombol Donasi Khusus (Mobile) */}
          <Link 
            to="/donasi"
            className={`px-4 py-4 rounded-xl font-bold flex items-center justify-between transition-colors border-2
              ${isActive('/donasi')
                ? 'bg-[#F15A24] text-white border-[#F15A24]'
                : 'bg-orange-50 text-[#F15A24] border-orange-100 hover:bg-[#F15A24] hover:text-white'
              }`}
          >
            <div className="flex items-center gap-2">
               <HandHeart size={18} />
               Mulai Donasi
            </div>
          </Link>
          
          <hr className="my-2 border-gray-100" />
          
          {/* Tombol Admin Dinamis (Mobile) */}
          <Link 
            to={isAdminLoggedIn ? "/admin/dashboard" : "/admin/login"} 
            className={`flex items-center justify-center gap-2 text-white px-4 py-3 rounded-xl font-bold active:scale-95 transition-transform
              ${isAdminLoggedIn ? 'bg-[#1B1464]' : 'bg-gray-800'}`}
          >
            {isAdminLoggedIn ? <LayoutDashboard size={18} /> : <User size={18} />}
            {isAdminLoggedIn ? "Dashboard Admin" : "Login Admin"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;