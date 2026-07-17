import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFosterUpdate,
  getFosterUpdates,
  updateFosterUpdate,
  deleteFosterUpdate,
} from "../api/fosterUpdateService";

/**
 * ==========================================
 * Add Foster Update
 * ==========================================
 */
export const createUpdate = createAsyncThunk(
  "fosterUpdate/create",
  async (data, { rejectWithValue }) => {
    try {
      return await addFosterUpdate(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/**
 * ==========================================
 * Get Foster Updates
 * ==========================================
 */
export const fetchFosterUpdates = createAsyncThunk(
  "fosterUpdate/get",
  async (fosterId, { rejectWithValue }) => {
    try {
      return await getFosterUpdates(fosterId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/**
 * ==========================================
 * Update Foster Update
 * ==========================================
 */
export const editFosterUpdate = createAsyncThunk(
  "fosterUpdate/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateFosterUpdate(id, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/**
 * ==========================================
 * Delete Foster Update
 * ==========================================
 */
export const removeFosterUpdate = createAsyncThunk(
  "fosterUpdate/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteFosterUpdate(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const fosterUpdateSlice = createSlice({
  name: "fosterUpdate",

  initialState: {
    updates: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==========================
      // Create Update
      // ==========================
      .addCase(createUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.updates.unshift(action.payload.data);
      })
      .addCase(createUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Fetch Updates
      // ==========================
      .addCase(fetchFosterUpdates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFosterUpdates.fulfilled, (state, action) => {
        state.loading = false;
        state.updates = action.payload.data;
      })
      .addCase(fetchFosterUpdates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Edit Update
      // ==========================
      .addCase(editFosterUpdate.fulfilled, (state, action) => {
        state.updates = state.updates.map((update) =>
          update._id === action.payload.data._id
            ? action.payload.data
            : update
        );
      })

      // ==========================
      // Delete Update
      // ==========================
      .addCase(removeFosterUpdate.fulfilled, (state, action) => {
        state.updates = state.updates.filter(
          (update) => update._id !== action.payload
        );
      });
  },
});

export default fosterUpdateSlice.reducer;