import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../api/favoriteService";

export const fetchFavorites = createAsyncThunk(
  "favorites/get",
  async (userId) => {
    return await getFavorites(userId);
  }
);

export const addFav = createAsyncThunk(
  "favorites/add",
  async (data) => {
    return await addFavorite(data);
  }
);

export const removeFav = createAsyncThunk(
  "favorites/remove",
  async (data) => {
    await removeFavorite(data);
    return data;
  }
);

const slice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Add Favorite
      .addCase(addFav.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Fetch Favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove Favorite
      .addCase(removeFav.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) =>
            String(item.petId?._id || item.petId) !==
            String(action.payload.petId)
        );
      });
  },
});

export default slice.reducer;