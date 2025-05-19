import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerAdmin = (adminData) =>
  api.post("/api/admin/register", adminData);

export const loginAdmin = (adminData) =>
  api.post("/api/admin/login", adminData);

export const createEvent = (formData) =>
  api.post("/api/event/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllEvents = () => api.get("/api/event/list");

export const updateEvent = (data) => {
  return api.post("/api/event/update", data);
};

export const deleteEvent = (eventId) =>
  api.post("/api/event/remove", { id: eventId });

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};
