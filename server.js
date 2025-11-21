import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import settingRoute from "./routes/settingRoutes.js";
import webHookRoutes from "./routes/webHookRoutes.js";

const app = express();

app.use(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  webHookRoutes
);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(clerkMiddleware());
app.use("/api/auth", authRoute);
app.use("/api/setting", settingRoute);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Surprisingly, nothing is on fire" });
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("DB connected successfully");

    app.listen(process.env.PORT, () => {
      console.log("Server running on port :", process.env.PORT);
    });
  } catch (error) {
    console.error("Failed to start server, ", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Mongoose connection closed");
    process.exit(0);
  } catch (err) {
    console.error("Error closing Mongoose connection:", err);
    process.exit(1);
  }
});
