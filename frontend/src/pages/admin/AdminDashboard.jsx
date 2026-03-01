import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  Globe, Search, ShieldCheck, CheckCircle, XCircle, Clock,
  Edit, Trash2, Image as ImageIcon, Youtube, Plus
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // State Navigasi & Data Donasi
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [donasiList, setDonasiList] = useState([]);
  
  // State Program (Postingan dengan Upload)
  const [programList, setProgramList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formProgram, setFormProgram] = useState({ 
    id: null, 
    title: '', 
    category: 'Umum', 
    caption: '', 
    image_url: '', 
    youtube_url: '',
    image_file: null,    // Untuk menyimpan file fisik
    image_preview: ''    // Untuk menampilkan preview gambar di modal
  });

  // --- STATISTIK ---
  const totalDanaTerkumpul = donasiList
    .filter(item => item.status === 'diterima')
    .reduce((total, item) => total + Number(item.nominal), 0);

  const totalTransaksiBerhasil = donasiList
    .filter(item => item.status === 'diterima').length;

  // --- USE EFFECT ---
  useEffect(() => {
    fetchDonasi();
    if (activeMenu === 'program') {
      fetchPrograms();
    }
  }, [activeMenu]);

  // --- FUNGSI DONASI ---
  const fetchDonasi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donasi', { withCredentials: true });
      setDonasiList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data donasi", error);
    }
  };

  const handleUpdateStatus = async (id, statusBaru) => {
    try {
      await axios.put(`http://localhost:5000/api/donasi/${id}/status`, { status: statusBaru }, { withCredentials: true });
      Swal.fire({ icon: 'success', title: 'Status Diperbarui!', showConfirmButton: false, timer: 1000 });
      fetchDonasi(); 
    } catch (error) {
      Swal.fire('Error', 'Gagal mengubah status', 'error');
    }
  };

  // --- FUNGSI PROGRAM (CMS UPLOAD FILE) ---
  const fetchPrograms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/programs');
      setProgramList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data program", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormProgram({
        ...formProgram,
        image_file: file,
        image_preview: URL.createObjectURL(file) // Membuat URL sementara untuk preview
      });
    }
  };

  const handleSaveProgram = async (e) => {
    e.preventDefault();
    
    // Gunakan FormData karena kita mengirim file fisik, bukan JSON biasa
    const formData = new FormData();
    formData.append('title', formProgram.title);
    formData.append('category', formProgram.category);
    formData.append('caption', formProgram.caption);
    if (formProgram.youtube_url) formData.append('youtube_url', formProgram.youtube_url);
    if (formProgram.image_url) formData.append('existing_image', formProgram.image_url); // Gambar yang sudah ada di DB
    if (formProgram.image_file) formData.append('image_file', formProgram.image_file); // Gambar baru yang dipilih

    try {
      if (formProgram.id) {
        await axios.put(`http://localhost:5000/api/programs/${formProgram.id}`, formData, { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire('Sukses', 'Postingan diperbarui!', 'success');
      } else {
        await axios.post('http://localhost:5000/api/programs', formData, { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire('Sukses', 'Postingan ditambahkan!', 'success');
      }
      setIsModalOpen(false);
      fetchPrograms();
    } catch (err) {
      Swal.fire('Error', 'Gagal menyimpan data', 'error');
    }
  };

  const handleDeleteProgram = async (id) => {
    const result = await Swal.fire({ 
      title: 'Hapus Postingan?', 
      text: "Data yang dihapus tidak bisa dikembalikan.",
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#d33',
      cancelButtonColor: '#1B1464',
      confirmButtonText: 'Ya, Hapus!' 
    });
    
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/programs/${id}`, { withCredentials: true });
        Swal.fire('Terhapus', 'Postingan telah dihapus.', 'success');
        fetchPrograms();
      } catch (error) {
        Swal.fire('Error', 'Gagal menghapus postingan', 'error');
      }
    }
  };

  const openEditModal = (prog) => {
    setFormProgram({
      ...prog,
      image_file: null,
      // Tarik preview dari backend jika gambar ada
      image_preview: prog.image_url ? `http://localhost:5000${prog.image_url}` : '' 
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setFormProgram({ id: null, title: '', category: 'Umum', caption: '', image_url: '', youtube_url: '', image_file: null, image_preview: '' });
    setIsModalOpen(true);
  };

  // --- FUNGSI LOGOUT ---
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Yakin ingin keluar?',
      text: "Anda akan mengakhiri sesi admin.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#1B1464',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete('http://localhost:5000/api/auth/logout', { withCredentials: true });
        Swal.fire({ icon: 'success', title: 'Berhasil Logout', showConfirmButton: false, timer: 1500 })
        .then(() => navigate('/admin/login'));
      } catch (error) {
        Swal.fire('Error', 'Terjadi kesalahan saat logout.', 'error');
      }
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex overflow-hidden font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#1B1464] text-white flex flex-col flex-shrink-0 shadow-2xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <ShieldCheck size={28} className="text-[#FBB03B] mr-3" />
          <h2 className="text-xl font-black tracking-widest uppercase">ZAMOA <span className="text-[#FBB03B]">ADMIN</span></h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activeMenu === 'dashboard'} onClick={() => setActiveMenu('dashboard')} />
          <SidebarItem icon={<Users size={20} />} text="Kelola Donatur" active={activeMenu === 'donatur'} onClick={() => setActiveMenu('donatur')} />
          <SidebarItem icon={<FileText size={20} />} text="Kelola Program" active={activeMenu === 'program'} onClick={() => setActiveMenu('program')} />
          <SidebarItem icon={<Settings size={20} />} text="Pengaturan" active={activeMenu === 'pengaturan'} onClick={() => setActiveMenu('pengaturan')} />
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/10">
          <button onClick={handleLogout} className="flex items-center justify-center gap-3 w-full p-3 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white transition-all font-bold group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 relative">
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm flex-shrink-0 z-10">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 w-96 border border-gray-200 focus-within:border-[#1B1464] transition-colors">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Cari data..." className="bg-transparent border-none outline-none pl-3 w-full text-sm text-gray-700" />
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-sm font-bold text-[#006B3F] hover:text-[#F15A24] transition-colors bg-green-50 px-4 py-2.5 rounded-full border border-green-100 hover:border-orange-200">
              <Globe size={18} /> Lihat Website
            </Link>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#1B1464] leading-tight">Administrator</p>
                <p className="text-xs text-gray-500 font-medium">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-[#1B1464] to-[#F15A24] rounded-full shadow-md border-2 border-white flex items-center justify-center text-white font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1">
          
          {/* TAMPILAN: DASHBOARD */}
          {activeMenu === 'dashboard' && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Ikhtisar Yayasan</h1>
                <p className="text-gray-500 font-medium mt-1">Pantau perkembangan program dan donasi hari ini secara *real-time*.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Dana Diterima" value={formatRupiah(totalDanaTerkumpul)} subtitle={`Dari ${totalTransaksiBerhasil} donatur`} color="text-[#006B3F]" bg="bg-green-50" />
                <StatCard title="Donasi Pending" value={donasiList.filter(d => d.status === 'pending').length.toString()} subtitle="Menunggu konfirmasi Anda" color="text-[#F15A24]" bg="bg-orange-50" />
                <StatCard title="Total Program" value={programList.length.toString()} subtitle="Postingan terpublikasi" color="text-[#1B1464]" bg="bg-blue-50" />
              </div>
            </div>
          )}

          {/* TAMPILAN: KELOLA DONATUR */}
          {activeMenu === 'donatur' && (
            <div className="animate-fade-in">
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black text-gray-800 tracking-tight">Kelola Donatur</h1>
                  <p className="text-gray-500 font-medium mt-1">Daftar komitmen donasi yang masuk melalui website.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-100">
                      <tr>
                        <th className="p-4">Tanggal</th>
                        <th className="p-4">Nama / WA</th>
                        <th className="p-4">Program Pilihan</th>
                        <th className="p-4">Nominal</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {donasiList.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-gray-500 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                          <td className="p-4">
                            <p className="font-bold text-[#1B1464]">{item.nama_donatur}</p>
                            <a href={`https://wa.me/${item.no_whatsapp}`} target="_blank" rel="noreferrer" className="text-xs text-[#006B3F] hover:underline font-medium">{item.no_whatsapp}</a>
                          </td>
                          <td className="p-4 text-gray-600 max-w-xs truncate">{item.program_pilihan}</td>
                          <td className="p-4 font-black text-[#F15A24]">{formatRupiah(item.nominal)}</td>
                          <td className="p-4">
                            {item.status === 'pending' && <span className="flex items-center gap-1.5 text-orange-600 bg-orange-100 px-3 py-1.5 rounded-md text-xs font-bold w-max"><Clock size={14}/> Menunggu</span>}
                            {item.status === 'diterima' && <span className="flex items-center gap-1.5 text-green-700 bg-green-100 px-3 py-1.5 rounded-md text-xs font-bold w-max"><CheckCircle size={14}/> Diterima</span>}
                            {item.status === 'ditolak' && <span className="flex items-center gap-1.5 text-red-700 bg-red-100 px-3 py-1.5 rounded-md text-xs font-bold w-max"><XCircle size={14}/> Batal</span>}
                          </td>
                          <td className="p-4 flex items-center justify-center gap-2">
                            {item.status === 'pending' ? (
                              <>
                                <button onClick={() => handleUpdateStatus(item.id, 'diterima')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-colors border border-green-200 hover:border-transparent" title="Terima Donasi"><CheckCircle size={18} /></button>
                                <button onClick={() => handleUpdateStatus(item.id, 'ditolak')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-red-200 hover:border-transparent" title="Batalkan"><XCircle size={18} /></button>
                              </>
                            ) : (
                              <span className="text-gray-300 font-medium italic">Selesai</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {donasiList.length === 0 && (
                        <tr><td colSpan="6" className="p-12 text-center text-gray-400 font-medium">Belum ada data donasi.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAMPILAN: KELOLA PROGRAM (CMS) */}
          {activeMenu === 'program' && (
            <div className="animate-fade-in relative">
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black text-gray-800 tracking-tight">Kelola Program & Postingan</h1>
                  <p className="text-gray-500 font-medium mt-1">Buat, edit, atau hapus dokumentasi kegiatan yayasan.</p>
                </div>
                <button onClick={openAddModal} className="bg-[#006B3F] hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-600/30 transition-all flex items-center gap-2">
                  <Plus size={20} /> Tambah Postingan
                </button>
              </div>

              {/* Tabel Program */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="p-4 w-1/4">Judul</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4 w-1/3">Caption</th>
                      <th className="p-4 text-center">Tipe Media</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {programList.map((prog) => (
                      <tr key={prog.id} className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-[#1B1464]">{prog.title}</td>
                        <td className="p-4">
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">{prog.category}</span>
                        </td>
                        <td className="p-4 text-gray-500 truncate max-w-[200px]">{prog.caption}</td>
                        <td className="p-4 text-center">
                          {prog.youtube_url 
                            ? <span className="inline-flex items-center justify-center gap-1 text-red-500 font-bold text-xs bg-red-50 px-2.5 py-1 rounded-md w-max mx-auto"><Youtube size={14}/> YouTube</span> 
                            : <span className="inline-flex items-center justify-center gap-1 text-blue-500 font-bold text-xs bg-blue-50 px-2.5 py-1 rounded-md w-max mx-auto"><ImageIcon size={14}/> Gambar</span>
                          }
                        </td>
                        <td className="p-4 flex justify-center gap-2">
                          <button onClick={() => openEditModal(prog)} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-blue-200 hover:border-transparent" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDeleteProgram(prog.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors border border-red-200 hover:border-transparent" title="Hapus">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {programList.length === 0 && (
                      <tr><td colSpan="5" className="p-12 text-center text-gray-400 font-medium">Belum ada postingan program.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* MODAL FORM TAMBAH/EDIT */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                  <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all max-h-[90vh] flex flex-col">
                    
                    <div className="bg-gradient-to-r from-[#1B1464] to-[#006B3F] p-5 flex justify-between items-center text-white flex-shrink-0">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {formProgram.id ? <Edit size={20} /> : <Plus size={20} />} 
                        {formProgram.id ? 'Edit Postingan' : 'Buat Postingan Baru'}
                      </h3>
                      <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white bg-white/10 p-1.5 rounded-lg transition-colors">✕</button>
                    </div>

                    <div className="p-8 overflow-y-auto">
                      <form onSubmit={handleSaveProgram} className="space-y-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Postingan</label>
                          <input type="text" value={formProgram.title} onChange={e => setFormProgram({...formProgram, title: e.target.value})} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent bg-gray-50 focus:bg-white transition-all" placeholder="Contoh: Beasiswa Yatim" required />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori</label>
                          <select value={formProgram.category} onChange={e => setFormProgram({...formProgram, category: e.target.value})} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent bg-gray-50 focus:bg-white transition-all">
                            <option value="Pendidikan">Pendidikan</option>
                            <option value="Sosial">Sosial</option>
                            <option value="Olahraga">Olahraga</option>
                            <option value="Umum">Umum</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1.5">Caption / Deskripsi</label>
                          <textarea value={formProgram.caption} onChange={e => setFormProgram({...formProgram, caption: e.target.value})} rows="4" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent bg-gray-50 focus:bg-white transition-all" placeholder="Ceritakan detail kegiatan..." required></textarea>
                        </div>

                        {/* BAGIAN UPLOAD FILE & YOUTUBE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                          <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1"><ImageIcon size={14}/> Upload Gambar</label>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleFileChange} 
                              className="w-full border border-gray-200 p-2 rounded-lg bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                            />
                            {/* Menampilkan Preview Gambar */}
                            {formProgram.image_preview && (
                              <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                <img src={formProgram.image_preview} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1"><Youtube size={14} className="text-red-500"/> Link YouTube (Opsional)</label>
                            <input type="url" placeholder="https://youtube.com/..." value={formProgram.youtube_url} onChange={e => setFormProgram({...formProgram, youtube_url: e.target.value})} className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white" />
                          </div>
                          <p className="col-span-full text-[11px] text-gray-400 italic">Catatan: Jika Link YouTube diisi, maka video YouTube yang akan diprioritaskan tampil di halaman pengunjung.</p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                          <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors">Batal</button>
                          <button type="submit" className="px-6 py-2.5 bg-[#F15A24] text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-500/30 transition-all">Simpan Postingan</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// --- Komponen Bantuan ---
const SidebarItem = ({ icon, text, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 font-bold ${active ? 'bg-[#F15A24] text-white shadow-lg shadow-orange-500/30' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
    {icon}
    <span>{text}</span>
  </button>
);

const StatCard = ({ title, value, subtitle, color, bg }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
    <div className="flex items-start justify-between mb-4">
      <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">{title}</p>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg} ${color}`}>
        <LayoutDashboard size={20} />
      </div>
    </div>
    <h3 className={`text-3xl lg:text-4xl font-black mb-2 truncate ${color}`} title={value}>{value}</h3>
    <p className="text-xs font-bold text-gray-400">{subtitle}</p>
  </div>
);

export default AdminDashboard;