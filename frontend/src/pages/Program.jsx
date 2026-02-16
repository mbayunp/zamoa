import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Heart, Trophy, Filter, Calendar, Users } from 'lucide-react';

const Program = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Data Dummy dengan Kategori yang sesuai dengan Pilar di Home
  const programs = [
    {
      id: 1,
      title: "Beasiswa Yatim Berprestasi",
      category: "Pendidikan",
      icon: <BookOpen size={24} />,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      desc: "Program pembiayaan penuh untuk 100 anak yatim piatu jenjang SD hingga SMA di PKBM Peduli Bangsa.",
      target: "Rp 200.000.000",
      percentage: 75
    },
    {
      id: 2,
      title: "Renovasi Asrama Zamoa",
      category: "Olahraga",
      icon: <Trophy size={24} />,
      image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      desc: "Perbaikan fasilitas asrama atlet muda Zamoa Sports Academy untuk menunjang kenyamanan istirahat.",
      target: "Rp 50.000.000",
      percentage: 40
    },
    {
      id: 3,
      title: "Jumat Berkah & Sembako",
      category: "Sosial",
      icon: <Heart size={24} />,
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      desc: "Penyaluran 500 paket sembako setiap bulan untuk lansia dhuafa di lingkungan sekitar yayasan.",
      target: "Rp 15.000.000",
      percentage: 90
    },
    {
      id: 4,
      title: "Pelatihan Digital Santri",
      category: "Pendidikan",
      icon: <BookOpen size={24} />,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      desc: "Workshop coding dan desain grafis untuk membekali santri dengan keterampilan era digital.",
      target: "Rp 25.000.000",
      percentage: 20
    },
    {
      id: 5,
      title: "Turnamen Futsal Cup",
      category: "Olahraga",
      icon: <Trophy size={24} />,
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      desc: "Ajang pencarian bakat muda futsal tingkat kabupaten yang diselenggarakan tahunan.",
      target: "Rp 10.000.000",
      percentage: 100
    },
  ];

  const categories = ['Semua', 'Pendidikan', 'Sosial', 'Olahraga'];

  const filteredPrograms = activeCategory === 'Semua' 
    ? programs 
    : programs.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col w-full bg-[#F9FAFB]">
      
      {/* --- HERO SECTION (Compact Version) --- */}
      {/* Menggunakan style gradient yang sama dengan Home */}
      <section className="relative w-full py-24 flex items-center bg-gradient-to-br from-[#1B1464] to-[#006B3F] overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-[#FBB03B]/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[300px] h-[300px] bg-[#F15A24]/20 rounded-full blur-[80px]"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FBB03B] text-sm font-bold mb-6">
            <Heart size={16} />
            <span>SALURKAN KEBAIKAN</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-4">
            Program & <span className="text-[#FBB03B]">Kampanye</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-medium">
            Pilih program kebaikan yang ingin Anda dukung. Setiap kontribusi Anda adalah harapan baru bagi mereka.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          
          {/* FILTER BAR (Floating Glassmorphism) */}
          <div className="bg-white rounded-2xl shadow-xl p-4 mb-16 max-w-4xl mx-auto flex flex-wrap justify-center gap-3 border border-gray-100">
             {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2
                    ${activeCategory === cat 
                      ? 'bg-[#1B1464] text-white shadow-lg shadow-[#1B1464]/30' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#1B1464]'
                    }`}
                >
                  {cat === 'Semua' && <Filter size={18} />}
                  {cat}
                </button>
             ))}
          </div>

          {/* GRID PROGRAMS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              // CARD STYLE: Mengikuti style "Pilar" di Home (Rounded Besar, Shadow)
              <div key={program.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 flex flex-col h-full">
                
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464]/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-md
                      ${program.category === 'Pendidikan' ? 'bg-[#006B3F]/90' : 
                        program.category === 'Olahraga' ? 'bg-[#F15A24]/90' : 
                        'bg-[#1B1464]/90'}`}>
                      {program.icon}
                      {program.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-[#1B1464] mb-3 leading-tight group-hover:text-[#F15A24] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 font-medium mb-6 line-clamp-3 flex-1">
                    {program.desc}
                  </p>

                  {/* Progress Section */}
                  <div className="bg-gray-50 p-5 rounded-2xl mb-6 border border-gray-100">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Terkumpul</span>
                        <div className="text-lg font-black text-[#006B3F]">{program.percentage}%</div>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target</span>
                         <div className="text-sm font-bold text-gray-600">{program.target}</div>
                      </div>
                    </div>
                    {/* Custom Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#FBB03B] to-[#F15A24] h-full rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${program.percentage}%` }}
                      >
                         <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    to={`/program/${program.id}`} 
                    className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                    bg-[#1B1464] text-white hover:bg-[#F15A24] shadow-lg hover:shadow-[#F15A24]/30"
                  >
                    Donasi Sekarang <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Program;