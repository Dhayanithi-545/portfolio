import axios from "axios";

// ✅ Create a reusable axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL (for local testing)
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
