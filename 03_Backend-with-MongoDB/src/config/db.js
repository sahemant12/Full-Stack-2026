import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {

    try{
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("DB Connected successfuly");
    
    }catch(error){
        console.log(`error: ${error}`);
        process.exit(1);
}

}

export default db;