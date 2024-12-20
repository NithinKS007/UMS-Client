import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./auth.types";
import { signoutUser, updateCurrentuserProfile } from "./auth.thunk";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    signout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Signout user";
      })

      // Update authenticated user details

      .addCase(updateCurrentuserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCurrentuserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateCurrentuserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update current user details";
      });
  },
});

export const { setUser, setLoading, setError, signout } = authSlice.actions;
export default authSlice.reducer;
