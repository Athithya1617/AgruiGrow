import { useState, useEffect } from 'react';
import { BookOpenCheck, Trash2, Calendar, Clipboard, Filter, Plus } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import './FarmDiary.css';

const FarmDiary = () => {
  const [logs, setLogs] = useState([]);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('Sowing');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tagFilter, setTagFilter] = useState('All');

  // Load logs on mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await apiClient.get('/diary');
        setLogs(data);
      } catch (error) {
        console.error("Failed to load diary entries from backend database, using local storage backup: ", error);
        const saved = localStorage.getItem('agri_diary');
        if (saved) {
          try {
            setLogs(JSON.parse(saved));
          } catch {
            setLogs([
              { id: 1, title: 'Transplanted basmati seedlings', desc: 'Finished transplanting seedlings in the north field. Water levels maintained at 5cm.', tag: 'Sowing', date: '2026-06-12' },
              { id: 2, title: 'Applied neem oil formulation', desc: 'Sprayed organic neem oil on tomato vines to deter whiteflies. Observed slight leaf spot on potato plot.', tag: 'Maintenance', date: '2026-06-15' },
              { id: 3, title: 'Harvested early potatoes', desc: 'Dug up potato ridge rows. Harvested approx 120kg. Tubers curing in the barn.', tag: 'Harvest', date: '2026-06-17' }
            ]);
          }
        } else {
          setLogs([]);
        }
      }
    };
    fetchLogs();
  }, []);

  // Update backup cache
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem('agri_diary', JSON.stringify(logs));
    }
  }, [logs]);

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    const newLog = {
      title,
      desc,
      tag,
      date
    };

    try {
      const savedLog = await apiClient.post('/diary', newLog);
      setLogs(prev => [savedLog, ...prev]);
      setTitle('');
      setDesc('');
    } catch (error) {
      console.error("Failed to save diary entry to database: ", error);
      // Local fallback
      const localLog = { ...newLog, id: Date.now() };
      setLogs(prev => [localLog, ...prev]);
      setTitle('');
      setDesc('');
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      await apiClient.delete(`/diary/${id}`);
      setLogs(prev => prev.filter(log => log.id !== id));
    } catch (error) {
      console.error("Failed to delete diary entry from database: ", error);
      setLogs(prev => prev.filter(log => log.id !== id));
    }
  };

  const filteredLogs = logs.filter(log => tagFilter === 'All' || log.tag === tagFilter);


  const getTagBadgeColor = (t) => {
    switch (t) {
      case 'Sowing': return 'badge-info';
      case 'Harvest': return 'badge-success';
      case 'Maintenance': return 'badge-primary-custom';
      case 'Observation': return 'badge-warning';
      case 'Expense': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="container main-content diary-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><BookOpenCheck size={32} /> Farm Diary & Activity Log</h1>
        <p className="page-subtitle">Track day-to-day agricultural tasks, pesticide sprays, disease sightings, and harvest yields in a digital journal.</p>
      </header>

      <div className="diary-layout-grid">
        {/* Left Form: Add log */}
        <div className="diary-col">
          <form className="card add-log-card" onSubmit={handleAddLog}>
            <h3 className="card-title"><Plus size={18} className="text-green" /> Record Activity</h3>
            <p className="db-card-subtitle text-muted mb-4">Log a daily event, maintenance task, or observation</p>

            <div className="form-group mb-4">
              <label className="form-label">Activity Title</label>
              <input 
                type="text" 
                placeholder="e.g. Applied nitrogen fertilizer" 
                className="input" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group-row mb-4">
              <div className="form-group flex-1">
                <label className="form-label">Category / Tag</label>
                <select className="select" value={tag} onChange={(e) => setTag(e.target.value)}>
                  <option value="Sowing">Sowing / Planting</option>
                  <option value="Maintenance">Maintenance / Weeding</option>
                  <option value="Harvest">Harvesting</option>
                  <option value="Observation">Observation / Warning</option>
                  <option value="Expense">Expense / Purchase</option>
                </select>
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Log Date</label>
                <input 
                  type="date" 
                  className="input" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Activity Notes</label>
              <textarea 
                rows="4" 
                placeholder="Detail observations, quantities, weather conditions, or next steps..." 
                className="textarea"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">Save Entry to Diary</button>
          </form>
        </div>

        {/* Right List: Display logs */}
        <div className="diary-col">
          <div className="card list-logs-card">
            {/* Filter group */}
            <div className="list-logs-header mb-6 d-flex align-items-center justify-between flex-wrap gap-4">
              <div className="d-flex align-items-center gap-2">
                <Filter size={16} className="text-green" />
                <span className="font-semibold text-sm">Filter Category:</span>
              </div>
              <select 
                className="select filter-select-sm"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Sowing">Sowing / Planting</option>
                <option value="Maintenance">Maintenance / Weeding</option>
                <option value="Harvest">Harvesting</option>
                <option value="Observation">Observation / Warning</option>
                <option value="Expense">Expense / Purchase</option>
              </select>
            </div>

            {/* Scrollable logs column */}
            <div className="diary-logs-scroll-list">
              {filteredLogs.map((log) => (
                <div className="card diary-log-item-card mb-4" key={log.id}>
                  <div className="log-item-header justify-between d-flex mb-2">
                    <span className={`badge ${getTagBadgeColor(log.tag)}`}>{log.tag}</span>
                    <span className="log-date-text d-flex align-items-center gap-1 text-muted text-xs">
                      <Calendar size={12} /> {log.date}
                    </span>
                  </div>
                  <h4 className="log-title font-semibold">{log.title}</h4>
                  <p className="log-desc-notes text-sm text-muted mt-2">{log.desc}</p>
                  
                  <div className="log-actions mt-4 d-flex justify-end">
                    <button className="btn-icon btn-delete" onClick={() => handleDeleteLog(log.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {filteredLogs.length === 0 && (
                <div className="text-center py-6">
                  <Clipboard className="text-muted mb-2" size={32} />
                  <p className="text-muted">No diary logs match this filter.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDiary;
