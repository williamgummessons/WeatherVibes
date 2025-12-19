import "../../App.css";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import SearchForm from "./searchForm";
import PlaylistList from "./playlistList";
import EmbedPlayer from "./embedPlayer";
import LoginButton from "./loginButton";

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

  const searchPlaylists = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await spotifyApi.searchPlaylists(searchQuery);
      setSearchResults(response.playlists.items.slice(0, 3));
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
      {/* Ej Spotify-auktoriserad */}
      {!loggedIn && (
        <>
          <p>För att använda Spotify-funktioner behöver du ge Spotify-åtkomst.</p>
          <LoginButton />
        </>
      )}

      {/* Spotify-auktoriserad */}
      {loggedIn && (
        <>
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={searchPlaylists}
          />

          {!embedUrl && (
            <PlaylistList
              playlists={searchResults}
              onPlayPlaylist={playPlaylist}
            />
          )}

          <EmbedPlayer embedUrl={embedUrl} />
        </>
      )}
    </div>
  );
}

export default SpotifyApp;
