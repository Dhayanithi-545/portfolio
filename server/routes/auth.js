import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if(existingUser) return res.status(400).json({ message: "Username or email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
 
        // now we are creating user
        const newUser = new User({ username, email, passwordHash: hashedPassword});
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }
})

// this is for login dude

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // JWT: payload includes 'id'
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router