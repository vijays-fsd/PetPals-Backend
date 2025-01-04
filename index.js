// Package import
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import petRoutes from "./routes/petRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import applicationRoutes from "./routes/applicationRoute.js";
import shelterUserRoutes from "./routes/shelterRoute.js";

// Configuration
dotenv.config();
const port = process.env.PORT || 5000;

// Database Connection
connectDB(process.env.MONGODB_URI);

// Initialize Express App
const app = express();

// Middleware Configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://petspalss.netlify.app"], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ["Content-Type", "Authorization"], // Custom headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Debugging Middleware (optional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Pet Adoption API");
});

// API Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/shelteruser", shelterUserRoutes);
app.use("/api/v1/pet", petRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/email", applicationRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
