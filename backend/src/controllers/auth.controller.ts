import bcrypt from "bcryptjs";
import { signUpType } from "../types";

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

  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

  try {

    const user = await 

  } catch (error) {}
};

export const signInController = (req: any, res: any) => {
  res.send("this is signin controller");
};
