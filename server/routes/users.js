import express from "express";
import User from "../models/User.js";
import { authMiddleware }from "../middleware/auth.js"


const router = express.Router();

// get users profile by public url

router.get("/:username", async (req, res)=>{
    try {
        const {username} = req.params;
        const user = await User.findOne({username}).select("-passwordHash -__v");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"})
    }
})

// get logged-in user dashboard (edit and preview)

router.get("/me", authMiddleware, async (req,res)=>{
    try {
        res.json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : "Server error"});
    }
})

router.put("/me", authMiddleware, async (req,res)=>{
    try {
        const updates = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { ...updates, updatedAt: Date.now()},
            { new: true, runValidators: true}
        ).select("-passwordHash -__v");

        res.json({ message: "Portfolio Updated Successfully", user })
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Server error"});
    }
})

export default router;