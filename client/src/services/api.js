const API_BASE_URL = "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
};

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
};

export const getServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch services.");
  }

  return data;
};

export const createService = async (serviceData) => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create service.");
  }

  return data;
};

export const getServiceById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch service.");
  }

  return data;
};

export const updateService = async (id, serviceData) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to update service.");
  }

  return data;
};

export const deleteService = async (id) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to delete service.");
  }

  return data;
};

export const toggleServiceStatus = async (id) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to update service status.");
  }

  return data;
};