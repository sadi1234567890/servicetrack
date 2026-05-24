import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServices } from "../context/ServiceContext";

function AddService() {
  const navigate = useNavigate();
  const { addService } = useServices();

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
      await addService({
        ...formData,
        price: Number(formData.price),
      });

      navigate("/services");
    } catch (err) {
      setError(err.message || "Unable to add service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1 className="page-title">Add Service</h1>
      <p className="page-subtitle">
        Add a new subscription, utility, or booking service.
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
            placeholder="Example: Netflix"
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
            placeholder="Example: Entertainment"
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
            placeholder="Example: 22.99"
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
            placeholder="Describe what this service is used for."
            rows="4"
            required
          />
        </div>

        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </section>
  );
}

export default AddService;