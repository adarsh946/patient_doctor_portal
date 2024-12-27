import bcrypt from "bcryptjs";
import { signInType, signUpType } from "../types";
import Patient from "../models/patient.model";

export const signUpController = async (req: any, res: any) => {
  const parsedData = signUpType.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "Invalid Input",
    });
    return;
  }

  if (!(parsedData.data.password === parsedData.data.confirmPassword)) {
    res.status(403).json({
      message: "Password is wrong",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(parsedData.data.password, salt);

  try {
    const user = await Patient.create({
      fullname: parsedData.data.fullname,
      email: parsedData.data.email,
      password: hashedPassword,
      walletAmount: 1000,
    });

    if (!user) {
      res.status(500).json({
        success: false,
        message: "Problem in Registration",
      });
    }

    res.status(200).json({
      success: true,
      userId: user._id,
      Balance: user.walletAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Problem in Registration",
    });
  }
};

export const signInController = (req: any, res: any) => {
  const parsedData = signInType.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "Invalid Input",
    });
    return;
  }

  const user = Patient.findOne({
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
};
