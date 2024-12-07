import React, { useState } from "react";

type SignState = "sign in" | "sign up";

const AuthForm: React.FC = () => {
  const [signState, setSignState] = useState<SignState>("sign in");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {signState === "sign in" ? "Sign in" : "Create Account"}
        </h2>
        <form className="space-y-4">
          {signState === "sign up" && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {signState === "sign up" && (
            <div>
              <input
                type="text"
                placeholder="Phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
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
      </div>
    </div>
  );
};

export default AuthForm;
