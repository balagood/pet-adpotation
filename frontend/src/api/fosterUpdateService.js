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
 * Add Foster Update
 * POST /foster-update
 * ==========================================
 */
export const addFosterUpdate = async (data) => {
  const formData = new FormData();
  console.log(data);
  formData.append("fosterId", data.fosterId);
  formData.append("description", data.description);
  formData.append("healthStatus", data.healthStatus);
  formData.append("weight", data.weight);


  if (data.photoFiles && data.photoFiles.length > 0) {
    data.photoFiles.forEach((file) => {
      formData.append("photos", file);
    });
  }
  //const response = await API.post("/foster-update", data);
  const response = await API.post("/foster-update",formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

/**
 * ==========================================
 * Get Foster Updates
 * GET /foster-update/:fosterId
 * ==========================================
 */
export const getFosterUpdates = async (fosterId) => {
  const response = await API.get(`/foster-update/${fosterId}`);
  return response.data;
};

/**
 * ==========================================
 * Update Foster Update
 * PUT /foster-update/:id
 * ==========================================
 */
export const updateFosterUpdate = async (id, data) => {
  const response = await API.put(`/foster-update/${id}`, data);
  return response.data;
};

/**
 * ==========================================
 * Delete Foster Update
 * DELETE /foster-update/:id
 * ==========================================
 */
export const deleteFosterUpdate = async (id) => {
  const response = await API.delete(`/foster-update/${id}`);
  return response.data;
};