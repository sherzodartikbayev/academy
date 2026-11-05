import express from "express";
import * as AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/register", AuthController.register);

export default router;
