import mongoose from "mongoose";
import { envConfig } from "./environment.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
