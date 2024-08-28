
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../components/firebaseConfig'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const signUpApi = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginApi = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutApi = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUpApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutApi.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
