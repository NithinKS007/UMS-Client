import { createAsyncThunk, } from "@reduxjs/toolkit";
import axiosinstance from "../config/axios";

export const signoutUser = createAsyncThunk(
    "auth/signoutUser",
    async (_, { rejectWithValue }) => {
      try {
        await axiosinstance.post("/users/signout");
      } catch (error:any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue("Something went wrong");
        }
      }
    }
  );