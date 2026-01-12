import "../../App.css";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

// SearchForm intentionally not used — weather-driven search only
import PlaylistList from "./playlistList";
import EmbedPlayer from "./embedPlayer";
import LoginButton from "./loginButton";
import { getWeatherMain } from "../weather";

const spotifyApi = new SpotifyWebApi();

// Hjälpfunktion: läs token från URL-hash
const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

function SpotifyApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [embedUrl, setEmbedUrl] = useState("");
  const [weatherMainValue, setWeatherMainValue] = useState(getWeatherMain());

  // Körs vid mount – hanterar Spotify OAuth-resultat
  useEffect(() => {
    const hash = getTokenFromUrl();

    // 1️⃣ Token från redirect (första gången)
    if (hash.access_token) {
      sessionStorage.setItem("spotify_token", hash.access_token);
      spotifyApi.setAccessToken(hash.access_token);
      setLoggedIn(true);

      // Rensa URL (viktigt!)
      window.location.hash = "";
      return;
    }

    // 2️⃣ Token från sessionStorage (vid refresh)
    const storedToken = sessionStorage.getItem("spotify_token");
    if (storedToken) {
      spotifyApi.setAccessToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handler = (e) => setWeatherMainValue(e?.detail || getWeatherMain());
    window.addEventListener("weatherUpdated", handler);
    return () => window.removeEventListener("weatherUpdated", handler);
  }, []);

  const searchPlaylists = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const q = (searchQuery || "").trim();
    if (!q) return;
    try {
      const response = await spotifyApi.searchPlaylists(q);
      setSearchResults(response.playlists.items.slice(0, 3));
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const searchPlaylistsForWeather = async () => {
    const q = (weatherMainValue ? `${weatherMainValue} weather` : "").trim();
    if (!q) return;
    try {
      const response = await spotifyApi.searchPlaylists(q);
      setSearchResults(response.playlists.items.slice(0, 3));
      setSearchQuery(q);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const playPlaylist = (playlist) => {
    const playlistId = playlist?.uri?.split(":").pop();
    if (!playlistId) return;

    setEmbedUrl(
      `https://open.spotify.com/embed/playlist/${playlistId}`
    );
  };

  return (
    <div className="App">
      {!loggedIn && (
        <>
          <p>För att använda Spotify-funktioner behöver du ge Spotify-åtkomst.</p>
          <LoginButton />
        </>
      )}

      {loggedIn && (
        <>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={searchPlaylistsForWeather}>
              Sök spellistor för väder: {weatherMainValue ? `${weatherMainValue} weather` : "(ingen sökning)"}
            </button>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <PlaylistList playlists={searchResults} onPlayPlaylist={playPlaylist} />
            </div>
            <div className="col-md-8">
              <EmbedPlayer embedUrl={embedUrl} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SpotifyApp;
