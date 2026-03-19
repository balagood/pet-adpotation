import axios from "axios";

const API_URL = "https://pet-adpotations.onrender.com/favorites";

export const addFavorite = async (data) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};

export const getFavorites = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data;
};

export const removeFavorite = async (data) => {
  const res = await axios.delete(`${API_URL}/remove`, { data });
  return res.data;
};