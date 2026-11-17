import express from "express";
import authRoutes from "./auth.route.js";
import otpRoutes from "./otp.routes.js";
import userRoutes from "./user.route.js";
import adminRoutes from "./admin.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/otp", otpRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

export default router;
