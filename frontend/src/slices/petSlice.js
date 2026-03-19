import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPets, updatePet as updatePetService} from "../api/petService";
import axios from "axios";

export const fetchPets = createAsyncThunk("pets/getPets", async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const url = query ? `http://localhost:3000/pets/getPets?${query}` : `http://localhost:3000/pets/getPets`;
  const res = await axios.get(url);
  return res.data;

  //return await getPets();
});


/* export const updatePet = createAsyncThunk("pets/updatePet", async ({ id, petData }) => {
  return await updatePetService(id, petData);
}); */

export const updatePet = createAsyncThunk("pets/updatePet",async ({ id, petData }) => {
    const res = await updatePetService(id, petData);
    return res;
  }
);


const petSlice = createSlice({
  name: "pets",
  initialState: { list: [], loading: false, error: null },
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
      
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
      })

      .addCase(updatePet.fulfilled, (state, action) => {
        // state.loading = false;
        // state.list = state.list.map((pet) =>
        //   pet._id === action.payload._id ? action.payload : pet
        // );
        /* if (!action.payload) return;
          state.loading = false;
          state.list = state.list.map((pet) =>
            pet._id === action.payload._id ? action.payload : pet
        ); */

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

  },
});

export default petSlice.reducer;