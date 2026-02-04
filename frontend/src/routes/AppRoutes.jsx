import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';        // Tambahkan .jsx
import Struktur from '../pages/Struktur.jsx'; // Tambahkan .jsx

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/struktur" element={<Struktur />} />
    </Routes>
  );
};

export default AppRoutes;