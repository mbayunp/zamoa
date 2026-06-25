import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { User, Lock, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { mockLogin } from '../../data/mockData';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleAutoFill = () => {
    setUsername('admin_zamoa');
    setPassword('admin123');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await mockLogin(username, password);

      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: `Selamat datang kembali, ${response.data.user.nama}`,
        showConfirmButton: false,
        timer: 1500,
        background: '#ffffff',
        iconColor: '#006B3F'
      }).then(() => {
        navigate('/admin/dashboard'); 
      });
    } catch (err) {
      const errorMsg = err.message || 'Tidak dapat terhubung ke server.';
      Swal.fire({
        icon: 'error',
        title: 'Akses Ditolak',
        text: errorMsg,
        confirmButtonColor: '#0A0A44',
        confirmButtonText: 'Coba Lagi'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A44] to-[#006B3F] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Premium Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#FBB03B]/10 rounded-full blur-[130px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-[#F15A24]/10 rounded-full blur-[110px] animate-pulse delay-1000"></div>

      <Link 
        to="/" 
        className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 font-bold transition-all duration-300 transform hover:-translate-x-1 z-20 text-sm px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
      >
        <ArrowLeft size={16} />
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-md glass-card rounded-[2.5rem] overflow-hidden relative z-10 p-1">
        <div className="bg-white/40 backdrop-blur-md rounded-[2.4rem] p-8 md:p-10 border border-white/40">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0A0A44] to-[#006B3F] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl border border-white/20">
              <ShieldCheck size={32} className="text-[#FBB03B]" />
            </div>
            <h2 className="text-2xl font-black text-[#0A0A44] uppercase tracking-tight">Portal Admin</h2>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mt-1">Yayasan Zamoa Peduli Bangsa</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-[#0A0A44] uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/60 border border-gray-200/60 rounded-xl text-sm focus:ring-2 focus:ring-[#0A0A44] focus:border-transparent outline-none transition-all focus:bg-white text-[#0A0A44] font-medium"
                  placeholder="admin_zamoa"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#0A0A44] uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/60 border border-gray-200/60 rounded-xl text-sm focus:ring-2 focus:ring-[#0A0A44] focus:border-transparent outline-none transition-all focus:bg-white text-[#0A0A44] font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#0A0A44] hover:bg-[#F15A24] text-white font-black py-4 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/20 flex justify-center items-center gap-2 mt-2 disabled:opacity-70 active:scale-[0.98] transform hover:-translate-y-0.5 text-sm uppercase tracking-wider"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> 
                  Memproses...
                </>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>

            {/* Tombol Isi Otomatis Akun Demo */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleAutoFill}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#FBB03B]/30 hover:border-[#FBB03B] bg-white/20 hover:bg-[#FBB03B]/10 text-xs font-black text-[#0A0A44] tracking-wider uppercase transition-all duration-300 transform active:scale-95 shadow-sm"
              >
                Isi Otomatis Akun Demo
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;