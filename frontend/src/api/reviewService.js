import axios from "axios";

const API_URL = "http://localhost:3000/reviews";

export const addReview = async (data) => {

  const token = localStorage.getItem("token");  
  const res = await axios.post(`${API_URL}/add`, data,{
    headers:{
        Authorization:`Bearer ${token}`,
    },
  });

  return res.data;
};

export const getReviews = async (petId) => {
  //const res = await axios.get(`${API_URL}/${petId}`);
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/pet/${petId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;

};