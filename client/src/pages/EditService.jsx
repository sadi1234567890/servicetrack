import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useServices } from "../context/ServiceContext";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services = [], editService } = useServices();

  const service = services.find((item) => item._id === id || item.id === id);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    renewalDate: "",
    status: "Active",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        category: service.category || "",
        price: service.price || "",
        renewalDate: service.renewalDate
          ? new Date(service.renewalDate).toISOString().split("T")[0]
          : "",
        status: service.status || "Active",
        description: service.description || "",
      });
    }
  }, [service]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await editService(id, {
        ...formData,
        price: Number(formData.price),
      });

      navigate(`/services/${id}`);
    } catch (err) {
      setError(err.message || "Unable to update service.");
    } finally {
      setLoading(false);
    }
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
      <Link className="back-link" to={`/services/${id}`}>
        Back to Details
      </Link>

      <h1 className="page-title">Edit Service</h1>
      <p className="page-subtitle">
        Update the service details saved in your account.
      </p>

      {error && <p className="error-text">{error}</p>}

      <form className="service-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Service Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Monthly Price</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="renewalDate">Renewal Date</label>
          <input
            id="renewalDate"
            name="renewalDate"
            type="date"
            value={formData.renewalDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Service"}
        </button>
      </form>
    </section>
  );
}

export default EditService;