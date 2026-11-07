import express from "express";
import authRoutes from "./auth.route.js";
import otpRoutes from "./otp.routes.js";
import UserRoutes from "./user.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/otp", otpRoutes);
router.use("/user", UserRoutes);

export default router;
