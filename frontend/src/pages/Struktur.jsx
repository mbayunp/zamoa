import React from 'react';
import CardAnggota from '../components/CardAnggota';
import { Users, ShieldCheck, Briefcase, Zap } from 'lucide-react';

const Struktur = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      
      {/* --- HERO HEADER --- */}
      <section className="relative py-20 bg-gradient-to-br from-[#1B1464] to-[#006B3F] text-white text-center overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F15A24]/20 rounded-full blur-3xl translate-y-10 -translate-x-10"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">STRUKTUR ORGANISASI</h1>
          <h2 className="text-xl md:text-2xl font-medium text-[#FBB03B]">Yayasan Zamoa Peduli Bangsa</h2>
          <div className="inline-block mt-4 px-4 py-1 bg-white/10 rounded-full border border-white/20 text-sm font-medium">
            Periode Kepengurusan 2026 – 2028
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-20 relative">
        
        {/* Garis Penghubung Vertikal (Background Line) */}
        <div className="absolute left-1/2 top-40 bottom-20 w-0.5 bg-gray-200 -translate-x-1/2 hidden lg:block -z-10"></div>

        {/* --- 1. ORGAN UTAMA (Petinggi) --- */}
        <div className="relative">
          <SectionTitle icon={<ShieldCheck size={20} />} title="Organ Utama Yayasan" color="bg-[#1B1464]" />
          
          {/* Level 1: Pembina & Pengawas */}
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 mb-12 relative z-10">
            <div className="w-full max-w-xs">
              <CardAnggota nama="MEIDY PRASETYADI" jabatan="Pembina" variant="primary" />
            </div>
            <div className="w-full max-w-xs">
              <CardAnggota nama="WAHYU KURNIAWAN" jabatan="Pengawas" variant="primary" />
            </div>
          </div>

          {/* Level 2: Ketua (Center) */}
          <div className="flex justify-center mb-12 relative z-10">
             {/* Garis Konektor Kecil */}
             <div className="absolute -top-12 w-0.5 h-12 bg-gray-300 hidden md:block"></div>
             
             <div className="w-full max-w-sm transform hover:scale-105 transition-transform duration-300">
               <div className="absolute -inset-1 bg-gradient-to-r from-[#1B1464] to-[#F15A24] rounded-[1.2rem] blur opacity-30"></div>
               <CardAnggota nama="TB. M. Ma'mun Hidayat" jabatan="KETUA YAYASAN" variant="primary" />
             </div>
          </div>

          {/* Level 3: Sekretaris & Bendahara */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto relative z-10">
            {/* Connector Horizontal */}
            <div className="absolute -top-8 left-1/4 right-1/4 h-0.5 bg-gray-300 hidden md:block border-t border-dashed border-gray-400"></div>
            <div className="absolute -top-8 left-1/2 h-8 w-0.5 bg-gray-300 hidden md:block -translate-x-1/2"></div>

            <CardAnggota nama="Khairul Hadziq, MPd" jabatan="Sekretaris" variant="primary" />
            <CardAnggota nama="Hendry Gunawan, Amd" jabatan="Bendahara" variant="primary" />
          </div>
        </div>

        {/* --- 2. UNIT PENDUKUNG OPERASIONAL --- */}
        <div className="relative">
          <SectionTitle icon={<Zap size={20} />} title="Unit Pendukung Operasional" color="bg-[#006B3F]" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <CardAnggota nama="Maya & Ramanda" jabatan="Divisi Keuangan & Akuntansi" variant="secondary" />
            <CardAnggota nama="M. Bayu NP & Aris Beno" jabatan="Divisi IT & Digitalisasi" variant="secondary" />
            <CardAnggota nama="Tuty Artika & Dea Iqlima" jabatan="Divisi Administrasi & SDM" variant="secondary" />
            <CardAnggota nama="Ery Fasya & Rudi Darmawan" jabatan="Divisi Humas" variant="secondary" />
            <CardAnggota nama="Davina, Zulfa, Nazmah" jabatan="Divisi Media & Publikasi" variant="secondary" />
          </div>
        </div>

        {/* --- 3. BIDANG PROGRAM (Program Executors) --- */}
        <div className="relative">
          <SectionTitle icon={<Briefcase size={20} />} title="Bidang Program Utama" color="bg-[#F15A24]" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
             <CardAnggota nama="Dani Saputra" jabatan="Ketua Bidang Keagamaan" variant="accent" />
             <CardAnggota nama="Chandra Dwi A" jabatan="Ketua Bidang Sosial" variant="accent" />
             <CardAnggota nama="Dewi Elsa" jabatan="Ketua Bidang Pendidikan" variant="accent" />
             <CardAnggota nama="Achmad Bayu" jabatan="Ketua Bidang Kepemudaan" variant="accent" />
             <CardAnggota nama="Siti Sarah V" jabatan="Ketua Bidang Ekonomi" variant="accent" />
             <CardAnggota nama="Fahmi Respati" jabatan="Ketua Bidang Olahraga" variant="accent" />
             <CardAnggota nama="Ermawan Didik" jabatan="Ketua Bidang Hukum" variant="accent" />
          </div>
        </div>

      </div>
    </div>
  );
};

// Komponen Kecil untuk Judul Section agar rapi
const SectionTitle = ({ icon, title, color }) => (
  <div className="flex items-center justify-center mb-10 relative z-10">
    <div className={`flex items-center gap-3 px-6 py-2 rounded-full text-white font-bold shadow-lg ${color}`}>
      {icon}
      <span>{title}</span>
    </div>
  </div>
);

export default Struktur;