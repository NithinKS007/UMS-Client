interface Errors {
  [key: string]: string;
}
import {UserAuthFormData,SignState } from "../types/auth.types";

export const validateUserAuthForm = (
  formData: UserAuthFormData,
  formState: SignState
): Errors => {
  const errors: Errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character";
  }

  if (formState === "sign up") {
    if (!formData.fname) {
      errors.fname = "First Name is required";
    } else if (!nameRegex.test(formData.fname)) {
      errors.fname = "First Name can only contain letters and spaces";
    }
    if (!formData.lname) {
      errors.lname = "Last Name is required";
    } else if (!nameRegex.test(formData.lname)) {
      errors.lname = "Last Name can only contain letters and spaces";
    }
  }

  if (formState === "sign up") {
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format";
    }
  }

  return errors
};
