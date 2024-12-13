import React from "react";
import { FaRegFileImage } from "react-icons/fa";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const AddUser: React.FC = () => {
  return (
    <div className="flex justify-center">
      <form className="flex flex-col rounded-md w-6/12 bg-white border-2 border-gray-200">
        <div className="p-4 border-b border-gray-300">
          <h2 className="font-semibold py-2 text-lg">Personal Information</h2>
          <div className="flex flex-row gap-4 mb-4">
            <div className="flex-1">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="fname"
                margin="normal"
              />
            </div>
            <div className="flex-1">
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lname"
                margin="normal"
              />
            </div>
          </div>
          <div className="mb-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              margin="normal"
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              margin="normal"
            />
          </div>
          <div className="mb-4">
            <TextField
              variant="outlined"
              fullWidth
              type="date"
              name="dateOfBirth"
              margin="normal"
            />
          </div>
        </div>
        <div className="p-4 border-b border-gray-300">
          <h2 className="font-semibold text-lg">Role</h2>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" name="role" label="Role">
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="p-4 border-b border-gray-300">
          <h2 className="font-semibold text-lg">Address</h2>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            name="address"
            margin="normal"
          />
        </div>
        <div className="p-4 border-b border-gray-300">
          <h2 className="font-semibold text-lg">Upload Photo</h2>
          <div className="flex items-center gap-6">
            <div className="border-2 border-gray-300 h-20 w-20 flex justify-center items-center rounded-md">
              <label className="text-3xl text-gray-500 cursor-pointer">
                <FaRegFileImage />
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className="m-4"
          sx={{
            backgroundColor: "#1D4ED8",
            padding: "10px 20px",
            borderRadius: "0.375rem",
            fontWeight: "700",
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
