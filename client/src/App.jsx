import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import AddService from "./pages/AddService";
import ServiceDetails from "./pages/ServiceDetails";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <BrowserRouter>
      <div className="app-layout">
        <nav className="navbar">
          <h2 className="logo">ServiceTrack</h2>

          <div className="nav-links">
            {isAuthenticated && (
              <>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/add-service">Add Service</NavLink>
                <NavLink to="/settings">Settings</NavLink>
              </>
            )}

            {!isAuthenticated ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <button className="logout-button" onClick={logout}>
                Logout {user?.name ? `(${user.name})` : ""}
              </button>
            )}
          </div>
        </nav>

        <main className="page-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-service"
              element={
                <ProtectedRoute>
                  <AddService />
                </ProtectedRoute>
              }
            />

            <Route
              path="/services/:id"
              element={
                <ProtectedRoute>
                  <ServiceDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;