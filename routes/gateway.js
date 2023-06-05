import { Router } from "express";
import { check } from "express-validator";
import {
  getGateways,
  getAGateway,
  createGateways,
  deleteGateways,
} from "../controllers/gatewayController.js";
import { fieldValidator } from "../middlewares/fieldValidator.js";

const router = Router();
/* Get all Gateways Route */
router.get("/", getGateways);

/* Get a Gateway Route*/
router.get("/:serial", getAGateway);

/* Create a Gateway Route */
router.post(
  "/",
  [
    check("ip", "This is not a valid IPv4 address").isIP(4),
    check("name", "This field is required").notEmpty(),
    fieldValidator,
  ],
  createGateways
);
/* Delete a Gateway Route */
router.delete("/:serial", deleteGateways);

export default router;
