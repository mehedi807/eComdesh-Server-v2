import express from "express";
import { requireAuth } from "@clerk/express";
import * as storeController from "./store.controller.js";
import * as bodyValidator from "../../common/middleware/bodyValidator.js";

const router = express.Router();

router.use(requireAuth());
router.post(
  "/",
  bodyValidator.validateStoreBody,
  storeController.createNewStore
);
router.get("/", storeController.getStores);
router.get("/:storeId", storeController.getStore);
router.put(
  "/:storeId",
  bodyValidator.validateStoreBody,
  storeController.updateStore
);

export default router;
