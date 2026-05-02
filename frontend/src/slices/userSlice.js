import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api/userService";

/* export const register = createAsyncThunk("user/register", async (data) => {
  return await registerUser(data);
}); */

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      return await registerUser(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* export const login = createAsyncThunk("user/login", async (data) => {
  return await loginUser(data);
}); */

export const login = createAsyncThunk("user/login",async (data, { rejectWithValue }) => {
    try {
      return await loginUser(data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid credentials"
      );
    }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token")|| null,
    loading: false,
    error:null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;  
        state.token =  action.payload.token || action.payload.accessToken;

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state,action) => {
        state.loading = false;
        state.error= action.payload
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;