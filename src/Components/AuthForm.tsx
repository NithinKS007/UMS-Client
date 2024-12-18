import React, { useState } from "react";
import { validateUserAuthForm } from "../utils/validateForms";
import { Errors, UserAuthFormData, SignState } from "../types/auth.types";
import axiosinstance from "../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate  } from "react-router-dom";
import { setUser } from "../redux/auth/auth.slice";
import { useEffect } from "react";


const AuthForm: React.FC = () => {
  const [signState, setSignState] = useState<SignState>("sign in");
  const [formData, setFormData] = useState<UserAuthFormData>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    setErrors({});
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
    )[name];

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage || "",
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
        dispatch(setUser(response.data.data.userData))
        console.log("response from signin", response.data.data.userData);
        toast.success(response.data.message);

        response.data.data.userData.role==="user" ? navigate("/home") : navigate("/dashboard")
        
      } else {
        response = await axiosinstance.post("/users/signup", {
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
        console.log("response from signup", response);
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
      toast.error(`${error.response.data.message}`)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {signState === "sign in" ? "Sign In" : "Create Account"}
        </h2>
        <form className="space-y-4" onSubmit={handleUserAuth}>
          {signState === "sign up" && (
            <>
              <div>
                <input
                  value={formData.fname}
                  onChange={handleChange}
                  name="fname"
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-gray-400 focus:outline-none focus:ring-0"
                />
                {errors.fname && (
                  <span className="text-red-500 text-sm">{errors.fname}</span>
                )}
              </div>
              <div>
                <input
                  value={formData.lname}
                  onChange={handleChange}
                  name="lname"
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-gray-400 focus:outline-none focus:ring-0"
                />
                {errors.lname && (
                  <span className="text-red-500 text-sm">{errors.lname}</span>
                )}
              </div>
            </>
          )}

          <div>
            <input
              value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-gray-400 focus:outline-none focus:ring-0"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          {signState === "sign up" && (
            <div>
              <input
                value={formData.phone}
                onChange={handleChange}
                name="phone"
                type="text"
                placeholder="Phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-gray-400 focus:outline-none focus:ring-0"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>
          )}

          <div>
            <input
              value={formData.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-gray-400 focus:outline-none focus:ring-0"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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

