import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import AddService from "./pages/AddService";
import ServiceDetails from "./pages/ServiceDetails";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <nav className="navbar">
          <h2 className="logo">ServiceTrack</h2>

          <div className="nav-links">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/add-service">Add Service</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </div>
        </nav>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;