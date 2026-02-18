import express from "express";
import { register, logIn, logOut, getMe } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes
    .post("/register", register)
    .post("/log-in", logIn)
    .post("/log-out", logOut)
    .get("/me", getMe)

export default authRoutes;