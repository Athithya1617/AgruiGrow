import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  Leaf, Sun, Moon, ChevronDown, Menu, X, Sprout, 
  Calculator, ThermometerSun, BookOpen, ShieldAlert, 
  DollarSign, Droplet, Layers, FileText, 
  Calendar, BookOpenCheck, Bot, MapPin, LogOut
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme, user, isAuthenticated, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toolRoutes = [
    { name: 'Farming Guide', path: '/farming-guide', icon: BookOpen },
    { name: 'Fertilizer Manager', path: '/fertilizer', icon: Sprout },
    { name: 'Seed Calculator', path: '/seed-calc', icon: Calculator },
    { name: 'Water Management', path: '/water', icon: Droplet },
    { name: 'Land Calculator', path: '/land-calc', icon: Layers },
    { name: 'Farm Economics', path: '/economics', icon: DollarSign },
    { name: 'Weather Center', path: '/weather', icon: ThermometerSun },
    { name: 'Disease Diagnostic', path: '/disease', icon: ShieldAlert },
    { name: 'Govt Schemes', path: '/schemes', icon: FileText },
    { name: 'Agri Calendar', path: '/calendar', icon: Calendar },
    { name: 'Farm Diary', path: '/diary', icon: BookOpenCheck },
    { name: 'Local Services', path: '/services', icon: MapPin },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          <Leaf className="logo-icon" />
          <span>AgriGrow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/crop-info" className={`nav-link ${isActive('/crop-info') ? 'active' : ''}`}>Crop Catalog</Link>
          
          {/* All Tools Dropdown */}
          <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="dropdown-toggle nav-link">
              Farming Tools <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-grid">
                  {toolRoutes.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link 
                        key={tool.path} 
                        to={tool.path} 
                        className={`dropdown-item ${isActive(tool.path) ? 'active' : ''}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Icon size={18} className="tool-icon" />
                        <span>{tool.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link to="/ai-assistant" className={`nav-link ${isActive('/ai-assistant') ? 'active' : ''} ai-link`}>
            <Bot size={16} /> Vivasaayi AI
          </Link>
          
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
        </div>

        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* User Badge or Sign In Button */}
          {isAuthenticated && user ? (
            <div className="profile-dropdown-container" style={{ position: 'relative' }}>
              <div 
                className="user-profile-badge" 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span className="user-initials">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
                <span className="user-name-desktop">{user.name}</span>
                <ChevronDown size={14} className={`dropdown-arrow-icon ${profileDropdownOpen ? 'rotated' : ''}`} style={{ transition: 'transform 0.2s ease' }} />
              </div>
              
              {profileDropdownOpen && (
                <div 
                  className="dropdown-menu profile-menu animate-fade-in"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '8px',
                    width: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '6px',
                    zIndex: 1000,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)'
                  }}
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <button 
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                    }}
                    className="dropdown-item logout-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--accent)',
                      border: 'none',
                      background: 'none',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm login-nav-btn" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <Link to="/" className={`mobile-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" className={`mobile-link ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          <Link to="/crop-info" className={`mobile-link ${isActive('/crop-info') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Crop Catalog</Link>
          
          <div className="mobile-tools-section">
            <p className="mobile-section-title">Tools & Calculators</p>
            <div className="mobile-tools-grid">
              {toolRoutes.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link 
                    key={tool.path} 
                    to={tool.path} 
                    className={`mobile-tool-link ${isActive(tool.path) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={16} />
                    <span>{tool.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link to="/ai-assistant" className={`mobile-link ${isActive('/ai-assistant') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Vivasaayi AI</Link>
          <Link to="/contact" className={`mobile-link ${isActive('/contact') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
