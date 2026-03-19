import axios from "axios";

const API_URL = "https://pet-adpotations.onrender.com/application";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Apply
export const applyForPet = async (data) => {
  const res = await api.post(`${API_URL}/submitApplication`, data);
  return res.data;
};

// ✅ Get applications by user
export const getApplicationsByUser = async (userId) => {
  const res = await api.get(`${API_URL}/user/${userId}`);
  return res.data;
};

// ✅ Get applications by shelter
export const getApplicationsByShelter = async (shelterId) => {
  const res = await api.get(`${API_URL}/shelter/${shelterId}`);
  return res.data;
};

// ✅ Update status
export const updateApplicationStatus = async (id, status) => {
  const res = await api.put(`${API_URL}/${id}`, { status });
  return res.data;
};

// ✅ Delete
export const deleteApplication = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};