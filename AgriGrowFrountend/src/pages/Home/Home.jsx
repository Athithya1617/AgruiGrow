import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Sprout, TrendingUp, Calculator, 
  ShieldAlert, Calendar, Bot, ChevronRight, Activity, Bell
} from 'lucide-react';
import heroImg from '../../assets/hero.png';
import { fetchMarketPrices, fetchNewsAlerts } from '../../services/api';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [marketPrices, setMarketPrices] = useState([]);
  const [news, setNews] = useState([]);
  const [loadingPrices, setLoadingPrices] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const prices = await fetchMarketPrices();
        const alerts = await fetchNewsAlerts();
        setMarketPrices(prices);
        setNews(alerts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPrices(false);
      }
    };
    loadData();
  }, []);

  const toolsList = [
    { name: 'Crop Catalog', path: '/crop-info', desc: 'Find soil, water, and temperature needs for major crops.', icon: Sprout, color: 'green' },
    { name: 'Fertilizer Manager', path: '/fertilizer', desc: 'Calculate exact NPK requirements for your fields.', icon: Calculator, color: 'blue' },
    { name: 'Seed Sowing Calculator', path: '/seed-calc', desc: 'Compute exact seed weights needed per acre.', icon: Calculator, color: 'orange' },
    { name: 'Water Management', path: '/water', desc: 'Calculate irrigation needs and soil moisture targets.', icon: Sprout, color: 'green' },
    { name: 'Economics & Budgets', path: '/economics', desc: 'Track agricultural revenue and seasonal costs.', icon: TrendingUp, color: 'purple' },
    { name: 'Disease Diagnostic', path: '/disease', desc: 'Identify crop infections and get treatment options.', icon: ShieldAlert, color: 'orange' },
    { name: 'Agri Calendar', path: '/calendar', desc: 'Plan seasonal sowing, weeding, and harvest times.', icon: Calendar, color: 'blue' },
    { name: 'Vivasaayi AI', path: '/ai-assistant', desc: 'Ask questions to our digital agronomist chat.', icon: Bot, color: 'purple' }
  ];

  const filteredTools = toolsList.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container main-content home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container-flex">
          <div className="hero-content">
            <span className="hero-badge">Smart Agricultural Portal</span>
            <h1 className="hero-title">Grow Smarter, Yield Higher</h1>
            <p className="hero-subtitle">
              Your comprehensive digital agronomy toolkit. Calculate fertilizers, track weather patterns, log budgets, and manage crop health from one elegant terminal.
            </p>
            <div className="hero-search-bar">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search guides, calculators, or catalogs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img src={heroImg} className="hero-app-img" alt="smart farming system" />
          </div>
        </div>
      </section>

      {/* Main Grid Dashboard Layout */}
      <div className="home-dashboard-grid">
        
        {/* Left Column: Tools list */}
        <div className="home-tools-col">
          <div className="section-header">
            <Activity className="section-icon text-green" />
            <h2>Interactive Agricultural Suite</h2>
          </div>
          <div className="tools-cards-grid">
            {filteredTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Link to={tool.path} className={`card tool-card hover-color-${tool.color}`} key={index}>
                  <div className="tool-icon-wrapper">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="tool-name">{tool.name}</h3>
                    <p className="tool-desc">{tool.desc}</p>
                  </div>
                  <ChevronRight size={18} className="tool-arrow" />
                </Link>
              );
            })}
            {filteredTools.length === 0 && (
              <p className="no-results text-center py-4">No tools match your search.</p>
            )}
          </div>
        </div>

        {/* Right Column: Feed and Market Data */}
        <div className="home-feeds-col">
          {/* Market Pricing Card */}
          <div className="card feed-card mb-6">
            <h3 className="card-title">
              <TrendingUp size={20} className="text-green" /> Local Market Rates
            </h3>
            {loadingPrices ? (
              <div className="prices-loader">
                <div className="spinner"></div>
                <span>Syncing Mandi prices...</span>
              </div>
            ) : (
              <div className="market-rates-list">
                {marketPrices.map((item, idx) => (
                  <div className="market-rate-item" key={idx}>
                    <span className="market-crop-name">{item.crop}</span>
                    <div className="market-price-details">
                      <span className="price-val">₹{item.price}/{item.unit}</span>
                      <span className={`price-change ${item.trend}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="market-footer">
              <span>Updated: Real-time APMC feed</span>
            </div>
          </div>

          {/* Agricultural News Card */}
          <div className="card feed-card">
            <h3 className="card-title">
              <Bell size={20} className="text-orange" /> Agri Alerts & Advisories
            </h3>
            <div className="news-alerts-list">
              {news.map((item) => (
                <div className="news-alert-item" key={item.id}>
                  <span className="news-badge-category">Advisory</span>
                  <p className="news-item-title">{item.title}</p>
                  <div className="news-item-footer">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
