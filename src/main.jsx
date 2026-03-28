import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="543583771553-e4q3e3ao12e825fk1ir9ijrr6o2903si.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
)
