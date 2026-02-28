import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Heart, Wallet, Send } from 'lucide-react';

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
      await axios.post('http://localhost:5000/api/donasi', formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Alhamdulillah!',
        text: 'Niat baik Anda telah kami catat. Tim kami akan segera menghubungi nomor WhatsApp Anda untuk konfirmasi transfer.',
        confirmButtonColor: '#006B3F'
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
    <div className="bg-gray-50 min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="bg-[#006B3F] p-10 text-center text-white">
          <Heart size={48} className="mx-auto mb-4 text-[#FBB03B]" fill="currentColor" />
          <h1 className="text-3xl font-black uppercase tracking-widest mb-2">Formulir Donasi</h1>
          <p className="text-green-100">Langkah kecil Anda adalah harapan besar bagi mereka.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
              <input type="text" name="nama_donatur" value={formData.nama_donatur} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="Hamba Allah" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">No. WhatsApp</label>
              <input type="number" name="no_whatsapp" value={formData.no_whatsapp} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="081234567890" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nominal Donasi (Rp)</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500 font-bold">Rp</span>
              <input type="number" name="nominal" value={formData.nominal} onChange={handleChange} required className="w-full pl-12 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006B3F] outline-none text-lg font-bold" placeholder="50000" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Program</label>
            <select name="program_pilihan" value={formData.program_pilihan} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006B3F] outline-none">
              {programs.map(prog => <option key={prog} value={prog}>{prog}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Pesan / Doa (Opsional)</label>
            <textarea name="pesan" value={formData.pesan} onChange={handleChange} rows="3" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006B3F] outline-none" placeholder="Semoga berkah..."></textarea>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-[#1B1464] hover:bg-[#F15A24] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
            <Send size={20} />
            {isLoading ? 'Mengirim...' : 'Kirim Komitmen Donasi'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donasi;