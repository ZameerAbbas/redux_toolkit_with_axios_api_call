import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database"; 
import { db } from "../../components/firebaseConfig"; 

export const fetchDataFromRealtimeDB = createAsyncThunk(
  "realtimeDB/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const dbRef = ref(db, "products"); 
      const snapshot = await get(dbRef); 
      if (snapshot.exists()) {
        const data = snapshot.val(); 
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })); 
        
        return formattedData;
      } else {
        return rejectWithValue("No data found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const realtimeDBSlice = createSlice({
  name: "realtimeDB",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromRealtimeDB.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDataFromRealtimeDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataFromRealtimeDB.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default realtimeDBSlice.reducer;
