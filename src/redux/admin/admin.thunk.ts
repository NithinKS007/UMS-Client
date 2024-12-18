import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../config/axios";
import { User } from "../auth/auth.types";

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
    {
      search,
      sort,
      filter,
      direction,
    }: { search: string; sort: string; filter: string; direction: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("values", search, sort, filter, direction);
      const response = await axiosinstance.get(`/admins/search`, {
        params: {
          search: search,
          sort: sort,
          filter: filter,
          direction: direction,
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

export const getuserDetails = createAsyncThunk(
  "admin/fetchuserDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admins/users/${id}`);
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

export const updateuserDetails = createAsyncThunk(
  "admin/updateuserDetails",

  async (
    { id, userData }: { id: string; userData: User },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosinstance.put(`/admins/users/${id}`, userData);
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

export const deleteuser = createAsyncThunk(
  "admin/deleteuser",

  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.delete(`/admins/users/${userId}`);

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

export const updateUserBlockStatus = createAsyncThunk(
  "admin/updateUserBlockStatus",
  async (
    { userId, blockStatus }: { userId: string; blockStatus: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosinstance.patch(`/admins/users/${userId}`, {
        blockStatus,
      });

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

export const createUser = createAsyncThunk(
  "admin/createUser",
  async (newuserData: User, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post(`/admins/adduser/`, {
        newuserData,
      });
      console.log("action pay", response.data.data);
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
