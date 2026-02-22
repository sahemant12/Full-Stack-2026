import app from "./app.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 9995;


app.use("/api/v1/users", authRouter);



app.listen(PORT, ()=>{
    console.log(`app is listening on PORT: ${PORT}`);
});