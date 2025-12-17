import '../../App.css';
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import LoginButton from './loginButton';
import SearchForm from './searchForm';
import PlaylistList from './playlistList';
import EmbedPlayer from './embedPlayer';

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
}

function SpotifyApp() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [embedUrl, setEmbedUrl] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    console.log("Från URL: ", getTokenFromUrl());
    let spotifyToken = getTokenFromUrl().access_token;
    
    // If no token in URL, check sessionStorage (for tokens stored before Auth0 redirect)
    if (!spotifyToken) {
      spotifyToken = sessionStorage.getItem('spotify_token');
    }
    
    window.location.hash = "";
    console.log("Spotify Token: ", spotifyToken);

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe().then((user) => {
        console.log("User info: ", user);
      }).catch((error) => {
        console.error("Error getting user info:", error);
        // Token might be expired, clear it
        sessionStorage.removeItem('spotify_token');
        sessionStorage.removeItem('spotify_refresh_token');
        setLoggedIn(false);
        return;
      });
      setLoggedIn(true);
      console.log("User logged in");
      
      // Clear the stored token since we've successfully used it
      sessionStorage.removeItem('spotify_token');
      sessionStorage.removeItem('spotify_refresh_token');
    }
  },[]);

  const searchPlaylists = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    spotifyApi.searchPlaylists(searchQuery).then((response) => {
      console.log("Search results: ", response);
      setSearchResults(response.playlists.items.slice(0, 3));
    }).catch((err) => {
      console.error("Search error: ", err);
    });
  }

  const playPlaylist = (playlist) => {
    console.log("Playing playlist:", playlist);
    const playlistUri = playlist?.uri;
    console.log("Playlist URI:", playlistUri);
    const playlistId = playlistUri?.split(":")?.pop();
    console.log("Playlist ID:", playlistId);

    if (!playlistId) {
      alert("Kan ej starta playlist(troligen saknas ID)");
      return;
    }

    const url = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
    console.log("Embeddad URL:", url);
    setEmbedUrl(url);
  }

  return (
    <div className="App">
      {!loggedIn && <LoginButton />}
      {loggedIn && (
        <div>
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
        </div>
      )}
    </div>
  );
}

export default SpotifyApp;
