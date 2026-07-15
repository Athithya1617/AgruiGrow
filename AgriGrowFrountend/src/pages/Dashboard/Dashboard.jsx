import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getWeatherData, fetchLiveWeatherData } from '../../services/weatherService';
import { apiClient } from '../../services/apiClient';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import { 
  Sprout, Calendar, DollarSign, 
  Plus, ClipboardList, MapPin 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [weather, setWeather] = useState(() => getWeatherData(user.location));
  
  const [diaryCount, setDiaryCount] = useState(0);
  const [financials, setFinancials] = useState({ expenses: 14500, revenue: 38200 });

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const liveData = await fetchLiveWeatherData(user.location);
        setWeather(liveData);
      } catch (error) {
        console.error("Failed to load live weather for dashboard:", error);
      }
    };
    loadWeather();
  }, [user.location]);

  useEffect(() => {
    const loadDashboardStats = async () => {
      // 1. Fetch diary count
      try {
        const diaryData = await apiClient.get('/diary');
        setDiaryCount(diaryData.length);
      } catch (error) {
        console.error("Failed to load diary count for dashboard from database: ", error);
        const diary = localStorage.getItem('agri_diary');
        if (diary) setDiaryCount(JSON.parse(diary).length);
      }

      // 2. Fetch financials
      try {
        const econData = await apiClient.get('/economics');
        const exp = econData.filter(item => item.type === 'expense').reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        const rev = econData.filter(item => item.type === 'revenue').reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        setFinancials({ expenses: exp, revenue: rev });
      } catch (error) {
        console.error("Failed to load financials for dashboard from database: ", error);
        const econ = localStorage.getItem('agri_economics');
        if (econ) {
          const parsed = JSON.parse(econ);
          const exp = parsed.filter(item => item.type === 'expense').reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
          const rev = parsed.filter(item => item.type === 'revenue').reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
          setFinancials({ expenses: exp || 14500, revenue: rev || 38200 });
        }
      }
    };
    loadDashboardStats();
  }, []);

  // Dynamic greeting based on current local hours
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning';
    if (hr < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Custom SVG Bar Chart calculation
  const maxVal = Math.max(financials.expenses, financials.revenue, 10000);
  const heightExp = maxVal > 0 ? (financials.expenses / maxVal) * 120 : 0;
  const heightRev = maxVal > 0 ? (financials.revenue / maxVal) * 120 : 0;

  return (
    <div className="container main-content dashboard-page animate-fade-in">
      {/* Header Profile Section */}
      <header className="dashboard-header mb-6">
        <div>
          <h1 className="db-title">{getGreeting()}, {user.name}!</h1>
          <p className="db-subtitle">
            <MapPin size={14} className="inline-icon text-green" /> Farm Hub: <strong>{user.location}</strong>
          </p>
        </div>
        <div className="db-header-actions">
          <Link to="/diary" className="btn btn-secondary">
            <Plus size={16} /> New Activity Log
          </Link>
          <Link to="/ai-assistant" className="btn btn-primary">
            Ask Advisor
          </Link>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <section className="grid-4 mb-6">
        <DashboardCard 
          title="Total Farm Area"
          value={`${user.farmSize} ${user.unit}`}
          subtext="Configured in profile"
          icon={Calendar}
          trend="neutral"
          color="green"
        />
        <DashboardCard 
          title="Active Crop Varieties"
          value={user.cropPreferences.length}
          subtext={user.cropPreferences.join(', ')}
          icon={Sprout}
          trend="up"
          trendValue="+1"
          color="blue"
        />
        <DashboardCard 
          title="Financial Balances"
          value={`₹${(financials.revenue - financials.expenses).toLocaleString()}`}
          subtext={`Rev: ₹${financials.revenue.toLocaleString()} | Exp: ₹${financials.expenses.toLocaleString()}`}
          icon={DollarSign}
          trend={financials.revenue > financials.expenses ? 'up' : 'down'}
          trendValue="Net Surplus"
          color="purple"
        />
        <DashboardCard 
          title="Active Diary Logs"
          value={diaryCount}
          subtext="Chronological logs stored"
          icon={ClipboardList}
          trend="neutral"
          color="orange"
        />
      </section>

      {/* Middle row: Weather Widget and Financial Chart */}
      <section className="dashboard-middle-row mb-6">
        {/* Weather Feed Widget */}
        <div className="db-weather-wrapper">
          <WeatherCard data={weather} />
        </div>

        {/* Custom SVG Budget Chart Card */}
        <div className="card db-chart-card">
          <div className="chart-header justify-between d-flex mb-4">
            <div>
              <h3 className="card-title"><DollarSign size={20} className="text-green" /> Seasonal Budget Ledger</h3>
              <p className="db-card-subtitle text-muted">Comparison of expenses vs earnings</p>
            </div>
            <Link to="/economics" className="btn btn-secondary btn-sm-padding">
              Manage Ledger
            </Link>
          </div>

          <div className="svg-chart-container">
            <svg viewBox="0 0 300 160" className="custom-bar-chart">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="280" y2="20" className="chart-grid-line" />
              <line x1="40" y1="60" x2="280" y2="60" className="chart-grid-line" />
              <line x1="40" y1="100" x2="280" y2="100" className="chart-grid-line" />
              <line x1="40" y1="140" x2="280" y2="140" className="chart-axis-line" />

              {/* Expense Bar */}
              <rect 
                x="85" 
                y={140 - heightExp} 
                width="35" 
                height={heightExp} 
                rx="4" 
                className="chart-bar-expense" 
              />
              <text x="102" y={130 - heightExp} textAnchor="middle" className="chart-bar-label">
                ₹{financials.expenses > 1000 ? `${(financials.expenses / 1000).toFixed(1)}k` : financials.expenses}
              </text>

              {/* Revenue Bar */}
              <rect 
                x="180" 
                y={140 - heightRev} 
                width="35" 
                height={heightRev} 
                rx="4" 
                className="chart-bar-revenue" 
              />
              <text x="197" y={130 - heightRev} textAnchor="middle" className="chart-bar-label">
                ₹{financials.revenue > 1000 ? `${(financials.revenue / 1000).toFixed(1)}k` : financials.revenue}
              </text>

              {/* X Axis Labels */}
              <text x="102" y="154" textAnchor="middle" className="chart-axis-text">Expenses</text>
              <text x="197" y="154" textAnchor="middle" className="chart-axis-text">Revenues</text>
            </svg>
          </div>

          <div className="chart-legend d-flex justify-center gap-4 mt-4">
            <div className="legend-item d-flex align-items-center gap-2">
              <span className="legend-color expense-color"></span>
              <span className="legend-text">Total Seasonal Costs</span>
            </div>
            <div className="legend-item d-flex align-items-center gap-2">
              <span className="legend-color revenue-color"></span>
              <span className="legend-text">Crop Sale Revenue</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Row: Recent Activities Quick Checklist */}
      <section className="card db-quick-tasks">
        <h3 className="card-title"><ClipboardList size={20} className="text-green" /> Smart Agri Checklist</h3>
        <p className="db-card-subtitle text-muted mb-4">Urgent tasks generated based on crops, calendar, and weather warnings</p>
        <div className="tasks-checkbox-list">
          <div className="task-checkbox-item">
            <input type="checkbox" id="task1" defaultChecked />
            <label htmlFor="task1">Check soil moisture status for wheat fields (Recommended due to warm weather forecast)</label>
          </div>
          <div className="task-checkbox-item">
            <input type="checkbox" id="task2" />
            <label htmlFor="task2">Apply organic neem spray on tomato nursery beds (Prevent early blight outbreaks)</label>
          </div>
          <div className="task-checkbox-item">
            <input type="checkbox" id="task3" />
            <label htmlFor="task3">Compute NPK fertilizer quantities using Fertilizer calculator for next sowing cycle</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
