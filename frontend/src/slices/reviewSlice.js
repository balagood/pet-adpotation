import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addReview, getReviews } from "../api/reviewService";

export const fetchReviews = createAsyncThunk(
  "reviews/get",
  async (petId) => {
    return await getReviews(petId);
  }
);

export const createReview = createAsyncThunk(
  "reviews/add",
  async (data) => {
    return await addReview(data);
  }
);

const slice = createSlice({
  name: "reviews",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default slice.reducer;