import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addReview, getReviews } from "../api/reviewService";

// ✅ Fetch reviews
export const fetchReviews = createAsyncThunk(
  "reviews/get",
  async (petId, { rejectWithValue }) => {
    try {
      return await getReviews(petId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

// ✅ Create review
export const createReview = createAsyncThunk(
  "reviews/add",
  async (data, { rejectWithValue }) => {
    try {
      return await addReview(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add review");
    }
  }
);

const slice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 Fetch
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Create
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ IMPORTANT: update UI instantly
        state.list.unshift(action.payload.review || action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;