// const { createSlice } = require("@reduxjs/toolkit");

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    user: {},
    errorMessage: undefined,
    isSubmitting: false,
  },
  reducers: {
    onChecking: (state, { payload }) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },

    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },

    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },

    onClearErrorMessage: (state, { payload }) => {
      state.errorMessage = undefined;
    },

    onSetIsSubmitting: (state) => {
      state.isSubmitting = true;
    },

    onSetIsSubmitted: (state) => {
      state.isSubmitting = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
  onSetIsSubmitting,
  onSetIsSubmitted,
} = authSlice.actions;
