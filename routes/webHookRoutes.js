import express from "express";
import { syncUserFromClerk } from "../controllers/webHookController.js";
const router = express.Router();

router.post("/clerk", syncUserFromClerk);

export default router;
