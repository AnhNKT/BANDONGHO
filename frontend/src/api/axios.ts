import axios from "axios";

// Create Axios instance
export const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust to your backend URL
});

// Automatically add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
