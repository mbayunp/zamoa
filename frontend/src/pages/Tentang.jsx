import { Target, History, Heart, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Tentang = () => {
  return (
    <div className="w-full bg-white">
      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-[#1B1464] to-[#006B3F] py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Tentang Kami</h1>
          <p className="text-[#FBB03B] font-bold tracking-[0.3em] uppercase">Yayasan Zamoa Peduli Bangsa</p>
        </div>
      </section>

      {/* --- PENJELASAN UMUM & LEGALITAS --- */}
      <section className="py-20 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1B1464] mb-6 border-l-4 border-[#F15A24] pl-4">Profil Singkat</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6 text-justify">
              Yayasan Zamoa Peduli Bangsa (YZPB) merupakan yayasan kepemudaan yang bergerak di bidang keagamaan, pendidikan, sosial, ekonomi, budaya, dan olahraga. Kami berkomitmen untuk menjadi wadah pembinaan generasi muda yang mandiri dan berdaya saing sesuai dengan visi membangun generasi muda yang unggul.
            </p>
            <div className="badge-legal">
              <ShieldCheck size={24} />
              <div className="text-sm">
                <p className="font-bold">Legalitas Resmi</p>
                <p>SK Menkumham: AHU-0014603.AH.01.04 Tahun 2019</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-3xl aspect-video flex items-center justify-center border-4 border-[#006B3F]/20 shadow-inner overflow-hidden">
             {/* Placeholder untuk foto kantor/kegiatan */}
             <div className="w-full h-full bg-[#1B1464]/5 flex items-center justify-center">
                <span className="text-slate-400 italic">Dokumentasi Yayasan Zamoa</span>
             </div>
          </div>
        </div>
      </section>

      {/* --- SEJARAH (Timeline) --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-[#1B1464] text-white rounded-xl shadow-lg">
              <History size={24} />
            </div>
            <h2 className="text-3xl font-bold text-[#1B1464]">Perjalanan Kami</h2>
          </div>
          
          <div className="space-y-8 border-l-4 border-[#FBB03B] ml-4 pl-8">
            <div className="relative">
              <div className="absolute -left-[42px] top-0 w-6 h-6 rounded-full bg-[#F15A24] border-4 border-white shadow-sm"></div>
              <h4 className="font-bold text-[#F15A24] text-lg uppercase tracking-wider">2004</h4>
              <p className="font-bold text-[#1B1464] text-xl">Awal Mula (Zamoa Community)</p>
              <p className="text-gray-600 max-w-2xl mt-2">
                Berawal dari kesamaan hobi terhadap olahraga bola basket pada tahun 2004, terbentuklah ZAMOA Community yang berpusat di Jalan Mohammad Ali, Cianjur.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[42px] top-0 w-6 h-6 rounded-full bg-[#006B3F] border-4 border-white shadow-sm"></div>
              <h4 className="font-bold text-[#006B3F] text-lg uppercase tracking-wider">2019</h4>
              <p className="font-bold text-[#1B1464] text-xl">Transformasi Yayasan</p>
              <p className="text-gray-600 max-w-2xl mt-2">
                Resmi disahkan sebagai badan hukum Yayasan Zamoa Peduli Bangsa pada 7 Oktober 2019.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NILAI-NILAI (Value) --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1B1464] uppercase tracking-tighter">Nilai-Nilai Kami</h2>
          <p className="text-gray-500 mt-2 font-medium">Prinsip yang mendasari setiap langkah pengabdian kami</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-3xl border-b-4 border-[#1B1464] shadow-sm hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#1B1464]/10 text-[#1B1464] rounded-2xl flex items-center justify-center mx-auto mb-6"><Award size={32} /></div>
            <h4 className="font-bold text-xl mb-3">Integritas</h4>
            <p className="text-gray-600">Menjunjung tinggi kejujuran dan disiplin dalam membina potensi generasi muda.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl border-b-4 border-[#006B3F] shadow-sm hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#006B3F]/10 text-[#006B3F] rounded-2xl flex items-center justify-center mx-auto mb-6"><Heart size={32} /></div>
            <h4 className="font-bold text-xl mb-3">Empati</h4>
            <p className="text-gray-600">Memiliki kepedulian sosial yang tinggi serta cinta terhadap sesama dan lingkungan.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl border-b-4 border-[#F15A24] shadow-sm hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#F15A24]/10 text-[#F15A24] rounded-2xl flex items-center justify-center mx-auto mb-6"><Target size={32} /></div>
            <h4 className="font-bold text-xl mb-3">Prestasi</h4>
            <p className="text-gray-600">Mendorong generasi muda untuk unggul dan berprestasi di berbagai bidang.</p>
          </div>
        </div>
      </section>

      {/* --- VISI & MISI --- */}
      <section className="py-20 bg-[#F15A24] text-white">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[#FBB03B] font-bold uppercase tracking-widest mb-4">Visi Kami</h2>
            <p className="text-3xl font-black italic leading-relaxed">
              "Membangun Generasi Muda Berakhlak Mulia, Berjiwa Sosial dan Berprestasi"
            </p>
          </div>
          <div>
            <h2 className="text-[#FBB03B] font-bold uppercase tracking-widest mb-6">Misi Kami</h2>
            <ul className="space-y-4">
              {[
                "Membina dan meningkatkan potensi masyarakat khususnya generasi muda dalam bidang agama, pendidikan, sosial, ekonomi, budaya dan olahraga.",
                "Menciptakan generasi muda yang unggul dan berprestasi serta peduli terhadap sesama.",
                "Menanamkan cinta tanah air, lingkungan dan masyarakat."
              ].map((misi, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <CheckCircle2 className="text-[#F15A24] shrink-0 mt-1" />
                  <span className="text-slate-200 font-medium">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tentang;