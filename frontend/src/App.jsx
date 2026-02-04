import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import di sini

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* Wrapper agar footer selalu di bawah */}
        <Navbar />
        
        <main className="flex-grow w-full">
          <AppRoutes />
        </main>

        <Footer /> {/* Footer dipasang di sini */}
      </div>
    </Router>
  );
}

export default App;