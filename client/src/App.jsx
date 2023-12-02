import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState({});
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/user/")
      .then((user) => {
        console.log(user);
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;
