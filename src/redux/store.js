import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slice/todoSlice'
import productReducer from './slice/productSlice'
import authReducer  from "./slice/authSlice"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        product: productReducer,
        auth: authReducer 
    }
});