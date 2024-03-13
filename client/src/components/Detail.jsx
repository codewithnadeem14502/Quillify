import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useContext } from "react";
import { userContext } from "../App";
import HTMLReactParser from "html-react-parser";

const Detail = ({ id, file, title, description, username }) => {
  const content = HTMLReactParser(description);
  const navigate = useNavigate();
  const user = useContext(userContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeletePost = async (id) => {
    try {
      const respond = await axios.delete(
        `http://localhost:9000/api/v1/post/deletepost/${id}`
      );

      const message = respond.data.message;

      if (message === "Deleted Successfully") {
        enqueueSnackbar(message, { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div className="bg-white p-9 rounded-lg shadow-md mx-auto mt-8">
      <div className="relative flex items-center justify-center aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-lg">
        <img
          src={`http://localhost:9000/Images/${file}`}
          alt={title}
          className="rounded-lg object-cover w-[90%] h-[400px] transition-transform transform hover:scale-105 border border-black"
        />
      </div>

      <div className="flex flex-col items-center text-center mb-6">
        <p className="font-semibold text-lg mb-2">Created by: {username}</p>
        {username === user.username && (
          <div className="mt-4 flex space-x-4">
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

      <div className="bg-slate-100 rounded-md">
        <h1 className="text-4xl font-bold mb-4 px-5">{title}</h1>
        <div className="text-gray-800 px-5 mb-6">{content}</div>
      </div>
    </div>
  );
};

export default Detail;
