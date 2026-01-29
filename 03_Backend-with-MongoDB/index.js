import express from "express";
import dotenv from "dotenv";
import db from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/auth.routes.js"

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    method: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

app.get("/hello", (req, res)=>{
    res.send("HELLO HEMANT!")
});

app.use("/api/v1/users", router);

async function startServer(){
    // DB Connection
    await db();

    app.listen(port, ()=>{
        console.log(`app is listening on PORT: ${port}`); 
    })
}

startServer();