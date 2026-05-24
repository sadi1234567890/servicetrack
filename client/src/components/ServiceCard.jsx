import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  const serviceId = service._id || service.id;

  return (
    <article className="service-card">
      <div className="service-card-header">
        <div>
          <h2>{service.name}</h2>
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

      <p className="service-price">
        <strong>${Number(service.price || 0).toFixed(2)}</strong> / month
      </p>

      <p className="service-renewal">
        Renews:{" "}
        {service.renewalDate
          ? new Date(service.renewalDate).toISOString().split("T")[0]
          : "No date"}
      </p>

      <Link className="details-button" to={`/services/${serviceId}`}>
        View Details
      </Link>
    </article>
  );
}

export default ServiceCard;