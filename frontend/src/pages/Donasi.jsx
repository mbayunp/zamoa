import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Heart, Wallet, Send } from 'lucide-react';
import { mockCreateDonasi } from '../data/mockData';

const Donasi = () => {
  const [formData, setFormData] = useState({
    nama_donatur: '',
    no_whatsapp: '',
    nominal: '',
    program_pilihan: 'Umum (Operasional Yayasan)',
    pesan: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const programs = [
    'Umum (Operasional Yayasan)',
    'Beasiswa Yatim Berprestasi',
    'Renovasi Asrama Zamoa',
    'Jumat Berkah & Sembako'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await mockCreateDonasi(formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Alhamdulillah!',
        text: 'Niat baik Anda telah kami catat. Tim kami akan segera menghubungi nomor WhatsApp Anda untuk konfirmasi transfer.',
        confirmButtonColor: '#006B3F',
        background: '#ffffff',
        iconColor: '#006B3F'
      });
      
      // Reset form
      setFormData({ nama_donatur: '', no_whatsapp: '', nominal: '', program_pilihan: 'Umum (Operasional Yayasan)', pesan: '' });
    } catch (error) {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-20 px-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100/50">
        
        {/* Header Panel */}
        <div className="bg-[#006B3F] p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-6 translate-x-6"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FBB03B]/10 rounded-full blur-xl translate-y-6 -translate-x-6"></div>
          
          <Heart size={48} className="mx-auto mb-4 text-[#FBB03B] animate-pulse" fill="currentColor" />
          <h1 className="text-3xl font-black uppercase tracking-widest mb-2">Formulir Donasi</h1>
          <p className="text-green-100 text-sm font-semibold uppercase tracking-wider">Langkah kecil Anda adalah harapan besar bagi mereka.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-[#0A0A44] uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                name="nama_donatur" 
                value={formData.nama_donatur} 
                onChange={handleChange} 
                required 
                className="w-full p-3.5 bg-slate-50 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-[#006B3F] focus:bg-white outline-none font-medium text-gray-700 transition-all text-sm" 
                placeholder="Hamba Allah" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#0A0A44] uppercase tracking-wider mb-2">No. WhatsApp</label>
              <input 
                type="number" 
                name="no_whatsapp" 
                value={formData.no_whatsapp} 
                onChange={handleChange} 
                required 
                className="w-full p-3.5 bg-slate-50 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-[#006B3F] focus:bg-white outline-none font-medium text-gray-700 transition-all text-sm" 
                placeholder="081234567890" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-[#0A0A44] uppercase tracking-wider mb-2">Nominal Donasi (Rp)</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400 font-black text-lg">Rp</span>
              <input 
                type="number" 
                name="nominal" 
                value={formData.nominal} 
                onChange={handleChange} 
                required 
                className="w-full pl-12 pr-4 p-3.5 bg-slate-50 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-[#006B3F] focus:bg-white outline-none text-xl font-black text-[#0A0A44] transition-all" 
                placeholder="50000" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-[#0A0A44] uppercase tracking-wider mb-2">Pilih Program</label>
            <select 
              name="program_pilihan" 
              value={formData.program_pilihan} 
              onChange={handleChange} 
              className="w-full p-3.5 bg-slate-50 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-[#006B3F] focus:bg-white outline-none font-bold text-gray-700 transition-all text-sm"
            >
              {programs.map(prog => <option key={prog} value={prog}>{prog}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-[#0A0A44] uppercase tracking-wider mb-2">Pesan / Doa (Opsional)</label>
            <textarea 
              name="pesan" 
              value={formData.pesan} 
              onChange={handleChange} 
              rows="3" 
              className="w-full p-3.5 bg-slate-50 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-[#006B3F] focus:bg-white outline-none font-medium text-gray-700 transition-all text-sm" 
              placeholder="Semoga berkah..."
            ></textarea>
          </div>

          {/* Rekening Info Section */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
            <div className="bg-[#006B3F]/10 p-2.5 rounded-xl text-[#006B3F]">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-xs font-black text-[#0A0A44] uppercase tracking-wider">Rekening Tujuan</p>
              <p className="text-sm font-bold text-gray-700 mt-1">Bank Syariah Indonesia (BSI) — 123-456-7890</p>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">a.n. Yayasan Zamoa Peduli Bangsa</p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-[#0A0A44] hover:bg-[#F15A24] text-white font-black py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/20 flex justify-center items-center gap-2 transform hover:-translate-y-0.5 active:scale-[0.98] text-sm uppercase tracking-wider"
          >
            <Send size={18} />
            {isLoading ? 'Mengirim...' : 'Kirim Komitmen Donasi'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donasi;