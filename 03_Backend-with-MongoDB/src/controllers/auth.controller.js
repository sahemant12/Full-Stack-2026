import User from "../models/auth.model";
import crypto from "cryto";
import sendMail from "../utils/mail";
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

        if(!existingUser || !existingUser.isVerified){
            res.status(400).json({
                message: "Invalid user or verify 1st"
            });
        }
        const isPasswordMatch = await bcrypt.compare(existingUser.password, password);

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
    
};
const logOut = async (req, res) => {
    // check isLoggedIn
    // make JWT cookie expires
};
const forgotPassword = async (req, res) => {
    // get email
    // validate it
    // find user based on email
    // generate forgetPassword token and expired time
    // store token in db
    // send token via email to user's for resetPassword
};
const resetPassword = async (req, res) => {
    // get token from params and newPassword from req.body
    // validate token and newPassword
    // find user based on token
    // set password value to new password
    // resetPassword successful
};

export {userRegister, userVerify, LogIn, getMe, logOut, forgotPassword, resetPassword};