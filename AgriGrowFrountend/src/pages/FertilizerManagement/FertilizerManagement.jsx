import { useState } from 'react';
import { cropsData } from '../../services/cropService';
import { Sprout, Calculator, HelpCircle, CheckCircle } from 'lucide-react';
import './FertilizerManagement.css';

const FertilizerManagement = () => {
  const [cropId, setCropId] = useState(cropsData[0].id);
  const [fieldArea, setFieldArea] = useState(1);
  const [areaUnit, setAreaUnit] = useState('acres');
  const [soilType, setSoilType] = useState('Loamy');
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const crop = cropsData.find(c => c.id === cropId);
    if (!crop) return;

    // Convert area to Hectares for base NPK (since database NPK is per Hectare)
    const areaInHectares = areaUnit === 'acres' ? fieldArea / 2.471 : fieldArea;

    // Soil type multiplier adjustments
    let soilMultiplier = 1.0;
    if (soilType === 'Sandy') soilMultiplier = 1.15; // requires more fertilizer due to leaching
    if (soilType === 'Clayey') soilMultiplier = 0.90; // requires slightly less due to clay nutrient retention

    // Compute NPK requirements
    const nVal = Math.round(crop.fertilizerNPK.N * areaInHectares * soilMultiplier);
    const pVal = Math.round(crop.fertilizerNPK.P * areaInHectares * soilMultiplier);
    const kVal = Math.round(crop.fertilizerNPK.K * areaInHectares * soilMultiplier);

    // Organic alternatives calculations (manure, bone meal, compost)
    // Dry Manure contains ~2% N. Compost contains ~1% P. Wood Ash contains ~6% K.
    const manureNeed = Math.round(nVal / 0.02);
    const boneMealNeed = Math.round(pVal / 0.15); // Bone meal is ~15% P
    const woodAshNeed = Math.round(kVal / 0.06); // Wood ash is ~6% K

    setResults({
      cropName: crop.name,
      n: nVal,
      p: pVal,
      k: kVal,
      organic: {
        manure: manureNeed,
        boneMeal: boneMealNeed,
        woodAsh: woodAshNeed
      }
    });
  };

  return (
    <div className="container main-content fertilizer-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Sprout size={32} /> Fertilizer Management</h1>
        <p className="page-subtitle">Calculate exact NPK chemical nutrients requirements and eco-friendly organic alternatives tailored for your land size.</p>
      </header>

      <div className="fertilizer-grid">
        {/* Left Form Panel */}
        <form className="card fertilizer-form-card" onSubmit={handleCalculate}>
          <h3 className="card-title"><Calculator size={20} className="text-green" /> Nutrient Calculator</h3>
          <p className="db-card-subtitle text-muted mb-4">Input crop and soil characteristics to calculate guidelines</p>

          <div className="form-group mb-4">
            <label className="form-label">Target Crop</label>
            <select 
              className="select" 
              value={cropId} 
              onChange={(e) => setCropId(e.target.value)}
            >
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
              <select 
                className="select" 
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value)}
              >
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-6">
            <label className="form-label">Soil Classification</label>
            <select 
              className="select" 
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
            >
              <option value="Loamy">Loamy (Recommended / Average)</option>
              <option value="Sandy">Sandy (High leaching risk)</option>
              <option value="Clayey">Clayey (Nutrient retentive)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Compute Nutrients Requirements
          </button>
        </form>

        {/* Right Results Panel */}
        <div className="fertilizer-results-pane">
          {results ? (
            <div className="card results-card animate-fade-in">
              <h3 className="card-title text-green"><CheckCircle size={20} /> Recommended Formulation</h3>
              <p className="db-card-subtitle text-muted mb-4">Formulation calculated for {fieldArea} {areaUnit} of {results.cropName}</p>

              {/* NPK Blocks */}
              <div className="npk-blocks-row mb-6">
                <div className="npk-block block-n">
                  <span className="npk-letter">N</span>
                  <span className="npk-val">{results.n} kg</span>
                  <span className="npk-label">Nitrogen</span>
                </div>
                <div className="npk-block block-p">
                  <span className="npk-letter">P</span>
                  <span className="npk-val">{results.p} kg</span>
                  <span className="npk-label">Phosphorus</span>
                </div>
                <div className="npk-block block-k">
                  <span className="npk-letter">K</span>
                  <span className="npk-val">{results.k} kg</span>
                  <span className="npk-label">Potassium</span>
                </div>
              </div>

              {/* Organic Substitutes */}
              <div className="organic-advise-box">
                <h4 className="organic-title mb-4">Alternative Organic Fertilization Option</h4>
                <div className="organic-list">
                  <div className="organic-item d-flex justify-between mb-2">
                    <span className="organic-name">Dehydrated Cow Manure (covers N)</span>
                    <span className="organic-weight">~{results.organic.manure.toLocaleString()} kg</span>
                  </div>
                  <div className="organic-item d-flex justify-between mb-2">
                    <span className="organic-name">Steamed Bone Meal (covers P)</span>
                    <span className="organic-weight">~{results.organic.boneMeal.toLocaleString()} kg</span>
                  </div>
                  <div className="organic-item d-flex justify-between">
                    <span className="organic-name">Hardwood Ash (covers K)</span>
                    <span className="organic-weight">~{results.organic.woodAsh.toLocaleString()} kg</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card empty-results-card d-flex align-items-center justify-center text-center">
              <div>
                <HelpCircle size={48} className="text-muted mb-2" />
                <p className="text-muted">Calculations will be displayed here after submitting the field properties.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerManagement;
