import { Link, useParams } from "react-router-dom";
import { useServices } from "../context/servicecontext";

function ServiceDetails() {
  const { id } = useParams();
  const { services, loading, error } = useServices();

  if (loading) {
    return <p>Loading service details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const service = services.find((item) => item.id === Number(id));

  if (!service) {
    return (
      <section>
        <h1 className="page-title">Service Not Found</h1>
        <p className="page-subtitle">
          The service you are looking for does not exist.
        </p>
        <Link className="details-link" to="/services">
          Back to Services
        </Link>
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

          <span className={`status-badge ${service.status.toLowerCase()}`}>
            {service.status}
          </span>
        </div>

        <p className="detail-description">{service.description}</p>

        <div className="detail-grid">
          <div>
            <p className="detail-label">Monthly Cost</p>
            <h3>${service.price.toFixed(2)}</h3>
          </div>

          <div>
            <p className="detail-label">Renewal Date</p>
            <h3>{service.renewalDate}</h3>
          </div>

          <div>
            <p className="detail-label">Status</p>
            <h3>{service.status}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetails;