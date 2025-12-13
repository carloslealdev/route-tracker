import { createSlice } from "@reduxjs/toolkit";

export const routegramSlice = createSlice({
  name: "routegram",
  initialState: {
    isLoading: false,
    errorMessage: undefined,
    activeRoute: null,
    loadedRoutes: [],
    isDrawing: false,
    draftPoints: [],
  },
  reducers: {
    onCheckingRoutegrams: (state, { payload }) => {
      state.isLoading = true;
      state.activeRoute = null;
      state.errorMessage = undefined;
    },

    onLoadRoutegram: (state, { payload }) => {
      state.isLoading = false;
      // state.activeRoute = payload;
      state.loadedRoutes = payload;
    },

    onSetDraftPoints: (state, { payload }) => {
      state.isDrawing = true;
      state.draftPoints = payload;
    },

    onAddPointToDraft: (state, { payload }) => {
      state.draftPoints.push(payload);
    },

    onRemoveLastPoint: (state, { payload }) => {
      if (state.draftPoints.length > 0) {
        state.draftPoints.pop();
      }
    },

    onClearDraft: (state, { payload }) => {
      state.draftPoints = [];
      state.isDrawing = false;
    },

    onSavingRoute: (state, { payload }) => {
      state.isLoading = true;
      state.errorMessage = undefined;
    },

    onSaveRoutegram: (state, { payload }) => {
      state.isLoading = false;
      state.activeRoute = payload;
      state.draftPoints = [];
      state.isDrawing = false;
      state.errorMessage = undefined;

      const index = state.loadedRoutes.findIndex(
        (route) => route._id === payload._id
      );

      if (index !== -1) {
        // ESCENARIO 1: ACTUALIZACIÓN
        // Si ya existe (el ID coincide), reemplazamos el objeto viejo por el nuevo
        state.loadedRoutes[index] = payload;
      } else {
        // ESCENARIO 2: CREACIÓN (Tu caso actual)
        // Si no existe, la empujamos al final del array
        state.loadedRoutes.push(payload);
      }
    },

    onSetErrorMessage: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onCheckingRoutegrams,
  onAddPointToDraft,
  onClearDraft,
  onLoadRoutegram,
  onRemoveLastPoint,
  onSaveRoutegram,
  onSavingRoute,
  onSetDraftPoints,
  onSetErrorMessage,
} = routegramSlice.actions;
