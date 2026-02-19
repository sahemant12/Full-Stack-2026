import { db } from "../libs/db";
import bcrypt from "bcryptjs";
import { UserRole } from "../generated/prisma/index.js";


export const register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await db.user.findUnique({
            where: {email}
        });

        if(existingUser){
            return res.status(400).json({
                error: "User already exist"
            });
        }
        const hashedPassword = await bcrypt(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        });

        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("jwtToken", token, {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production",
            maxAge:1000 * 60 * 60 * 24 * 7 // 7 days
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user:{
                id: newUser,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image
            }
        });

    } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({
                error:"Error creating user"
            })
    }
};

export const logIn = async (req, res) => {

};

export const logOut = async (req, res) => {

};

export const getMe = async (req, res) => {

};