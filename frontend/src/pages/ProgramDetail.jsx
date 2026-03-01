import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, Tag, Video, Image as ImageIcon } from 'lucide-react';

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
        const response = await axios.get(`http://localhost:5000/api/programs/${id}`);
        setProgram(response.data);
      } catch (error) {
        console.error("Gagal mengambil data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Memuat detail...</div>;
  if (!program) return <div className="min-h-screen flex items-center justify-center text-red-500">Program tidak ditemukan.</div>;

  return (
    <div className="bg-white min-h-screen pb-20 pt-24"> {/* pt-24 agar tidak tertutup Navbar fixed */}
      
      {/* Tombol Kembali */}
      <div className="container mx-auto px-6 mb-8">
        <Link to="/program" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1B1464] font-bold transition-colors">
          <ArrowLeft size={20} /> Kembali ke Galeri
        </Link>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* AREA MEDIA (FULL WIDTH) */}
          <div className="w-full aspect-video bg-gray-100 relative">
            {program.youtube_url ? (
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(program.youtube_url)}?autoplay=1`} 
                title={program.title}
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            ) : (
              <img 
                src={program.image_url ? `http://localhost:5000${program.image_url}` : 'https://via.placeholder.com/1200x600?text=Yayasan+Zamoa'} 
                alt={program.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* AREA KONTEN */}
          <div className="p-8 md:p-12">
            
            {/* Header: Kategori & Tanggal */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[#1B1464] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                <Tag size={16} /> {program.category}
              </span>
              <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
                <Calendar size={16} /> 
                {new Date(program.created_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            {/* Judul Besar */}
            <h1 className="text-3xl md:text-5xl font-black text-[#1B1464] mb-8 leading-tight">
              {program.title}
            </h1>

            {/* Isi Caption (Full Text) */}
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
              {program.caption}
            </div>

            {/* Footer Aksi */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400 italic">Bagikan kebaikan ini kepada orang lain.</p>
              <Link to="/donasi" className="bg-[#F15A24] hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 transition-all">
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