import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { useServices } from "../context/ServiceContext";

function Services() {
  const {
    services = [],
    loading,
    error,
    fetchServices,
    removeService,
    changeServiceStatus,
  } = useServices();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionError, setActionError] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || service.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionError("");
      await removeService(id);
    } catch (err) {
      setActionError(err.message || "Unable to delete service.");
    }
  }

  async function handleToggleStatus(id) {
    try {
      setActionError("");
      await changeServiceStatus(id);
    } catch (err) {
      setActionError(err.message || "Unable to update service status.");
    }
  }

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

      {actionError && <p className="error-text">{actionError}</p>}

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
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {filteredServices.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="services-grid">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service._id || service.id}
              service={service}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Services;