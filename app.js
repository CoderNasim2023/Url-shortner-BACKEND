import 'dotenv/config';

import express from "express";
import {nanoid} from "nanoid"
import dotenv from "dotenv"
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"


dotenv.config()
const app = express();

/// ✅ Proper dynamic CORS setup
const allowedOrigins = [
    "http://localhost:5173", // local Vite dev
    "http://localhost:3000", // local React dev (alt)
    "https://url-shortener-frontend-nine-ivory.vercel.app" // production frontend
];

// Optional: allow dynamic override from .env
if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (mobile apps, curl, etc.)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.warn("❌ Blocked by CORS:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // allow cookies / session tokens
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Attach user middleware
app.use(attachUser);

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to Backend of Url Shortener");
});

// API routes
app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);

// Redirect route
app.get("/:id", redirectFromShortUrl);

// Global error handler
app.use(errorHandler);

// ✅ Use correct environment port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log("✅ Allowed origins:", allowedOrigins);
});

// GET - Redirection 
