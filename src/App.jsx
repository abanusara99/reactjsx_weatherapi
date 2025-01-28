import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Fetch API key from environment variable

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Could not fetch weather data. Please check the location name.");
      setWeatherData(null);
    }
  };

  const getBackgroundColor = () => {
    if (!weatherData) return "bg-gray-200";

    const weather = weatherData.weather[0].main.toLowerCase();
    if (weather.includes("clear")) return "bg-blue-400";
    if (weather.includes("clouds")) return "bg-gray-400";
    if (weather.includes("rain")) return "bg-blue-700";
    if (weather.includes("snow")) return "bg-white";
    return "bg-gray-200";
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${getBackgroundColor()} transition-all duration-500`}>
      <h1 className="text-3xl font-bold mb-6">Weather App</h1>
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Enter location"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
       <br /><br />
        <button
          onClick={fetchWeatherData}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Check Weather
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weatherData && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg text-center w-80">
          <h2 className="text-2xl font-bold mb-2">{weatherData.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className="mx-auto"
          />
          <p className="text-lg font-medium">
            {weatherData.weather[0].description}
          </p>
          <p className="text-lg mt-2">Temperature: {weatherData.main.temp}°C</p>
          <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
