import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createFosterRequest,
  getMyFosterPets,
  getShelterFosterPets,
  updateShelterStatus,
  updateFosterStatus,
  completeFoster,
} from "../api/fosterService";

/**
 * ==========================================
 * Foster uploads a pet
 * ==========================================
 */
export const addFosterRequest = createAsyncThunk(
  "foster/add",
  async (data, { rejectWithValue }) => {
    try {
      return await createFosterRequest(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/**
 * ==========================================
 * Foster Dashboard
 * ==========================================
 */
export const fetchMyFosterPets = createAsyncThunk(
  "foster/my",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyFosterPets();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/**
 * ==========================================
 * Shelter Dashboard
 * ==========================================
 */
export const fetchShelterFosterPets = createAsyncThunk(
  "foster/shelter",
  async (_, { rejectWithValue }) => {
    try {
      return await getShelterFosterPets();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/**
 * ==========================================
 * Shelter Accept / Reject
 * ==========================================
 */
export const changeShelterStatus = createAsyncThunk(
  "foster/shelterStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await updateShelterStatus(id, status);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/**
 * ==========================================
 * Foster Accept / Reject
 * ==========================================
 */
export const changeFosterStatus = createAsyncThunk(
  "foster/fosterStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await updateFosterStatus(id, status);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/**
 * ==========================================
 * Complete Foster
 * ==========================================
 */
export const completeFosterPet = createAsyncThunk(
  "foster/complete",
  async (id, { rejectWithValue }) => {
    try {
      return await completeFoster(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const fosterSlice = createSlice({
  name: "foster",

  initialState: {
    fosterPets: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==============================
      // Add Foster Pet
      // ==============================
      .addCase(addFosterRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFosterRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.fosterPets.unshift(action.payload.data);
      })
      .addCase(addFosterRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==============================
      // My Foster Pets
      // ==============================
      .addCase(fetchMyFosterPets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyFosterPets.fulfilled, (state, action) => {
        state.loading = false;
        state.fosterPets = action.payload.data;
      })
      .addCase(fetchMyFosterPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==============================
      // Shelter Foster Pets
      // ==============================
      .addCase(fetchShelterFosterPets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShelterFosterPets.fulfilled, (state, action) => {
        state.loading = false;
        state.fosterPets = action.payload.data;
      })
      .addCase(fetchShelterFosterPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==============================
      // Shelter Status
      // ==============================
      .addCase(changeShelterStatus.fulfilled, (state, action) => {
        state.fosterPets = state.fosterPets.map((pet) =>
          pet._id === action.payload.data._id
            ? action.payload.data
            : pet
        );
      })

      // ==============================
      // Foster Status
      // ==============================
      .addCase(changeFosterStatus.fulfilled, (state, action) => {
        state.fosterPets = state.fosterPets.map((pet) =>
          pet._id === action.payload.data._id
            ? action.payload.data
            : pet
        );
      })

      // ==============================
      // Complete Foster
      // ==============================
      .addCase(completeFosterPet.fulfilled, (state, action) => {
        state.fosterPets = state.fosterPets.map((pet) =>
          pet._id === action.payload.data._id
            ? action.payload.data
            : pet
        );
      });
  },
});

export default fosterSlice.reducer;