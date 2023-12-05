import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import DetailPost from "./pages/DetailPost";
import Edit from "./components/Edit";

export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState({});
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://blog-backend-api-five.vercel.app/api/v1/user/")
      .then((user) => {
        // console.log(user);
        setUser(user.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DetailPost/:id" element={<DetailPost />} />
          <Route path="/About" element={<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editpost/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;
