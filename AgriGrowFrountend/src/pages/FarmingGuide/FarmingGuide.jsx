import { useState } from 'react';
import { farmingGuides } from '../../services/cropService';
import { BookOpen, CheckCircle, Bookmark } from 'lucide-react';
import './FarmingGuide.css';

const FarmingGuide = () => {
  const [activeGuide, setActiveGuide] = useState(0);

  // Dynamic progress calculator for interactive prep checklist
  const [checks, setChecks] = useState([false, false, false, false]);

  const toggleCheck = (idx) => {
    setChecks(prev => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const checklistItems = [
    "Test soil pH levels for target fields using home kit or local lab",
    "Prepare compost/green manure mix 2 weeks before planting",
    "Inspect and clear drip irrigation tube nozzles to avoid blockages",
    "Identify certified non-GMO seeds matching current season"
  ];

  const pct = Math.round((checks.filter(Boolean).length / checklistItems.length) * 100);

  return (
    <div className="container main-content farming-guide-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><BookOpen size={32} /> Farmers Instruction Manual</h1>
        <p className="page-subtitle">Expert agricultural articles for soil enriching, water conservation, and chemical-free pest control.</p>
      </header>

      <div className="guide-layout-grid">
        {/* Left Side: Articles Selection list */}
        <div className="guide-articles-list">
          <div className="section-title-wrapper mb-4">
            <Bookmark size={18} className="text-green" />
            <h3 className="section-title">Published Manuals</h3>
          </div>
          
          {farmingGuides.map((guide, idx) => (
            <div 
              key={idx}
              className={`card article-item-card ${activeGuide === idx ? 'active' : ''}`}
              onClick={() => setActiveGuide(idx)}
            >
              <div className="article-meta">
                <span className="article-tag">{guide.category}</span>
                <span className="article-time">{guide.readTime}</span>
              </div>
              <h3 className="article-title">{guide.title}</h3>
              <p className="article-summary">{guide.summary}</p>
            </div>
          ))}
        </div>

        {/* Right Side: Active Guide reading & Checklist */}
        <div className="guide-reading-pane">
          {/* Main Article Display */}
          <article className="card article-full-card mb-6">
            <div className="article-full-header mb-4">
              <span className="badge badge-success">{farmingGuides[activeGuide].category}</span>
              <span className="article-full-time text-muted">{farmingGuides[activeGuide].readTime}</span>
            </div>
            <h2 className="article-full-title mb-4">{farmingGuides[activeGuide].title}</h2>
            <p className="article-full-summary mb-6">"{farmingGuides[activeGuide].summary}"</p>

            <h4 className="article-steps-title mb-4">Step-by-Step Implementation Guide</h4>
            <div className="article-steps-timeline">
              {farmingGuides[activeGuide].steps.map((step, idx) => (
                <div className="article-step-row" key={idx}>
                  <div className="step-badge">{idx + 1}</div>
                  <div className="step-text-container">
                    <p className="step-text">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Interactive Farm Prep Checklist */}
          <div className="card prep-checklist-card">
            <h3 className="card-title"><CheckCircle size={20} className="text-green" /> Seasonal Sowing Preparation Tracker</h3>
            <p className="db-card-subtitle text-muted mb-4">Complete these preparatory tasks before executing crops sowing</p>
            
            {/* Progress Bar */}
            <div className="checklist-progress-container mb-4">
              <div className="progress-bar-wrapper">
                <div className="progress-bar-fill" style={{ width: `${pct}%` }}></div>
              </div>
              <span className="progress-percent-text">{pct}% Complete</span>
            </div>

            <div className="checklist-items-group">
              {checklistItems.map((item, idx) => (
                <div className="checklist-item-row" key={idx}>
                  <input 
                    type="checkbox" 
                    id={`check-${idx}`} 
                    checked={checks[idx]}
                    onChange={() => toggleCheck(idx)}
                  />
                  <label htmlFor={`check-${idx}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingGuide;
