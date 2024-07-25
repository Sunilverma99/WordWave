import mongoose from "mongoose";
import User from "../models/user.model.js";
import bycript from "bcrypt"
import {errHandler} from "../utlies/error.js"
import jwt from "jsonwebtoken"

const signUp=async(req,res,next)=>  {
    const {userName,email,password}=req.body;
    if(!userName || !email ||!password){
        next(errHandler(400,"All fields are requried"))
    }
    const hashPassword= await bycript.hash(password,10);
    const newUser=new User({userName,email,password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }catch(err){
        next(err);
        console.log(err)
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
   // console.log("Request body:", req.body);

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const validUser = await User.findOne({ email });
      //  console.log("User found:", validUser);

        if (!validUser) {
         //   console.log("Invalid credentials: User not found");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = bycript.compareSync(password, validUser.password);
       // console.log("Password match:", isMatch);

        if (!isMatch) {
         //   console.log("Invalid credentials: Password does not match");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { password: pass, ...rest } = validUser._doc; // Destructure and exclude password from response
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin,isContentWriter:validUser.isContentWriter }, process.env.JWT_TOKEN, { expiresIn: '30d' }); // Set token expiration time to one month
       // console.log("Generated token:", token);

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 
        }).json(rest); 
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

const googleLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const { password: pass, ...rest } = user._doc;
            const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_TOKEN, { expiresIn: '30d' }); // Set token expiration time to one month
            res.cookie('access_token', token, { secure: true, httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = await bycript.hashSync(generatedPassword, 10);
            const newUser = new User({ userName: req.body.userName.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashPassword, profilePhoto: req.body.photo });
            await newUser.save();
            const { password: pass, ...rest } = newUser._doc;
            const token = jwt.sign({ id: newUser._id,isAdmin:newUser.isAdmin }, process.env.JWT_TOKEN, { expiresIn: '30d' }); // Set token expiration time to one month
            res.cookie('access_token', token, { secure: true, httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export {signUp,signIn,googleLogin};