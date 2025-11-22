import express from "express";
import { syncUserFromClerk } from "../auth/auth.controller.js";
const router = express.Router();

router.post("/clerk", syncUserFromClerk);

export default router;
