import z from "zod";

export const otpValidation = z.object({
  email: z.email(),
  otp: z.string().min(6).max(6),
});
