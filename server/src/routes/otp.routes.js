import express from "express";
import * as OtpController from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/send", OtpController.sendOtp);
router.post("/verify-otp", OtpController.verifyOtp);

export default router;
