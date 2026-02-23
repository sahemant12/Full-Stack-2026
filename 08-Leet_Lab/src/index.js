import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 9995;

app.use(express.json());

app.get("/check", (req, res)=>{
    res.send("Hello Hemant");
});

app.use("/api/v1/auth", authRoutes);


app.listen(PORT, ()=>{
    console.log(`app is listening on PORT: ${PORT}`);
});