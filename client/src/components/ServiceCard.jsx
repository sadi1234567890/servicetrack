import { Link } from "react-router-dom";

function ServiceCard({ service, onDelete, onToggleStatus }) {
  const serviceId = service._id || service.id;

  return (
    <article className="service-card">
      <div className="service-card-header">
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
      </div>

      <p className="service-description">{service.description}</p>

      <div className="service-meta">
        <p>
          <strong>${Number(service.price || 0).toFixed(2)}</strong> / month
        </p>

        <p>
          Renews:{" "}
          {service.renewalDate
            ? new Date(service.renewalDate).toISOString().split("T")[0]
            : "No date"}
        </p>
      </div>

      <div className="card-actions">
        <Link className="details-link" to={`/services/${serviceId}`}>
          View Details
        </Link>

        <button
          className="secondary-button"
          type="button"
          onClick={() => onToggleStatus(serviceId)}
        >
          {service.status === "Active" ? "Pause" : "Activate"}
        </button>

        <button
          className="danger-button"
          type="button"
          onClick={() => onDelete(serviceId)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ServiceCard;