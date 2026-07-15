import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Import all page components
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import CropInformation from '../pages/CropInformation/CropInformation';
import FarmingGuide from '../pages/FarmingGuide/FarmingGuide';
import FertilizerManagement from '../pages/FertilizerManagement/FertilizerManagement';
import SeedCalculator from '../pages/SeedCalculator/SeedCalculator';
import WaterManagement from '../pages/WaterManagement/WaterManagement';
import LandCalculator from '../pages/LandCalculator/LandCalculator';
import Economics from '../pages/Economics/Economics';
import WeatherCenter from '../pages/WeatherCenter/WeatherCenter';
import DiseaseManagement from '../pages/DiseaseManagement/DiseaseManagement';
import GovernmentSchemes from '../pages/GovernmentSchemes/GovernmentSchemes';
import AgriculturalCalendar from '../pages/AgriculturalCalendar/AgriculturalCalendar';
import FarmDiary from '../pages/FarmDiary/FarmDiary';
import AIAssistant from '../pages/AIAssistant/AIAssistant';
import LocalServices from '../pages/LocalServices/LocalServices';
import Contact from '../pages/Contact/Contact';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: 'var(--text-muted)' }}>
        <p>Loading application state...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Pages */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/crop-info" element={<ProtectedRoute><CropInformation /></ProtectedRoute>} />
      <Route path="/farming-guide" element={<ProtectedRoute><FarmingGuide /></ProtectedRoute>} />
      <Route path="/fertilizer" element={<ProtectedRoute><FertilizerManagement /></ProtectedRoute>} />
      <Route path="/seed-calc" element={<ProtectedRoute><SeedCalculator /></ProtectedRoute>} />
      <Route path="/water" element={<ProtectedRoute><WaterManagement /></ProtectedRoute>} />
      <Route path="/land-calc" element={<ProtectedRoute><LandCalculator /></ProtectedRoute>} />
      <Route path="/economics" element={<ProtectedRoute><Economics /></ProtectedRoute>} />
      <Route path="/weather" element={<ProtectedRoute><WeatherCenter /></ProtectedRoute>} />
      <Route path="/disease" element={<ProtectedRoute><DiseaseManagement /></ProtectedRoute>} />
      <Route path="/schemes" element={<ProtectedRoute><GovernmentSchemes /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><AgriculturalCalendar /></ProtectedRoute>} />
      <Route path="/diary" element={<ProtectedRoute><FarmDiary /></ProtectedRoute>} />
      <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute><LocalServices /></ProtectedRoute>} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
