import userModel from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

export const getMe = catchAsync(async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  const user = await userModel
    .findById(userId)
    .select("_id firstName lastName email avatar");

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json({ user, success: true });
});
