import { createContext, useContext, useEffect, useState } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
} from "../services/api";
import { useAuth } from "./AuthContext";

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const { isAuthenticated, token } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchServices() {
    try {
      setLoading(true);
      setError("");

      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err.message || "Unable to load services.");
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  async function addService(serviceData) {
    const data = await createService(serviceData);
    setServices((previousServices) => [data.service, ...previousServices]);
    return data;
  }

  async function editService(id, serviceData) {
    const data = await updateService(id, serviceData);

    setServices((previousServices) =>
      previousServices.map((service) =>
        service._id === id ? data.service : service
      )
    );

    return data;
  }

  async function removeService(id) {
    await deleteService(id);

    setServices((previousServices) =>
      previousServices.filter((service) => service._id !== id)
    );
  }

  async function changeServiceStatus(id) {
    const data = await toggleServiceStatus(id);

    setServices((previousServices) =>
      previousServices.map((service) =>
        service._id === id ? data.service : service
      )
    );

    return data;
  }

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchServices();
    } else {
      setServices([]);
      setError("");
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  return (
    <ServiceContext.Provider
      value={{
        services,
        setServices,
        loading,
        error,
        fetchServices,
        addService,
        editService,
        removeService,
        changeServiceStatus,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error("useServices must be used inside ServiceProvider");
  }

  return context;
}