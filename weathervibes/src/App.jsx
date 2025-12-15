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
                    <h1>Welcome!</h1>
                    <button onClick={login}>Login</button>
                </>
            )}

            {isAuthenticated && (
                <>
                    <h1>User Profile</h1>
                    <img
                        src={user.picture}
                        alt={user.name}
                        style={{ borderRadius: "50%", width: 80 }}
                    />
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>

                    <button onClick={logout}>Logout</button>
                                     
                    <Weather />
                </>
            )}
        </div>
    );
}

export default App;
