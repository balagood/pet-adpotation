import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  applyForPet,
  getApplicationsByUser,
  getApplicationsByShelter,
  updateApplicationStatus,
} from "../api/applicationService";

// ✅ APPLY
export const applyPet = createAsyncThunk(
  "applications/apply",
  async (data) => {
    return await applyForPet(data);
  }
);

// ✅ GET USER APPLICATIONS
export const fetchUserApplications = createAsyncThunk(
  "applications/user",
  async (userId) => {
    return await getApplicationsByUser(userId);
  }
);

// ✅ GET SHELTER APPLICATIONS
export const fetchShelterApplications = createAsyncThunk(
  "applications/shelter",
  async (shelterId) => {
    return await getApplicationsByShelter(shelterId);
  }
);

// ✅ UPDATE STATUS
export const updateApplication = createAsyncThunk(
  "applications/update",
  async ({ id, status }) => {
    return await updateApplicationStatus(id, status);
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchShelterApplications.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        const updated = action.payload.application || action.payload;

        state.list = state.list.map((app) =>
          app._id === updated._id ? updated : app
        );
      });
  },
});

export default applicationSlice.reducer;