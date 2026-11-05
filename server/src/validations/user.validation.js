import z from "zod";
import { UserRole } from "../helpers/enum.js";

export const loginValidation = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

export const registerValidation = z.object({
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(8).max(100),
  avatar: z.url().optional(),
  role: z.enum(Object.values(UserRole)).default(UserRole.USER),
});

export const emailValidation = z.object({
  email: z.email(),
});
