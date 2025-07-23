import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.config.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.route.js";
import "./src/config/mail.config.js";
import errorHandler from "./src/middleware/errorHandler.js";
import postRoutes from "./src/routes/post.route.js";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

//routes
app.use('/api/user',authRoutes);
app.use("/api/",postRoutes);

//error handler middleware
app.use(errorHandler);


//port
const PORT = process.env.PORT || 8000;

const startServer = async()=>{
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server is running on port: ${PORT}`)
        })
        
    } catch (error) {
        console.error("Server running error ", error.message);
        process.exit(1);
    }
}
startServer();