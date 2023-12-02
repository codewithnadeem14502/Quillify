import { Login, Register, Logout } from "../controllers/User.js";
import express from "express";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", Logout);

export default router;
