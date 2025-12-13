import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isRoutegramModalOpen: false,
    typeRoutegramToEdit: null,
  },
  reducers: {
    onOpenRoutegramModal: (state, { payload }) => {
      state.isRoutegramModalOpen = true;
      state.typeRoutegramToEdit = payload;
    },

    onCloseRoutegramModal: (state) => {
      state.isRoutegramModalOpen = false;
      state.typeRoutegramToEdit = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCloseRoutegramModal, onOpenRoutegramModal } = uiSlice.actions;
