import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    isLoading: false,
    activeUser: null,
  },
  reducers: {
    onLoadUsers: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    },

    onSetIsLoading: (state, { payload }) => {
      state.isLoading = true;
    },

    onSetActiveUser: (state, { payload }) => {
      state.activeUser = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLoadUsers, onSetIsLoading, onSetActiveUser } =
  adminSlice.actions;
