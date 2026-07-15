import { useState } from 'react';
import { diseasesCatalog } from '../../services/cropService';
import { ShieldAlert, Image, Cpu, CheckCircle, HelpCircle } from 'lucide-react';
import './DiseaseManagement.css';

const DiseaseManagement = () => {
  const [selectedCase, setSelectedCase] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  // Pre-configured mock image cases the farmer can choose to simulate an analysis
  const mockCases = [
    { id: 'tomato_blight', label: 'Tomato leaf - Dark concentric circular rings', crop: 'Tomato', disease: 'Early Blight' },
    { id: 'wheat_rust', label: 'Wheat leaf - Dusty reddish-brown streaks', crop: 'Wheat', disease: 'Stem Rust' },
    { id: 'cotton_rot', label: 'Cotton boll - Water-soaked black lesions', crop: 'Cotton', disease: 'Boll Rot' },
    { id: 'rice_blast', label: 'Rice leaf - Spindle-shaped gray-center spots', crop: 'Rice', disease: 'Blast Disease' },
    { id: 'healthy_potato', label: 'Potato leaf - Clean vibrant green surface', crop: 'Potato', disease: 'Healthy (No infection)' }
  ];

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!selectedCase) return;

    setAnalyzing(true);
    setDiagnosis(null);

    // Simulate CNN model inference time
    setTimeout(() => {
      const activeCase = mockCases.find(c => c.id === selectedCase);
      
      if (activeCase.disease.includes('Healthy')) {
        setDiagnosis({
          healthy: true,
          crop: activeCase.crop,
          confidence: '98%',
          description: 'No symptoms of pathogens or leaf damage detected. Soil hydration and nitrogen levels appear balanced.'
        });
      } else {
        const detail = diseasesCatalog.find(d => d.name === activeCase.disease);
        setDiagnosis({
          healthy: false,
          name: detail.name,
          crop: detail.crop,
          pathogen: detail.pathogen,
          symptoms: detail.symptoms,
          treatment: detail.treatment,
          confidence: '94.2%',
          caseDesc: activeCase.label
        });
      }
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="container main-content disease-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><ShieldAlert size={32} /> Disease Diagnostic & Management</h1>
        <p className="page-subtitle">Simulate AI-driven crop foliage scanning to analyze blight, rust, and rot infections, and review treatments.</p>
      </header>

      <div className="disease-grid mb-6">
        {/* Left Scan Tool */}
        <div className="disease-col">
          <form className="card scan-card mb-6" onSubmit={handleAnalyze}>
            <h3 className="card-title"><Cpu size={18} className="text-green" /> Crop Scanner Simulator</h3>
            <p className="db-card-subtitle text-muted mb-4">Choose a simulated crop foliage sample case to run diagnostics:</p>

            <div className="form-group mb-6">
              <label className="form-label">Foliage Sample Case</label>
              <select 
                className="select" 
                value={selectedCase}
                onChange={(e) => setSelectedCase(e.target.value)}
                required
              >
                <option value="">-- Select sample leaf picture state --</option>
                {mockCases.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Dropzone Graphic */}
            <div className="dropzone-box mb-6">
              <Image size={32} className="text-muted mb-2" />
              <span className="dropzone-text font-semibold">
                {selectedCase ? "Foliage image pre-selected for diagnostic check" : "Browse leaf snapshot or drag & drop"}
              </span>
              <span className="dropzone-sub text-muted">Supports JPG, PNG formats up to 5MB</span>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={analyzing}>
              {analyzing ? 'Scanning Leaf Cell Structures...' : 'Diagnose Foliage Sample'}
            </button>
          </form>
        </div>

        {/* Right Diagnosis results */}
        <div className="disease-col">
          {analyzing && (
            <div className="card loading-diagnosis-card d-flex align-items-center justify-center text-center">
              <div>
                <div className="spinner mb-4 large-spinner"></div>
                <h3>Running Neural Diagnostics...</h3>
                <p className="text-muted">Comparing leaf lesions, pigmentation, and structures against disease database catalog.</p>
              </div>
            </div>
          )}

          {!analyzing && diagnosis && (
            <div className="card diagnosis-result-card animate-fade-in">
              <h3 className="card-title text-green"><CheckCircle size={20} /> Diagnostic Outcome</h3>
              <p className="db-card-subtitle text-muted mb-4">Neural model inference results (Confidence: <strong>{diagnosis.confidence}</strong>)</p>

              {diagnosis.healthy ? (
                <div className="healthy-result-box text-center py-6">
                  <span className="healthy-icon">🌿</span>
                  <h2 className="healthy-title text-green mt-4">Healthy Foliage</h2>
                  <p className="healthy-desc text-muted mt-2">{diagnosis.description}</p>
                </div>
              ) : (
                <div className="infected-result-box">
                  <div className="infected-header mb-4">
                    <span className="badge badge-danger">Infected</span>
                    <h2 className="infection-title text-orange mt-2">{diagnosis.name}</h2>
                    <span className="pathogen-type text-muted">Pathogen: <strong>{diagnosis.pathogen}</strong></span>
                  </div>

                  <div className="infection-section mb-4">
                    <h4 className="section-sub-title text-green">Observed Symptoms</h4>
                    <p className="section-text">{diagnosis.symptoms}</p>
                  </div>

                  <div className="infection-section">
                    <h4 className="section-sub-title text-green">Agronomic Treatment Plan</h4>
                    <p className="section-text">{diagnosis.treatment}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {!analyzing && !diagnosis && (
            <div className="card empty-diagnosis-card d-flex align-items-center justify-center text-center">
              <div>
                <HelpCircle size={48} className="text-muted mb-2" />
                <p className="text-muted">Select a leaf sample case and click Diagnose to view outcomes.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disease Catalog Directory */}
      <section className="card diseases-catalog-card">
        <h3 className="card-title mb-4"><ShieldAlert size={20} className="text-green" /> Common Agricultural Pathogens</h3>
        <div className="grid-2">
          {diseasesCatalog.map((disease, idx) => (
            <div className="catalog-disease-item card" key={idx}>
              <div className="item-head justify-between d-flex mb-2">
                <h4 className="item-name text-green">{disease.name}</h4>
                <span className="badge badge-warning">{disease.crop}</span>
              </div>
              <p className="item-pathogen text-xs text-muted mb-2">Organism: <strong>{disease.pathogen}</strong></p>
              <p className="item-text text-sm mb-2"><strong>Symptoms:</strong> {disease.symptoms}</p>
              <p className="item-text text-sm"><strong>Treatment:</strong> {disease.treatment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiseaseManagement;
