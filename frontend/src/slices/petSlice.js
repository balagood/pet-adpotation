import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPets,
  updatePet as updatePetService,
  addPet as addPetService
} from "../api/petService";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchPets = createAsyncThunk(
  "pets/getPets",
  async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const url = query
      ? `${BASE_URL}/pets/getPets?${query}`
      : `${BASE_URL}/pets/getPets`;

    const res = await axios.get(url);
    return res.data;
  }
);

export const addPet = createAsyncThunk(
  "pets/addPet",
  async ({ petData, photoFiles, videoFiles }) => {
    const res = await addPetService(
      petData,
      photoFiles,
      videoFiles
    );
    return res;
  }
);

export const updatePet = createAsyncThunk(
  "pets/updatePet",
  async ({ id, petData, photoFiles, videoFiles }) => {
    const res = await updatePetService(
      id,
      petData,
      photoFiles,
      videoFiles
    );
    return res;
  }
);

const petSlice = createSlice({
  name: "pets",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addPet.fulfilled, (state, action) => {
        state.loading = false;
        const newPet = action.payload.pet || action.payload;
        state.list.unshift(newPet);
      })

      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updatePet.pending, (state) => {
        state.loading = true;
      })

      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPet = action.payload.pet || action.payload;

        state.list = state.list.map((pet) =>
          pet._id === updatedPet._id ? updatedPet : pet
        );
      })

      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default petSlice.reducer;