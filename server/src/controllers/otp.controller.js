import catchAsync from "../utils/catchAsync.js";
import * as OtpService from "../services/otp.service.js";
import { emailValidation } from "../validations/user.validation.js";
import { otpValidation } from "../validations/otp.validation.js";

export const sendOtp = catchAsync(async (req, res) => {
  const result = emailValidation.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: "Invalid email" });

  const data = await OtpService.sendOtp(result.data);

  return res
    .status(200)
    .json({ message: "OTP sent successfully", data, success: true });
});

export const verifyOtp = catchAsync(async (req, res) => {
  const result = otpValidation.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: "Invalid OTP" });

  const data = await OtpService.verifyOtp(result.data);

  return res
    .status(200)
    .json({ message: "OTP verified successfully", data, success: true });
});
