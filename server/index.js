import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from './routes/auth.js';
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req,res)=>{
    res.send("Portfolio backend is running")
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})
.then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}\n click http://localhost:${PORT}`))
})
.catch((err) => console.error("Error Connecting MongoDB ", err));