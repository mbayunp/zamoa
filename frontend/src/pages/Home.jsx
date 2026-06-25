import React from 'react';
import { ArrowRight, Trophy, Heart, BookOpen, ShieldCheck, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col w-full font-sans animate-fade-in">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[95vh] flex items-center bg-gradient-to-br from-[#0A0A44] to-[#006B3F] overflow-hidden">
        {/* Premium Decorative Light Bulbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[650px] h-[650px] bg-[#FBB03B]/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-[#F15A24]/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        
        {/* Subtle grid pattern for modern touch */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-24 pb-16">
          <div className="max-w-4xl">
            
            {/* Badge SK Menkumham */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FBB03B] text-xs font-black mb-8 shadow-2xl tracking-wide uppercase">
              <ShieldCheck size={16} />
              <span>SK MENKUMHAM: AHU-0014603.AH.01.04 TAHUN 2019</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tight">
              Membangun Generasi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBB03B] to-[#F15A24]">Berakhlak Mulia</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl font-medium">
              "Membangun Generasi Muda Berakhlak Mulia, Berjiwa Sosial, dan Berprestasi" 
              — Berkomitmen membina potensi masyarakat di bidang agama, pendidikan, sosial, ekonomi, budaya, dan olahraga.
            </p>

            <div className="flex flex-wrap gap-5">
              <Link 
                to="/struktur" 
                className="group bg-[#006B3F] hover:bg-[#F15A24] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5"
              >
                Lihat Struktur 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/program" 
                className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white hover:text-[#0A0A44] px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md"
              >
                Pelajari Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATISTIK DAMPAK (Impact Stats) --- */}
      <section className="py-12 bg-white relative z-20 -mt-16 mx-4 md:mx-12 rounded-[2.5rem] shadow-xl border border-gray-100/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-4">
               <div className="text-4xl md:text-5xl font-black text-[#0A0A44] mb-2">20+</div>
               <div className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Tahun Mengabdi</div>
            </div>
            <div className="p-4">
               <div className="text-4xl md:text-5xl font-black text-[#006B3F] mb-2">500+</div>
               <div className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Anak Asuh</div>
            </div>
            <div className="p-4">
               <div className="text-4xl md:text-5xl font-black text-[#F15A24] mb-2">50+</div>
               <div className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Program Sosial</div>
            </div>
            <div className="p-4">
               <div className="text-4xl md:text-5xl font-black text-[#FBB03B] mb-2">1000+</div>
               <div className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Penerima Manfaat</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TIGA PILAR UTAMA --- */}
      <section className="py-28 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[#0A0A44] uppercase tracking-tight mb-4">Fokus Pengabdian Kami</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#0A0A44] to-[#F15A24] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 font-semibold text-sm uppercase tracking-wide">
              Kami menyalurkan energi dan sumber daya kami ke dalam tiga sektor utama yang menjadi pondasi pembangunan sumber daya manusia yang unggul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Pilar 1: Sosial & Keagamaan */}
            <div className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0A0A44]/5 rounded-bl-[100px] transition-all duration-500 group-hover:scale-125"></div>
              <div className="w-16 h-16 bg-[#0A0A44]/10 text-[#0A0A44] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0A0A44] group-hover:text-white transition-all duration-500 shadow-inner relative z-10">
                <Heart size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#0A0A44] relative z-10">Sosial & Keagamaan</h3>
              <p className="text-gray-500 leading-relaxed font-medium text-sm relative z-10 text-justify">
                Membina jiwa sosial melalui Rumah Yatim Harapan Bangsa dan penyaluran donasi bagi masyarakat yang membutuhkan bantuan materi maupun spiritual.
              </p>
            </div>

            {/* Pilar 2: Pendidikan */}
            <div className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#006B3F]/5 rounded-bl-[100px] transition-all duration-500 group-hover:scale-125"></div>
              <div className="w-16 h-16 bg-[#006B3F]/10 text-[#006B3F] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#006B3F] group-hover:text-white transition-all duration-500 shadow-inner relative z-10">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#006B3F] relative z-10">Pendidikan & PKBM</h3>
              <p className="text-gray-500 leading-relaxed font-medium text-sm relative z-10 text-justify">
                Pusat Kegiatan Belajar Masyarakat (PKBM) Peduli Bangsa sebagai wadah peningkatan literasi, keterampilan hidup, dan pendidikan non-formal bagi anak putus sekolah.
              </p>
            </div>

            {/* Pilar 3: Olahraga */}
            <div className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F15A24]/5 rounded-bl-[100px] transition-all duration-500 group-hover:scale-125"></div>
              <div className="w-16 h-16 bg-[#F15A24]/10 text-[#F15A24] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#F15A24] group-hover:text-white transition-all duration-500 shadow-inner relative z-10">
                <Trophy size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#F15A24] relative z-10">Zamoa Sports Academy</h3>
              <p className="text-gray-500 leading-relaxed font-medium text-sm relative z-10 text-justify">
                Mengembangkan bakat atlet muda potensial di bidang Basket, Futsal, dan Badminton melalui pembinaan terukur dan kompetisi sejak tahun 2004.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA SECTION (AJAKAN BERGABUNG) --- */}
      <section className="relative py-24 bg-[#0A0A44] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-15">
            <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Volunteers" 
                className="w-full h-full object-cover grayscale"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A44] to-[#006B3F]/90 z-0 mix-blend-multiply"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
             <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/10">
                <HandHeart className="text-[#FBB03B] w-10 h-10 mx-auto" />
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Mari Berkontribusi Untuk Negeri
             </h2>
             <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                Setiap donasi dan partisipasi Anda adalah senyuman bagi mereka yang membutuhkan. Bergabunglah bersama kami dalam mewujudkan masyarakat yang lebih baik.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                    to="/donasi" 
                    className="bg-[#F15A24] hover:bg-orange-600 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5"
                >
                    Donasi Sekarang
                </Link>
                <a 
                    href="https://wa.me/62818228813" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0A0A44] px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    Jadi Relawan
                </a>
             </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;