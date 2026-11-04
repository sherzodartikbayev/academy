import * as AuthService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";

export const login = catchAsync(async (req, res) => {
  const data = await AuthService.login({ name: "Username" });

  return res.status(200).json(data);
});

export const register = catchAsync(async (req, res) => {
  return res.status(201).json({ message: "Register route" });
});
