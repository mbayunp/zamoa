import { ArrowRight, Trophy, Heart, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* --- HERO SECTION --- */}
      {/* Menggunakan gradasi murni Biru Tua ke Hijau Tua sesuai logo */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-gradient-to-br from-[#1B1464] to-[#006B3F] overflow-hidden">
        {/* Dekorasi elemen bercahaya untuk kedalaman visual */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-[#FBB03B]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-[#F15A24]/10 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            {/* Badge SK Menkumham dengan desain Glassmorphism */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FBB03B] text-sm font-bold mb-8 shadow-2xl">
              <ShieldCheck size={18} />
              <span className="tracking-wide">SK MENKUMHAM: AHU-0014603.AH.01.04 TAHUN 2019</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
              Membangun Generasi <br />
              <span className="text-[#FBB03B] drop-shadow-sm">Berakhlak Mulia</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl font-medium">
              "Membangun Generasi Muda Berakhlak Mulia, Berjiwa Sosial, dan Berprestasi" 
              — Berkomitmen membina potensi masyarakat di bidang agama, pendidikan, sosial, ekonomi, budaya, dan olahraga.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link 
                to="/struktur" 
                className="bg-[#006B3F] hover:bg-[#F15A24] text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-[#F15A24]/40 transform hover:-translate-y-1"
              >
                Lihat Struktur <ArrowRight size={22} />
              </Link>
              <Link 
                to="/tentang" 
                className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white hover:text-[#1B1464] px-10 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-1"
              >
                Pelajari Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- TIGA PILAR UTAMA --- */}
      <section className="py-28 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-[#1B1464] uppercase tracking-tight mb-4">Fokus Pengabdian Kami</h2>
            <div className="w-24 h-2 bg-[#F15A24] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Pilar 1: Sosial & Keagamaan */}
            <div className="group p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-[#1B1464]/5 text-[#1B1464] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#1B1464] group-hover:text-white transition-all duration-500 shadow-inner">
                <Heart size={40} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#1B1464]">Sosial & Keagamaan</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Membina jiwa sosial melalui Rumah Yatim Harapan Bangsa dan penyaluran donasi bagi masyarakat yang membutuhkan.
              </p>
            </div>

            {/* Pilar 2: Pendidikan */}
            <div className="group p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-[#006B3F]/5 text-[#006B3F] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#006B3F] group-hover:text-white transition-all duration-500 shadow-inner">
                <BookOpen size={40} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#006B3F]">Pendidikan & PKBM</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Pusat Kegiatan Belajar Masyarakat (PKBM) Peduli Bangsa sebagai wadah peningkatan literasi dan pendidikan non-formal.
              </p>
            </div>

            {/* Pilar 3: Olahraga */}
            <div className="group p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-20 h-20 bg-[#F15A24]/5 text-[#F15A24] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#F15A24] group-hover:text-white transition-all duration-500 shadow-inner">
                <Trophy size={40} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#F15A24]">Zamoa Sports Academy</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Mengembangkan bakat atlet muda di bidang Basket, Futsal, dan Badminton melalui pembinaan terukur sejak 2004.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;