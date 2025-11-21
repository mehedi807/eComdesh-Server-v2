import mongoose from "mongoose";

export const connectDB = async () => {
  const URI = process.env.MONGO_URI;

  if (!URI) {
    throw new Error("MongoDB URI is undefined");
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  await mongoose.connect(URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
  });
};
