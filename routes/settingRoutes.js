import express from "express";
import { requireAuth } from "@clerk/express";
import * as settingController from "../controllers/settingController.js";

const router = express.Router();

router.post("/configStore", settingController.configNewStore);

export default router;
