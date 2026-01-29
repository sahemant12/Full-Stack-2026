import express from "express";
import {userRegister, userVerify, LogIn, getMe, logOut, forgotPassword, resetPassword} from "../controllers/auth.controller.js"
import {isLoggedIn} from "../middleware/auth.middleware.js";

const router = express.Router();

router
      .post("/register", userRegister)
      .post("/verify/:authToken", userVerify)
      .post("/log-in", LogIn)
      .get("/me", isLoggedIn, getMe)
      .post("/log-out", isLoggedIn, logOut)
      .post("/forgot-password", forgotPassword)
      .post("/reset-password/:resetToken", resetPassword)

export default router;