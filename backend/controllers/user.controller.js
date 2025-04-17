// login log out these things for user
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {            // this will check wheather any thing is missing then it will give an error
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });    // this will check wheather the account which is resgiter by one email is not linked will other account
        if (user) {
            return res.status(400).json({
                message: 'User Already exist with this email.',
                success: false,
            })
        }
        const hasedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hasedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}
// for login 
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            })
        };

        // Convert both roles to lowercase for comparison
        if (role.toLowerCase() !== user.role.toLowerCase()) {
            return res.status(400).json({
                message: `No ${role} account found with this email`,
                success: false
            })
        };

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // Remove httpsOnly in development
        const cookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production'
        };

        return res.status(200)
            .cookie("token", token, cookieOptions)
            .json({
                message: `Welcome back ${user.fullname}`,
                user: userData,
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// for user logout 
export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: 'strict'
        });

        // Send a success response
        return res.status(200).json({
            message: "Logged out successfully.",
            success: true
        });

    } catch (error) {
        // Log the error using console.error()
        console.error("Error during logout:", error);

        // Send an error response to the client
        return res.status(500).json({
            message: "Internal server error during logout",
            success: false
        });
    }
};

//update profile 

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        console.log(fullname, email, phoneNumber, bio, skills);
        const file = req.file;

        // cloudinary //
        // cloudinary //
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "raw", // 👈 Add this line
        });




        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;   //middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        //updating the data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (user) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray


        // resume section over here 
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }





        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}