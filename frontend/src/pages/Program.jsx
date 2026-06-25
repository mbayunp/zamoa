import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Trophy, Filter, Video, ArrowRight } from 'lucide-react';
import { mockGetPrograms } from '../data/mockData';

const Program = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper YouTube
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await mockGetPrograms();
        setPrograms(response.data);
      } catch (error) {
        console.error("Gagal menarik data program", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const categories = ['Semua', 'Pendidikan', 'Sosial', 'Olahraga', 'Umum'];
  
  const filteredPrograms = activeCategory === 'Semua' 
    ? programs 
    : programs.filter(item => item.category === activeCategory);

  const getCategoryIcon = (cat) => {
    if (cat === 'Pendidikan') return <BookOpen size={16} />;
    if (cat === 'Olahraga') return <Trophy size={16} />;
    return <Heart size={16} />;
  };

  return (
    <div className="flex flex-col w-full bg-[#F9FAFB] min-h-screen font-sans">
      
      {/* HERO SECTION */}
      <section className="relative w-full py-24 flex items-center bg-gradient-to-br from-[#0A0A44] to-[#006B3F] overflow-hidden">
        {/* Glowing Decorative Orbs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-[#FBB03B]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-[#F15A24]/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4 uppercase">
            Galeri <span className="text-[#FBB03B]">Program</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-bold uppercase tracking-wider text-xs">Kumpulan dokumentasi kegiatan dan program terbaru dari Yayasan Zamoa.</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          
          {/* FILTER */}
          <div className="glass-card rounded-[2rem] p-4 mb-16 max-w-4xl mx-auto flex flex-wrap justify-center gap-3 border border-white/50 shadow-xl">
             {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 transform active:scale-95
                    ${activeCategory === cat 
                      ? 'bg-[#0A0A44] text-white shadow-lg shadow-blue-900/20' 
                      : 'bg-white/60 text-gray-500 hover:bg-[#0A0A44] hover:text-white hover:shadow-md'}`}
                >
                  {cat === 'Semua' && <Filter size={16} />} 
                  {cat}
                </button>
             ))}
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-[#0A0A44] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-bold tracking-wide">Memuat data program...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <Link 
                  to={`/program/${program.id}`} 
                  key={program.id} 
                  className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full group hover:-translate-y-2"
                >
                  
                  {/* MEDIA AREA */}
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    {program.youtube_url ? (
                      <div className="w-full h-full pointer-events-none relative">
                        <iframe 
                          className="w-full h-full object-cover"
                          src={`https://www.youtube.com/embed/${getYoutubeId(program.youtube_url)}?controls=0&showinfo=0&rel=0&modestbranding=1`} 
                          title={program.title}
                          tabIndex="-1"
                        ></iframe>
                        {/* Overlay to ensure clicks trigger navigation, not video play */}
                        <div className="absolute inset-0 bg-transparent"></div>
                      </div>
                    ) : (
                      <img 
                        src={program.image_url || 'https://via.placeholder.com/800x600?text=Yayasan+Zamoa'} 
                        alt={program.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    
                    {/* Badge Kategori */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#0A0A44]/90 backdrop-blur-md shadow-lg">
                        {getCategoryIcon(program.category)} {program.category}
                      </span>
                      {program.youtube_url && (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-red-600/90 backdrop-blur-md shadow-lg">
                           <Video size={13}/> Video
                         </span>
                      )}
                    </div>
                  </div>

                  {/* CAPTION AREA */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-[#0A0A44] mb-3 leading-tight group-hover:text-[#F15A24] transition-colors line-clamp-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-500 font-medium mb-4 line-clamp-3 text-sm leading-relaxed">
                      {program.caption}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400">
                        {new Date(program.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="text-[#F15A24] font-bold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                        Baca Selengkapnya <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>

                </Link>
              ))}
            </div>
          )}
          
          {!isLoading && filteredPrograms.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-semibold">Belum ada postingan di kategori ini.</div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Program;