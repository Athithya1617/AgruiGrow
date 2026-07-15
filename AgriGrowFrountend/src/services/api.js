// General Simulated API services for AgriGrow

export const fetchMarketPrices = async () => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { crop: "Wheat", price: 2150, unit: "quintal", change: "+4.5%", trend: "up" },
    { crop: "Rice (Basmati)", price: 3800, unit: "quintal", change: "-1.2%", trend: "down" },
    { crop: "Corn", price: 1850, unit: "quintal", change: "+2.1%", trend: "up" },
    { crop: "Potato", price: 1200, unit: "quintal", change: "+8.3%", trend: "up" },
    { crop: "Tomato", price: 2400, unit: "quintal", change: "-12.4%", trend: "down" },
    { crop: "Cotton", price: 6200, unit: "quintal", change: "0.0%", trend: "flat" }
  ];
};

export const fetchNewsAlerts = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, title: "Monsoon arrival predicted 4 days early, advises IMD", date: "June 18, 2026", source: "Meteorology Dept" },
    { id: 2, title: "Subsidies announced on Solar-powered Water Pumps", date: "June 16, 2026", source: "Ministry of Agriculture" },
    { id: 3, title: "New organic certifications standard guidelines released", date: "June 12, 2026", source: "APEDA" }
  ];
};
