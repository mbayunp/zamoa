import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';        // Tambahkan .jsx
import Struktur from '../pages/Struktur.jsx'; // Tambahkan .jsx
import Tentang from '../pages/Tentang.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/struktur" element={<Struktur />} />
      <Route path="/tentang" element={<Tentang />} />
    </Routes>
  );
};

export default AppRoutes;