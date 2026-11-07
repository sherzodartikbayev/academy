import express from "express";
import * as UserContoller from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me/:userId", UserContoller.getMe);

export default router;
