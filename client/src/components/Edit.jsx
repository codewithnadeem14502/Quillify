import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const respond = await axios.get(
          `http://localhost:5000/api/v1/post/detailpost/${id}`
        );
        // console.log(respond);

        setTitle(respond.data.title);
        setDescription(respond.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respond = await axios.post(
        `http://localhost:5000/api/v1/post/editpost/${id}`,
        { title, description }
      );

      const message = respond.data.message;
      // console.log("msss " + message);
      if (message == "Updated Successfully") {
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
    <div className="container mx-auto my-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              className="mt-1 p-2 border rounded w-full"
              rows="5"
              value={description}
              placeholder="Write your post description here"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
