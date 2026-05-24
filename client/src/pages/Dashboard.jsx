import { useState } from "react";
import { Link } from "react-router-dom";
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

  const monthlySpend = services.reduce(
    (total, service) => total + Number(service.price || 0),
    0
  );

  const highestCostService = services.reduce((highest, service) => {
    if (!highest || Number(service.price) > Number(highest.price)) {
      return service;
    }

    return highest;
  }, null);

  const upcomingRenewals = activeServices.length;
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
            Track your services, monitor monthly spending, and stay ahead of
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
                      className={
                        service.status === "Active"
                          ? "status-badge active"
                          : "status-badge paused"
                      }
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

      <div className="stats-grid">
        <StatCard
          title="Total Services"
          value={services.length}
          description="Services currently being tracked"
        />

        <StatCard
          title="Active Services"
          value={activeServices.length}
          description="Currently active subscriptions"
        />

        <StatCard
          title="Monthly Spend"
          value={`$${monthlySpend.toFixed(2)}`}
          description="Estimated total monthly cost"
        />

        <StatCard
          title="Paused Services"
          value={pausedServices.length}
          description="Services currently paused"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Spending Insight</h2>
              <p>Your current service spending summary.</p>
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
            <h3>{upcomingRenewals}</h3>
            <span>Active services that need tracking</span>
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
                <div className="recent-item" key={service._id || service.id}>
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.category}</p>
                  </div>

                  <div className="recent-price">
                    <strong>${Number(service.price || 0).toFixed(2)}</strong>
                    <span>{service.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;