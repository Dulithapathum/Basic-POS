import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes";
import adminRoutes from "./routes/adminRoutes";
// Importing dotenv to load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

app.use("/api/customers", customerRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
