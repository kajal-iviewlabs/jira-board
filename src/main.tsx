import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-3t1mp0nip5rqjt4g.us.auth0.com"
    clientId="QJkqyDj5PnDpB89efrDCgVhN4ryoZHUE"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
