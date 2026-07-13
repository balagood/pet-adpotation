import axios from "axios";
import { BASE_URL } from "../config";

const getToken = () => localStorage.getItem("token");


export const createMeetRequest = async (data) => {
  //const res = await axios.post(`${BASE_URL}/meet-greet`, data);
  //return res.data;
  const res = await axios.post(`${BASE_URL}/meet-greet`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

/* export const getAdopterRequests = async (id) => {
  //const res = await axios.get(`${BASE_URL}/meet-greet/adopter/${id}`);
  const res = await axios.get(`${BASE_URL}/meet-greet/adopter`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
}; */

export const getAdopterRequests = async () => {
  const res = await axios.get(
    `${BASE_URL}/meet-greet/adopter`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};


/* export const getShelterRequests = async (id) => {
  //const res = await axios.get(`${BASE_URL}/meet-greet/shelter/${id}`);
  const res = await axios.get(`${BASE_URL}/meet-greet/shelter`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
}; */

export const getShelterRequests = async () => {
  const res = await axios.get(
    `${BASE_URL}/meet-greet/shelter/`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};

export const getAvailableSlots = async (shelterId, meetingDate) => {
  const res = await axios.get(
    `${BASE_URL}/meet-greet/slots/${shelterId}`,
    {
      params: {
        meetingDate,
      },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  console.log("API Response:", res.data);
  return res.data;
};

export const getSingleMeetRequest = async (id) => {
  const res = await axios.get(`${BASE_URL}/meet-greet/${id}`);
  return res.data;
};

export const updateMeetStatus = async (id, data) => {
  //const res = await axios.put(`${BASE_URL}/meet-greet/${id}`, data);
  const res = await axios.put(`${BASE_URL}/meet-greet/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const deleteMeetRequest = async (id) => {
  //const res = await axios.delete(`${BASE_URL}/meet-greet/${id}`);
   const res = await axios.delete(`${BASE_URL}/meet-greet/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};