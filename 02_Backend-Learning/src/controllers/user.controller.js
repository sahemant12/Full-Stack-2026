import User from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const registerUser = async (req, res) => {
    // get data(user)
    // validate data
    // check if user already exists in db
    // create user in db
    // create a verification token
    // save token in db
    // send token as email to user
    // send success to user

    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
            message: "User already exist"
        });
        }

        const newUser = await User.create(req.body);
        console.log(newUser);
        
        const token = crypto.randomBytes(32).toString("hex");
        console.log(token);
        
        newUser.verificationToken = token;
        await newUser.save();

        // send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // Use true for port 465, false for port 587
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD,
            },
            });

            // Send an email using async/await
            (async () => {
            const info = await transporter.sendMail({
                from: process.env.MAILTRAP_SENDEREMAIL,
                to: `${newUser.email}`,
                subject: "Verify your email",
                text: `Please click on following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`
            });

                console.log("Message sent:", info.messageId);
        })();
        
        res.status(201).json({
            message:"User registered successfully",
            success:true
        });

    }
    catch(error){
        return res.status(400).json({
        message: "User not register..",
        error: error.message,
        success:false,
        });  
    }

}

const verifyUser = async (req, res) =>{
    // get token from user
    // validate token
    // find user based on token in db
    // if not
    // make isVerified field to true
    // remove verificationToken field
    // send success to user

    const {userToken} = req.params;
    if(!userToken){
         return res.status(400).json({
            message: "Token not found"
        });
    }
    
    try{
        const verifyUser = await User.findOne({verificationToken: userToken});
        
        if(!verifyUser){
            return res.status(400).json({
            message: "Wrong Token"
        });
        }
        verifyUser.isVerified = true;
        verifyUser.verificationToken = null;
        await verifyUser.save();

        res.status(200).json({
            message: "Verification successful"
        });

    }
    catch(err){
        return res.status(400).json({
            message: "Verification fail",
            err: err.message,
            success: false,
        });
    }

}

const logIn = async (req, res) =>{
    // get data(email, password)
    // validate data
    // check email if exist then is verified
    // check password is correct
    // logIn User
    // create jwt token
    // Send jwt token through cookies
    // logIn until jwt token is present in cookies

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
            message: "User is not registered"
            });
        }

        if(!user.isVerified){
            return res.status(400).json({
                message: "User is not verified. Please! verify first"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        };

        // Now, logIn the User
        let token = jwt.sign({id: user._id, name: user.name, role: user.role, extra: "let's check"}, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        // Now send this token in cookies:
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000
        }

        res.cookie("tokenHu", token, cookieOptions);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        })
    }
    catch(err){
        return res.status(400).json({
            message: "Failed to LogIn",
            error: err.message,
            success:false
        });
    }
}
const getMe = async (req, res) =>{
    try {
        const data = req.user;
        console.log("reached at profile level: ", data);
        const user = await User.findById(data.id).select("-password");     
        console.log(user);
        
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success:false,

            });
        }
        res.status(200).json({
            success:true,
            user
        });

    } catch (error) {
        return res.status(400).json({
            err: err.message,
            success: false,
        });     
    }

}
const logOut = async (req, res) =>{
    // make cookies expire
    try{
        res.cookie("tokenHu", "", {expires: new Date(0)});

        res.status(200).json({
            success:true,
            message: "Logged out successfully"
        });  
    }
    catch(err){
        return res.status(400).json({
            err: err.message,
            success: false,
        }); 
    }

}
const forgotPassword = async (req, res) =>{
    // get email
    // find user based on email in db
    // create forgotPassword token and expire time
    // save token in db
    // send token to user through email

    const {email} = req.body;

    if(!email){
        return res.status(400).json({
            message: "Provide email to reset password"
        });
    }
  try{
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message: "no account found"});
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 10*60*1000;
    await user.save();

// send email
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD,
        },
        });

        // Send an email using async/await
        (async () => {
        const info = await transporter.sendMail({
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: `${user.email}`,
            subject: "Verify your email",
            text: `Please click on following link: ${process.env.BASE_URL}/api/v1/usersverify/${resetPasswordToken}`
        });

            console.log("Message sent:", info.messageId);
    })();
        
    res.status(201).json({
        message:"check your email for resetPassword",
            success:true
    });
  }
  catch(err){
    return res.status(400).json({
            err: err.message,
            success: false,
        }); 
  }

}
const resetPassword = async (req, res) =>{
    // collect token from params and new password from req.body
    // find user based on token
    // set password in db
    // reset forgotPassword token
    // save

    const {resetToken} = req.params;
    const {password} = req.body;
    
    if(!resetToken || !password){
        return res.status(400).json({message: "Invalid resetToken or newPassword"});
    }

    try{
        const user = await User.findOne({resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now()}});

        if(!user){
            return res.status(400).json({message: "Invalid token or time expires"});
        }

        user.password = password;
        user.resetPasswordToken = "";
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({
            message: "Reset Password successful",
        })   
    }
    catch(err){
        return res.status(400).json({
            err: err.message,
            success: false,
        }); 
    }
}

export {registerUser, verifyUser, logIn, getMe, logOut, forgotPassword, resetPassword};
