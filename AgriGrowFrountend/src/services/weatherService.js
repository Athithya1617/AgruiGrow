// Weather Service providing simulated and live agricultural weather data

export const getWeatherData = (location = "Punjab, India") => {
  // Generate consistent pseudo-random metrics based on location name
  const isPunjab = location.toLowerCase().includes("punjab");
  
  const currentTemp = isPunjab ? 32 : 28;
  const humidity = isPunjab ? 65 : 78;
  const soilMoisture = isPunjab ? "42%" : "55%";
  const uvIndex = isPunjab ? 8 : 6;
  const windSpeed = isPunjab ? 12 : 18; // km/h
  const rainChance = isPunjab ? 15 : 60; // %
  const condition = rainChance > 50 ? "Rainy" : rainChance > 25 ? "Cloudy" : "Sunny";

  const getAdvisory = (cond, temp, hum, moist) => {
    if (cond === "Rainy") {
      return "Rainfall detected or expected. Postpone fertilizer applications and pesticide sprays. Check fields for proper drainage.";
    }
    if (temp > 35) {
      return "Extremely high temperature. Increase irrigation frequency for leafy greens and vegetables. Apply crop mulch.";
    }
    if (parseFloat(moist) < 30) {
      return "Soil moisture level is critically low. Schedule a deep drip irrigation session immediately.";
    }
    return "Weather is optimal. Perfect conditions for sowing seeds, applying organic pesticides, and weeding.";
  };

  const advisory = getAdvisory(condition, currentTemp, humidity, soilMoisture);

  const forecast = [
    { day: "Today", temp: currentTemp, condition: condition, rainChance: rainChance },
    { day: "Tomorrow", temp: currentTemp - 2, condition: "Cloudy", rainChance: 30 },
    { day: "Saturday", temp: currentTemp - 4, condition: "Rainy", rainChance: 85 },
    { day: "Sunday", temp: currentTemp - 1, condition: "Sunny", rainChance: 10 },
    { day: "Monday", temp: currentTemp + 1, condition: "Sunny", rainChance: 5 }
  ];

  return {
    location,
    current: {
      temp: currentTemp,
      condition,
      humidity,
      soilMoisture,
      uvIndex,
      windSpeed,
      rainChance,
      soilTemp: currentTemp - 4,
      pressure: "1012 hPa",
      advisory
    },
    forecast
  };
};

export const fetchLiveWeatherData = async (location = "Punjab, India") => {
  try {
    // 1. Geocode location name to coordinates using Open-Meteo Geocoding API
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) throw new Error("Geocoding failed");
    const geoData = await geoResponse.json();
    
    let lat = 11.1368;
    let lon = 79.4048; // default Tamil Nadu coords
    let resolvedName = location;

    if (geoData.results && geoData.results.length > 0) {
      lat = geoData.results[0].latitude;
      lon = geoData.results[0].longitude;
      resolvedName = `${geoData.results[0].name}, ${geoData.results[0].admin1 || geoData.results[0].country}`;
    }

    // 2. Fetch weather details from Open-Meteo Forecast API
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,soil_temperature_0_to_7cm,soil_moisture_0_to_1cm&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("Weather fetch failed");
    const data = await response.json();

    const currentData = data.current;
    const dailyData = data.daily;

    const wmoCodeToCondition = (code) => {
      if (code === 0) return "Sunny";
      if ([1, 2, 3].includes(code)) return "Cloudy";
      if ([45, 48].includes(code)) return "Foggy";
      if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "Rainy";
      if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
      if ([95, 96, 99].includes(code)) return "Stormy";
      return "Sunny";
    };

    const condition = wmoCodeToCondition(currentData.weather_code);
    const currentTemp = Math.round(currentData.temperature_2m);
    const humidity = currentData.relative_humidity_2m;
    const soilMoistureVal = Math.round(currentData.soil_moisture_0_to_1cm * 100);
    const soilMoisture = `${soilMoistureVal}%`;
    const soilTemp = Math.round(currentData.soil_temperature_0_to_7cm);
    const windSpeed = Math.round(currentData.wind_speed_10m);
    const rainChance = dailyData.precipitation_probability_max[0] || 0;

    const getAdvisory = (cond, temp, hum, moist) => {
      if (cond === "Rainy" || cond === "Stormy") {
        return "Rainfall detected or expected. Postpone fertilizer applications and pesticide sprays. Check fields for proper drainage.";
      }
      if (temp > 35) {
        return "Extremely high temperature. Increase irrigation frequency for leafy greens and vegetables. Apply crop mulch.";
      }
      if (moist < 30) {
        return "Soil moisture level is critically low. Schedule a deep drip irrigation session immediately.";
      }
      return "Weather is optimal. Perfect conditions for sowing seeds, applying organic pesticides, and weeding.";
    };

    const advisory = getAdvisory(condition, currentTemp, humidity, soilMoistureVal);

    const forecast = [];
    const daysOfWeek = ["Today", "Tomorrow", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
    
    for (let i = 0; i < 5; i++) {
      forecast.push({
        day: daysOfWeek[i],
        temp: Math.round((dailyData.temperature_2m_max[i] + dailyData.temperature_2m_min[i]) / 2),
        condition: wmoCodeToCondition(dailyData.weather_code[i]),
        rainChance: dailyData.precipitation_probability_max[i] || 0
      });
    }

    return {
      location: resolvedName,
      current: {
        temp: currentTemp,
        condition,
        humidity,
        soilMoisture,
        uvIndex: currentTemp > 30 ? 8 : 4,
        windSpeed,
        rainChance,
        soilTemp,
        pressure: "1012 hPa",
        advisory
      },
      forecast
    };

  } catch (error) {
    console.error("Live weather fetch failed, falling back to simulation:", error);
    return getWeatherData(location);
  }
};

export const searchLocations = (query) => {
  const defaults = [
    "4CP3+PWG, Unnamed Rd, Udayanatham West, Cholamadevi, Tamil Nadu 612902",
    "Punjab, India", 
    "Haryana, India", 
    "Uttar Pradesh, India", 
    "Maharashtra, India", 
    "Karnataka, India", 
    "California, USA"
  ];
  if (!query) return defaults;
  return defaults.filter(l => l.toLowerCase().includes(query.toLowerCase()));
};
