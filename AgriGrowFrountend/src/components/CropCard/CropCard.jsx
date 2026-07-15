import { useState } from 'react';
import { Calendar, Droplet, Sprout, ChevronRight } from 'lucide-react';
import './CropCard.css';

const CropCard = ({ crop, onSelect }) => {
  const [showStages, setShowStages] = useState(false);

  return (
    <div className="card crop-card">
      <div className="crop-card-header">
        <span className="crop-avatar" role="img" aria-label={crop.name}>{crop.image}</span>
        <div>
          <h3 className="crop-name">{crop.name}</h3>
          <span className="badge badge-success crop-badge">{crop.season}</span>
        </div>
      </div>

      <p className="crop-desc">{crop.description}</p>

      <div className="crop-card-details">
        <div className="crop-detail-row">
          <Calendar size={16} />
          <span>Duration: <strong>{crop.duration}</strong></span>
        </div>
        <div className="crop-detail-row">
          <Droplet size={16} />
          <span>Water: <strong>{crop.waterNeeds}</strong></span>
        </div>
        <div className="crop-detail-row">
          <Sprout size={16} />
          <span>NPK (kg/ha): <strong>{crop.fertilizerNPK.N}-{crop.fertilizerNPK.P}-{crop.fertilizerNPK.K}</strong></span>
        </div>
      </div>

      {showStages && (
        <div className="crop-stages-list animate-fade-in">
          <h4 className="stages-title">Cultivation Stages</h4>
          <ol className="stages-ol">
            {crop.stages.map((stage, i) => (
              <li key={i} className="stage-li">
                <span className="stage-num">{i + 1}</span>
                <span className="stage-text">{stage}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="crop-card-actions">
        <button 
          className="btn btn-secondary w-full"
          onClick={() => setShowStages(!showStages)}
        >
          {showStages ? 'Hide Stages' : 'Show Stages'}
        </button>
        {onSelect && (
          <button 
            className="btn btn-primary w-full"
            onClick={() => onSelect(crop)}
          >
            Detailed Guide <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CropCard;
