import z from "zod";

export const signUpType = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export const signInType = z.object({
  email: z.string(),
  password: z.string(),
});
