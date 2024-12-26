const API_BASE_URL = "http://localhost:5000/api";

async function request(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });


  if (!response.ok) {
    const error = await response.json();
    console.error("Error Response Body:", error);
    throw new Error(error.message || "Error en la solicitud");
  }
  return response.json();
}

export const api = {
  get: (endpoint: string) => request(endpoint),
  post: (endpoint: string, body: any) =>
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint: string, body: any) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: (endpoint: string) => request(endpoint, { method: "DELETE" }),
};

export default api;
