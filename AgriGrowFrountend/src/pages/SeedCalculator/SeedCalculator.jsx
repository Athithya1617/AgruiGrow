import { useState } from 'react';
import { cropsData } from '../../services/cropService';
import { Calculator, ClipboardList, CheckCircle } from 'lucide-react';
import './SeedCalculator.css';

const SeedCalculator = () => {
  const [cropId, setCropId] = useState(cropsData[0].id);
  const [fieldArea, setFieldArea] = useState(1);
  const [areaUnit, setAreaUnit] = useState('acres');
  const [germinationRate, setGerminationRate] = useState(Math.round(cropsData[0].germinationRate * 100));
  const [purity, setPurity] = useState(Math.round(cropsData[0].purity * 100));
  const [spacing, setSpacing] = useState(cropsData[0].spacing);
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const crop = cropsData.find(c => c.id === cropId);
    if (!crop) return;

    // Convert acres to Hectares (crop seed rate standard is per Hectare)
    const hectares = areaUnit === 'acres' ? fieldArea / 2.471 : fieldArea;

    // Calculate seed rate adjusted for germination and purity
    // Base rate is for perfect germination and purity. Adjust multiplier:
    const germDecimal = germinationRate / 100;
    const purityDecimal = purity / 100;

    const baseSeedRate = crop.seedRate; // kg/ha
    const adjustedRate = baseSeedRate * (1 / (germDecimal * purityDecimal));
    const totalSeedsWeight = Math.round(adjustedRate * hectares * 100) / 100; // in kg

    setResults({
      cropName: crop.name,
      weight: totalSeedsWeight,
      spacing: spacing,
      purityUsed: purity,
      germUsed: germinationRate
    });
  };

  return (
    <div className="container main-content seed-calc-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Calculator size={32} /> Seed Sowing Calculator</h1>
        <p className="page-subtitle">Determine the exact seed weight in kilograms required for sowing based on custom field area, germination rates, and seed purities.</p>
      </header>

      <div className="seed-grid">
        {/* Left Input Form */}
        <form className="card seed-form-card" onSubmit={handleCalculate}>
          <h3 className="card-title"><Calculator size={20} className="text-green" /> Seed Parameters</h3>
          <p className="db-card-subtitle text-muted mb-4">Input seeds characteristics to compute sowing quantities</p>

          <div className="form-group mb-4">
            <label className="form-label">Crop Variety</label>
            <select 
              className="select" 
              value={cropId} 
              onChange={(e) => {
                const selectedId = e.target.value;
                setCropId(selectedId);
                const crop = cropsData.find(c => c.id === selectedId);
                if (crop) {
                  setGerminationRate(Math.round(crop.germinationRate * 100));
                  setPurity(Math.round(crop.purity * 100));
                  setSpacing(crop.spacing);
                }
              }}
            >
              {cropsData.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group-row mb-4">
            <div className="form-group flex-1">
              <label className="form-label">Area size</label>
              <input 
                type="number" 
                min="0.1" 
                step="0.1" 
                className="input" 
                value={fieldArea}
                onChange={(e) => setFieldArea(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div className="form-group w-30">
              <label className="form-label">Unit</label>
              <select className="select" value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)}>
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>
          </div>

          <div className="form-group-row mb-4">
            <div className="form-group flex-1">
              <label className="form-label">Germination Rate (%)</label>
              <input 
                type="number" 
                min="10" 
                max="100" 
                className="input"
                value={germinationRate}
                onChange={(e) => setGerminationRate(parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div className="form-group flex-1">
              <label className="form-label">Seed Purity (%)</label>
              <input 
                type="number" 
                min="10" 
                max="100" 
                className="input"
                value={purity}
                onChange={(e) => setPurity(parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-6">
            <label className="form-label">Row Spacing Layout</label>
            <input 
              type="text" 
              className="input"
              value={spacing}
              onChange={(e) => setSpacing(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Compute Seed Weight
          </button>
        </form>

        {/* Right Output Panel */}
        <div className="seed-results-pane">
          {results ? (
            <div className="card results-card animate-fade-in">
              <h3 className="card-title text-green"><CheckCircle size={20} /> Sowing Requirements</h3>
              <p className="db-card-subtitle text-muted mb-4">Estimates derived for {fieldArea} {areaUnit} of {results.cropName}</p>

              {/* Seed Weight Stat */}
              <div className="seed-weight-display mb-6">
                <span className="display-label">Estimated Seeds Quantity Required</span>
                <h1 className="display-val">{results.weight} kg</h1>
                <p className="display-sub">Adjusted for {results.germUsed}% germination and {results.purityUsed}% purity.</p>
              </div>

              {/* Grid Layout spacing guidance */}
              <div className="spacing-advisory-card">
                <h4 className="spacing-title mb-2">Spacing Layout Recommendation</h4>
                <div className="spacing-body d-flex align-items-center gap-4">
                  <span className="spacing-visual">📏</span>
                  <div>
                    <p className="spacing-text">Recommended grid spacing: <strong>{results.spacing}</strong>.</p>
                    <p className="spacing-desc text-muted">Maintain this distance during transplanting or mechanical drill seed distribution to optimize sunlight capture and root growth.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card empty-results-card d-flex align-items-center justify-center text-center">
              <div>
                <ClipboardList size={48} className="text-muted mb-2" />
                <p className="text-muted">Calculations will be displayed here after submitting the seed properties.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeedCalculator;
