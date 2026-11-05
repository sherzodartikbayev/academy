import * as AuthService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import {
  emailValidation,
  loginValidation,
  registerValidation,
} from "../validations/user.validation.js";

export const login = catchAsync(async (req, res) => {
  const result = loginValidation.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: "Invalid email" });

  const { message, data } = await AuthService.login(result.data);

  return res.status(200).json({ message, data, success: true });
});

export const verifyEmail = catchAsync(async (req, res) => {
  const result = emailValidation.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: "Invalid email" });

  const { message, data } = await AuthService.verifyEmail(result.data);

  return res.status(200).json({ message, data, success: true });
});

export const register = catchAsync(async (req, res) => {
  const result = registerValidation.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ error: "Validation failed" });

  const { message, data } = await AuthService.register(result.data);

  return res.status(201).json({ message, data, success: true });
});
