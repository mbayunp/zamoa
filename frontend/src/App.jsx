import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
       {/* Semua urusan Navbar, Footer, dan penempatan Layout 
         sekarang diurus sepenuhnya oleh AppRoutes.jsx 
       */}
       <AppRoutes />
    </Router>
  );
}

export default App;