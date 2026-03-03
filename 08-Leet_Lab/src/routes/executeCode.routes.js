import express from "express";

const executeRoutes = express.Router();

executeRoutes.post("/", authMiddleware , executeCode);

export default executeRoutes;