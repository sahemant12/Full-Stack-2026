import User from "../models/auth.model.js";
import crypto from "crypto";
import sendMail from "../utils/mail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userRegister = async (req, res) => {
    // get data(name, email, password)
    // validate data
    // check email exist in db or not
    // create user in db
    // create verification token
    // save token in db
    // send token to user's email for verification

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({
            message: "All fields are required"
        });
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(409).json({
                message: "User already exist"
            });
        }

        const newUser = await User.create(req.body);

        const token = crypto.randomBytes(32).toString("hex");
        newUser.verificationToken = token;
        await newUser.save();

        //send token via email for verification
        await sendMail(token, email, "Verify email");

        res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    }
    catch(error){
        res.status(500).json({
            message: "Registration failed",
            success: false,
            error: error.message
        });
    }
};


const userVerify = async (req, res) => {
    // get token
    // validate token
    // find user based on token in db
    // make verificationToken field to null
    // mark isVerified to true
    // save db

    const {authToken} = req.params;

    if(!authToken){
        res.status(404).json({
            message: "Token not found"
        });
    }
    try{
        const user = await User.findOne({verificationToken: authToken});

        if(!user){
            res.status(401).json({
                message: "Invalid token"
            });
        }

        user.verificationToken = null;
        user.isVerified = true;
        await user.save();

        res.status(200).json({
            message: "User verified successfully",
            success: true
        });
    }
    catch(error){
        res.status(500).json({
            message: "Verification failed",
            success: false,
            error: error.message
        });
    }
};
const LogIn = async (req, res) => {
    // get email, password
    // validate it
    // check email exist and verified
    // compare password
    // generate JWT token
    // send token to user's cookie
    // LogIn successful

    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            message: "All fields are required"
        });
    }
    try{
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(!existingUser || !existingUser.isVerified){
            res.status(400).json({
                message: "Invalid user"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        console.log(isPasswordMatch);
        if(!isPasswordMatch){
            res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const payload = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        }
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:'24h'});

        const cookieOptions = {
            http: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",  
            maxAge: 24*60*60*1000
        };
        res.cookie("authToken", jwtToken, cookieOptions);

        res.status(200).json({
            message: "Login successful",
            success: true
        });

    }
    catch(error){
        res.status(401).json({
            message: "Login failed",
            success: false,
            error: error.message
        });
    }
};
const getMe = async (req, res) => {
    // check isLoggedIn
    // send req.user decoded data to user's
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            res.status(404).json({
            message: "User not found",
            success: false
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get user",
            success: false,
            error: error.message
        });
    }

    
};
const logOut = async (req, res) => {
    // check isLoggedIn
    // make JWT cookie expires
    try {
        res.cookie("authToken", "", {expires: new Date(0)});
        res.status(200).json({
            message: "loggout successfully",
            success: true
        });
    } catch (error) {
            return res.status(500).json({
            error: error.message,
            success: false,
        }); 
    }
};
const forgotPassword = async (req, res) => {
    // get email
    // validate it
    // find user based on email
    // generate forgetPassword token and expired time
    // store token in db
    // send token via email to user's for resetPassword
    const {email} = req.body;
    if(!email){
        res.status(400).json({
            message: "Invalid email",
            success: false
        });
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                message: "Invalid user",
                success: false
            });
        }

        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = Date.now() + 1000*60*10;
        await user.save();

        // send token to user's email
        await sendMail(resetPasswordToken, email, "reset your password");

        res.status(200).json({
            message: "check your email for reset password",
            success: true
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false,
            message: "Failed to reset Password"
        });
    }
};
const resetPassword = async (req, res) => {
    // get token from params and newPassword from req.body
    // validate token and newPassword
    // find user based on token
    // set password value to new password
    // resetPassword successful
    const {resetToken} = req.params;
    const {password} = req.body;

    if(!resetToken || !password){
        res.status(400).json({
            message: "Invalid token or password",
            success: false
        });
    }
    try {
        const user = await User.findOne({resetPasswordToken: resetToken, resetPasswordExpires: {$gt: Date.now()}});
        if(!user){
            res.status(400).json({
                message: "Invalid token",
                success: false
            });
        }
        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({
            message: "Reset password successful",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Reset password failed",
            success: false,
            error: error.message
        });
    }
};

export {userRegister, userVerify, LogIn, getMe, logOut, forgotPassword, resetPassword};