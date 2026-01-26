import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    routegrams: [],
    isLoading: false,
    activeUser: null,
  },
  reducers: {
    onLoadUsers: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    },

    onLoadRoutegrams: (state, { payload }) => {
      state.routegrams = payload;
      state.isLoading = false;
    },

    onSetIsLoading: (state, { payload }) => {
      state.isLoading = true;
    },

    onSetActiveUser: (state, { payload }) => {
      state.activeUser = payload;
    },
    onDeleteUser: (state, { payload }) => {
      state.users = state.users.filter((user) => user._id !== payload);
      state.isLoading = false;
    },

    onUpdateUser: (state, { payload }) => {
      state.users = state.users.map((user) =>
        user?._id === payload?._id ? payload : user,
      );
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onLoadUsers,
  onLoadRoutegrams,
  onSetIsLoading,
  onSetActiveUser,
  onDeleteUser,
  onUpdateUser,
} = adminSlice.actions;
