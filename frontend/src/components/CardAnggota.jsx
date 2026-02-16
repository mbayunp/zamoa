import React from 'react';
import { User } from 'lucide-react';

const CardAnggota = ({ nama, jabatan, foto, variant = 'primary' }) => {
  // Pilihan warna berdasarkan level/variant
  const styles = {
    primary: 'border-t-4 border-[#1B1464] text-[#1B1464]',   // Navy (Petinggi)
    secondary: 'border-t-4 border-[#006B3F] text-[#006B3F]', // Hijau (Operasional)
    accent: 'border-t-4 border-[#F15A24] text-[#F15A24]',    // Oranye (Bidang)
  };

  const activeStyle = styles[variant] || styles.primary;

  return (
    <div className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center h-full hover:-translate-y-2 ${activeStyle}`}>
      
      {/* Avatar Section */}
      <div className="relative w-24 h-24 mb-4">
        <div className={`absolute inset-0 rounded-full opacity-20 blur-lg transition-all duration-300 group-hover:opacity-40 
          ${variant === 'accent' ? 'bg-orange-500' : variant === 'secondary' ? 'bg-green-500' : 'bg-blue-900'}`}>
        </div>
        
        <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-100 border-[3px] border-white shadow-md">
          {foto ? (
            <img src={foto} alt={nama} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
              <User size={40} />
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1 group-hover:text-black transition-colors">
        {nama}
      </h3>
      <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${variant === 'accent' ? 'text-[#F15A24]' : variant === 'secondary' ? 'text-[#006B3F]' : 'text-[#1B1464]'}`}>
        {jabatan}
      </p>
    </div>
  );
};

export default CardAnggota;