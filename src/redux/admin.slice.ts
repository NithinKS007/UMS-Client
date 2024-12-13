import { createSlice } from "@reduxjs/toolkit";
import { AdminState} from "../types/redux.types";
import { fetchusers } from "./admin.thunk";
import { searchusers } from "./admin.thunk";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  isBlocked: boolean;
}

const initialState: AdminState = {
  users: [], 
  isLoading: false,
  error: null,
  search: "",
  sort: "",
  filter: "",
  direction:""
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
    setDirection: (state,action)=>{
      state.direction = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
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
        state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch users";
      })

      .addCase(searchusers.pending,(state)=>{
        state.isLoading = true
        state.error = null
      })
      .addCase(searchusers.fulfilled,(state,action)=>{

         state.isLoading = false
         state.users = action.payload
         state.error = null
      })
      .addCase(searchusers.rejected,(state,action)=>{
        state.isLoading = false
        state.error = typeof action.payload==="string" ? action.payload : "Failed to fetch searched users"
      })
  },
});
export const { setSearch, setSort, setFilter ,setDirection} = adminSlice.actions;

export default adminSlice.reducer;
