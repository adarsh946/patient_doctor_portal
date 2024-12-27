import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
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
  walletAmount: {
    type: Number,
    required: true,
  },
});
const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
