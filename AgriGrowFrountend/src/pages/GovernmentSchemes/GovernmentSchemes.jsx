import { useState } from 'react';
import { governmentSchemes } from '../../services/cropService';
import { FileText, Award, HelpCircle, CheckCircle } from 'lucide-react';
import './GovernmentSchemes.css';

const GovernmentSchemes = () => {
  const [farmCategory, setFarmCategory] = useState('Small & Marginal Farmers');
  const [landArea, setLandArea] = useState(1.5);
  const [matches, setMatches] = useState(null);

  const handleCheckEligibility = (e) => {
    e.preventDefault();
    
    // Eligibility matching rules:
    // User landArea must fall between scheme.eligibility.minArea and maxArea
    // Categories must match or scheme.eligibility.category must be 'All Farmers'
    const qualifying = governmentSchemes.filter(scheme => {
      const matchArea = landArea >= scheme.eligibility.minArea && landArea <= scheme.eligibility.maxArea;
      const matchCat = scheme.eligibility.category === 'All Farmers' || 
                       scheme.eligibility.category.includes(farmCategory) ||
                       farmCategory === 'All Farmers';
      return matchArea && matchCat;
    });

    setMatches(qualifying);
  };

  return (
    <div className="container main-content schemes-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><FileText size={32} /> Government Schemes & Grants</h1>
        <p className="page-subtitle">Browse subsidies for solar pumps, crop insurances, organic certification support, and check eligibility.</p>
      </header>

      <div className="schemes-grid mb-6">
        {/* Left Form: Checker */}
        <div className="schemes-col">
          <form className="card checker-card" onSubmit={handleCheckEligibility}>
            <h3 className="card-title"><Award size={18} className="text-green" /> Eligibility Checker</h3>
            <p className="db-card-subtitle text-muted mb-4">Select your farm profile to calculate matching government sponsorships:</p>

            <div className="form-group mb-4">
              <label className="form-label">Farmer Category</label>
              <select className="select" value={farmCategory} onChange={(e) => setFarmCategory(e.target.value)}>
                <option value="Small & Marginal Farmers">Small & Marginal Farmers (&lt; 2 Hectares)</option>
                <option value="Organic Clusters">Organic Clusters / Cooperatives</option>
                <option value="Individual & Cooperative Farms">Large Commercial Landholdings</option>
                <option value="All Farmers">All Farmers</option>
              </select>
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Total Land Holding (acres)</label>
              <input 
                type="number" 
                min="0.1" 
                step="0.1" 
                className="input" 
                value={landArea}
                onChange={(e) => setLandArea(parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">Verify Matching Schemes</button>
          </form>
        </div>

        {/* Right Output: Qualifying list */}
        <div className="schemes-col">
          {matches ? (
            <div className="card matches-card animate-fade-in">
              <h3 className="card-title text-green"><CheckCircle size={20} /> Eligible Programs ({matches.length})</h3>
              <p className="db-card-subtitle text-muted mb-4">Based on your {landArea} acres land holding profile:</p>

              {matches.length > 0 ? (
                <div className="eligible-schemes-list">
                  {matches.map((scheme, idx) => (
                    <div className="eligible-scheme-item" key={idx}>
                      <span className="eligible-scheme-name font-semibold">{scheme.name}</span>
                      <p className="eligible-scheme-benefits mt-1">🎁 <strong>Benefit:</strong> {scheme.benefits}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-6">No specific schemes match your profile bounds.</p>
              )}
            </div>
          ) : (
            <div className="card empty-matches-card d-flex align-items-center justify-center text-center">
              <div>
                <HelpCircle size={48} className="text-muted mb-2" />
                <p className="text-muted">Submit farm details to identify qualifying agricultural grants.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Schemes Directory */}
      <section className="card directory-card">
        <h3 className="card-title mb-4"><FileText size={20} className="text-green" /> National Agricultural Subsidy Directory</h3>
        <div className="schemes-directory-list">
          {governmentSchemes.map((scheme, idx) => (
            <div className="directory-scheme-item" key={idx}>
              <h4 className="dir-scheme-name text-green font-semibold">{scheme.name}</h4>
              <p className="dir-scheme-desc text-sm mt-1">{scheme.description}</p>
              <div className="dir-scheme-meta d-flex justify-between mt-2 pt-2 border-top-dashed">
                <span className="text-xs text-muted">Eligibility Limit: <strong>{scheme.eligibility.category}</strong></span>
                <span className="text-xs text-green"><strong>Benefits:</strong> {scheme.benefits}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GovernmentSchemes;
