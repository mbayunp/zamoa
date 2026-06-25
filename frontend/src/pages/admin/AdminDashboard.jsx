import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  Globe, Search, ShieldCheck, CheckCircle, XCircle, Clock,
  Edit, Trash2, Image as ImageIcon, Youtube, Plus
} from 'lucide-react';
import { 
  mockCheckAuth, mockLogout, mockGetDonasi, mockUpdateDonasiStatus, 
  mockGetPrograms, mockCreateProgram, mockUpdateProgram, mockDeleteProgram 
} from '../../data/mockData';

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

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await mockCheckAuth();
      } catch (err) {
        Swal.fire({
          icon: 'warning',
          title: 'Akses Ditolak',
          text: 'Silakan login terlebih dahulu.',
          confirmButtonColor: '#0A0A44',
          background: '#ffffff'
        }).then(() => {
          navigate('/admin/login');
        });
      }
    };
    checkAuth();
  }, [navigate]);

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
      const response = await mockGetDonasi();
      setDonasiList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data donasi", error);
    }
  };

  const handleUpdateStatus = async (id, statusBaru) => {
    try {
      await mockUpdateDonasiStatus(id, statusBaru);
      Swal.fire({ 
        icon: 'success', 
        title: 'Status Diperbarui!', 
        showConfirmButton: false, 
        timer: 1000,
        iconColor: '#006B3F'
      });
      fetchDonasi(); 
    } catch (error) {
      Swal.fire('Error', 'Gagal mengubah status', 'error');
    }
  };

  // --- FUNGSI PROGRAM (CMS UPLOAD FILE) ---
  const fetchPrograms = async () => {
    try {
      const res = await mockGetPrograms();
      setProgramList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data program", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormProgram(prev => ({
          ...prev,
          image_file: file,
          image_preview: reader.result // Base64 encoded string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProgram = async (e) => {
    e.preventDefault();

    try {
      if (formProgram.id) {
        await mockUpdateProgram(formProgram.id, formProgram);
        Swal.fire({
          icon: 'success',
          title: 'Sukses',
          text: 'Postingan diperbarui!',
          confirmButtonColor: '#0A0A44'
        });
      } else {
        await mockCreateProgram(formProgram);
        Swal.fire({
          icon: 'success',
          title: 'Sukses',
          text: 'Postingan ditambahkan!',
          confirmButtonColor: '#0A0A44'
        });
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
      cancelButtonColor: '#0A0A44',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });
    
    if (result.isConfirmed) {
      try {
        await mockDeleteProgram(id);
        Swal.fire({
          icon: 'success',
          title: 'Terhapus',
          text: 'Postingan telah dihapus.',
          confirmButtonColor: '#0A0A44'
        });
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
      image_preview: prog.image_url || '' 
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
      cancelButtonColor: '#0A0A44',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await mockLogout();
        Swal.fire({ 
          icon: 'success', 
          title: 'Berhasil Logout', 
          showConfirmButton: false, 
          timer: 1500,
          iconColor: '#006B3F'
        }).then(() => navigate('/admin/login'));
      } catch (error) {
        Swal.fire('Error', 'Terjadi kesalahan saat logout.', 'error');
      }
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="h-screen w-full bg-slate-100 flex overflow-hidden font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#0A0A44] text-white flex flex-col flex-shrink-0 shadow-2xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <ShieldCheck size={28} className="text-[#FBB03B] mr-3" />
          <h2 className="text-lg font-black tracking-wider uppercase">ZAMOA <span className="text-[#FBB03B]">ADMIN</span></h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activeMenu === 'dashboard'} onClick={() => setActiveMenu('dashboard')} />
          <SidebarItem icon={<Users size={20} />} text="Kelola Donatur" active={activeMenu === 'donatur'} onClick={() => setActiveMenu('donatur')} />
          <SidebarItem icon={<FileText size={20} />} text="Kelola Program" active={activeMenu === 'program'} onClick={() => setActiveMenu('program')} />
          <SidebarItem icon={<Settings size={20} />} text="Pengaturan" active={activeMenu === 'pengaturan'} onClick={() => setActiveMenu('pengaturan')} />
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <button onClick={handleLogout} className="flex items-center justify-center gap-3 w-full p-3 rounded-xl bg-red-500/10 text-red-200 hover:bg-red-500 hover:text-white transition-all font-bold group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 relative">
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm flex-shrink-0 z-10">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96 border border-gray-200 focus-within:border-[#0A0A44] focus-within:bg-white transition-colors">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Cari data..." className="bg-transparent border-none outline-none pl-3 w-full text-sm text-gray-700 font-medium" />
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-sm font-bold text-[#006B3F] hover:text-[#F15A24] transition-colors bg-green-50 px-4 py-2.5 rounded-full border border-green-100 hover:border-orange-200 shadow-sm">
              <Globe size={18} /> Lihat Website
            </Link>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#0A0A44] leading-tight">Administrator</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-[#0A0A44] to-[#F15A24] rounded-full shadow-md border-2 border-white flex items-center justify-center text-white font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1">
          
          {/* TAMPILAN: DASHBOARD */}
          {activeMenu === 'dashboard' && (
            <div className="animate-fade-in space-y-8">
              <div>
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Ikhtisar Yayasan</h1>
                <p className="text-gray-500 font-medium mt-1">Pantau perkembangan program dan donasi hari ini secara *real-time*.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Dana Diterima" value={formatRupiah(totalDanaTerkumpul)} subtitle={`Dari ${totalTransaksiBerhasil} donatur`} color="text-[#006B3F]" bg="bg-green-50" />
                <StatCard title="Donasi Pending" value={donasiList.filter(d => d.status === 'pending').length.toString()} subtitle="Menunggu konfirmasi Anda" color="text-[#F15A24]" bg="bg-orange-50" />
                <StatCard title="Total Program" value={programList.length.toString() || "4"} subtitle="Postingan terpublikasi" color="text-[#0A0A44]" bg="bg-blue-50" />
              </div>

              {/* Quick Info Box */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                <h3 className="font-bold text-lg text-[#0A0A44] mb-3 flex items-center gap-2">
                  <ShieldCheck className="text-[#006B3F]" />
                  Status Purwarupa Aktif
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Selamat datang di versi staging Yayasan Zamoa. Seluruh data API telah dialihkan ke penyimpanan lokal (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-600 font-mono text-xs">localStorage</code>) di browser Anda. Anda dapat menambahkan program baru, mengedit data donatur, dan melihat perubahannya langsung pada website tanpa memerlukan koneksi ke database backend localhost.
                </p>
              </div>
            </div>
          )}

          {/* TAMPILAN: KELOLA DONATUR */}
          {activeMenu === 'donatur' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Kelola Donatur</h1>
                <p className="text-gray-500 font-medium mt-1">Daftar komitmen donasi yang masuk melalui website.</p>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-100">
                      <tr>
                        <th className="p-5">Tanggal</th>
                        <th className="p-5">Nama / WA</th>
                        <th className="p-5">Program Pilihan</th>
                        <th className="p-5">Nominal</th>
                        <th className="p-5">Status</th>
                        <th className="p-5 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {donasiList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-5 text-gray-500 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                          <td className="p-5">
                            <p className="font-black text-[#0A0A44]">{item.nama_donatur}</p>
                            <a href={`https://wa.me/${item.no_whatsapp}`} target="_blank" rel="noreferrer" className="text-xs text-[#006B3F] hover:underline font-bold mt-0.5 inline-block">{item.no_whatsapp}</a>
                          </td>
                          <td className="p-5 text-gray-600 max-w-xs truncate">{item.program_pilihan}</td>
                          <td className="p-5 font-black text-[#F15A24] text-base">{formatRupiah(item.nominal)}</td>
                          <td className="p-5">
                            {item.status === 'pending' && <span className="flex items-center gap-1.5 text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full text-xs font-bold w-max"><Clock size={13}/> Menunggu</span>}
                            {item.status === 'diterima' && <span className="flex items-center gap-1.5 text-green-700 bg-green-100 px-3 py-1.5 rounded-full text-xs font-bold w-max"><CheckCircle size={13}/> Diterima</span>}
                            {item.status === 'ditolak' && <span className="flex items-center gap-1.5 text-red-700 bg-red-100 px-3 py-1.5 rounded-full text-xs font-bold w-max"><XCircle size={13}/> Batal</span>}
                          </td>
                          <td className="p-5">
                            <div className="flex items-center justify-center gap-2">
                              {item.status === 'pending' ? (
                                <>
                                  <button onClick={() => handleUpdateStatus(item.id, 'diterima')} className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200 border border-green-200 hover:border-transparent" title="Terima Donasi"><CheckCircle size={18} /></button>
                                  <button onClick={() => handleUpdateStatus(item.id, 'ditolak')} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-200 border border-red-200 hover:border-transparent" title="Batalkan"><XCircle size={18} /></button>
                                </>
                              ) : (
                                <span className="text-gray-400 font-bold text-xs italic bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">Selesai</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {donasiList.length === 0 && (
                        <tr><td colSpan="6" className="p-12 text-center text-gray-400 font-semibold">Belum ada data donasi.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAMPILAN: KELOLA PROGRAM (CMS) */}
          {activeMenu === 'program' && (
            <div className="animate-fade-in relative space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black text-gray-800 tracking-tight">Kelola Program & Postingan</h1>
                  <p className="text-gray-500 font-medium mt-1">Buat, edit, atau hapus dokumentasi kegiatan yayasan.</p>
                </div>
                <button onClick={openAddModal} className="bg-[#006B3F] hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-[0.98]">
                  <Plus size={20} /> Tambah Postingan
                </button>
              </div>

              {/* Tabel Program */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200/60 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="p-5 w-1/4">Judul</th>
                      <th className="p-5">Kategori</th>
                      <th className="p-5 w-1/3">Caption</th>
                      <th className="p-5 text-center">Tipe Media</th>
                      <th className="p-5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {programList.map((prog) => (
                      <tr key={prog.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-5 font-black text-[#0A0A44]">{prog.title}</td>
                        <td className="p-5">
                          <span className="bg-slate-100 px-3 py-1.5 rounded-full text-xs font-bold text-gray-600">{prog.category}</span>
                        </td>
                        <td className="p-5 text-gray-500 truncate max-w-[200px]">{prog.caption}</td>
                        <td className="p-5">
                          <div className="flex justify-center">
                            {prog.youtube_url 
                              ? <span className="inline-flex items-center justify-center gap-1.5 text-red-600 font-bold text-xs bg-red-50 px-3 py-1.5 rounded-full w-max"><Youtube size={14}/> YouTube</span> 
                              : <span className="inline-flex items-center justify-center gap-1.5 text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-full w-max"><ImageIcon size={14}/> Gambar</span>
                            }
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => openEditModal(prog)} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 border border-blue-200 hover:border-transparent" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDeleteProgram(prog.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200 border border-red-200 hover:border-transparent" title="Hapus">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {programList.length === 0 && (
                      <tr><td colSpan="5" className="p-12 text-center text-gray-400 font-semibold">Belum ada postingan program.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* MODAL FORM TAMBAH/EDIT */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                  <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden transform transition-all max-h-[90vh] flex flex-col border border-gray-100">
                    
                    <div className="bg-gradient-to-r from-[#0A0A44] to-[#006B3F] p-6 flex justify-between items-center text-white flex-shrink-0">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {formProgram.id ? <Edit size={20} /> : <Plus size={20} />} 
                        {formProgram.id ? 'Edit Postingan' : 'Buat Postingan Baru'}
                      </h3>
                      <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white bg-white/10 p-2 rounded-xl transition-colors">✕</button>
                    </div>

                    <div className="p-8 overflow-y-auto">
                      <form onSubmit={handleSaveProgram} className="space-y-6">
                        <div>
                          <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Judul Postingan</label>
                          <input type="text" value={formProgram.title} onChange={e => setFormProgram({...formProgram, title: e.target.value})} className="w-full border border-gray-200/80 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0A0A44] focus:border-transparent bg-slate-50 focus:bg-white font-medium text-[#0A0A44] transition-all" placeholder="Contoh: Beasiswa Yatim" required />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Kategori</label>
                          <select value={formProgram.category} onChange={e => setFormProgram({...formProgram, category: e.target.value})} className="w-full border border-gray-200/80 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0A0A44] focus:border-transparent bg-slate-50 focus:bg-white font-bold text-[#0A0A44] transition-all">
                            <option value="Pendidikan">Pendidikan</option>
                            <option value="Sosial">Sosial</option>
                            <option value="Olahraga">Olahraga</option>
                            <option value="Umum">Umum</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">Caption / Deskripsi</label>
                          <textarea value={formProgram.caption} onChange={e => setFormProgram({...formProgram, caption: e.target.value})} rows="4" className="w-full border border-gray-200/80 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#0A0A44] focus:border-transparent bg-slate-50 focus:bg-white font-medium text-gray-700 transition-all" placeholder="Ceritakan detail kegiatan..." required></textarea>
                        </div>

                        {/* BAGIAN UPLOAD FILE & YOUTUBE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                          <div>
                            <label className="block text-xs font-black text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5"><ImageIcon size={14}/> Upload Gambar</label>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleFileChange} 
                              className="w-full border border-gray-200 p-2 rounded-xl bg-white text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                            />
                            {/* Menampilkan Preview Gambar */}
                            {formProgram.image_preview && (
                              <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                <img src={formProgram.image_preview} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-black text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Youtube size={14} className="text-red-500"/> Link YouTube (Opsional)</label>
                            <input type="url" placeholder="https://youtube.com/..." value={formProgram.youtube_url} onChange={e => setFormProgram({...formProgram, youtube_url: e.target.value})} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500 font-medium text-sm bg-white" />
                          </div>
                          <p className="col-span-full text-[10px] text-gray-400 font-semibold italic">Catatan: Jika Link YouTube diisi, maka video YouTube yang akan diprioritaskan tampil di halaman pengunjung.</p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                          <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-gray-600 font-bold hover:bg-slate-100 rounded-xl transition-all">Batal</button>
                          <button type="submit" className="px-6 py-3 bg-[#F15A24] hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:scale-[0.98]">Simpan Postingan</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAMPILAN: PENGATURAN (DUMMY) */}
          {activeMenu === 'pengaturan' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Pengaturan Admin</h1>
                <p className="text-gray-500 font-medium mt-1">Konfigurasi profile portal admin Yayasan Zamoa.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm max-w-xl space-y-6">
                <div>
                  <h3 className="font-black text-[#0A0A44] text-lg mb-4">Profil Akun</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Nama Administrator</span>
                      <span className="font-bold text-gray-700">Super Admin</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Role Akun</span>
                      <span className="font-bold text-[#006B3F]">Super Administrator</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Username Kredensial</span>
                      <span className="font-mono text-gray-600 font-semibold bg-slate-50 px-2 py-1 rounded">admin_zamoa</span>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-100" />
                <div>
                  <p className="text-xs text-gray-400 font-bold italic">Kredensial ini bersifat statis dalam masa uji coba staging dan dapat disesuaikan pada saat integrasi database backend penuh.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

// --- Komponen Bantuan ---
const SidebarItem = ({ icon, text, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 font-bold ${active ? 'bg-[#F15A24] text-white shadow-lg shadow-orange-500/20' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
    {icon}
    <span>{text}</span>
  </button>
);

const StatCard = ({ title, value, subtitle, color, bg }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start justify-between mb-4">
      <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">{title}</p>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg} ${color}`}>
        <LayoutDashboard size={20} />
      </div>
    </div>
    <h3 className={`text-3xl lg:text-4xl font-black mb-2 truncate ${color}`} title={value}>{value}</h3>
    <p className="text-xs font-semibold text-gray-400">{subtitle}</p>
  </div>
);

export default AdminDashboard;