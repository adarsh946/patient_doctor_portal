import bcrypt from "bcryptjs";
import { signInType, signUpType } from "../types";
import Patient from "../models/patient.model";
import jwt from "jsonwebtoken";

export const signUpController = async (req: any, res: any) => {
  const parsedData = signUpType.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error.issues);
    res.status(403).json({
      message: "Invalid Input",
    });
    return;
  }
  console.log(parsedData);
  console.log("first");

  if (!(parsedData.data.password === parsedData.data.confirmPassword)) {
    return res.status(403).json({
      message: "Password is wrong",
    });
  }
  console.log("second");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(parsedData.data.password, salt);

  console.log(hashedPassword);
  console.log("third");

  try {
    const user = {
      fullname: parsedData.data.fullname,
      email: parsedData.data.email,
      password: hashedPassword,
    };

    const newUser = new Patient(user);
    await newUser.save();

    console.log("forth");

    const token = jwt.sign(newUser._id, process.env.JWT_SECRET!);

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Problem in Registration",
      });
    }

    return res.status(200).json({
      success: true,
      userId: newUser._id,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "registration unsuccessfull",
    });
  }
};

export const signInController = async (req: any, res: any) => {
  const parsedData = signInType.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "Invalid Input",
    });
    return;
  }

  const user = await Patient.findOne({
    email: parsedData.data.email,
  });

  if (!user) {
    res.status(403).json({
      message: "Patient not found",
    });
    return;
  }

  const isValidPassword = bcrypt.compare(
    parsedData.data.password,
    user.password
  );

  if (!isValidPassword) {
    res.status(403).json({
      messgae: "Incorrect password",
    });
  }

  res.status(200).json({
    success: true,
    message: "signIn successfull",
  });
};
