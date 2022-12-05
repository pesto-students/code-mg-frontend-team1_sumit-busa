import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Authentication, AuthenticationState } from "../models/redux.interface";

// Define a type for the slice state

const initialState: AuthenticationState = {
  value: { kind: "LOADING" },
};
export const authSlice = createSlice({
  name: "authentication",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    hydrate: (_state, action) => {
      return action.payload;
    },
    authenticate: (
      state,
      action: PayloadAction<{ payload: Authentication; token: string }>
    ) => {
      state.value = {
        kind: "AUTHORIZED",
        authToken: action.payload.token,
        payload: action.payload.payload,
      };
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.value = {
        kind: "UNAUTHORIZED",
      };
      localStorage.setItem("auth", JSON.stringify(state));
    },
  },
});

export const { authenticate, logout, hydrate } = authSlice.actions;

export default authSlice.reducer;
