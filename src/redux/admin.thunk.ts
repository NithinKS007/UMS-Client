import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../config/axios";

export const fetchusers = createAsyncThunk(
  "admin/fetchusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get("/admins/users");
      return response.data.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch users");
      }
    }
  }
);

export const searchusers = createAsyncThunk(
  "admin/search",
  async (
    { search, sort, filter ,direction}: { search: string; sort: string; filter: string ,direction:string},

    
    
    { rejectWithValue }
  ) => {
    try {
      console.log("values",search, sort, filter ,direction)
      const response = await axiosinstance.get(`/admins/search`, {
        params: {
          search: search,
          sort: sort,
          filter: filter,
          direction:direction
        },
      });
      console.log("response received for search", response);
      return response.data.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch search users");
      }
    }
  }
);
