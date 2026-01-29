import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [2, "At least 2 character"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "At least 6 characters"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verificationToken: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

authSchema.pre("save", async function(){
    if(isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = mongoose.model("User", authSchema);

export default User;