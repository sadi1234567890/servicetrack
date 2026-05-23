import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ServiceProvider } from "./context/ServiceContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </AuthProvider>
  </StrictMode>
);