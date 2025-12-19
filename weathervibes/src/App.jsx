import "./App.css";
import Auth from "./components/auth.jsx";
import Weather from "./components/weather.jsx";
import SpotifyApp from "./components/spotify/spotifyApp.jsx";

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    user,
  } = Auth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      {/* ---------- EJ INLOGGAD ---------- */}
      {!isAuthenticated && (
        <>
          <h1>WeatherVibes</h1>

          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

          <button onClick={login}>Logga in</button>
        </>
      )}

      {/* ---------- INLOGGAD ---------- */}
      {isAuthenticated && (
        <>
          <h1>Välkommen</h1>

          <img
            src={user.picture}
            alt={user.name}
            style={{ borderRadius: "50%", width: 80 }}
          />

          <p><strong>Namn:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button onClick={logout}>Logga ut</button>

          <hr style={{ margin: "2rem 0" }} />

          {/* App-funktioner för inloggade användare */}
          <Weather />

          <hr style={{ margin: "2rem 0" }} />

          <section>
            <h2>Spotify</h2>
            <p>Sök och spela spellistor från Spotify.</p>

            <SpotifyApp />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
