import bcrypt from "bcrypt";
import otpModel from "../models/otp.model.js";
import nodemailerConfig from "../config/nodemailer.config.js";
import { envConfig } from "../config/environment.config.js";

export const sendOtp = async (data) => {
  const { email } = data;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
  await otpModel.deleteMany({ email });
  await otpModel.create({
    email,
    otp: hashedOtp,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  });
  await nodemailerConfig.sendMail({
    from: envConfig.SMTP_EMAIL,
    to: email,
    subject: "Your OTP code",
    text: `Your OTP code is ${otp}. It will expire in 2 minutes.`,
  });

  return { email };
};

export const verifyOtp = async (data) => {
  const { email, otp } = data;

  const record = await otpModel.find({ email });
  if (record.length === 0) throw new Error("OTP not found");

  const lastRecord = record[record.length - 1];
  if (!lastRecord) throw new Error("OTP not found");
  if (lastRecord.expiresAt < new Date()) throw new Error("OTP expired");

  const isValid = await bcrypt.compare(otp, lastRecord.otp);
  if (!isValid) throw new Error("Invalid OTP");

  await otpModel.deleteMany({ email });

  return { email };
};
