import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const getData = async () => {
    toast.loading();
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get("/api/user/get-user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.dismiss();
      if (response.data.success) {
        setUserInfo(response.data.data);
      } else {
        localStorage.removeItem("user");
        navigate("/login");
        toast.error("Something went wrong");
      }
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/login");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (userInfo == null) {
      getData();
    }
  }, [userInfo]);

  return (
    userInfo !== null && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col space-y-5">
          <h1 className="text-5xl font-semibold text-primary">
            {userInfo?.name}
          </h1>
          <h1 className="text-5xl font-semibold text-primary">
            {userInfo?.email}
          </h1>
          <button
            className="border border-primary px-10 py-2 text-primary max-w-max"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    )
  );
}

export default Home;
