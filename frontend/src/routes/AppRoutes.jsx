import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Struktur from '../pages/Struktur.jsx';
import Tentang from '../pages/Tentang.jsx';
import Program from '../pages/Program.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/struktur" element={<Struktur />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/program" element={<Program />} /> 
    </Routes>
  );
};

export default AppRoutes;