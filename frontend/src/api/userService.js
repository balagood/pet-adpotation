import axios from "axios";

const API_URL = "https://pet-adpotations.onrender.com/users";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.url !== "/login" && config.url !== "/register") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};