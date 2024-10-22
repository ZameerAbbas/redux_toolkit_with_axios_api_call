import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slice/authSlice";
import realtimeDBSlice from "./slice/databaseSlice";
import { combineReducers } from "redux";

// Create the persist configuration for auth slice
const persistConfig = {
  key: "auth",  // You can change this key if needed
  storage,      // This is for using localStorage to persist the data
  whitelist: ["auth"], // Only persist the auth slice
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  realtimeDB: realtimeDBSlice,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Turn off serializability check for redux-persist compatibility
    }),
});

// Create the persistor to be used with PersistGate
export const persistor = persistStore(store);
