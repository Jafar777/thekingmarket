import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      maxPoolSize: 10, // Maintain up to 10 connections
    });

    mongoose.connection.on("connected", () => {
      console.log("DB Connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("DB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("DB disconnected");
    });

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map((c) => c.name));
  } catch (error) {
    console.error("DB connection failed:", error);
    throw error;
  }
};

export default connectDB;