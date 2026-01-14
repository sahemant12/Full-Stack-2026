import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isLoggedIn = async(req, res, next) =>{

    // get token from cookies
    // validate token
    // get data from token
       
    try{
        const token = req.cookies?.authToken;
        
        if(!token){
            return res.status(401).json({
                message:"Authentication failed",
                success:false
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);       
        req.user = decoded;

        next();
    }
    catch (error) {    
        return res.status(401).json({
            message:"Invalid or expired token",
            success:false,
            error: error.message
        });
    }
};
export default isLoggedIn;