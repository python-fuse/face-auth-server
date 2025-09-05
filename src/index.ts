import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

// Import routes
import userRouter from "./routes/user.route";

// Load environment variables
dotenv.config();

import faceService from "./services/face.service";

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize face service
faceService.init();

// Middleware
app.use(helmet({}));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(requestLogger);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/users", userRouter);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
