import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-card-header">
        <div>
          <h3>{service.name}</h3>
          <p>{service.category}</p>
        </div>

        <span className={`status-badge ${service.status.toLowerCase()}`}>
          {service.status}
        </span>
      </div>

      <p className="service-description">{service.description}</p>

      <div className="service-meta">
        <p>
          <strong>${service.price.toFixed(2)}</strong> / month
        </p>
        <p>Renews: {service.renewalDate}</p>
      </div>

      <Link className="details-link" to={`/services/${service.id}`}>
        View Details
      </Link>
    </article>
  );
}

export default ServiceCard;