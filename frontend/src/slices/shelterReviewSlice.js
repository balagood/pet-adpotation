import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getShelterReviews,
  addShelterReview,
} from "../api/shelterReviewService";

// FETCH reviews
export const fetchShelterReviews = createAsyncThunk(
  "shelterReviews/get",
  async (shelterId, { rejectWithValue }) => {
    try {
      return await getShelterReviews(shelterId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch shelter reviews"
      );
    }
  }
);

// CREATE review
export const createShelterReview = createAsyncThunk(
  "shelterReviews/add",
  async (data, { rejectWithValue }) => {
    try {
      return await addShelterReview(data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add shelter review"
      );
    }
  }
);

const slice = createSlice({
  name: "shelterReviews",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchShelterReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShelterReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchShelterReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createShelterReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShelterReview.fulfilled, (state, action) => {
        state.loading = false;

        // backend returns: { review, message }
        state.list.unshift(action.payload.review);
      })
      .addCase(createShelterReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;