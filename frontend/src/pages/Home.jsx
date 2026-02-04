const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Selamat Datang
        </h1>
        <p className="text-gray-600">
          Portal Informasi Digital Yayasan Berdaya. Kelola struktur, program, dan berita dalam satu dashboard.
        </p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Lihat Program Kami
        </button>
      </div>
    </div>
  );
};

export default Home;