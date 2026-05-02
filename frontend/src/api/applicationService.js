import axios from "axios";
import { BASE_URL } from "../config";

//const API_URL = "https://pet-adpotations.onrender.com/application";
const API_URL = `${BASE_URL}/application`;


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
  const payload = {
    petId: data.petId,
    adopterId: data.adopterId,
    adopterName: data.adopterName,
    adopterEmail: data.adopterEmail,
    shelterId: data.shelterId,
    shelterEmail: data.shelterEmail,
    message: data.message || "",
  };
  const res = await api.post(`/submitApplication`, payload);
  return res.data;
};

// ✅ Get applications by user
export const getApplicationsByUser = async () => {
  const res = await api.get(`/user`);
  return res.data;
};

// ✅ Get applications by shelter
export const getApplicationsByShelter = async () => {
  const res = await api.get(`/shelter`);
  return res.data;
};

// ✅ Update status
export const updateApplicationStatus = async (id, status) => {
  const res = await api.put(`/${id}`, { status });
  return res.data;
};

// ✅ Delete
export const deleteApplication = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};