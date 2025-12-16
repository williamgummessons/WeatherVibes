import "./App.css";
import Auth from "./components/auth.jsx";
import Weather from "./components/weather.jsx";


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
                </>
            )}
        </div>
    );
}

export default App;
