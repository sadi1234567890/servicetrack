import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { useServices } from "../context/ServiceContext";

function Services() {
  const { services = [], loading, error, fetchServices } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || service.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return (
      <section>
        <h1 className="page-title">Services</h1>
        <p className="error-text">{error}</p>
        <button className="submit-button" onClick={fetchServices}>
          Retry
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">Services</h1>
      <p className="page-subtitle">
        View, search, and manage all your recurring services.
      </p>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>
      </div>

      <div className="services-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service._id || service.id} service={service} />
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </section>
  );
}

export default Services;