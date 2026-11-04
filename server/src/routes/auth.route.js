import express from "express";
import * as AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/login", AuthController.login);
router.get("/register", AuthController.register);

export default router;
