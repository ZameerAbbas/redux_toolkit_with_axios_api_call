import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slice/todoSlice'
import productReducer from './slice/productSlice'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        product: productReducer
    }
});