import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";
import "./App.css";

const API_KEY = "ae2425cf08c954450d181a8464415187";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setError(null);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found! Please try again.");
    }
  };

  const getWeatherIcon = (condition) => {
    if (condition.includes("clear")) return <WiDaySunny size={80} />;
    if (condition.includes("cloud")) return <WiCloud size={80} />;
    if (condition.includes("rain")) return <WiRain size={80} />;
    if (condition.includes("snow")) return <WiSnow size={80} />;
    return <WiFog size={80} />;
  };

  return (
    <div className="container">
      <div className="weather-box">
        <h1>Local Weather Report</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Fetch Weather Report</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <div className="weather-header">
              <h2>{weather.name}</h2>
              {getWeatherIcon(weather.weather[0].description)}
            </div>

            <div className="weather-summary">
              <p>
                🌡 {weather.main.temp}°C | ☁ {weather.weather[0].main} | 📖{" "}
                {weather.weather[0].description}
              </p>
            </div>
            {/* </div> */}
            {/* Temperature Details in Table */}
            <table className="weather-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Morning</td>
                  <td>{weather.main.temp_min}°C</td>
                </tr>
                <tr>
                  <td>Afternoon</td>
                  <td>{weather.main.temp}°C</td>
                </tr>
                <tr>
                  <td>Evening</td>
                  <td>{(weather.main.temp - 2).toFixed(1)}°C</td>
                </tr>
                <tr>
                  <td>Overnight</td>
                  <td>{(weather.main.temp - 3).toFixed(1)}°C</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
