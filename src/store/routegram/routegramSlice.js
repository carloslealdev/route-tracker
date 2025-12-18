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
      state.activeRoute = null;
      state.draftPoints = [];
      state.isDrawing = false;
      state.errorMessage = undefined;
      state.loadedRoutes.push(payload);
    },

    onUpdateRoutegram: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = undefined;
      state.isDrawing = false;
      state.draftPoints = [];
      state.activeRoute = null; // Cerramos el modal/limpiamos

      // Buscamos y reemplazamos solo la ruta que cambió
      state.loadedRoutes = state.loadedRoutes.map((route = {}) =>
        route._id === payload._id ? payload : route
      );
    },

    onSetErrorMessage: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
    onSetActiveRoutegram: (state, { payload }) => {
      state.activeRoute = payload;
    },

    onResetActiveRoutegram: (state) => {
      state.activeRoute = null;
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
  onUpdateRoutegram,
  onSavingRoute,
  onSetDraftPoints,
  onSetErrorMessage,
  onSetActiveRoutegram,
  onResetActiveRoutegram,
} = routegramSlice.actions;
