import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServices } from "../context/servicecontext";

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

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Service name is required.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid monthly price.";
    }

    if (!formData.renewalDate) {
      newErrors.renewalDate = "Renewal date is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    addService({
      ...formData,
      price: Number(formData.price),
    });

    navigate("/services");
  }

  return (
    <section>
      <h1 className="page-title">Add Service</h1>
      <p className="page-subtitle">
        Add a new subscription, utility, or booking service.
      </p>

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
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
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
          />
          {errors.category && <p className="error-text">{errors.category}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Monthly Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Example: 22.99"
          />
          {errors.price && <p className="error-text">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="renewalDate">Renewal Date</label>
          <input
            id="renewalDate"
            name="renewalDate"
            type="date"
            value={formData.renewalDate}
            onChange={handleChange}
          />
          {errors.renewalDate && (
            <p className="error-text">{errors.renewalDate}</p>
          )}
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
            placeholder="Write a short description..."
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
        </div>

        <button className="submit-button" type="submit">
          Add Service
        </button>
      </form>
    </section>
  );
}

export default AddService;