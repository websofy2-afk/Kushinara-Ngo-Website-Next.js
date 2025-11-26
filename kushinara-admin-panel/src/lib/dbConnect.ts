
import mongoose from "mongoose";

const dbConnect = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export default dbConnect;