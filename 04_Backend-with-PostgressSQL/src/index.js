import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9995;

app.listen(PORT, ()=>{
    console.log(`app is listening on PORT: ${PORT}`);
});