import express from "express";
import {registerUser, verifyUser, logIn, getMe, logOut, forgotPassword, resetPassword} from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = express.Router();

router
    .post("/register", registerUser)
    .post("/verify/:userToken", verifyUser)
    .post("/log-in", logIn)
    .get("/me", isLoggedIn, getMe)
    .post("/log-out", isLoggedIn, logOut)
    .post("/forgot-password", forgotPassword)
    .post("/reset-password/:resetToken", resetPassword)

export default router;