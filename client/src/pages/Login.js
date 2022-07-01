import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUser = async () => {
    const userObj = {
      password,
      email,
    };
    try {
      toast.loading("Loading...");
      const response = await axios.post("/api/auth/login", userObj);
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("user", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  const sendResetPasswordLink = async () => {
    try {
      toast.loading("");
      const response = await axios.post("/api/auth/send-password-reset-link", {
        email,
      });
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setShowForgotPassword(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!showForgotPassword && (
        <div className="w-[400px] flex space-y-5 flex-col shadow-lg border border-gray-300">
          <h1 className="font-semibold text-2xl text-white bg-primary p-5 rounded-b-full text-center">
            Good to see you again
          </h1>

          <div className="flex flex-col space-y-5 p-5">
            <input
              type="text"
              className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="py-1 px-5 text-white bg-primary"
              onClick={loginUser}
            >
              LOGIN
            </button>
            <div className="flex justify-between items-end">
              <div className="flex space-x-10">
                <Link className="underline text-primary" to="/register">
                  Click Here To Register
                </Link>
                <h1
                  className="underline text-primary cursor-pointer"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForgotPassword && (
        <div className="flex flex-col space-y-5 w-[400px]">
          <h1 className="font-semibold text-3xl text-primary">
            Enter your email
          </h1>
          <input
            type="text"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="flex flex-col justify-between items-end space-y-5">
            <button
              className="py-1 px-5 text-white bg-primary w-full"
              onClick={sendResetPasswordLink}
            >
              SEND RESET PASSWORD LINK
            </button>
            <h1
              onClick={() => setShowForgotPassword(false)}
              className="cursor-pointer underline text-md text-primary text-left"
            >
              Click Here To Login
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
