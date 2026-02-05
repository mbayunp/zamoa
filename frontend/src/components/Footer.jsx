import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A44] text-white pt-16 pb-8 w-full border-t-4 border-[#FBB03B]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Kolom Profil */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase">
            Zamoa <br />
            <span className="text-[#FBB03B] text-lg">Peduli Bangsa</span>
          </h3>
          <p className="text-slate-300 leading-relaxed font-medium mb-6">
            Membangun generasi muda berakhlak mulia, berjiwa sosial, dan berprestasi melalui program keagamaan, pendidikan, dan olahraga[cite: 1, 9].
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/yayasanzamoapedulibangsa" className="p-2 bg-white/10 rounded-lg hover:bg-[#F15A24] transition-all">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Kolom Kontak - Berdasarkan Data PDF */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest">
            Hubungi Kami
          </h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin size={22} className="text-[#F15A24] shrink-0" />
              <span className="text-sm">
                Cianjur Sports Centre, Jl. Raya Bandung Km. 3, Karangtengah, Cianjur[cite: 225, 227].
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-[#F15A24] shrink-0" />
              <span className="text-sm">+62 818 228 813 [cite: 229]</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-[#F15A24] shrink-0" />
              <span className="text-sm truncate">yayasanzamoapedulibangsa@gmail.com [cite: 4, 233]</span>
            </li>
          </ul>
        </div>

        {/* Kolom Unit Kerja */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest">
            Unit Kerja
          </h3>
          <ul className="space-y-3 text-slate-300 text-sm font-medium">
            <li>Zamoa Sports Academy [cite: 202]</li>
            <li>PKBM Peduli Bangsa [cite: 120, 200]</li>
            <li>Rumah Yatim Harapan Bangsa [cite: 133, 140]</li>
            <li>Koperasi Zamoa Muda Mandiri [cite: 118, 193]</li>
          </ul>
        </div>

        {/* Kolom Navigasi */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest">
            Navigasi
          </h3>
          <div className="flex flex-col gap-3 text-slate-300 text-sm font-medium">
            <Link to="/" className="hover:text-[#FBB03B]">Beranda</Link>
            <Link to="/tentang" className="hover:text-[#FBB03B]">Tentang Kami</Link>
            <Link to="/struktur" className="hover:text-[#FBB03B]">Struktur Organisasi</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 text-center">
        <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Yayasan Zamoa Peduli Bangsa.
        </p>
      </div>
    </footer>
  );
};

export default Footer;