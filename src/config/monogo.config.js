/**
 * MongoDB Database Connection Configuration
 * ------------------------------------------
 * This file handles the connection to MongoDB using Mongoose.
 * It uses environment variable MONGO_URI for the connection string.
 *
 * Connection Options:
 *  - maxPoolSize: Maximum number of simultaneous DB connections (for concurrency)
 *  - serverSelectionTimeoutMS: How long Mongoose tries to find an available server
 *  - socketTimeoutMS: How long an idle socket stays open before being closed
 */

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,              // Allow up to 10 concurrent DB connections
      serverSelectionTimeoutMS: 5000, // Fail fast if MongoDB is unreachable (5s)
      socketTimeoutMS: 45000,         // Close idle sockets after 45s of inactivity
    });
    console.log(`✅ MongoDB successfully Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Crash the process if DB connection fails — no point running without DB
  }
};

export default connectDB;
