import { configureStore } from "@reduxjs/toolkit";
import petReducer from "../slices/petSlice";
import applicationReducer from "../slices/applicationSlice"; 
import userReducer from "../slices/userSlice"
import favoriteReducer from "../slices/favoriteSlice"
import reviewReducer from "../slices/reviewSlice"
import shelterReviewReducer from "../slices/shelterReviewSlice";


export const store = configureStore({
  reducer: {
    pets: petReducer,   // register your pet slice here
    applications: applicationReducer,
    user:userReducer,
    favorites:favoriteReducer,
    reviews:reviewReducer,
    shelterReviews: shelterReviewReducer,
  },
});