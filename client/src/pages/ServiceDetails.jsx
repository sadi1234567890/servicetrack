import { Link, useParams } from "react-router-dom";
import { useServices } from "../context/ServiceContext";

function ServiceDetails() {
  const { id } = useParams();
  const { services = [], loading, error, fetchServices } = useServices();

  const service = services.find((item) => item._id === id || item.id === id);

  if (loading) {
    return <p>Loading service details...</p>;
  }

  if (error) {
    return (
      <section>
        <Link className="back-link" to="/services">
          Back to Services
        </Link>

        <h1 className="page-title">Service Details</h1>
        <p className="error-text">{error}</p>

        <button className="submit-button" onClick={fetchServices}>
          Retry
        </button>
      </section>
    );
  }

  if (!service) {
    return (
      <section>
        <Link className="back-link" to="/services">
          Back to Services
        </Link>

        <h1 className="page-title">Service Not Found</h1>
        <p className="page-subtitle">
          This service may have been deleted or could not be loaded.
        </p>
      </section>
    );
  }

  return (
    <section>
      <Link className="back-link" to="/services">
        Back to Services
      </Link>

      <div className="detail-card">
        <div className="service-card-header">
          <div>
            <h1 className="page-title">{service.name}</h1>
            <p className="page-subtitle">{service.category}</p>
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
        </div>

        <p className="service-description">{service.description}</p>

        <div className="detail-grid">
          <div className="detail-box">
            <p>Monthly Cost</p>
            <h3>${Number(service.price || 0).toFixed(2)}</h3>
          </div>

          <div className="detail-box">
            <p>Renewal Date</p>
            <h3>
              {service.renewalDate
                ? new Date(service.renewalDate).toISOString().split("T")[0]
                : "No date"}
            </h3>
          </div>

          <div className="detail-box">
            <p>Status</p>
            <h3>{service.status}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetails;