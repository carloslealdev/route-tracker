import { createSlice } from "@reduxjs/toolkit";
import { onChecking } from "../auth/authSlice";

export const routegramSlice = createSlice({
  name: "routegram",
  initialState: {
    isLoading: false,
    errorMessage: undefined,
    activeRoute: null,
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
      state.activeRoute = payload;
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

    onRouteSaved: (state, { payload }) => {
      state.isLoading = false;
      state.activeRoute = payload;
      state.draftPoints = [];
      state.isDrawing = false;
      state.errorMessage = undefined;
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
  onRouteSaved,
  onSavingRoute,
  onSetDraftPoints,
  onSetErrorMessage,
} = routegramSlice.actions;
