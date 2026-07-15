import { useState } from 'react';
import { Layers, Compass, Columns } from 'lucide-react';
import './LandCalculator.css';

const LandCalculator = () => {
  // Conversion state
  const [convValue, setConvValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('acres');
  const [toUnit, setToUnit] = useState('hectares');
  const [convertedValue, setConvertedValue] = useState(0.4047);

  // Layout Grid Visualizer state
  const [widthMeters, setWidthMeters] = useState(10);
  const [lengthMeters, setLengthMeters] = useState(10);
  const [rowSpacingCm, setRowSpacingCm] = useState(50); // cm between rows
  const [plantSpacingCm, setPlantSpacingCm] = useState(25); // cm between plants in row

  // Conversion rates relative to 1 Square Meter (sqm)
  const rates = {
    sqm: 1.0,
    acres: 4046.86,
    hectares: 10000.0,
    bigha: 2529.28,  // standard Bigha
    guntha: 101.17   // standard Guntha
  };

  const handleConvert = (e) => {
    e.preventDefault();
    const valueInSqm = convValue * rates[fromUnit];
    const targetVal = valueInSqm / rates[toUnit];
    setConvertedValue(Math.round(targetVal * 10000) / 10000);
  };

  // Row layout computations
  const totalRows = Math.floor((widthMeters * 100) / rowSpacingCm);
  const plantsPerRow = Math.floor((lengthMeters * 100) / plantSpacingCm);
  const totalPlants = totalRows * plantsPerRow;

  return (
    <div className="container main-content land-calc-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Layers size={32} /> Land & Grid Layout Calculator</h1>
        <p className="page-subtitle">Convert land areas between local and metric measurement systems, and visualize grid-based sowing alignments.</p>
      </header>

      <div className="land-layouts-grid">
        
        {/* Left Side: Converter */}
        <div className="land-col">
          <form className="card conversion-card mb-6" onSubmit={handleConvert}>
            <h3 className="card-title"><Compass size={20} className="text-green" /> Area Unit Converter</h3>
            <p className="db-card-subtitle text-muted mb-4">Convert instantly between regional land metrics</p>

            <div className="form-group mb-4">
              <label className="form-label">Quantity</label>
              <input 
                type="number" 
                min="0.01" 
                step="0.01" 
                className="input" 
                value={convValue}
                onChange={(e) => setConvValue(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="form-group-row mb-4">
              <div className="form-group flex-1">
                <label className="form-label">From</label>
                <select className="select" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                  <option value="bigha">Bighas</option>
                  <option value="guntha">Gunthas</option>
                  <option value="sqm">Square Meters</option>
                </select>
              </div>

              <div className="form-group flex-1">
                <label className="form-label">To</label>
                <select className="select" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                  <option value="bigha">Bighas</option>
                  <option value="guntha">Gunthas</option>
                  <option value="sqm">Square Meters</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mb-4">Convert</button>

            <div className="conversion-result-box">
              <span className="result-label">Calculated Equivalent</span>
              <h2 className="result-val">{convertedValue} {toUnit}</h2>
            </div>
          </form>
        </div>

        {/* Right Side: Grid layout simulator */}
        <div className="land-col">
          <div className="card layout-grid-card">
            <h3 className="card-title"><Columns size={20} className="text-green" /> Plant Grid Sowing Simulator</h3>
            <p className="db-card-subtitle text-muted mb-4">Model the sowing density and spatial layout of your plots</p>

            <div className="form-group-row mb-4">
              <div className="form-group flex-1">
                <label className="form-label">Plot Width (meters)</label>
                <input 
                  type="number" 
                  min="2" 
                  max="50" 
                  className="input" 
                  value={widthMeters}
                  onChange={(e) => setWidthMeters(parseInt(e.target.value) || 2)}
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Plot Length (meters)</label>
                <input 
                  type="number" 
                  min="2" 
                  max="50" 
                  className="input" 
                  value={lengthMeters}
                  onChange={(e) => setLengthMeters(parseInt(e.target.value) || 2)}
                />
              </div>
            </div>

            <div className="form-group-row mb-6">
              <div className="form-group flex-1">
                <label className="form-label">Row Spacing (cm)</label>
                <input 
                  type="number" 
                  min="10" 
                  max="200" 
                  className="input" 
                  value={rowSpacingCm}
                  onChange={(e) => setRowSpacingCm(parseInt(e.target.value) || 10)}
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Plant Spacing (cm)</label>
                <input 
                  type="number" 
                  min="10" 
                  max="200" 
                  className="input" 
                  value={plantSpacingCm}
                  onChange={(e) => setPlantSpacingCm(parseInt(e.target.value) || 10)}
                />
              </div>
            </div>

            {/* Calculations Box */}
            <div className="density-summary-box mb-6">
              <div className="d-flex justify-between mb-2">
                <span className="summary-label">Total Sowing Rows:</span>
                <span className="summary-val">{totalRows} rows</span>
              </div>
              <div className="d-flex justify-between mb-2">
                <span className="summary-label">Plants per Row Line:</span>
                <span className="summary-val">{plantsPerRow} seeds</span>
              </div>
              <div className="d-flex justify-between layout-total-line pt-2">
                <span className="summary-label"><strong>Total Plant Population:</strong></span>
                <span className="summary-val text-green"><strong>{totalPlants.toLocaleString()} plants</strong></span>
              </div>
            </div>

            {/* Visual Grid Simulator Representation */}
            <div className="grid-visualizer-container">
              <span className="visualizer-label text-muted">Simulated Grid Alignment</span>
              <div className="visualizer-rows-grid">
                {Array.from({ length: Math.min(totalRows, 8) }).map((_, rIdx) => (
                  <div className="visualizer-row-line" key={rIdx}>
                    {Array.from({ length: Math.min(plantsPerRow, 15) }).map((_, pIdx) => (
                      <span className="plant-dot-node" key={pIdx} title={`Row ${rIdx + 1}, Plant ${pIdx + 1}`}></span>
                    ))}
                    {plantsPerRow > 15 && <span className="plant-dot-ellipsis">...</span>}
                  </div>
                ))}
                {totalRows > 8 && (
                  <div className="visualizer-rows-ellipsis text-muted">
                    + {totalRows - 8} more rows...
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LandCalculator;
