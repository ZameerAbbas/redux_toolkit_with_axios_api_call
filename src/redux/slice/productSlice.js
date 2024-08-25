import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productApi = createAsyncThunk("product list fatch", async () => {
  const res = await fetch("https://dummyjson.com/products");
  return res?.json();
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        isLoading: false,
        ProductEntities: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(productApi.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(productApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductEntities = action.payload;
        })
        builder.addCase(productApi.rejected, (state, action) => {
            state.isError = true;
        })
    }
});

export default productSlice.reducer;