import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isRoutegramModalOpen: false,
    typeRoutegramToEdit: null,
    isUpdating: false,
  },
  reducers: {
    onOpenRoutegramModal: (state, { payload }) => {
      state.isRoutegramModalOpen = true;
      state.typeRoutegramToEdit = payload;
    },

    onCloseRoutegramModal: (state) => {
      state.isRoutegramModalOpen = false;
      state.typeRoutegramToEdit = null;
      state.isUpdating = false;
    },
    onUpdating: (state, { payload }) => {
      state.isUpdating = true;
      state.isRoutegramModalOpen = true;
      state.typeRoutegramToEdit = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCloseRoutegramModal, onOpenRoutegramModal, onUpdating } =
  uiSlice.actions;
