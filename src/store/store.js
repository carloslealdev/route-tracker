import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { routegramSlice } from "./routegram/routegramSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    routegram: routegramSlice.reducer,
  },
});
