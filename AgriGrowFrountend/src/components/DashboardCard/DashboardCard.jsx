import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './DashboardCard.css';

const DashboardCard = ({ title, value, subtext, icon: Icon, trend, trendValue, color = 'green' }) => {
  const getTrendIcon = (t) => {
    switch (t) {
      case 'up':
        return <span className="trend-badge trend-up"><TrendingUp size={12} /> {trendValue}</span>;
      case 'down':
        return <span className="trend-badge trend-down"><TrendingDown size={12} /> {trendValue}</span>;
      case 'neutral':
      default:
        return <span className="trend-badge trend-neutral"><Minus size={12} /> {trendValue || 'Stable'}</span>;
    }
  };

  return (
    <div className={`card dashboard-card card-color-${color}`}>
      <div className="db-card-body">
        <div className="db-card-content">
          <span className="db-card-title">{title}</span>
          <h2 className="db-card-value">{value}</h2>
          <div className="db-card-footer">
            {trend && getTrendIcon(trend)}
            <span className="db-card-subtext">{subtext}</span>
          </div>
        </div>
        {Icon && (
          <div className="db-card-icon-container">
            <Icon className="db-card-icon" size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
