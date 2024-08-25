import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const loginApi = createAsyncThunk("auth/login", async (credentials) => {
  const res = await axios.post("https://dummyjson.com/auth/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data; 
});

const authSlice = createSlice({
  name: "Authlogin",
  initialState: {
    isLoading: false,
    loginData: null, 
    loginError: null,
  },
  extraReducers: (builder) => {
    
    builder.addCase(loginApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginData = action.payload;
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.isLoading = false;
      state.loginError = action.error.message;
    });
  },
});

export default authSlice.reducer;
