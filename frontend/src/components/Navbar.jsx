import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react'; // Menggunakan icon dari library lucide

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            YB
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            Yayasan Berdaya
          </span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/struktur" className="hover:text-blue-600 transition">Struktur</Link>
          <Link to="/bidang" className="hover:text-blue-600 transition">Bidang</Link>
          <Link to="/berita" className="hover:text-blue-600 transition">Berita</Link>
          
          <Link 
            to="/admin/dashboard" 
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-blue-600 hover:text-white transition"
          >
            <User size={18} />
            Admin
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-gray-600">
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;