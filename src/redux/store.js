import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import realtimeDBSlice from "./slice/databaseSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    firestore: realtimeDBSlice,
  },
});
