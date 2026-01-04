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
    <div>
      {/* Visa sökrutan bara om inget väder är hämtat än */}
      {!weather && (
        <>
          <input
            type="text"
            placeholder="Skriv stad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Sök väder</button>
        </>
      )}

      {/* Visa väderresultatet och en knapp för att ändra/återställa sökning */}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatur: {weather.main.temp} °C</p>
          <p>Väder: {weather.weather[0].main}</p>
          <button
            onClick={() => {
              setWeather(null);
              setCity("");
              try {
                sessionStorage.removeItem("weatherMain");
              } catch (e) {}
              try {
                window.dispatchEvent(new CustomEvent("weatherUpdated", { detail: "" }));
              } catch (e) {}
            }}
            style={{ marginTop: 8 }}
          >
            Ändra stad
          </button>
        </div>
      )}
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
