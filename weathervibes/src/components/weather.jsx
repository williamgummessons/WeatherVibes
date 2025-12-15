import { useState } from "react";
import axios from "axios";




function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da82f83c23d06aa3757738aa9d02b2e5&units=metric`
    );
    setWeather(res.data);
  } catch (err) {
    console.error("Fel vid hämtning av väder:", err);
  }
};

  return (
    <div>

  <div>
    <p>✅ Weather component is active</p>
    ...
  </div>

      <input
        type="text"
        placeholder="Skriv stad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Sök väder</button>

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatur: {weather.main.temp} °C</p>
          <p>Väder: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
