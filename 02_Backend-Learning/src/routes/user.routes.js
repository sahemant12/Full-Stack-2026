import express from "express";
import {registerUser, verifyUser, logIn, getMe, logOut, forgotPassword, resetPassword} from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = express.Router();

router
    .post("/register", registerUser)
    .get("/verify/:userToken", verifyUser)
    .post("/login", logIn)
    .get("/me", isLoggedIn, getMe)
    .post("/logout", isLoggedIn, logOut)
    .post("/forgot-password", forgotPassword)
    .post("/reset-password/:resetToken", resetPassword)

export default router;