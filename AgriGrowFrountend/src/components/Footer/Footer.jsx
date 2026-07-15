import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <Leaf size={24} className="logo-icon" />
              <span>AgriGrow</span>
            </div>
            <p className="footer-desc">
              Empowering farmers and agricultural enthusiasts with state-of-the-art tools, intelligent planning calculators, and real-time weather analytics.
            </p>
            <div className="footer-contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>Kisan Helpline: +91 9751280089</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>CREED KVK, Tamil Nadu, IN</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-title">Core Features</h4>
            <ul className="footer-links">
              <li><Link to="/dashboard">Farm Dashboard</Link></li>
              <li><Link to="/crop-info">Crop Catalog</Link></li>
              <li><Link to="/fertilizer">Fertilizer Manager</Link></li>
              <li><Link to="/water">Water Management</Link></li>
              <li><Link to="/economics">Economics & Budget</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-col">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/farming-guide">Farming Guides</Link></li>
              <li><Link to="/disease">Disease Catalog</Link></li>
              <li><Link to="/schemes">Govt Schemes Directory</Link></li>
              <li><Link to="/calendar">Crop Calendar</Link></li>
              <li><Link to="/ai-assistant">Vivasaayi AI Chat</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-title">AgriGrow Advisory</h4>
            <p className="footer-desc">
              Subscribe to get weekly local agricultural weather alerts and farming recommendations.
            </p>
            {subscribed ? (
              <div className="badge badge-success w-full justify-between py-2">
                <span>Successfully subscribed! Check email.</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="input newsletter-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary newsletter-btn">
                  <Mail size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AgriGrow. Supporting sustainable agricultural growth.</p>
          <p className="footer-credit">
            Made with <Heart size={12} className="heart-icon" /> for farmers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
