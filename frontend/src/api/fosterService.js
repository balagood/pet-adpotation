import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * ==========================================
 * Foster uploads a pet
 * POST /foster
 * ==========================================
 */
/* export const createFosterRequest = async (data) => {
  const response = await API.post("/foster", data);
  return response.data;
}; */

export const createFosterRequest = async (formData) => {
  const response = await API.post("/foster", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
/**
 * ==========================================
 * Get logged-in Foster pets
 * GET /foster/my
 * ==========================================
 */
export const getMyFosterPets = async () => {
  const response = await API.get("/foster/my");
  return response.data;
};

/**
 * ==========================================
 * Shelter views Foster pets
 * GET /foster/shelter
 * ==========================================
 */
export const getShelterFosterPets = async () => {
  const response = await API.get("/foster/shelter");
  return response.data;
};

/**
 * ==========================================
 * Shelter Accept / Reject
 * PUT /foster/shelter/:id
 * ==========================================
 */
export const updateShelterStatus = async (id, status) => {
  const response = await API.put(`/foster/shelter/${id}`, {
    status,
  });

  return response.data;
};

/**
 * ==========================================
 * Foster Approve / Reject
 * PUT /foster/foster/:id
 * ==========================================
 */
export const updateFosterStatus = async (id, status) => {
  const response = await API.put(`/foster/foster/${id}`, {
    status,
  });

  return response.data;
};

/**
 * ==========================================
 * Complete Foster
 * PUT /foster/complete/:id
 * ==========================================
 */
export const completeFoster = async (id) => {
  const response = await API.put(`/foster/complete/${id}`);
  return response.data;
};

export const getShelters = async () => {
  const res = await API.get("/foster/shelters");
  console.log(res);
  return res.data;
};