import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const loginApi = createAsyncThunk("auth/login", async (credentials) => {
  const res = await axios.post("https://dummyjson.com/auth/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  localStorage.setItem('token', res.data.token);
  return res.data; 
});

const token1 = localStorage.getItem('token');
export const fetchUserData = createAsyncThunk(
    "auth/fetchUserData",
    async () => {
      const res = await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          'Authorization': `Bearer ${token1}`,
        },
      });
      return res.data;
    }
  );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    loginData: null, 
    loginError: null,
    userData: null, 
    userDataError: null,
  },
  extraReducers: (builder) => {
    
    builder.addCase(loginApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginData = action.payload;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.isLoading = false;
      state.loginError = action.error.message;
    });
    builder.addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      });
      builder.addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.userDataError = action.error.message;
      });
  },
});

export default authSlice.reducer;
