import { useState } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import './AgriculturalCalendar.css';

const AgriculturalCalendar = () => {
  const [activeMonth, setActiveMonth] = useState('June');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Static planner database by month
  const calendarTasks = {
    January: [
      { crop: 'Wheat', type: 'Irrigation & Fertilization', desc: 'Schedule 3rd irrigation. Apply top-dressed nitrogen (urea) after watering.', icon: '🌾' },
      { crop: 'Potato', type: 'Harvesting', desc: 'Dig out early potato varieties. Cure tubers in shade for 7 days before bagging.', icon: '🥔' }
    ],
    February: [
      { crop: 'Wheat', type: 'Pest Monitoring', desc: 'Watch for Yellow Rust pustules. Spray organic bio-pesticide if streaks appear.', icon: '🌾' },
      { crop: 'Tomato', type: 'Nursery Sowing', desc: 'Sow early tomato seeds in covered nursery beds or plastic trays.', icon: '🍅' }
    ],
    March: [
      { crop: 'Wheat', type: 'Maturation', desc: 'Stop watering 15 days before harvest to allow standard grain drying.', icon: '🌾' },
      { crop: 'Tomato', type: 'Transplantation', desc: 'Transplant 4-week-old tomato seedlings to fields with 60cm row spacing.', icon: '🍅' }
    ],
    April: [
      { crop: 'Wheat', type: 'Harvesting', desc: 'Harvest wheat spikes on sunny days. Thresh and store grains at <12% moisture.', icon: '🌾' },
      { crop: 'Cotton', type: 'Land Prep', desc: 'Deep plow cotton plots. Mix in compost manure to build clay nutrient foundations.', icon: '☁️' }
    ],
    May: [
      { crop: 'Rice', type: 'Nursery Prep', desc: 'Sow paddy seeds in raised seedbeds. Flood nursery beds to 2cm depth.', icon: '🌾' },
      { crop: 'Cotton', type: 'Sowing', desc: 'Sow BT Cotton seeds in well-moistened grids with 90cm row spacings.', icon: '☁️' }
    ],
    June: [
      { crop: 'Rice', type: 'Transplantation', desc: 'Transplant 25-day-old paddy seedlings to puddled clayey fields.', icon: '🌾' },
      { crop: 'Corn', type: 'Sowing', desc: 'Sow maize seeds after the first monsoon rains. Keep seed depth at 5cm.', icon: '🌽' },
      { crop: 'Tomato', type: 'Staking', desc: 'Stake tomato plants with bamboo poles to keep maturing vines off the soil.', icon: '🍅' }
    ],
    July: [
      { crop: 'Rice', type: 'Weeding', desc: 'Perform first manual weeding 20 days after transplantation. Keep water at 5cm.', icon: '🌾' },
      { crop: 'Corn', type: 'Fertilization', desc: 'Side-dress maize plants with urea during active vegetative jointing stage.', icon: '🌽' }
    ],
    August: [
      { crop: 'Rice', type: 'Tillering', desc: 'Maintain standing water. Check for Rice Blast leaf spots on younger tillers.', icon: '🌾' },
      { crop: 'Cotton', type: 'Squaring', desc: 'Inspect square leaves for bollworm larvae. Use organic neem sprays.', icon: '☁️' }
    ],
    September: [
      { crop: 'Rice', type: 'Panicle stage', desc: 'Ensure consistent irrigation during flowering and panicle initiation phases.', icon: '🌾' },
      { crop: 'Corn', type: 'Harvesting', desc: 'Harvest corn when husk leaves turn brown. Dry cobs before grain shelling.', icon: '🌽' }
    ],
    October: [
      { crop: 'Wheat', type: 'Land Prep', desc: 'Plow harvested maize plots. Mix in superphosphate before sowing wheat.', icon: '🌾' },
      { crop: 'Potato', type: 'Sowing', desc: 'Sow sprouted potato seed tubers in ridges. Cover with 4 inches soil.', icon: '🥔' }
    ],
    November: [
      { crop: 'Wheat', type: 'Sowing', desc: 'Sow wheat seeds in rows. Irrigate fields immediately after finishing.', icon: '🌾' },
      { crop: 'Rice', type: 'Harvesting', desc: 'Drain paddy fields 10 days before harvest. Cut stalks when grains turn gold.', icon: '🌾' }
    ],
    December: [
      { crop: 'Wheat', type: 'Irrigation', desc: 'Schedule 1st irrigation at Crown Root Initiation (CRI) stage (21 days post sowing).', icon: '🌾' },
      { crop: 'Onion', type: 'Transplantation', desc: 'Transplant onion seedlings into flat beds. Keep spacing at 15cm.', icon: '🧅' }
    ]
  };

  const activeTasks = calendarTasks[activeMonth] || [];

  return (
    <div className="container main-content calendar-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Calendar size={32} /> Agricultural Calendar</h1>
        <p className="page-subtitle">A seasonal cropping schedule mapping sowing, fertilizer side-dressing, weeding, and harvests by month.</p>
      </header>

      {/* Horizontal Month Scroll tabs */}
      <section className="card months-bar-card mb-6">
        <div className="months-scrollbar">
          {months.map((m) => (
            <button 
              key={m} 
              className={`month-tab-btn ${activeMonth === m ? 'active' : ''}`}
              onClick={() => setActiveMonth(m)}
            >
              {m.substring(0, 3)}
            </button>
          ))}
        </div>
      </section>

      {/* Tasks listing for the active month */}
      <section className="calendar-tasks-section">
        <div className="section-meta-header mb-4 d-flex align-items-center gap-2">
          <Sparkles className="text-green" size={20} />
          <h2 className="selected-month-title">{activeMonth} Cropping Timeline</h2>
        </div>

        <div className="calendar-tasks-grid">
          {activeTasks.map((task, idx) => (
            <div className="card task-item-card" key={idx}>
              <div className="task-item-header justify-between d-flex mb-4">
                <div className="d-flex align-items-center gap-2">
                  <span className="task-crop-avatar">{task.icon}</span>
                  <div>
                    <h3 className="task-crop-name">{task.crop}</h3>
                    <span className="badge badge-info">{task.type}</span>
                  </div>
                </div>
                <span className="badge badge-success">Target</span>
              </div>
              <p className="task-desc-text">{task.desc}</p>
            </div>
          ))}

          {activeTasks.length === 0 && (
            <div className="card text-center py-6 w-full">
              <p className="text-muted">No scheduled tasks logged for this month in standard databases.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AgriculturalCalendar;
