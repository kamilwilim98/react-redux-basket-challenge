import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

export default store;
