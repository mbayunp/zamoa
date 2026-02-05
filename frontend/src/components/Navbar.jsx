import { Link, useLocation } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
// Import logo dari assets
import logoZamoa from '../assets/images/Yayasan Zamoa.jpg';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-2 flex justify-between items-center">
        
        {/* Logo Section Menggunakan Image Assets */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logoZamoa} 
            alt="Logo Yayasan Zamoa" 
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-lg font-black text-zamoa-dark leading-none uppercase">
              Zamoa
            </span>
            <span className="text-[10px] font-bold text-zamoa-green tracking-[0.15em] uppercase">
              Peduli Bangsa
            </span>
          </div>
        </Link>

        {/* Menu Desktop dengan warna tema baru */}
        <div className="hidden lg:flex items-center gap-2 text-slate-600 font-semibold">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-lg transition-colors hover:text-zamoa-orange ${isActive('/') ? 'text-zamoa-green bg-green-50' : ''}`}
          >
            Home
          </Link>
          
          <Link 
            to="/tentang" 
            className={`px-4 py-2 rounded-lg transition-colors hover:text-zamoa-orange ${isActive('/tentang') ? 'text-zamoa-green bg-green-50' : ''}`}
          >
            Tentang Kami
          </Link>

          <Link 
            to="/struktur" 
            className={`px-4 py-2 rounded-lg transition-colors hover:text-zamoa-orange ${isActive('/struktur') ? 'text-zamoa-green bg-green-50' : ''}`}
          >
            Struktur
          </Link>

          <div className="h-6 w-[1px] bg-gray-200 mx-4"></div>

          <Link 
            to="/admin/login" 
            className="flex items-center gap-2 bg-zamoa-dark text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-zamoa-green transition-all shadow-md"
          >
            <User size={16} />
            Portal Admin
          </Link>
        </div>

        {/* Mobile Menu */}
        <button className="lg:hidden p-2 text-zamoa-dark">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;