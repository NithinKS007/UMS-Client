import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { User } from "../redux/auth/auth.types";
import { imageValidation } from "../utils/validateForms";
import { Errors, UserAuthFormData } from "../types/auth.types";

interface ProfileProps {
  profileData: User | null;
  onSave: (updatedData: any, isEditMode: boolean) => void;
  validateForm: (formData: UserAuthFormData) => Errors;
}

const Profile: React.FC<ProfileProps> = ({
  profileData,
  onSave,
  validateForm,
}) => {
  const [updatedUser, setUpdatedUser] = useState<UserAuthFormData>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    designation: "",
    companyName: "",
    dateOfBirth: "",
    imageUrl: "",
    role: "",
  });

  const [newProfilePic, setNewProfilePic] = useState<
    null | string | ArrayBuffer
  >(null);
  const [errors, setErrors] = useState<Errors>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    designation: "",
    companyName: "",
    dateOfBirth: "",
    role: "",
  });

  useEffect(() => {
    if (profileData) {
      setUpdatedUser({
        fname: profileData.fname,
        lname: profileData.lname,
        email: profileData.email,
        phone: profileData.phone,
        password: "",
        address: profileData.address || "",
        designation: profileData.designation || "",
        companyName: profileData.companyName || "",
        dateOfBirth: profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
          : "",
        imageUrl: profileData.imageUrl || "",
        role: profileData.role || "",
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    const validationErrors = validateForm({
      ...updatedUser,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name as keyof Errors]: validationErrors[name as keyof Errors],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files?.[0];

      setErrors((prevErrors) => ({
        ...prevErrors,
        imageUrl: "",
      }));

      const error = imageValidation(file);
      if (error) {
        setErrors((preErrors) => ({
          ...preErrors,
          imageUrl: error,
        }));

        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewProfilePic(e.target.result);
          setUpdatedUser((prev) => ({
            ...prev,
            imageUrl: e.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSave = () => {
    const isEditMode = !!profileData;
    const validationErrors = validateForm(updatedUser);

    if (errors.imageUrl) {
      return;
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(updatedUser, isEditMode);
    resetForm();
  };

  const resetForm = () => {
    setUpdatedUser({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      designation: "",
      companyName: "",
      dateOfBirth: "",
      imageUrl: "",
      role: "",
    });
    setNewProfilePic(null);
    setErrors({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      designation: "",
      companyName: "",
      dateOfBirth: "",
      role: "",
      imageUrl: "",
    });
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-800 to-blue-500 p-6 px-12 flex items-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mr-4">
          <Avatar
            sx={{ width: 64, height: 64 }}
            src={
              newProfilePic
                ? typeof newProfilePic === "string"
                  ? newProfilePic
                  : ""
                : updatedUser?.imageUrl
            }
          />
        </div>
        <div>
          <Typography variant="h6" color="white">
            {profileData && `${profileData?.fname} ${profileData?.lname}`}
          </Typography>
        </div>
      </div>
      <Box p={6} display="grid" gridTemplateColumns="1fr 1fr" gap={6}>
        <Box>
          <Typography variant="h6" color="textPrimary">
            Personal Information
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="fname"
            margin="normal"
            value={updatedUser?.fname}
            onChange={handleInputChange}
            error={!!errors.fname}
            helperText={errors.fname}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lname"
            margin="normal"
            value={updatedUser?.lname}
            onChange={handleInputChange}
            error={!!errors.lname}
            helperText={errors.lname}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            name="phone"
            margin="normal"
            value={updatedUser?.phone}
            onChange={handleInputChange}
            type="tel"
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            margin="normal"
            value={updatedUser?.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          {!profileData && (
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              margin="normal"
              type="password"
              value={updatedUser?.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          )}
        </Box>
        <Box>
          <Typography variant="h6" color="textPrimary">
            Address and Job Information
          </Typography>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            margin="normal"
            value={updatedUser?.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            label="Designation"
            variant="outlined"
            fullWidth
            name="designation"
            margin="normal"
            value={updatedUser?.designation}
            onChange={handleInputChange}
            error={!!errors.designation}
            helperText={errors.designation}
          />
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            name="companyName"
            margin="normal"
            value={updatedUser?.companyName}
            onChange={handleInputChange}
            error={!!errors.companyName}
            helperText={errors.companyName}
          />
          <TextField
            variant="outlined"
            fullWidth
            type="date"
            name="dateOfBirth"
            margin="normal"
            value={updatedUser?.dateOfBirth}
            onChange={handleInputChange}
          />
          {!profileData && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={updatedUser?.role}
                onChange={handleRoleChange}
                error={!!errors.role}
               
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
              {errors.role && (
                 <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                 {errors.role}
               </Typography> )}
            </FormControl>
          )}
        </Box>
      </Box>

      <Box py={1} px={6}>
        <Typography variant="body1" color="textPrimary">
          Change Profile Picture
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          <Button variant="outlined" component="label">
            Upload New Picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Box>
        {errors.imageUrl && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginTop: "8px" }}
          >
            {errors.imageUrl}
          </Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="success" onClick={handleSave}>
          {profileData ? "Save Changes" : "Add User"}
        </Button>
      </Box>
    </div>
  );
};

export default Profile;
