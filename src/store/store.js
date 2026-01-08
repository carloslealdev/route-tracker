import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { routegramSlice } from "./routegram/routegramSlice";
import { uiSlice } from "./ui/uiSlice";
import { adminSlice } from "./admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    routegram: routegramSlice.reducer,
    ui: uiSlice.reducer,
    admin: adminSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
