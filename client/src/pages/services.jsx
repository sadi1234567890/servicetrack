import { useState } from "react";
import ServiceCard from "../components/servicecard";
import { useServices } from "../context/servicecontext";

function Services() {
  const { services, loading, error } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || service.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section>
      <h1 className="page-title">Services</h1>
      <p className="page-subtitle">
        View, search, and manage all your recurring services.
      </p>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search services"
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter services by status"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>
      </div>

      {filteredServices.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="services-grid">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Services;