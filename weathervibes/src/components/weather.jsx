import { useState } from "react";
import axios from "axios";

let weatherMain = "";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da82f83c23d06aa3757738aa9d02b2e5&units=metric`
      );
      setWeather(res.data);
      const main = res.data?.weather?.[0]?.main || "";
      weatherMain = main;
      try {
        sessionStorage.setItem("weatherMain", main);
      } catch (e) {}
      try {
        window.dispatchEvent(new CustomEvent("weatherUpdated", { detail: main }));
      } catch (e) {}
    } catch (err) {
      console.error("Fel vid hämtning av väder:", err);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        {/* Visa sökrutan bara om inget väder är hämtat än */}
        {!weather && (
          <div>
            <h5 className="card-title">Väder</h5>
            <form onSubmit={(e) => { e.preventDefault(); getWeather(); }} className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Skriv stad..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">Sök väder</button>
              </div>
            </form>
          </div>
        )}

        {/* Visa väderresultatet och en knapp för att ändra/återställa sökning */}
        {weather && (
          <div>
            <h5 className="card-title">{weather.name}</h5>
            <p className="card-text">Temperatur: {weather.main.temp} °C</p>
            <p className="card-text">Väder: {weather.weather[0].main}</p>
            <button
              onClick={() => {
                setWeather(null);
                setCity("");
                try {
                  sessionStorage.removeItem("weatherMain");
                } catch (e) {}
                try {
                  window.dispatchEvent(new CustomEvent("weatherUpdated", { detail: null }));
                } catch (e) {}
              }}
              className="btn btn-primary mt-2"
            >
              Ändra stad
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function getWeatherMain() {
  try {
    return sessionStorage.getItem("weatherMain") || weatherMain || "";
  } catch (e) {
    return weatherMain || "";
  }
}

export default Weather;
