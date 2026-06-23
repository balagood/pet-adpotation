import axios from "axios";
import { BASE_URL } from "../config";

const API_URL = `${BASE_URL}/pets`;

const getToken = () => localStorage.getItem("token");

export const addPet = async (
  petData,
  photoFiles,
  videoFiles
) => {
  const data = new FormData();

  // append pet fields
  Object.keys(petData).forEach((key) => {
    data.append(key, petData[key]);
  });

  // append photos
  if (photoFiles && photoFiles.length > 0) {
    photoFiles.forEach((file) => {
      data.append("photos", file);
    });
  }

  // append videos
  if (videoFiles && videoFiles.length > 0) {
    videoFiles.forEach((file) => {
      data.append("videos", file);
    });
  }

  const res = await axios.post(
    `${API_URL}/addPet`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};

export const getPets = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const url = query
    ? `${API_URL}/getPets?${query}`
    : `${API_URL}/getPets`;

  const res = await axios.get(url);
  return res.data;
};

export const getPetById = async (id) => {
  const res = await axios.get(
    `${API_URL}/getPetsById/${id}`
  );
  return res.data;
};

export const updatePet = async (
  id,
  petData,
  photoFiles,
  videoFiles
) => {
  const data = new FormData();

  Object.keys(petData).forEach((key) => {
    data.append(key, petData[key]);
  });

  // append photos
  if (photoFiles && photoFiles.length > 0) {
    photoFiles.forEach((file) => {
      data.append("photos", file);
    });
  }

  // append videos
  if (videoFiles && videoFiles.length > 0) {
    videoFiles.forEach((file) => {
      data.append("videos", file);
    });
  }

  const res = await axios.put(
    `${API_URL}/updatePets/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};

export const deletePet = async (id) => {
  const res = await axios.delete(
    `${API_URL}/deletePets/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};

export const getMyPets = async () => {
  const res = await axios.get(
    `${API_URL}/myPets`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return res.data;
};