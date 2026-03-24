const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/+$/, "");

async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Network request failed");
  }
}

export const authAPI = {
  signup: (body) => request("/api/auth/signup", { method: "POST", body }),
  login: (body) => request("/api/auth/login", { method: "POST", body }),
};

export const taskAPI = {
  getAll: (token, params = "") =>
    request(`/api/tasks${params ? `?${params}` : ""}`, { token }),

  create: (token, body) =>
    request("/api/tasks", { method: "POST", body, token }),

  update: (token, id, body) =>
    request(`/api/tasks/${id}`, { method: "PUT", body, token }),

  delete: (token, id) =>
    request(`/api/tasks/${id}`, { method: "DELETE", token }),

  analytics: (token) =>
    request("/api/tasks/analytics", { token }),
};
