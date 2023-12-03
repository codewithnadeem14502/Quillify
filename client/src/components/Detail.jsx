import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useContext } from "react";
import { userContext } from "../App";
const Detail = ({ id, file, title, description, username }) => {
  const navigate = useNavigate();
  const user = useContext(userContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleDeletePost = async (id) => {
    try {
      const respond = await axios.delete(
        `http://localhost:5000/api/v1/post/deletepost/${id}`
      );

      const message = respond.data.message;
      // console.log("msss " + message);
      if (message == "Deleted Successfully") {
        enqueueSnackbar(message, { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar(message, { variant: "error" });
        // console.log(message);
      }
    } catch (error) {
      // console.log(error);
      enqueueSnackbar(error, { variant: "error" });
    }
  };
  return (
    <div className="bg-white p-9 rounded-lg shadow-md  mx-auto mt-8">
      <div className="relative flex items-center justify-center aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-lg">
        <img
          src={`http://localhost:5000/Images/${file}`}
          alt={title}
          className="rounded-lg object-cover w-[90%] h-[400px] transition-transform transform hover:scale-105 border border-black"
        />
      </div>

      <p className=" font-semibold px-5">Created by : {username} </p>
      <div className="bg-slate-100 mt-10 rounded-md h-auto">
        <h1 className="text-3xl font-bold mb-4 px-5">{title}</h1>
        <p className="text-gray-600 px-5">{description}</p>
      </div>

      {username === user.username && (
        <div className="mt-6 flex space-x-4">
          <Link
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            to={`/editpost/${id}`}
          >
            <FaEdit className="mr-2" />
            Edit
          </Link>
          <button
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
            onClick={() => handleDeletePost(id)}
          >
            <MdDelete className="mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Detail;
