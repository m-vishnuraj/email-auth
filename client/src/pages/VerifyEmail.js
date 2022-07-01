import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
function VerifyEmail() {
  const [emailVerified, setEmailVerified] = useState("");
  const params = useParams();

  const verifyToken = async () => {
    try {
      toast.loading();
      const response = await axios.post("/api/auth/verifyemail", {
        token: params.token,
      });
      if (response.data.success) {
        setEmailVerified("true");
      } else {
        setEmailVerified("false");
      }
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      setEmailVerified("false");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="flex min-h-screen p-5 justify-center items-center">
      {emailVerified == "" && (
        <h1 className="text-primary text-4xl">
          Please wait we are verifying your email
        </h1>
      )}

      {emailVerified == "true" && (
        <h1 className="text-primary text-4xl">
          Your email verified successfully
        </h1>
      )}

      {emailVerified == "false" && (
        <h1 className="text-primary text-4xl">Invalid or Expired Token</h1>
      )}
    </div>
  );
}

export default VerifyEmail;
