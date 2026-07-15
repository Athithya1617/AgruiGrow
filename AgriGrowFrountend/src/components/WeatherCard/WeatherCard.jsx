import { Sun, Cloud, CloudRain, Wind, Droplet, Thermometer } from 'lucide-react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { location, current } = data;
  const { temp, condition, humidity, soilMoisture, windSpeed, rainChance, advisory } = current;

  const getWeatherIcon = (cond) => {
    switch (cond) {
      case 'Rainy':
        return <CloudRain className="weather-icon rain" size={48} />;
      case 'Cloudy':
        return <Cloud className="weather-icon clouds" size={48} />;
      case 'Sunny':
      default:
        return <Sun className="weather-icon sun" size={48} />;
    }
  };

  return (
    <div className="card weather-card">
      <div className="weather-header">
        <div>
          <h3 className="weather-loc">{location}</h3>
          <span className="weather-date">Live Meteorological Feed</span>
        </div>
        {getWeatherIcon(condition)}
      </div>

      <div className="weather-main">
        <h1 className="weather-temp">{temp}°C</h1>
        <div className="weather-condition-badge">
          <span>{condition}</span>
        </div>
      </div>

      <div className="weather-grid-details">
        <div className="weather-detail-item">
          <Droplet size={16} />
          <div>
            <span className="label">Humidity</span>
            <span className="val">{humidity}%</span>
          </div>
        </div>
        <div className="weather-detail-item">
          <Thermometer size={16} />
          <div>
            <span className="label">Soil Moist.</span>
            <span className="val">{soilMoisture}</span>
          </div>
        </div>
        <div className="weather-detail-item">
          <Wind size={16} />
          <div>
            <span className="label">Wind Speed</span>
            <span className="val">{windSpeed} km/h</span>
          </div>
        </div>
        <div className="weather-detail-item">
          <CloudRain size={16} />
          <div>
            <span className="label">Rain Prob.</span>
            <span className="val">{rainChance}%</span>
          </div>
        </div>
      </div>

      <div className="weather-advisory">
        <h4 className="advisory-title">Agronomist Advisory</h4>
        <p className="advisory-text">{advisory}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
