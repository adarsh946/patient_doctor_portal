import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database connected successfully");
  } catch (error: any) {
    console.error("problem in connecting to database");
  }
};

export default dbConnect;
