import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    routegrams: [],
    isLoading: false,
    activeUser: null,
    dashboardStats: {
      totalEmployees: 0,
      totalRoutegrams: 0,
      longestRoute: null,
      shortestRoute: null,
      distanceRangeGraph: null,
    },
    isLoadingDashboardStats: false,
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
      // state.users = state.users.map((user) =>
      //   user?._id === payload?._id ? payload : user,
      // );
      state.users = state.users.map((user) => {
        if (user?._id === payload?._id) {
          // Retornamos el usuario existente sobreescrito con los nuevos datos del payload.
          // Esto asegura que si payload no trae 'routegrams', se mantengan los viejos (opcional, depende de tu logica)
          return { ...user, ...payload };
        }
        return user;
      });
      state.isLoading = false;
    },

    onLoadDashboardStats: (state, { payload }) => {
      state.dashboardStats = payload;
      state.isLoadingDashboardStats = false;
    },

    onSetIsLoadingDashboardStats: (state, { payload }) => {
      state.isLoadingDashboardStats = true;
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
  onLoadDashboardStats,
  onSetIsLoadingDashboardStats,
} = adminSlice.actions;
