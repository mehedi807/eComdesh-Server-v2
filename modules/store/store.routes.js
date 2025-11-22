import express from "express";
import { requireAuth } from "@clerk/express";
import * as settingController from "./store.controller.js";
import * as bodyValidator from "../../common/middleware/bodyValidator.js";

const router = express.Router();

router.post(
  "/configStore",
  bodyValidator.validateStoreBody,
  settingController.configNewStore
);

export default router;
