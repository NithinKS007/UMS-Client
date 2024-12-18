import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "./admin.types";
import {
  createUser,
  deleteuser,
  fetchusers,
  getuserDetails,
  updateUserBlockStatus,
  updateuserDetails,
} from "./admin.thunk";
import { searchusers } from "./admin.thunk";

const initialState: AdminState = {
  users: [],
  search: "",
  filter: "",
  sort: "",
  direction: "",
  userDetails: {},
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //fetch users data
      .addCase(fetchusers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchusers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch users";
      })

      //search users

      .addCase(searchusers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchusers.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.users = action.payload),
          (state.error = null);
      })
      .addCase(searchusers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch searched users";
      })
      //get user Data

      .addCase(getuserDetails.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(getuserDetails.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.userDetails = action.payload),
          (state.error = null);
      })
      .addCase(getuserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch user details";
      })

      //update user data

      .addCase(updateuserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateuserDetails.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.isLoading = false;
        state.userDetails = updatedUser;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );

        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...updatedUser };
        }
        state.error = null;
      })
      .addCase(updateuserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update user details";
      })
      //delete user details
      .addCase(deleteuser.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.isLoading = false;
        const userIdToDelete = action.meta.arg.userId;
        state.users = state.users.filter((user) => user._id !== userIdToDelete);
        state.error = null;
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete user";
      })

      //toggle block and unblock status
      .addCase(updateUserBlockStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserBlockStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(updateUserBlockStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update block status";
      })

      //Creating user
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;

        const userOtherThanAdmin = action.payload;

        if (userOtherThanAdmin.role !== "admin") {
          state.users = [...state.users, userOtherThanAdmin];
        }
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add new user to the database";
      });
  },
});
export const { setSearch, setSort, setFilter, setDirection } =
  adminSlice.actions;

export default adminSlice.reducer;
