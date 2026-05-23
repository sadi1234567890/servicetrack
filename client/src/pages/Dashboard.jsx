import StatCard from "../components/statcard";
import { useServices } from "../context/servicecontext";

function Dashboard() {
  const { services, loading, error } = useServices();

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const activeServices = services.filter(
    (service) => service.status === "Active"
  );

  const monthlySpend = services.reduce(
    (total, service) => total + service.price,
    0
  );

  const upcomingRenewals = activeServices.length;

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