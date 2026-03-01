import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowRight, Globe, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
// Import logo persis seperti di Navbar
import logoZamoa from '../assets/images/Yayasan Zamoa.jpg';

const Footer = () => {
  return (
    <footer className="bg-[#1B1464] text-white pt-20 pb-10 relative overflow-hidden">
      
      {/* --- DECORATIVE TOP BORDER --- */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FBB03B] via-[#F15A24] to-[#006B3F]"></div>

      {/* --- BACKGROUND PATTERN & GLOW --- */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FBB03B]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#006B3F]/10 rounded-full blur-[100px] translate-y-1/4 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        
        {/* Menggunakan grid 12 kolom untuk proporsi yang lebih rapi di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* 1. KOLOM PROFIL (Lebih Lebar: 4 Kolom) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Logo Section (Sama dengan Navbar) */}
            <Link to="/" className="flex items-center gap-3 group w-max">
              <div className="bg-white p-1.5 rounded-xl shadow-lg">
                <img 
                  src={logoZamoa} 
                  alt="Logo Yayasan Zamoa" 
                  className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white leading-none uppercase tracking-tight">
                  Zamoa
                </span>
                <span className="text-[10px] font-bold text-[#FBB03B] tracking-[0.3em] uppercase mt-0.5">
                  Peduli Bangsa
                </span>
              </div>
            </Link>
            
            <p className="text-gray-300 leading-relaxed font-medium text-sm pr-4">
              Membangun generasi muda berakhlak mulia, berjiwa sosial, dan berprestasi melalui sinergi program keagamaan, pendidikan, dan olahraga.
            </p>
            
            <div className="flex gap-3 pt-2">
              <SocialLink href="https://instagram.com/yayasanzamoapedulibangsa" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Globe size={20} />} />
            </div>
          </div>

          {/* 2. KOLOM KONTAK (3 Kolom) */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest flex items-center gap-3">
              <span className="w-6 h-1 bg-[#F15A24] rounded-full inline-block"></span>
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

          {/* 3. KOLOM UNIT KERJA (3 Kolom) */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest flex items-center gap-3">
              <span className="w-6 h-1 bg-[#F15A24] rounded-full inline-block"></span>
              Unit Kerja
            </h3>
            <ul className="space-y-4">
              <FooterLink to="#" text="Zamoa Sports Academy" />
              <FooterLink to="#" text="PKBM Peduli Bangsa" />
              <FooterLink to="#" text="Rumah Yatim Harapan Bangsa" />
              <FooterLink to="#" text="Koperasi Zamoa Muda Mandiri" />
            </ul>
          </div>

          {/* 4. KOLOM NAVIGASI & CTA DONASI (2 Kolom) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 text-[#FBB03B] uppercase tracking-widest flex items-center gap-3">
              <span className="w-6 h-1 bg-[#F15A24] rounded-full inline-block"></span>
              Akses Cepat
            </h3>
            <ul className="space-y-4 mb-8">
              <FooterLink to="/" text="Beranda" />
              <FooterLink to="/tentang" text="Tentang Kami" />
              <FooterLink to="/struktur" text="Struktur Organisasi" />
              <FooterLink to="/program" text="Program Yayasan" />
            </ul>

            {/* Tombol Donasi di Footer */}
            <Link 
              to="/donasi" 
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#F15A24] to-[#FBB03B] text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <HandHeart size={18} />
              Mulai Donasi
            </Link>
          </div>

        </div>

        {/* --- COPYRIGHT --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-bold tracking-widest uppercase text-center md:text-left flex items-center gap-1">
            &copy; {new Date().getFullYear()} Yayasan Zamoa Peduli Bangsa. <span className="hidden md:inline">All Rights Reserved.</span>
          </p>
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            {/* Link Portal Admin dipindah ke bawah agar eksklusif */}
            <Link to="/admin/login" className="hover:text-[#FBB03B] transition-colors">
              Portal Admin
            </Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- SUB-COMPONENTS ---

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

const FooterLink = ({ to, text }) => (
  <li>
    <Link 
      to={to} 
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all duration-300 group"
    >
      <ArrowRight size={14} className="text-gray-600 group-hover:text-[#FBB03B] group-hover:translate-x-1 transition-transform duration-300" />
      {text}
    </Link>
  </li>
);

export default Footer;