import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Video } from 'lucide-react';
import { mockGetProgramById } from '../data/mockData';

const ProgramDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [program, setProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper Youtube
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await mockGetProgramById(id);
        setProgram(response.data);
      } catch (error) {
        console.error("Gagal mengambil data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-3 font-sans">
        <div className="w-10 h-10 border-4 border-[#0A0A44] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold">Memuat detail program...</p>
      </div>
    );
  }
  
  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 gap-4 font-sans">
        <p className="font-bold text-lg">Program tidak ditemukan.</p>
        <Link to="/program" className="px-6 py-2.5 bg-[#0A0A44] text-white font-bold rounded-xl hover:bg-[#F15A24] transition-colors">
          Kembali ke Galeri
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-24 font-sans">
      
      {/* Tombol Kembali */}
      <div className="container mx-auto px-6 mb-8 max-w-5xl">
        <Link 
          to="/program" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0A0A44] font-black transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Kembali ke Galeri
        </Link>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          
          {/* AREA MEDIA (FULL WIDTH) */}
          <div className="w-full aspect-video bg-gray-100 relative">
            {program.youtube_url ? (
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(program.youtube_url)}?autoplay=0&rel=0`} 
                title={program.title}
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            ) : (
              <img 
                src={program.image_url || 'https://via.placeholder.com/1200x600?text=Yayasan+Zamoa'} 
                alt={program.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* AREA KONTEN */}
          <div className="p-8 md:p-12">
            
            {/* Header: Kategori & Tanggal */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[#0A0A44] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <Tag size={14} /> {program.category}
              </span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} /> 
                {new Date(program.created_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            {/* Judul Besar */}
            <h1 className="text-3xl md:text-5xl font-black text-[#0A0A44] mb-8 leading-tight">
              {program.title}
            </h1>

            {/* Isi Caption (Full Text) */}
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium whitespace-pre-wrap text-justify">
              {program.caption}
            </div>

            {/* Footer Aksi */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wide">Yayasan Zamoa Peduli Bangsa</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Mari berkolaborasi menebar kebaikan untuk sesama.</p>
              </div>
              <Link 
                to="/donasi" 
                className="bg-[#F15A24] hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Dukung Program Ini
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;