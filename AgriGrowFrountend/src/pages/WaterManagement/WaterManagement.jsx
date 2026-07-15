import { useState } from 'react';
import { cropsData } from '../../services/cropService';
import { Droplet, Compass, HelpCircle, CheckCircle } from 'lucide-react';
import './WaterManagement.css';

const WaterManagement = () => {
  const [cropId, setCropId] = useState(cropsData[0].id);
  const [fieldArea, setFieldArea] = useState(1);
  const [areaUnit, setAreaUnit] = useState('acres');
  const [soilMoisture, setSoilMoisture] = useState(40); // percentage
  const [soilType, setSoilType] = useState('Loamy');
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const crop = cropsData.find(c => c.id === cropId);
    if (!crop) return;

    // Convert acres to square meters (1 acre = 4047 sqm, 1 hectare = 10000 sqm)
    const areaSqm = areaUnit === 'acres' ? fieldArea * 4047 : fieldArea * 10000;

    // Water Needs (base mm/day needed).
    // Let's assume standard irrigation evapotranspiration requires 4 to 8 mm per day depending on temp and soil.
    // If soil moisture is low (e.g. <30%), we need to replenish the soil deficit.
    // Deficit calculation: Target (e.g., 60% capacity) - Current moisture.
    const moistureDeficit = Math.max(0, 60 - soilMoisture); // target 60% capacity
    
    // Soil absorption factor
    let absorptionFactor = 1.0;
    if (soilType === 'Sandy') absorptionFactor = 1.25; // drains fast, needs more volume
    if (soilType === 'Clayey') absorptionFactor = 0.80; // retains water, needs less volume

    // Water volume calculation in Liters (1 mm over 1 sqm = 1 Liter)
    const mmNeeded = (5 + (moistureDeficit * 0.15)) * absorptionFactor;
    const totalWaterLiters = Math.round(areaSqm * mmNeeded);

    // Irrigation method suggestion
    let method = "Drip Irrigation";
    let explanation = "Drip lines are highly recommended to deliver water directly to rootzones, reducing evaporation.";
    if (crop.type === 'Cereal' && crop.id !== 'corn') {
      method = "Sprinkler Irrigation";
      explanation = "Sprinklers provide uniform coverage ideal for densely sowed grass crops like wheat and barley.";
    }
    if (crop.id === 'rice') {
      method = "Controlled Flooding (Paddy management)";
      explanation = "Rice fields require controlled water levels. Submerge fields to 5cm depth during tillering.";
    }

    setResults({
      cropName: crop.name,
      waterVolume: totalWaterLiters,
      method,
      explanation,
      soilMoistureUsed: soilMoisture
    });
  };

  return (
    <div className="container main-content water-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Droplet size={32} /> Smart Water Management</h1>
        <p className="page-subtitle">Calculate exact irrigation water volume requirements (in liters) depending on live soil moisture levels and crop hydration goals.</p>
      </header>

      <div className="water-grid">
        {/* Left Form */}
        <form className="card water-form-card" onSubmit={handleCalculate}>
          <h3 className="card-title"><Droplet size={20} className="text-green" /> Irrigation Estimator</h3>
          <p className="db-card-subtitle text-muted mb-4">Input field and moisture states to schedule irrigation</p>

          <div className="form-group mb-4">
            <label className="form-label">Active Crop</label>
            <select className="select" value={cropId} onChange={(e) => setCropId(e.target.value)}>
              {cropsData.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group-row mb-4">
            <div className="form-group flex-1">
              <label className="form-label">Field Area</label>
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

          <div className="form-group mb-4">
            <label className="form-label">Soil Classification</label>
            <select className="select" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
              <option value="Loamy">Loamy (Balanced loam)</option>
              <option value="Sandy">Sandy (Rapid draining)</option>
              <option value="Clayey">Clayey (Waterlogged risk)</option>
            </select>
          </div>

          <div className="form-group mb-6">
            <label className="form-label">Current Soil Moisture ({soilMoisture}%)</label>
            <div className="slider-wrapper">
              <input 
                type="range" 
                min="10" 
                max="90" 
                className="w-full slider" 
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(parseInt(e.target.value) || 0)}
              />
              <div className="slider-labels d-flex justify-between mt-2">
                <span className="text-muted text-xs">10% Dry</span>
                <span className="text-muted text-xs">50% Balanced</span>
                <span className="text-muted text-xs">90% Saturated</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Calculate Water Vol.
          </button>
        </form>

        {/* Right Output */}
        <div className="water-results-pane">
          {results ? (
            <div className="card results-card animate-fade-in">
              <h3 className="card-title text-green"><CheckCircle size={20} /> Irrigation Guidance</h3>
              <p className="db-card-subtitle text-muted mb-4">Calculations configured for {fieldArea} {areaUnit} of {results.cropName}</p>

              {/* Water Volume display */}
              <div className="water-volume-display mb-6">
                <span className="volume-label">Daily Irrigation Water Required</span>
                <h1 className="volume-val">{results.waterVolume.toLocaleString()} Liters</h1>
                <p className="volume-sub">Volume adjusted for current soil moisture level of {results.soilMoistureUsed}%.</p>
              </div>

              {/* System Advisory */}
              <div className="irrigation-method-card">
                <h4 className="method-title mb-2">Recommended Irrigation System</h4>
                <div className="method-body d-flex align-items-center gap-4">
                  <Compass className="text-green" size={28} />
                  <div>
                    <p className="method-name"><strong>{results.method}</strong></p>
                    <p className="method-desc text-muted">{results.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card empty-results-card d-flex align-items-center justify-center text-center">
              <div>
                <HelpCircle size={48} className="text-muted mb-2" />
                <p className="text-muted">Calculations will be displayed here after submitting the moisture values.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterManagement;
