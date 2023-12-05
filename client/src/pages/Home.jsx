import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import { Link } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);
  {
    console.log("hello from client side ");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://blog-mern-backend-api.vercel.app/api/v1/post"
        );
        console.log("Response:", response.data);
        setPosts(response.data.reverse());
        // console.log("Response:", response.data);
      } catch (error) {
        console.error("Axios Error:", error.message);
        // Check if 'response' property exists before accessing 'data'
        if (error.response) {
          console.error("Error Details:", error.response.data);
        } else {
          console.error("No response received");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl  font-bold mb-8 text-black sm:text-4xl">
        Latest Posts
      </h1>
      {posts.map((post) => (
        <Link to={`/DetailPost/${post._id}`} key={post._id}>
          <Post
            id={post._id}
            file={post.file}
            description={post.description}
            title={post.title}
          />
        </Link>
      ))}
    </div>
  );
};

export default Home;
