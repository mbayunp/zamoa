import CardAnggota from '../components/CardAnggota';

const Struktur = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 uppercase">Struktur Kepengurusan</h1>
          <h2 className="text-xl font-semibold text-blue-700">Yayasan Zamoa Peduli Bangsa</h2>
          <p className="text-gray-500 mt-2 font-medium">Periode 2026 – 2028</p>
        </div>

        {/* --- ORGAN UTAMA (Kotak Hijau) --- */}
        <div className="border-2 border-green-500 border-dashed p-8 rounded-3xl mb-12 relative bg-white">
          <span className="absolute -top-4 left-10 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">Organ Utama</span>
          
          {/* Pembina & Pengawas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 max-w-4xl mx-auto">
            <CardAnggota nama="MEIDY PRASETYADI" jabatan="Pembina" />
            <CardAnggota nama="WAHYU KURNIAWAN" jabatan="Pengawas" />
          </div>

          {/* Ketua Utama */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-sm">
              <CardAnggota nama="TB. M. Ma'mun Hidayat" jabatan="Ketua" />
            </div>
          </div>

          {/* Bendahara & Sekretaris */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <CardAnggota nama="Hendry Gunawan, Amd" jabatan="Bendahara" />
            <CardAnggota nama="Khairul Hadziq, MPd" jabatan="Sekretaris" />
          </div>
        </div>

        {/* --- UNIT PENDUKUNG OPERASIONAL (Kotak Kuning) --- */}
        <div className="border-2 border-yellow-500 border-dashed p-8 rounded-3xl mb-12 relative bg-white">
           <span className="absolute -top-4 left-10 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold">Unit Pendukung Operasional</span>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardAnggota nama="Maya & Ramanda" jabatan="Divisi Keuangan & Akuntansi" />
              <CardAnggota nama="M. Bayu NP & Aris Beno" jabatan="Divisi IT & Digitalisasi" />
              <CardAnggota nama="Tuty Artika & Dea Iqlima" jabatan="Divisi Administrasi & SDM" />
              <CardAnggota nama="Ery Fasya & Rudi Darmawan" jabatan="Divisi Humas" />
              <CardAnggota nama="Davina, Zulfa, Nazmah" jabatan="Divisi Media & Publikasi" />
           </div>
        </div>

        {/* --- BIDANG / DIVISI PROGRAM UTAMA (Kotak Abu-abu) --- */}
        <div className="border-2 border-gray-300 border-dashed p-8 rounded-3xl relative bg-white">
           <span className="absolute -top-4 left-10 bg-gray-500 text-white px-4 py-1 rounded-full text-sm font-bold">Bidang / Divisi Program Utama</span>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <CardAnggota nama="Chandra Dwi A" jabatan="Ketua Bidang Sosial & Kemasyarakatan" />
              <CardAnggota nama="Dewi Elsa" jabatan="Ketua Bidang Pendidikan" />
              <CardAnggota nama="Achmad Bayu" jabatan="Ketua Bidang Kepemudaan" />
              <CardAnggota nama="Siti Sarah V" jabatan="Ketua Bidang Ekonomi & Wirausaha" />
              <CardAnggota nama="Fahmi Respati" jabatan="Ketua Bidang Olahraga & Prestasi" />
              <CardAnggota nama="Ermawan Didik" jabatan="Ketua Bidang Hukum & Advokasi" />
              <CardAnggota nama="Dani Saputra" jabatan="Ketua Bidang Keagamaan" />
           </div>
        </div>

      </div>
    </div>
  );
};

export default Struktur;