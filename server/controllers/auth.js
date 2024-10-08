import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


/* REGISTER USER */
export const register = async(req, res) => {
    try{
        const {
            firstName,
            lastName, 
            email, 
            password, 
            picturePath,
            friends,
            location,
            occupation
        } = req.body ;

        const salt = await bcrypt.genSalt();
        const hash_Password = await bcrypt.hash(password, salt) ;

        const newUser = new User({
            firstName,
            lastName, 
            email, 
            password: hash_Password, 
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.ceil(Math.random() * 10000),
            impressions: Math.ceil(Math.random() * 10000),
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
}


/* LOGIN USER */

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({ email: email });
        if(!user) {
            return res.status(400).json({ msg: "User does not exists." })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "7d" }
        );

        delete user.password; // OR, user.password = undefined;

        res.status(200).json({ token, user });
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}
