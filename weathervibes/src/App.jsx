import { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/auth.jsx";
import Weather from "./components/weather.jsx";
import SpotifyApp from "./components/spotify/spotifyApp.jsx";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import WaitingRoom from './components/chatt/waitingroom';
import ChatRoom from './components/chatt/chatroom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    user,
  } = Auth();

  // Chat state management
  const [chatConnection, setChatConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const joinChatRoom = async (userName) => {
    try {
      const chatRoom = weatherData || "General";
      const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5177/chat")
                .configureLogging(LogLevel.Information)
                .build();
      
      conn.on("JoinSpecificChatRoom", (userName, msg) => {
          console.log(userName + "msg: " + msg);
          setMessages(messages => [...messages, { userName, msg }]);          
      });

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        setMessages(messages => [...messages, { userName, msg }]);        
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { userName, chatRoom });
      setChatConnection(conn);
    } catch(e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await chatConnection.invoke("SendMessage", message);
    } catch(e) {
      console.log(e);
    }
  }

  // Eventlyssnare för väderuppdateringar
  useEffect(() => {
    const handleWeatherUpdate = (event) => {
      setWeatherData(event.detail);
    };
    
    window.addEventListener('weatherUpdated', handleWeatherUpdate);
    return () => window.removeEventListener('weatherUpdated', handleWeatherUpdate);
  }, []);

  if (isLoading) return <div className="container py-4">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: '60vh' }}>
        <h1 className="display-3 text-center mb-4">WeatherVibes</h1>
        {error && <div className="alert alert-danger w-100">Error: {error.message}</div>}
        <button className="btn btn-primary btn-lg mt-3" onClick={login}>Logga in</button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">WeatherVibes</h1>
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
      </header>

      {error && <div className="alert alert-danger">Error: {error.message}</div>}

      <div className="row mb-4">
        <div className="col-md-6 d-flex">
          <div className="w-100">
            <Weather />
          </div>
        </div>
        {weatherData && (
          <div className="col-md-6 d-flex">
            <div className="card w-100">
              <div className="card-body">
                <h2 className="card-title h5">Chat - {weatherData} Weather Room</h2>
                { !chatConnection 
                  ? <WaitingRoom joinChatRoom={joinChatRoom} />
                  : <ChatRoom messages={messages} sendMessage={sendMessage} />
                }
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2 className="h5">Spotify</h2>
        <p className="text-muted">Sök och spela spellistor från Spotify.</p>
        <SpotifyApp />
      </div>
    </div>
  );
}

export default App;
