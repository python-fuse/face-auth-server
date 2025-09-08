import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

// Import routes
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";

// Load environment variables
dotenv.config();

import faceService from "./services/face.service";
import path, { join } from "path";

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize face service
faceService.init();

// Middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);
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
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "uploads"), {
    maxAge: 86400000, // Cache for 1 day
    setHeaders: (res, filePath) => {
      if (filePath.match(/\.(jpg|jpeg|png|gif)$/)) {
        res.setHeader("Content-Type", "image/" + filePath.split(".").pop());
      }
    },
  })
);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
