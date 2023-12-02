import express from "express";
import { Create } from "../controllers/Post.js";
import { isAuth } from "../middlewars/isAuth.js";
import multer from "multer";
import path from "path";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/create", isAuth, upload.single("file"), Create);

export default router;
