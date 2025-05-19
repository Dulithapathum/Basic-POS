import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

// Importing dotenv to load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Database connection
connectDB();

app.use("/api/customers", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("api/cart", cartRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
