import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../config/axios";
import { User } from "./auth.types";

export const signoutUser = createAsyncThunk(
  "auth/signoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosinstance.post("/users/signout", {});
    } catch (error: any) {
      console.log("error", error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

export const updateCurrentuserProfile = createAsyncThunk(
  "auth/updateCurrentuserProfile",
  async ({ userData }: { userData: User }, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.put(`/users/update`, userData);

      return response.data.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch user details");
      }
    }
  }
);
