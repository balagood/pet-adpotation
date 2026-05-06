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
  initialState: { list: [],loading:false,error:null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFav.fulfilled, (state, action) => {
          state.list.push(action.payload);
      })

      .addCase(fetchFavorites.pending, (state) => {
          state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
            
      /*
      comment the old code
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.list = action.payload;
      })*/

      /* .addCase(removeFav.fulfilled, (state, action) => {
          state.list = state.list.filter(
          (f) => f.petId?._id !== action.payload.petId
        );
      }); */

      .addCase(removeFav.fulfilled, (state, action) => {
        const petId = action.payload;

  state.list = state.list.filter(
    (item) => String(item.petId?._id || item.petId) !== String(petId)
  );
      });
      //comment the old code
      /*.addCase(removeFav.fulfilled, (state, action) => {  
            state.list = state.list.filter(
                (f) =>
                !(
                    f.userId === action.payload.userId &&
                    f.petId._id === action.payload.petId
                )
            );
      });*/
    },
});

export default slice.reducer;