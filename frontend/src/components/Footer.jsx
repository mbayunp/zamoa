import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 w-full">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Kolom 1: Profil Singkat */}
        <div>
          <h3 className="text-xl font-bold mb-4">Yayasan Zamoa Peduli Bangsa</h3>
          <p className="text-gray-400 leading-relaxed">
            Menjadi jembatan kebaikan untuk masyarakat melalui program sosial, 
            pendidikan, dan pemberdayaan ekonomi yang berkelanjutan.
          </p>
        </div>

        {/* Kolom 2: Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-4 underline decoration-blue-500 underline-offset-8">
            Hubungi Kami
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-3">
              <MapPin size={20} className="text-blue-400" />
              <span>Jl. Raya Garut No. 123, Jawa Barat</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-blue-400" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-blue-400" />
              <span>info@zamoapeduli.or.id</span>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Tautan Cepat */}
        <div>
          <h3 className="text-lg font-semibold mb-4 underline decoration-blue-500 underline-offset-8">
            Navigasi
          </h3>
          <div className="flex flex-col gap-2 text-gray-400">
            <a href="/" className="hover:text-blue-400 transition">Beranda</a>
            <a href="/struktur" className="hover:text-blue-400 transition">Struktur Organisasi</a>
            <a href="/bidang" className="hover:text-blue-400 transition">Program & Bidang</a>
            <a href="/berita" className="hover:text-blue-400 transition">Berita Kegiatan</a>
          </div>
        </div>
      </div>

      {/* Baris Bawah: Copyright */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Yayasan Zamoa Peduli Bangsa. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;