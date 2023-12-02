// src/components/Logout.js
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["access-token"]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/logout"
      );

      if (response.data.message === "Logout Successful") {
        removeCookie("access-token");
        const message = "Logout Successful";
        enqueueSnackbar(message, { variant: "success" });
        setTimeout(() => {
          navigate(0);
        }, 1000);
        navigate(0);
      } else {
        setLogoutMessage("Logout Failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <button
        className="p-3 bg-slate-400 rounded-md hover:bg-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
