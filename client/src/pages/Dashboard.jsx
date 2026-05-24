import StatCard from "../components/StatCard";
import { useServices } from "../context/ServiceContext";

function Dashboard() {
  const { services = [], loading, error, fetchServices } = useServices();

  const activeServices = services.filter(
    (service) => service.status === "Active"
  );

  const monthlySpend = services.reduce(
    (total, service) => total + Number(service.price || 0),
    0
  );

  const upcomingRenewals = activeServices.length;

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
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Overview of your active services and monthly spending.
      </p>

      <div className="stats-grid">
        <StatCard
          title="Total Services"
          value={services.length}
          description="Services currently being tracked"
        />

        <StatCard
          title="Active Services"
          value={activeServices.length}
          description="Services with active status"
        />

        <StatCard
          title="Monthly Spend"
          value={`$${monthlySpend.toFixed(2)}`}
          description="Estimated total monthly cost"
        />

        <StatCard
          title="Upcoming Renewals"
          value={upcomingRenewals}
          description="Active services renewing soon"
        />
      </div>
    </section>
  );
}

export default Dashboard;