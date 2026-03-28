import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { GoogleOAuthProvider } from "@react-oauth/google"

const googleClientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "543583771553-e4q3e3ao12e825fk1ir9ijrr6o2903si.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <App />
  </GoogleOAuthProvider>,
)
