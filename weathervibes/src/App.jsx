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

  if (isLoading) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">WeatherVibes</h1>
        <div>
          {!isAuthenticated && (
            <button className="btn btn-primary" onClick={login}>
              Logga in
            </button>
          )}
          {isAuthenticated && (
            <div className="d-flex align-items-center gap-3">
              <img src={user.picture} alt={user.name} style={{ borderRadius: "50%", width: 48 }} />
              <div className="text-end">
                <div className="fw-bold">{user.name}</div>
                <div className="text-muted small">{user.email}</div>
              </div>
              <button className="btn btn-outline-secondary btn-sm ms-3" onClick={logout}>
                Logga ut
              </button>
            </div>
          )}
        </div>
      </header>

      {error && <div className="alert alert-danger">Error: {error.message}</div>}

      {isAuthenticated && (
        <>
          <div className="mb-4">
            <Weather />
          </div>

          <div className="mb-4">
            <h2 className="h5">Spotify</h2>
            <p className="text-muted">Sök och spela spellistor från Spotify.</p>
            <SpotifyApp />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
