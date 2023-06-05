import { Router } from "express";
import { check } from "express-validator";
import {
  createDevices,
  deleteDevices,
} from "../controllers/deviceController.js";
import { fieldValidator } from "../middlewares/fieldValidator.js";

const router = Router();

router.post(
  "/:serial",
  [
    check("vendor", "The field vendor is required").notEmpty(),
    check("status", "The field status is required").notEmpty(),
    fieldValidator,
  ],
  createDevices
);
router.delete("/:serial", deleteDevices);

export default router;
