import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import { AlertTriangle } from 'lucide-react';
import './App.css';

function AppContent() {
  const { isOfflineMode, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="app-container">
      <Navbar />
      {isAuthenticated && isOfflineMode && (
        <div className="offline-banner">
          <AlertTriangle size={16} className="banner-icon" />
          <span>Demo Mode: Backend database offline. Saving all data to browser localStorage.</span>
        </div>
      )}
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
