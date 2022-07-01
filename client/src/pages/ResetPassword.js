import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const resetPassword = async () => {
    try {
      toast.loading();
      const response = await axios.post("/api/auth/reset-password", {
        password,
        token: params.token,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error("Expired or Invalid Link");
      }
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-300">
        <h1 className="font-semibold text-3xl text-primary">
          CHANGE YOUR PASSWORD
        </h1>

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
          value={confirmpassword}
        />

        <div className="flex justify-between items-end">
          <button
            className="py-1 px-5 text-white bg-primary"
            onClick={resetPassword}
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
