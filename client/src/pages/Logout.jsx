// src/components/Logout.js
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["access-token"]);

  const { enqueueSnackbar } = useSnackbar();
  const handleLogout = async () => {
    try {
      // Make a request to the server logout route
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/logout"
      );

      if (response.data.message === "Logout Successful") {
        // Clear the token cookie on the client-side
        removeCookie("access-token");
        const message = "Logout Successful";
        enqueueSnackbar(message, { variant: "success" });
      } else {
        setLogoutMessage("Logout Failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      setLogoutMessage(`An error occurred during logout: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
