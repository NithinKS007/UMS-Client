import React, { useState } from "react";
import { validateUserAuthForm } from "../utils/validateForms";
import { Errors, UserAuthFormData, SignState } from "../types/auth.types";
import axiosinstance from "../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/auth/auth.slice";
import { useEffect } from "react";
import { TextField} from "@mui/material";
import { AppDispatch } from "../redux/store";

const AuthForm: React.FC = () => {
  const [signState, setSignState] = useState<SignState>("sign in");
  const [formData, setFormData] = useState<UserAuthFormData>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    fname:"",
    lname:"",
    email:"",
    phone:"",
    password:""
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    setErrors({
      fname:"",
      lname:"",
      email:"",
      phone:"",
      password:""
    });
  }, [signState]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const errorMessage = validateUserAuthForm(
      { ...formData, [name]: value },
      signState
    )[name as keyof Errors];

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleUserAuth = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const validationErrors = validateUserAuthForm(formData, signState);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let response;
      if (signState === "sign in") {
        response = await axiosinstance.post("/users/signin", {
          email: formData.email,
          password: formData.password,
        });
        dispatch(setUser(response.data.data.userData));
        toast.success(response.data.message);

        response.data.data.userData.role === "user"
          ? navigate("/home")
          : navigate("/dashboard");
      } else {
        response = await axiosinstance.post("/users/signup", {
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
        toast.success(response.data.message);
      }
      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
      });
      setErrors({});
    } catch (error: any) {
      console.log("API Error", error);
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="max-w-lg w-full p-6 bg-white border border-gray-300 rounded-md shadow-lg">
    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
      {signState === "sign in" ? "Sign In" : "Create Account"}
    </h2>
    <form className="space-y-4" onSubmit={handleUserAuth}>
      {signState === "sign up" && (
        <div className="flex space-x-4"> 
          <div className="flex-1">
            <TextField
              value={formData.fname}
              onChange={handleChange}
              name="fname"
              label="First Name"
              variant="outlined"
              fullWidth
              error={!!errors.fname}
              helperText={errors.fname}
            />
          </div>
          <div className="flex-1">
            <TextField
              value={formData.lname}
              onChange={handleChange}
              name="lname"
              label="Last Name"
              variant="outlined"
              fullWidth
              error={!!errors.lname}
              helperText={errors.lname}
            />
          </div>
        </div>
      )}

      <div>
        <TextField
          value={formData.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
        />
      </div>

      {signState === "sign up" && (
        <div>
          <TextField
            value={formData.phone}
            onChange={handleChange}
            name="phone"
            label="Phone"
            type="text"
            variant="outlined"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </div>
      )}

      <div>
        <TextField
          value={formData.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-800 text-white rounded-md"
      >
        {signState === "sign in" ? "Sign In" : "Sign Up"}
      </button>

      {signState === "sign up" ? (
        <div className="text-gray-600 flex">
          Already have an account?
          <div
            onClick={() => setSignState("sign in")}
            className="ml-2 font-medium cursor-pointer"
          >
            Sign In
          </div>
        </div>
      ) : (
        <div
          onClick={() => setSignState("sign up")}
          className="text-gray-600 flex"
        >
          New User ?
          <div className="ml-2 font-medium cursor-pointer">Sign Up</div>
        </div>
      )}
    </form>
    <p>pass:StrongPass1!</p>
  </div>
</div>

  );
};

export default AuthForm;
