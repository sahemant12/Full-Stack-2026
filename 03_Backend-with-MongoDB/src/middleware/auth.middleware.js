import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isLoggedIn = async (req, res, next) => {
    // get JWT token from cookies
    // validate it
    // verify it using JWT_SECRET and get data from token
    // add decoded data to req.user
    // Yes, LogIn
    const jwtToken = req.cookies?.authToken;
    if(!jwtToken){
        res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
    try{
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        if(!decoded){
            res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
    req.user = decoded;
    next();
    }
    catch(error){
        res.status(500).json({
            message: "Failed to login",
            success: false,
            error: error.message
        });
    }
};

export default isLoggedIn;