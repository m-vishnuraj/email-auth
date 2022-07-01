import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    if (password === confirmPassword) {
      const userObj = {
        name,
        password,
        email,
        confirmPassword,
      };
      try {
        toast.loading("Loading...");
        const response = await axios.post("/api/auth/register", userObj);
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Passwords Not Matched");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen space-x-40">
      <div className="w-[400px] flex space-y-5 flex-col shadow-lg border border-gray-300">
        <h1 className="font-semibold text-2xl text-white bg-primary p-5 rounded-b-full text-center">
          Welcome TO SHEY
        </h1>

        <div className="flex flex-col space-y-5 p-5">
          <input
            type="text"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
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
          <input
            type="password"
            className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          <div className="flex justify-between items-end">
            <Link className="underline text-primary" to="/login">
              Click Here To Login
            </Link>

            <button
              className="py-1 px-5 text-white bg-primary"
              onClick={registerUser}
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
