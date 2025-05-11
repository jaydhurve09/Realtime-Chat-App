import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res)=>{
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({ message: "Email already exist" })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        }); 

        if(newUser) {
            await newUser.save();
            // Generate JWT token after saving
            generateToken(newUser._id, res);

            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName, // Fixed property name
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch(error) {
        console.log("Error in signup controller:", error.message); // Added error message logging
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const login = async (req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid Credentials"});  
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch(error) {
        console.log("Error in login crontroller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const logout = (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    } catch(error) {
        console.log("Error in logout crontroller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res)=> {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "Profile Picture is required"});
        }

        console.log("Attempting to upload image to Cloudinary...");
        
        // Add error handling for Cloudinary upload
        let uploadResponse;
        try {
            // Check if the profilePic is a valid base64 string
            if (!profilePic.startsWith('data:image')) {
                return res.status(400).json({message: "Invalid image format. Must be a base64 encoded image."});
            }
            
            uploadResponse = await cloudinary.uploader.upload(profilePic, {
                folder: "chat-app-profiles",
                width: 500,
                crop: "scale"
            });
            
            console.log("Image uploaded successfully to Cloudinary");
        } catch (cloudinaryError) {
            console.error("Cloudinary upload error details:", cloudinaryError);
            return res.status(500).json({message: "Error uploading image to cloud storage"});
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {profilePic: uploadResponse.secure_url}, 
            {new: true}
        ).select("-password");

        res.status(200).json(updatedUser);

    } catch(error) {
        console.log("Error in update profile:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    } catch(error) {
        console.log("Error in login Check Authentication", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}