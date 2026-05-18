import { createContext, useContext, useEffect, useState } from "react";
import { servicesData } from "../data/services";

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = setTimeout(() => {
      try {
        setServices(servicesData);
        setLoading(false);
      } catch {
        setError("Unable to load services. Please try again.");
        setLoading(false);
      }
    }, 700);

    return () => clearTimeout(loadServices);
  }, []);

  function addService(newService) {
    setServices((prevServices) => [
      ...prevServices,
      {
        id: Date.now(),
        ...newService,
      },
    ]);
  }

  return (
    <ServiceContext.Provider value={{ services, loading, error, addService }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  return useContext(ServiceContext);
}