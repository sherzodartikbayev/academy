import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const login = async (data) => {
  const { email, password } = data;

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  return { message: "Login successful", data: user };
};

export const verifyEmail = async (data) => {
  const { email } = data;

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  return { message: "Email verified", data: { email: user.email } };
};

export const register = async (data) => {
  const { firstName, lastName, email, password } = data;

  const existUser = await userModel.findOne({ email });
  if (existUser) throw new Error("User already exist");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return { message: "User registered successfully", data: newUser };
};
