import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "password should be atleast 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
