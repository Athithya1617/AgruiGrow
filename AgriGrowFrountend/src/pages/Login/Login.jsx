import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Leaf, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, User, Phone, MapPin, Layers } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { login, register, isAuthenticated } = useContext(AuthContext);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Login & Shared fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locationStr, setLocationStr] = useState('');
  const [farmSize, setFarmSize] = useState('5.0');
  const [unit, setUnit] = useState('acres');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (isRegisterMode && (!name || !phone || !locationStr))) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (isRegisterMode) {
        // Register flow
        const registerData = {
          name,
          email,
          phone,
          password,
          location: locationStr,
          farmSize: parseFloat(farmSize) || 0,
          unit,
          cropPreferences: ['Rice', 'Wheat', 'Potato'] // Default preferences
        };
        await register(registerData);
      } else {
        // Login flow
        await login(email, password);
      }
      
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setIsRegisterMode(false);
    setEmail('athit@agrigrow.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="login-page-wrapper animate-fade-in">
      <div className="login-glow-orb purple-orb"></div>
      <div className="login-glow-orb green-orb"></div>
      
      <div className="login-card-container">
        <div className="card login-card">
          <div className="login-card-header text-center mb-4">
            <div className="login-logo-circle mb-3 mx-auto">
              <Leaf size={32} className="logo-icon-spin" />
            </div>
            <h1 className="login-title">Welcome to AgriGrow</h1>
            <p className="login-subtitle text-muted">A smart agricultural portal for modern farming communities</p>
          </div>

          {/* Auth Tabs Toggle */}
          <div className="auth-tabs mb-6">
            <button 
              type="button" 
              className={`auth-tab-btn ${!isRegisterMode ? 'active' : ''}`}
              onClick={() => { setIsRegisterMode(false); setError(''); }}
            >
              Sign In
            </button>
            <button 
              type="button" 
              className={`auth-tab-btn ${isRegisterMode ? 'active' : ''}`}
              onClick={() => { setIsRegisterMode(true); setError(''); }}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="login-alert-danger mb-4 animate-fade-in">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {isRegisterMode && (
              <div className="form-group mb-4">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon-wrapper">
                  <User size={16} className="input-field-icon" />
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="input input-with-icon" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group mb-4">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon-wrapper">
                <Mail size={16} className="input-field-icon" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="input input-with-icon" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {isRegisterMode && (
              <>
                <div className="form-group mb-4">
                  <label className="form-label">Phone Number</label>
                  <div className="input-with-icon-wrapper">
                    <Phone size={16} className="input-field-icon" />
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className="input input-with-icon" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Farm Location Address</label>
                  <div className="input-with-icon-wrapper">
                    <MapPin size={16} className="input-field-icon" />
                    <input 
                      type="text" 
                      placeholder="Village, District, State" 
                      className="input input-with-icon" 
                      value={locationStr}
                      onChange={(e) => setLocationStr(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row mb-4">
                  <div className="form-group flex-1">
                    <label className="form-label">Farm Size</label>
                    <div className="input-with-icon-wrapper">
                      <Layers size={16} className="input-field-icon" />
                      <input 
                        type="number" 
                        min="0.1" 
                        step="0.1" 
                        placeholder="Size" 
                        className="input input-with-icon" 
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group w-35">
                    <label className="form-label">Unit</label>
                    <select className="select" value={unit} onChange={(e) => setUnit(e.target.value)}>
                      <option value="acres">Acres</option>
                      <option value="hectares">Hectares</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="form-group mb-6">
              <label className="form-label">Password</label>
              <div className="input-with-icon-wrapper">
                <Lock size={16} className="input-field-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder={isRegisterMode ? "Create a password" : "Enter your password"} 
                  className="input input-with-icon pr-10" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full login-submit-btn mb-4" disabled={loading}>
              {loading ? 'Processing...' : (
                <span className="d-flex align-items-center justify-center gap-2">
                  {isRegisterMode ? 'Register Account' : 'Sign In'} <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          {/* Quick-fill helper card */}
          {!isRegisterMode && (
            <div className="quick-fill-card text-center animate-fade-in">
              <p className="quick-fill-text mb-2">Testing or Demo Access?</p>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm w-full quick-fill-btn"
                onClick={handleQuickFill}
              >
                Quick-Fill Demo Credentials
              </button>
              <div className="demo-credentials-hints mt-2">
                <span className="text-muted block text-xs">Email: athit@agrigrow.com</span>
                <span className="text-muted block text-xs">Password: password123</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
