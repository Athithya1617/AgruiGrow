import { useState } from 'react';
import { cropsData } from '../../services/cropService';
import CropCard from '../../components/CropCard/CropCard';
import { Search, Sprout, Filter, X } from 'lucide-react';
import './CropInformation.css';

const CropInformation = () => {
  const [search, setSearch] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState(null);

  // Filters logic
  const filteredCrops = cropsData.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(search.toLowerCase()) || 
                          crop.description.toLowerCase().includes(search.toLowerCase());
    const matchesSeason = seasonFilter === 'All' || crop.season === seasonFilter;
    const matchesType = typeFilter === 'All' || crop.type === typeFilter;
    return matchesSearch && matchesSeason && matchesType;
  });

  return (
    <div className="container main-content crop-info-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Sprout size={32} /> Interactive Crop Catalog</h1>
        <p className="page-subtitle">Learn optimal seasonal configurations, hydration, NPK formulas, and cultivation stages for premium crops.</p>
      </header>

      {/* Filter and Search Bar */}
      <section className="card filter-bar-card mb-6">
        <div className="filter-search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search crops by name, category, or stages..." 
            className="input search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-group-row">
          {/* Season Filter */}
          <div className="filter-pill-container">
            <span className="filter-label"><Filter size={12} /> Season:</span>
            <div className="filter-pills">
              {['All', 'Kharif', 'Rabi', 'Zaid'].map((season) => (
                <button 
                  key={season} 
                  className={`pill-btn ${seasonFilter === season ? 'active' : ''}`}
                  onClick={() => setSeasonFilter(season)}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="filter-pill-container">
            <span className="filter-label"><Filter size={12} /> Type:</span>
            <select 
              className="select filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Cereal">Cereals</option>
              <option value="Vegetable">Vegetables</option>
              <option value="Fiber">Fibers</option>
              <option value="Oilseed">Oilseeds</option>
            </select>
          </div>
        </div>
      </section>

      {/* Crops Cards Grid */}
      <section className="grid-3 mb-6">
        {filteredCrops.map((crop) => (
          <CropCard 
            key={crop.id} 
            crop={crop} 
            onSelect={(c) => setSelectedCrop(c)} 
          />
        ))}
      </section>

      {filteredCrops.length === 0 && (
        <div className="card text-center py-6">
          <p className="text-muted">No crop varieties match your filters.</p>
        </div>
      )}

      {/* Crop Detail Modal */}
      {selectedCrop && (
        <div className="modal-overlay" onClick={() => setSelectedCrop(null)}>
          <div className="modal-content card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCrop(null)}>
              <X size={20} />
            </button>
            <div className="modal-header d-flex align-items-center gap-4 mb-4">
              <span className="modal-avatar">{selectedCrop.image}</span>
              <div>
                <h2 className="modal-title">{selectedCrop.name}</h2>
                <span className="badge badge-success">{selectedCrop.season} • {selectedCrop.type}</span>
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-desc mb-4">{selectedCrop.description}</p>
              
              <div className="modal-stats-grid grid-2 mb-6">
                <div className="modal-stat-card">
                  <span className="stat-label">Optimal Temperature</span>
                  <span className="stat-val">{selectedCrop.optimalTemp}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="stat-label">Irrigation/Water Needs</span>
                  <span className="stat-val">{selectedCrop.waterNeeds}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="stat-label">Optimal Soil pH</span>
                  <span className="stat-val">{selectedCrop.soilPh}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="stat-label">Crop Spacing Layout</span>
                  <span className="stat-val">{selectedCrop.spacing}</span>
                </div>
                <div className="modal-stat-card">
                  <span className="stat-label">Standard Seed Sowing Rate</span>
                  <span className="stat-val">{selectedCrop.seedRate} kg/hectare</span>
                </div>
                <div className="modal-stat-card">
                  <span className="stat-label">Average Growth Cycle</span>
                  <span className="stat-val">{selectedCrop.duration}</span>
                </div>
              </div>

              <div className="modal-stages-timeline">
                <h4 className="timeline-title">Complete Crop Journey</h4>
                <div className="timeline-container">
                  {selectedCrop.stages.map((stage, idx) => (
                    <div className="timeline-step" key={idx}>
                      <div className="step-marker">{idx + 1}</div>
                      <div className="step-content">
                        <span className="step-title">{stage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropInformation;
