const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

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
}

export const authAPI = {
  signup: (body) => request("/auth/signup", { method: "POST", body }),
  login: (body) => request("/auth/login", { method: "POST", body }),
};

export const taskAPI = {
  getAll: (token, params = "") => request(`/tasks?${params}`, { token }),
  create: (token, body) =>
    request("/tasks", { method: "POST", body, token }),
  update: (token, id, body) =>
    request(`/tasks/${id}`, { method: "PUT", body, token }),
  delete: (token, id) =>
    request(`/tasks/${id}`, { method: "DELETE", token }),
  analytics: (token) => request("/tasks/analytics", { token }),
};
