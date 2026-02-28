import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // 1. Import SweetAlert2
import { User, Lock, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      }, {
        withCredentials: true 
      });

      if (response.status === 200) {
        // 2. Tampilkan SweetAlert Sukses
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil!',
          text: `Selamat datang, ${response.data.user.nama}`,
          showConfirmButton: false,
          timer: 1500,
          background: '#ffffff',
          iconColor: '#006B3F'
        }).then(() => {
          navigate('/admin/dashboard'); 
        });
      }
    } catch (err) {
      // 3. Tampilkan SweetAlert Error
      const errorMsg = err.response ? err.response.data.message : 'Tidak dapat terhubung ke server.';
      Swal.fire({
        icon: 'error',
        title: 'Akses Ditolak',
        text: errorMsg,
        confirmButtonColor: '#1B1464',
        confirmButtonText: 'Coba Lagi'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1464] to-[#006B3F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FBB03B]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F15A24]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>

      <Link to="/" className="absolute top-8 left-8 text-white/80 hover:text-white flex items-center gap-2 font-medium transition-colors z-20">
        <ArrowLeft size={20} />
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
        <div className="bg-gray-50 px-8 py-10 border-b border-gray-100 text-center">
          <div className="w-16 h-16 bg-[#1B1464] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-900/20">
            <ShieldCheck size={32} className="text-[#FBB03B]" />
          </div>
          <h2 className="text-2xl font-black text-[#1B1464] uppercase tracking-tight">Portal Admin</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">Yayasan Zamoa Peduli Bangsa</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B1464] outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#1B1464] outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Masukkan password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#1B1464] hover:bg-[#F15A24] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg flex justify-center items-center gap-2 mt-4 disabled:opacity-70"
            >
              {isLoading ? <><Loader2 size={20} className="animate-spin" /> Memproses...</> : 'Masuk ke Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;