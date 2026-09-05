import mongoose from "mongoose";

export async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Create backend/.env from backend/.env.example.");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Add it to backend/.env and restart the API.");
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}