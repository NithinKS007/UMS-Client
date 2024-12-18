import { UserAuthFormData, Errors, SignState } from "../types/auth.types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^[0-9]{10}$/;
const designationRegex = /^[A-Za-z\s]+$/;

const validatefName = (name: string): string => {
  if (!name?.trim()) return "*First name is required";
  if (!nameRegex.test(name))
    return "* Name can only contain letters and spaces";
  return "";
};
const validatelName = (name: string): string => {
  if (!name?.trim()) return "*Last name is required";
  if (!nameRegex.test(name)) return "*Name can only contain letters and spaces";
  return "";
};

const validateEmail = (email: string): string => {
  if (!email.trim()) return "*Email is required";
  if (!emailRegex.test(email)) return "*Invalid email format";
  return "";
};
const validatePhone = (phone: string): string => {
  if (!phone.toString().trim()) return "*Phone number is required";
  if (!phoneRegex.test(phone)) return "*Invalid phone number format";
  return "";
};
const validatePassword = (password: string): string => {
  if (!password.trim()) return "*Password is required";
  if (!passwordRegex.test(password)) {
    return "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character";
  }
  return "";
};

const validateAddress = (address: string): string => {
  if (address && address.length < 2) {
    return "*Address should be at least 2 characters long";
  }
  return "";
};

const validateDesignation = (designation: string): string => {
  if (designationRegex && !designationRegex.test(designation)) {
    return "*Designation can only contain letters and spaces";
  }
  return "";
};

const validateCompanyName = (companyName: string): string => {
  if (companyName && companyName.length < 3) {
    return "*Company Name should be at least 3 characters long";
  }
  return "";
};

const validateRole = (role: string): string => {
  const validRoles = ["admin", "user"];
  if (!role.trim()) return "*Role is required";
  if (!validRoles.includes(role)) return "*Invalid role selected";
  return "";
};

export const validateUserAuthForm = (
  formData: UserAuthFormData,
  formState: SignState

): Errors => {
  const errors: Errors = {};

  if (formState === "sign up") {
    const fnameError = validatefName(formData.fname as string);
    if (fnameError) errors.fname = fnameError;

    const lnameError = validatelName(formData.lname as string);
    if (lnameError) errors.lname = lnameError;

    const phoneError = validatePhone(formData.phone as string);
    if (phoneError) errors.phone = phoneError;
  }
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password as string);
  if (passwordError) errors.password = passwordError;

  return errors;
}


export const validateProfileForm = (formData: UserAuthFormData): Errors => {
  const errors: Errors = {};

  const fnameError = validatefName(formData.fname as string);
  if (fnameError) errors.fname = fnameError;

  const lnameError = validatelName(formData.lname as string);
  if (lnameError) errors.lname = lnameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(formData.phone as string);
  if (phoneError) errors.phone = phoneError;

  if(formData.address) {
    const addressError = validateAddress(formData.address as string);
    if (addressError) errors.address = addressError;
  }
 
  if (formData.designation) {
    const designationError = validateDesignation(formData.designation as string);
    if (designationError) errors.designation = designationError;
  }

  if(formData.companyName) {
    const companyNameError = validateCompanyName(formData.companyName as string);
    if (companyNameError) errors.companyName = companyNameError;
  }

  return errors;
};

export const validateAdduserForm = (formData:UserAuthFormData):Errors=>{

  const errors: Errors = {};

  const fnameError = validatefName(formData.fname as string);
  if (fnameError) errors.fname = fnameError;

  const lnameError = validatelName(formData.lname as string);
  if (lnameError) errors.lname = lnameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(formData.phone as string);
  if (phoneError) errors.phone = phoneError;

  const passwordError = validatePassword(formData.password as string);
  if (passwordError) errors.password = passwordError;

  if(formData.address) {
    const addressError = validateAddress(formData.address as string);
    if (addressError) errors.address = addressError;
  }
 
  if (formData.designation) {
    const designationError = validateDesignation(formData.designation as string);
    if (designationError) errors.designation = designationError;
  }

  if(formData.companyName) {
    const companyNameError = validateCompanyName(formData.companyName as string);
    if (companyNameError) errors.companyName = companyNameError;
  }

  const roleError = validateRole(formData.role as string);
    if (roleError) errors.role = roleError;

  return errors;

}

export const imageValidation = (file: File) => {
  const fileType = file.type;
  const fileSize = file.size;

  if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(fileType)) {
    return "Only image files (JPEG, PNG, JPG, WEBP) are allowed.";
  }
  if (fileSize > 5 * 1024 * 1024) {
    return "File size should be less than 5MB.";
  }
  return ""; 
};

