import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();


const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hey! Welcome to LEETLAB🔥");
});

app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening on PORT: ${process.env.PORT}`);
})