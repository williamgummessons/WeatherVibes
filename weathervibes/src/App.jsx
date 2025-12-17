import "./App.css";
import { useEffect } from "react";
import Auth from "./components/auth.jsx";
import Weather from "./components/weather.jsx";
import SpotifyApp from "./components/spotify/spotifyApp.jsx";

function App() {
    const {
        isLoading,
        isAuthenticated,
        error,
        login,
        signup,
        logout,
        user,
    } = Auth();
    
    // Handle return from Spotify authentication
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('spotify') === 'true' && !isLoading) {
            // Store the Spotify token from URL hash
            const hashParams = window.location.hash.substring(1)
                .split('&')
                .reduce((initial, item) => {
                    let parts = item.split('=');
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                    return initial;
                }, {});
            
            if (hashParams.access_token) {
                sessionStorage.setItem('spotify_token', hashParams.access_token);
                if (hashParams.refresh_token) {
                    sessionStorage.setItem('spotify_refresh_token', hashParams.refresh_token);
                }
            }
            
            // Clear the hash and spotify parameter from URL
            window.location.hash = '';
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({path: newUrl}, '', newUrl);
            
            // Only trigger login if user is not authenticated
            if (!isAuthenticated) {
                // User is returning from Spotify auth but not logged into main app
                // Auto-login to main app so they can see the Spotify component
                login();
            }
            // If user is already authenticated, the SpotifyApp component will handle the stored token
        }
    }, [isAuthenticated, isLoading, login]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            {!isAuthenticated && (
                <>
                    {error && <p>Error: {error.message}</p>}
                    <h1>WeatherVibes</h1>
                    <button onClick={login}>Logga in</button>
                </>
            )}

            {isAuthenticated && (
                <>
                    <h1>Inloggad som användare</h1>
                    <img
                        src={user.picture}
                        alt={user.name}
                        style={{ borderRadius: "50%", width: 80 }}
                    />
                    <p>Namn: {user.name}</p>
                    <p>Email: {user.email}</p>

                    <button onClick={logout}>Logga ut</button>
                                     
                    <Weather />
                    <SpotifyApp />

                </>
            )}
        </div>
    );
}

export default App;
