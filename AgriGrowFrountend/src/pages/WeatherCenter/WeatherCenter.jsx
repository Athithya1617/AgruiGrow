import { useState, useContext, useEffect } from 'react';
import { getWeatherData, fetchLiveWeatherData, searchLocations } from '../../services/weatherService';
import { AuthContext } from '../../context/AuthContext';
import { 
  Thermometer, Search, 
  MapPin, AlertTriangle, CloudRain 
} from 'lucide-react';
import './WeatherCenter.css';

const WeatherCenter = () => {
  const { user } = useContext(AuthContext);
  const [locationQuery, setLocationQuery] = useState(user?.location || 'Punjab, India');
  const [searchResults, setSearchResults] = useState([]);
  const [weather, setWeather] = useState(() => getWeatherData(locationQuery));

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const liveData = await fetchLiveWeatherData(locationQuery);
        setWeather(liveData);
      } catch (error) {
        console.error("Failed to load live weather for WeatherCenter:", error);
      }
    };
    loadWeather();
  }, [locationQuery]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchResults(searchLocations(query));
  };

  const handleSelectLocation = (loc) => {
    setLocationQuery(loc);
    setSearchResults([]);
  };

  if (!weather) return null;

  const { current, forecast } = weather;

  return (
    <div className="container main-content weather-center-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><Thermometer size={32} /> Agricultural Weather Center</h1>
        <p className="page-subtitle">Search local regions to pull real-time ground indicators: soil temperature, moisture levels, UV rays exposure, and advisories.</p>
      </header>

      {/* Location Search card */}
      <section className="card location-search-card mb-6">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Type district, state, or region name..." 
            className="input search-input"
            defaultValue={locationQuery}
            onChange={handleSearchChange}
          />
        </div>
        {searchResults.length > 0 && (
          <div className="search-dropdown-menu">
            {searchResults.map((loc, idx) => (
              <div 
                key={idx} 
                className="search-dropdown-item"
                onClick={() => handleSelectLocation(loc)}
              >
                <MapPin size={14} className="inline-icon text-muted" />
                <span>{loc}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="weather-layout-grid mb-6">
        {/* Left Column: Big Current Weather */}
        <div className="weather-col">
          <div className="card weather-hero-card">
            <div className="hero-header justify-between d-flex mb-4">
              <div>
                <h2 className="hero-loc">{locationQuery}</h2>
                <span className="hero-date">Live Microclimatic Feed</span>
              </div>
              <span className="badge badge-success">Active Feed</span>
            </div>

            <div className="hero-body d-flex align-items-center mb-6">
              <h1 className="hero-temp">{current.temp}°C</h1>
              <div className="hero-condition-box">
                <span className="badge badge-info mb-2">{current.condition}</span>
                <span className="sky-desc">Pressure: {current.pressure}</span>
              </div>
            </div>

            {/* Ground metrics subgrid */}
            <div className="grid-3 metrics-subgrid">
              <div className="metric-box">
                <span className="metric-icon">🌱</span>
                <span className="metric-label">Soil Temperature</span>
                <span className="metric-val">{current.soilTemp}°C</span>
              </div>
              <div className="metric-box">
                <span className="metric-icon">💧</span>
                <span className="metric-label">Soil Moisture</span>
                <span className="metric-val">{current.soilMoisture}</span>
              </div>
              <div className="metric-box">
                <span className="metric-icon">☀️</span>
                <span className="metric-label">UV Index</span>
                <span className="metric-val">{current.uvIndex} (High)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Agronomist warning advisories and 5-Day Forecast */}
        <div className="weather-col">
          {/* Warnings advisory box */}
          <div className="card weather-advisory-card mb-6">
            <h3 className="card-title text-orange">
              <AlertTriangle size={20} /> Field Advisories Warning
            </h3>
            <p className="advisory-desc mb-4">Action plan calculated from temperature thresholds and moisture logs:</p>
            <div className="advisory-action-box">
              <p className="action-text"><strong>{current.advisory}</strong></p>
            </div>
          </div>

          {/* 5-Day Forecast Card */}
          <div className="card forecast-card">
            <h3 className="card-title">
              <CloudRain size={20} className="text-green" /> 5-Day Local Outlook
            </h3>
            <div className="forecast-rows-list">
              {forecast.map((day, idx) => (
                <div className="forecast-row-item d-flex justify-between align-items-center" key={idx}>
                  <span className="forecast-day font-semibold">{day.day}</span>
                  <div className="forecast-condition-grp d-flex align-items-center gap-2">
                    <span className="forecast-emoji">{day.condition === 'Sunny' ? '☀️' : day.condition === 'Cloudy' ? '☁️' : '🌧️'}</span>
                    <span className="forecast-cond-text text-muted">{day.condition}</span>
                  </div>
                  <div className="forecast-temp-grp">
                    <span className="forecast-temp-val"><strong>{day.temp}°C</strong></span>
                    <span className="forecast-rain-chance text-muted text-xs ml-2">{day.rainChance}% rain</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherCenter;
