import express from "express";
import { nanoid } from "nanoid"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"



const app = express();

// CORS configuration - must be before other middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        const allowedOrigins = [
            'http://urlify.co.in', 
            'https://urlify.co.in', 
            'http://www.urlify.co.in', 
            'https://www.urlify.co.in',
            'http://localhost:5173', // For local development
            'http://127.0.0.1:5173'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
    credentials: true,       //👈 this allows cookies to be sent
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie'],
    exposedHeaders: ['Set-Cookie']
}));





app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user", user_routes)
app.use("/api/auth", auth_routes)
app.use("/api/create", short_url)

// Home route - must come before catch-all route
app.get('/', (req, res) => {
    res.send("Backend Default home route is running succesfully")
})

// Catch-all route for short URL redirection - must be after all other routes
app.get("/:id", redirectFromShortUrl)

// Error handler must be the last middleware
app.use(errorHandler)

app.listen(3000, () => {
    connectDB()
    console.log(" Backend Server is running on http://localhost:3000");
})

// GET - Redirection 