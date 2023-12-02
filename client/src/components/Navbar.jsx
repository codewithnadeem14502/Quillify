// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import Logout from "../pages/Logout";
const Navbar = () => {
  const user = useContext(userContext);
  return (
    <div className="flex justify-between items-center text-center bg-green-500 p-5">
      <h1 className="text-white text-2xl font-bold">
        <Link to="/">BLOG-APP</Link>
      </h1>
      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link to="/create" className="text-white hover:text-gray-300">
          Create
        </Link>
        <Link to="/contact" className="text-white hover:text-gray-300">
          Contact
        </Link>
      </div>
      {user.username ? (
        <Logout />
      ) : (
        <Link to="/register" className="text-white hover:text-gray-300">
          Login/Register
        </Link>
      )}
    </div>
  );
};

export default Navbar;
