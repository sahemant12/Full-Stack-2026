import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


async function db() {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("DB is Connected");       
    }
    catch(err){
        console.log(`DB is not Connected. Err: ${err}`);
        process.exit(1); // It immediately stops the Node.js process(Server) and exits.      
    };
}

export default db;