interface Errors {
  [key: string]: string;
}

import { UserAuthFormData, SignState } from "../types/auth.types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^[0-9]{10}$/;
const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i;
const designationRegex = /^[A-Za-z\s]+$/;

const validateEmail = (email: string): string => {
  if (!email) return "*Email is required";
  if (!emailRegex.test(email)) return "*Invalid email format";
  return "";
};

const validatePassword = (password: string): string => {
  if (!password) return "*Password is required";
  if (!passwordRegex.test(password)) {
    return "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character";
  }
  return "";
};

const validateName = (name: string | undefined): string => {
  if (!name) return "*Name is required";
  if (!nameRegex.test(name)) return "*Name can only contain letters and spaces";
  return "";
};

const validatePhone = (phone: string | undefined): string => {
  if (!phone) return "*Phone number is required";
  if (!phoneRegex.test(phone)) return "*Invalid phone number format";
  return "";
};

const validateAddress = (address: string | undefined): string => {
  if (!address) return "*Address is required";
  if (address.length < 10)
    return "*Address should be at least 10 characters long";
  return "";
};

const validateImageUrl = (imageUrl: string ): string => {
  if (!imageRegex.test(imageUrl))
    return "*Invalid image URL. Must be a valid URL with an image extension (.jpg, .png)";
  return "";
};

const validateDesignation = (designation: string): string => {
  if (!designationRegex.test(designation))
    return "*Designation can only contain letters and spaces";
  return "";
};

const validateCompanyName = (companyName: string): string => {
  if (companyName.length < 3)
    return "*Company Name should be at least 3 characters long";
  return "";
};

const validateRole = (role: string | undefined): string => {
  const validRoles = ["admin", "user"];
  if (!role) return "*Role is required";
  if (!validRoles.includes(role)) return "*Invalid role selected";
  return "";
};

export const validateUserAuthForm = (
  formData: UserAuthFormData,
  formState: SignState
): Errors => {
  const errors: Errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password as string);
  if (passwordError) errors.password = passwordError;

  if (formState === "sign up") {
    const fnameError = validateName(formData.fname);
    if (fnameError) errors.fname = fnameError;

    const lnameError = validateName(formData.lname);
    if (lnameError) errors.lname = lnameError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;
  }

  return errors;
};
export const validateProfileForm = (formData: UserAuthFormData) => {
  const errors: Errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password as string);
  if (passwordError) errors.password = passwordError;

  const fnameError = validateName(formData.fname);
  if (fnameError) errors.fname = fnameError;

  const lnameError = validateName(formData.lname);
  if (lnameError) errors.lname = lnameError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const addressError = validateAddress(formData.address);
  if (addressError) errors.address = addressError;

  const imageUrlError = validateImageUrl(formData.imageUrl || "");
  if (imageUrlError) errors.imageUrl = imageUrlError;
  
  const designationError = formData.designation ? validateDesignation(formData.designation) : undefined;
  if (designationError) {
    errors.designation = designationError;
  }
 
const companyNameError = formData.companyName ? validateCompanyName(formData.companyName) : undefined;
if (companyNameError) errors.companyName = companyNameError;


  const roleError = validateRole(formData.role);
  if (roleError) errors.role = roleError;

  return errors;
};
