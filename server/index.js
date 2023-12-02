import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import userRouter from "./Routes/User.js";
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/Blog")
  .then(() => console.log("DataBase is connected"));

// middle ware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/v1/user", userRouter);

app.listen(5000, () => {
  console.log("Server is working");
});
