import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  CheckCircle,
  DollarSign,
  PauseCircle,
  AlertCircle,
  CalendarClock,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { useServices } from "../context/ServiceContext";

function Dashboard() {
  const { services = [], loading, error, fetchServices } = useServices();
  const [dashboardSearch, setDashboardSearch] = useState("");

  const activeServices = services.filter(
    (service) => service.status === "Active"
  );

  const pausedServices = services.filter(
    (service) => service.status === "Paused"
  );

  const inactiveServices = services.filter(
    (service) => service.status === "Inactive"
  );

  const monthlySpend = activeServices.reduce(
    (total, service) => total + Number(service.price || 0),
    0
  );

  const highestCostService = services.reduce((highest, service) => {
    if (!highest || Number(service.price || 0) > Number(highest.price || 0)) {
      return service;
    }

    return highest;
  }, null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextThirtyDays = new Date(today);
  nextThirtyDays.setDate(today.getDate() + 30);
  nextThirtyDays.setHours(23, 59, 59, 999);

  const upcomingRenewals = services.filter((service) => {
    if (!service.renewalDate) {
      return false;
    }

    const renewalDate = new Date(service.renewalDate);
    renewalDate.setHours(0, 0, 0, 0);

    return (
      renewalDate >= today &&
      renewalDate <= nextThirtyDays &&
      service.status === "Active"
    );
  });

  const recentServices = [...services].slice(0, 4);

  const searchedServices = services.filter((service) => {
    const searchValue = dashboardSearch.toLowerCase();

    return (
      service.name?.toLowerCase().includes(searchValue) ||
      service.category?.toLowerCase().includes(searchValue) ||
      service.status?.toLowerCase().includes(searchValue)
    );
  });

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return (
      <section>
        <h1 className="page-title">Dashboard</h1>
        <p className="error-text">{error}</p>
        <button className="submit-button" onClick={fetchServices}>
          Retry
        </button>
      </section>
    );
  }

  return (
    <section>
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Smart Services Dashboard</p>
          <h1>Welcome back to ServiceTrack</h1>
          <p>
            Track your services, monitor active spending, and stay ahead of
            upcoming renewals from one clean dashboard.
          </p>
        </div>

        <Link className="hero-button" to="/add-service">
          Add New Service
        </Link>
      </div>

      <div className="dashboard-search-card">
        <div>
          <h2>Quick Service Search</h2>
          <p>Search by service name, category, or status.</p>
        </div>

        <input
          type="text"
          placeholder="Search Netflix, Utility, Active..."
          value={dashboardSearch}
          onChange={(event) => setDashboardSearch(event.target.value)}
          aria-label="Search services from dashboard"
        />

        {dashboardSearch && (
          <div className="dashboard-search-results">
            {searchedServices.length > 0 ? (
              searchedServices.slice(0, 5).map((service) => {
                const serviceId = service._id || service.id;

                return (
                  <Link
                    className="dashboard-search-item"
                    to={`/services/${serviceId}`}
                    key={serviceId}
                  >
                    <div>
                      <h3>{service.name}</h3>
                      <p>{service.category}</p>
                    </div>

                    <span
                      className={`status-badge ${service.status.toLowerCase()}`}
                    >
                      {service.status}
                    </span>
                  </Link>
                );
              })
            ) : (
              <p className="empty-text">No matching services found.</p>
            )}
          </div>
        )}
      </div>

      <div className="stats-grid dashboard-stats-grid">
        <Link className="stat-card-link" to="/services">
          <StatCard
            title="Total Services"
            value={services.length}
            description="All services being tracked"
            icon={Layers}
          />
        </Link>

        <Link className="stat-card-link" to="/services">
          <StatCard
            title="Active Services"
            value={activeServices.length}
            description="Currently active subscriptions"
            icon={CheckCircle}
          />
        </Link>

        <Link className="stat-card-link" to="/services">
          <StatCard
            title="Monthly Spend"
            value={`$${monthlySpend.toFixed(2)}`}
            description="Active monthly service cost"
            icon={DollarSign}
          />
        </Link>

        <Link className="stat-card-link" to="/services">
          <StatCard
            title="Paused Services"
            value={pausedServices.length}
            description="Services currently paused"
            icon={PauseCircle}
          />
        </Link>

        <Link className="stat-card-link" to="/services">
          <StatCard
            title="Inactive Services"
            value={inactiveServices.length}
            description="Services past renewal date"
            icon={AlertCircle}
          />
        </Link>

        <Link className="stat-card-link" to="/services">
          <StatCard
            title="Upcoming Renewals"
            value={upcomingRenewals.length}
            description="Active services renewing within 30 days"
            icon={CalendarClock}
          />
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Spending Insight</h2>
              <p>Your current active service spending summary.</p>
            </div>
          </div>

          <div className="insight-box">
            <p>Highest Cost Service</p>
            <h3>
              {highestCostService
                ? highestCostService.name
                : "No services added yet"}
            </h3>
            <span>
              {highestCostService
                ? `$${Number(highestCostService.price || 0).toFixed(2)} / month`
                : "Add a service to see insights"}
            </span>
          </div>

          <div className="insight-box">
            <p>Upcoming Renewals</p>
            <h3>{upcomingRenewals.length}</h3>
            <span>Active services renewing within the next 30 days</span>
          </div>

          <div className="insight-box">
            <p>Inactive Services</p>
            <h3>{inactiveServices.length}</h3>
            <span>Services that have crossed their renewal date</span>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Recent Services</h2>
              <p>Latest services added to your account.</p>
            </div>

            <Link to="/services">View All</Link>
          </div>

          {recentServices.length === 0 ? (
            <p className="empty-text">No services added yet.</p>
          ) : (
            <div className="recent-list">
              {recentServices.map((service) => (
                <Link
                  className="recent-item"
                  to={`/services/${service._id || service.id}`}
                  key={service._id || service.id}
                >
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.category}</p>
                  </div>

                  <div className="recent-price">
                    <strong>${Number(service.price || 0).toFixed(2)}</strong>
                    <span>{service.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;