import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 9995;

app.use(express.json());

app.get("/check", (req, res)=>{
    res.send("Hello Hemant");
});



app.listen(PORT, ()=>{
    console.log(`app is listening on PORT: ${PORT}`);
});