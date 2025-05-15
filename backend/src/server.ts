import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// Importing dotenv to load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
