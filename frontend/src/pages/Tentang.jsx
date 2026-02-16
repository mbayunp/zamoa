import React from 'react';
import { Target, History, Heart, Award, ShieldCheck, CheckCircle2, Users, MapPin } from 'lucide-react';

const Tentang = () => {
  return (
    <div className="w-full bg-white">
      
      {/* --- HERO SECTION --- */}
      {/* Konsisten dengan halaman Home & Struktur */}
      <section className="relative bg-gradient-to-br from-[#1B1464] to-[#006B3F] py-28 text-center text-white overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FBB03B]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F15A24]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FBB03B] text-sm font-bold mb-6">
            <Users size={16} />
            <span>KENALI KAMI LEBIH DEKAT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBB03B] to-[#F15A24]">Zamoa</span>
          </h1>
          <p className="text-white/80 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Membangun peradaban melalui pembinaan generasi muda yang berakhlak mulia, cerdas, dan peduli sesama.
          </p>
        </div>
      </section>

      {/* --- PROFIL & LEGALITAS --- */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Kolom Kiri: Teks */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-[#F15A24] rounded-full"></div>
              <h2 className="text-3xl font-black text-[#1B1464] uppercase tracking-wide">Profil Yayasan</h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg mb-8 text-justify">
              <span className="font-bold text-[#1B1464]">Yayasan Zamoa Peduli Bangsa (YZPB)</span> merupakan organisasi nirlaba yang lahir dari semangat kepemudaan. Berawal dari komunitas hobi, kami bertransformasi menjadi lembaga formal yang berkomitmen membina potensi masyarakat di bidang <span className="text-[#006B3F] font-semibold">Keagamaan, Pendidikan, Sosial, Ekonomi, dan Olahraga.</span>
            </p>

            {/* Badge Legalitas */}
            <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="bg-[#006B3F] text-white p-3 rounded-xl shadow-lg shadow-green-200">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="font-bold text-[#1B1464] text-lg">Legalitas Resmi</h3>
                <p className="text-[#006B3F] font-medium text-sm mt-1 mb-2">Terdaftar di Kemenkumham RI</p>
                <div className="inline-block bg-white border border-green-200 px-3 py-1 rounded-md text-xs font-mono text-gray-600">
                  SK: AHU-0014603.AH.01.04 Tahun 2019
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Placeholder Gambar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#F15A24] rounded-[2.5rem] rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500"></div>
            <div className="relative bg-gray-200 rounded-[2.5rem] aspect-video overflow-hidden shadow-2xl border-4 border-white">
               {/* Ganti src gambar di sini */}
               <img 
                 src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                 alt="Kegiatan Yayasan" 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
                 <p className="text-white font-medium flex items-center gap-2">
                   <MapPin size={16} className="text-[#FBB03B]" /> Cianjur, Jawa Barat
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NILAI-NILAI (Values) --- */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-[#1B1464] uppercase mb-4">Nilai Utama Kami</h2>
            <p className="text-gray-500 font-medium">Fondasi yang menjadi landasan setiap langkah pergerakan Yayasan Zamoa.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kartu 1: Integritas */}
            <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-50 text-[#1B1464] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1B1464] group-hover:text-white transition-colors duration-300">
                <ShieldCheck size={32} />
              </div>
              <h4 className="font-bold text-xl text-[#1B1464] mb-3">Integritas</h4>
              <p className="text-gray-600 leading-relaxed">Menjunjung tinggi kejujuran, amanah, dan transparansi dalam mengelola setiap titipan donatur.</p>
            </div>

            {/* Kartu 2: Empati */}
            <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-50 text-[#006B3F] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#006B3F] group-hover:text-white transition-colors duration-300">
                <Heart size={32} />
              </div>
              <h4 className="font-bold text-xl text-[#1B1464] mb-3">Empati Sosial</h4>
              <p className="text-gray-600 leading-relaxed">Bergerak berdasarkan kepedulian mendalam terhadap kondisi sosial masyarakat sekitar.</p>
            </div>

            {/* Kartu 3: Prestasi */}
            <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-50 text-[#F15A24] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F15A24] group-hover:text-white transition-colors duration-300">
                <Target size={32} />
              </div>
              <h4 className="font-bold text-xl text-[#1B1464] mb-3">Berprestasi</h4>
              <p className="text-gray-600 leading-relaxed">Mendorong generasi muda untuk tidak hanya baik budi pekertinya, tapi juga unggul karyanya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEJARAH (Timeline Modern) --- */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16">
          <div className="p-3 bg-[#1B1464] text-white rounded-2xl shadow-lg mb-4">
            <History size={24} />
          </div>
          <h2 className="text-3xl font-black text-[#1B1464] uppercase">Jejak Langkah</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Garis Tengah */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>

          {/* Event 1: 2004 */}
          <div className="relative flex flex-col md:flex-row items-center justify-between mb-12 group">
            <div className="md:w-5/12 mb-4 md:mb-0 md:text-right pr-8 pl-12 md:pl-0">
               <h3 className="text-2xl font-black text-[#1B1464]">Zamoa Community</h3>
               <p className="text-gray-600 mt-2">Komunitas ini lahir dari semangat kebersamaan anak muda Cianjur yang memiliki hobi sama di bidang Basket.</p>
            </div>
            
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F15A24] border-4 border-white shadow-lg z-10 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            <div className="md:w-5/12 pl-12 md:pl-8 flex justify-start">
               <span className="text-5xl font-black text-gray-100 group-hover:text-[#F15A24]/20 transition-colors duration-300">2004</span>
            </div>
          </div>

          {/* Event 2: 2019 */}
          <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
            <div className="md:w-5/12 mb-4 md:mb-0 pl-12 md:pl-8">
               <h3 className="text-2xl font-black text-[#1B1464]">Resmi Berbadan Hukum</h3>
               <p className="text-gray-600 mt-2">Zamoa Community bertransformasi menjadi Yayasan Zamoa Peduli Bangsa untuk memperluas jangkauan manfaat.</p>
            </div>
            
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#006B3F] border-4 border-white shadow-lg z-10 flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            <div className="md:w-5/12 pr-8 pl-12 md:pl-0 flex justify-start md:justify-end">
               <span className="text-5xl font-black text-gray-100 group-hover:text-[#006B3F]/20 transition-colors duration-300">2019</span>
            </div>
          </div>

        </div>
      </section>

      {/* --- VISI & MISI --- */}
      <section className="bg-[#1B1464] py-20 text-white relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Visi */}
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-[#FBB03B] p-2 rounded-lg text-[#1B1464] font-bold"><Target /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-widest text-[#FBB03B]">Visi Kami</h2>
              </div>
              <p className="text-2xl md:text-3xl font-black italic leading-normal">
                "Membangun Generasi Muda Berakhlak Mulia, Berjiwa Sosial dan Berprestasi"
              </p>
            </div>

            {/* Misi */}
            <div>
               <div className="flex items-center gap-3 mb-8">
                 <div className="bg-[#F15A24] p-2 rounded-lg text-white font-bold"><Award /></div>
                 <h2 className="text-2xl font-bold uppercase tracking-widest text-[#F15A24]">Misi Kami</h2>
              </div>
              <ul className="space-y-6">
                {[
                  "Membina potensi masyarakat bidang agama, pendidikan, & ekonomi.",
                  "Menciptakan generasi unggul dan peduli sesama.",
                  "Menanamkan cinta tanah air dan lingkungan."
                ].map((misi, index) => (
                  <li key={index} className="flex gap-4 items-start group">
                    <CheckCircle2 className="text-[#F15A24] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300 font-medium text-lg border-b border-white/10 pb-2 w-full group-hover:text-white transition-colors">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Tentang;