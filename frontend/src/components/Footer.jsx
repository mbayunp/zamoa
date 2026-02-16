import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1B1464] text-white pt-20 pb-10 relative overflow-hidden">
      
      {/* --- DECORATIVE TOP BORDER --- */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FBB03B] via-[#F15A24] to-[#006B3F]"></div>

      {/* --- BACKGROUND PATTERN (Subtle) --- */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. KOLOM PROFIL */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">
                Zamoa
              </h3>
              <span className="text-[#FBB03B] text-sm font-bold tracking-[0.3em] uppercase">Peduli Bangsa</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed font-medium text-sm">
              Membangun generasi muda berakhlak mulia, berjiwa sosial, dan berprestasi melalui sinergi program keagamaan, pendidikan, dan olahraga.
            </p>
            
            <div className="flex gap-3">
              <SocialLink href="https://instagram.com/yayasanzamoapedulibangsa" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Globe size={20} />} />
            </div>
          </div>

          {/* 2. KOLOM KONTAK */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest border-b border-white/10 pb-2 inline-block">
              Hubungi Kami
            </h3>
            <ul className="space-y-5">
              <ContactItem 
                icon={<MapPin size={20} />} 
                text="Cianjur Sports Centre, Jl. Raya Bandung Km. 3, Karangtengah, Cianjur" 
              />
              <ContactItem 
                icon={<Phone size={20} />} 
                text="+62 818 228 813" 
              />
              <ContactItem 
                icon={<Mail size={20} />} 
                text="yayasanzamoapedulibangsa@gmail.com" 
              />
            </ul>
          </div>

          {/* 3. KOLOM UNIT KERJA */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest border-b border-white/10 pb-2 inline-block">
              Unit Kerja
            </h3>
            <ul className="space-y-3">
              <FooterLink to="#" text="Zamoa Sports Academy" />
              <FooterLink to="#" text="PKBM Peduli Bangsa" />
              <FooterLink to="#" text="Rumah Yatim Harapan Bangsa" />
              <FooterLink to="#" text="Koperasi Zamoa Muda Mandiri" />
            </ul>
          </div>

          {/* 4. KOLOM NAVIGASI */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest border-b border-white/10 pb-2 inline-block">
              Akses Cepat
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/" text="Beranda" />
              <FooterLink to="/tentang" text="Tentang Kami" />
              <FooterLink to="/struktur" text="Struktur Organisasi" />
              <FooterLink to="/program" text="Program & Donasi" />
              <FooterLink to="/admin/login" text="Portal Admin" highlight />
            </ul>
          </div>

        </div>

        {/* --- COPYRIGHT --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-bold tracking-widest uppercase text-center md:text-left">
            &copy; {new Date().getFullYear()} Yayasan Zamoa Peduli Bangsa. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- SUB-COMPONENTS (Agar kodingan lebih rapi) ---

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:bg-[#F15A24] hover:border-[#F15A24] hover:text-white transition-all duration-300 hover:-translate-y-1"
  >
    {icon}
  </a>
);

const ContactItem = ({ icon, text }) => (
  <li className="flex items-start gap-4 group">
    <div className="p-2 bg-white/5 rounded-lg text-[#F15A24] group-hover:bg-[#F15A24] group-hover:text-white transition-colors duration-300 shrink-0">
      {icon}
    </div>
    <span className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
      {text}
    </span>
  </li>
);

const FooterLink = ({ to, text, highlight = false }) => (
  <li>
    <Link 
      to={to} 
      className={`flex items-center gap-2 text-sm transition-all duration-300 group
        ${highlight ? 'text-[#FBB03B] font-bold' : 'text-gray-400 hover:text-white'}`}
    >
      <ArrowRight size={14} className={`transition-transform duration-300 ${highlight ? 'text-[#FBB03B]' : 'text-gray-600 group-hover:text-[#F15A24] group-hover:translate-x-1'}`} />
      {text}
    </Link>
  </li>
);

export default Footer;