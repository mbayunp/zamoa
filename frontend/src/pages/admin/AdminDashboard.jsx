import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  Globe, Search, ShieldCheck, CheckCircle, XCircle, Clock 
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [donasiList, setDonasiList] = useState([]);

  // --- VARIABEL STATISTIK REAL-TIME ---
  // Menghitung total uang dari donasi yang berstatus 'diterima'
  const totalDanaTerkumpul = donasiList
    .filter(item => item.status === 'diterima')
    .reduce((total, item) => total + Number(item.nominal), 0);

  // Menghitung jumlah donatur unik atau total transaksi yang diterima
  const totalTransaksiBerhasil = donasiList
    .filter(item => item.status === 'diterima').length;

  // Tarik data donasi dari database saat komponen dimuat
  useEffect(() => {
    fetchDonasi();
  }, []);

  const fetchDonasi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donasi', { 
        withCredentials: true 
      });
      setDonasiList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data donasi", error);
    }
  };

  const handleUpdateStatus = async (id, statusBaru) => {
    try {
      await axios.put(`http://localhost:5000/api/donasi/${id}/status`, 
        { status: statusBaru }, 
        { withCredentials: true }
      );
      Swal.fire({ 
        icon: 'success', 
        title: 'Status Diperbarui!', 
        showConfirmButton: false, 
        timer: 1000 
      });
      fetchDonasi(); // Refresh data agar statistik otomatis berubah!
    } catch (error) {
      Swal.fire('Error', 'Gagal mengubah status', 'error');
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Yakin ingin keluar?',
      text: "Anda akan mengakhiri sesi admin saat ini.",
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
          <h2 className="text-xl font-black tracking-widest uppercase">
            ZAMOA <span className="text-[#FBB03B]">ADMIN</span>
          </h2>
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
              
              {/* Statistik sekarang menggunakan Data Asli dari Database */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard 
                  title="Total Dana Diterima" 
                  value={formatRupiah(totalDanaTerkumpul)} 
                  subtitle={`Dari ${totalTransaksiBerhasil} donatur`} 
                  color="text-[#006B3F]" 
                  bg="bg-green-50" 
                />
                <StatCard 
                  title="Donasi Pending" 
                  value={donasiList.filter(d => d.status === 'pending').length.toString()} 
                  subtitle="Menunggu konfirmasi Anda" 
                  color="text-[#F15A24]" 
                  bg="bg-orange-50" 
                />
                <StatCard 
                  title="Total Program" 
                  value="12" 
                  subtitle="Program aktif berjalan" 
                  color="text-[#1B1464]" 
                  bg="bg-blue-50" 
                />
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4"><LayoutDashboard size={32} className="text-gray-300" /></div>
                <h3 className="text-xl font-bold text-gray-700">Selamat Datang di Portal Admin!</h3>
                <p className="text-gray-400 max-w-sm mt-2">Pilih menu "Kelola Donatur" di sebelah kiri untuk melihat daftar donasi masuk yang butuh konfirmasi Anda.</p>
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
                          <td className="p-4 text-gray-500 whitespace-nowrap">
                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-[#1B1464]">{item.nama_donatur}</p>
                            <a href={`https://wa.me/${item.no_whatsapp}`} target="_blank" rel="noreferrer" className="text-xs text-[#006B3F] hover:underline font-medium">
                              {item.no_whatsapp}
                            </a>
                          </td>
                          <td className="p-4 text-gray-600 max-w-xs truncate">{item.program_pilihan}</td>
                          <td className="p-4 font-black text-[#F15A24]">{formatRupiah(item.nominal)}</td>
                          <td className="p-4">
                            {item.status === 'pending' && <span className="flex items-center gap-1.5 text-orange-600 bg-orange-100 px-3 py-1.5 rounded-md text-xs font-bold w-max"><Clock size={14}/> Menunggu</span>}
                            {item.status === 'diterima' && <span className="flex items-center gap-1.5 text-green-700 bg-green-100 px-3 py-1.5 rounded-md text-xs font-bold w-max"><CheckCircle size={14}/> Diterima</span>}
                            {item.status === 'ditolak' && <span className="flex items-center gap-1.5 text-red-700 bg-red-100 px-3 py-1.5 rounded-md text-xs font-bold w-max"><XCircle size={14}/> Batal</span>}
                          </td>
                          <td className="p-4 flex items-center justify-center gap-2">
                            {/* Tombol Aksi HANYA muncul jika statusnya masih PENDING */}
                            {item.status === 'pending' ? (
                              <>
                                <button onClick={() => handleUpdateStatus(item.id, 'diterima')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-colors border border-green-200 hover:border-transparent" title="Terima Donasi">
                                  <CheckCircle size={18} />
                                </button>
                                <button onClick={() => handleUpdateStatus(item.id, 'ditolak')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-red-200 hover:border-transparent" title="Batalkan">
                                  <XCircle size={18} />
                                </button>
                              </>
                            ) : (
                              <span className="text-gray-300 font-medium italic">Selesai</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {donasiList.length === 0 && (
                        <tr>
                          <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">Belum ada data donasi yang masuk.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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