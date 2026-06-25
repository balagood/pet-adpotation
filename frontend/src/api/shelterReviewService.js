import axios from "axios";
import { BASE_URL } from "../config";

const API_URL = `${BASE_URL}/shelter-review`;

// GET reviews by shelterId
export const getShelterReviews = async (shelterId) => {
  const res = await axios.get(`${API_URL}/${shelterId}`);
  return res.data;
};

// ADD shelter review
export const addShelterReview = async (data) => {
  const res = await axios.post(`${API_URL}/add`, data);
  return res.data;
};