import axios from "axios";

const API_URL = "http://localhost:3000/pets"; // base URL for pets

export const addPet = async (petData,file) => {
  //const res = await axios.post(`${API_URL}/addPets`, petData);
  const data = new FormData();
  // append all pet fields
  Object.keys(petData).forEach((key) => {
    data.append(key, petData[key]);
  });
  // append image file
  if (file) {
    data.append("image", file); // backend should expect "image"
  }

  const res = await axios.post(`${API_URL}/addPet`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


export const getPets = async (filters = {}) => {
  
  const query = new URLSearchParams(filters).toString();
  const url = query ? `${API_URL}/getPets?${query}` : `${API_URL}/getPets`;
  const res = await axios.get(url);
  return res.data;
  
  //const res = await axios.get(`${API_URL}/getPets`);
  //return res.data;
};


export const getPetById = async (id) => {
  const res = await axios.get(`${API_URL}/getPetsById/${id}`);
  return res.data;
};


export const updatePet = async (id, petData) => {
  const res = await axios.put(`${API_URL}/updatePets/${id}`, petData);
  return res.data;
};


export const deletePet = async (id) => {
  const res = await axios.delete(`${API_URL}/deletePets/${id}`);
  return res.data;
};