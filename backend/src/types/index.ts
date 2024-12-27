import z from "zod";

export const signUpType = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const signInType = z.object({
  email: z.string(),
  password: z.string(),
});
