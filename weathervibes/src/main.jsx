import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
<Auth0Provider
  domain="dev-f7rdnd87c717o0kg.us.auth0.com"
  clientId="AmHFV0TQeIFEMfvfVqL2efeErXtiMzEj"
authorizationParams={{ redirect_uri: window.location.origin }}
  cacheLocation="localstorage"
  useRefreshTokens={true}
  
>
  <App />
</Auth0Provider>

  </StrictMode>
);
